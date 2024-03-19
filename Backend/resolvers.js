
import { Book } from "./model/bookModel.js";
import { User } from "./model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const checkAuthorization = (user, requiredRoles) => {
  if (!user) {
    throw new Error('Authentication required');
  }
  if (!requiredRoles.includes(user.role)) {
    throw new Error('Unauthorized access');
  }
};

export const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      checkAuthorization(user, ['ADMIN', 'USER']); // Allow access for both admins and regular users
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
      }
    },
    books: async (_, __) => {
      // checkAuthorization(user);
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Error fetching books");
      }
    },
    searchBooks: async (_, { query }) => {
      try {
        const books = await Book.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { author: { $regex: query, $options: 'i' } }] });
        return books;
      } catch (error) {
        console.error("Error searching books:", error);
        throw new Error("Error searching books");
      }
    },
  },
  Mutation: { 
    createUser: async (_, { name, email, password, role }, { user }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists with this email');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
    
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
      }
    }, 
    
    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Invalid password');
        } 

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET,{expiresIn:'1hr'});
        return { token, user };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Error logging in");
      }
    },
    createBook: async (_, { bookInput }, { user }) => {
      checkAuthorization(user, ['ADMIN']);
      try {
        const { title, author, price, qty } = bookInput;
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
          throw new Error('Book already exists with the same title and author');
        }

        const newBook = new Book({ title, author, price, qty });
        await newBook.save();
        return newBook;
      } catch (error) {
        console.error("Error creating book:", error);
        throw new Error("Error creating book");
      }
    }, 
    updateBook: async (_, { id, title, author, price, qty }, { user }) => {
      checkAuthorization(user, ['ADMIN']);
      try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, qty }, { new: true });
        return updatedBook;
      } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Error updating book");
      }
    },
    deleteBook: async (_, { id }, { user }) => {
      checkAuthorization(user, ['ADMIN']);
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        return deletedBook;
      } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Error deleting book");
      }
    },
    borrowBook: async (_, { borrowInput }, { user }) => {
      checkAuthorization(user, ['USER']);
      try {
        const { bookId } = borrowInput;
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error('Book not found');
        }
        if (book.ownerId) {
          throw new Error('Book is already borrowed');
        }
        book.ownerId = user._id;
        await book.save();
        return book;
      } catch (error) {
        console.error("Error borrowing book:", error);
        throw new Error("Error borrowing book");
      }
    },
    buyBook: async (_, { bookId }, { user }) => {
      // checkAuthorization(user, ['USER']);
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error('Book not found');
        }
        if (book.ownerId) {
          throw new Error('Book is already owned by someone else');
        } 
        book.ownerId = user._id;
        await book.save();
        return book;
      } catch (error) {
        console.error("Error buying book:", error);
        throw new Error("Error buying book");
      }
    },
  },
};
