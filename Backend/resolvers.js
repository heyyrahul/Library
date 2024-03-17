import { Book } from "./model/bookModel.js";
import { User } from "./model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
      }
    },
    books: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Error fetching books");
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password, role }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });
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

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return { token, user };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Error logging in");
      }
    },
    createBook: async (_, { title, author, price, qty }) => {
      try {
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
    updateBook: async (_, { id, title, author, price, qty }) => {
      try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, qty }, { new: true });
        return updatedBook;
      } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Error updating book");
      }
    },
    deleteBook: async (_, { id }) => {
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        return deletedBook;
      } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Error deleting book");
      }
    },
  },
};
 