import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }
 
  type Book {
    id: ID!
    title: String!
    author: String!
    price: Float!
    qty: Int!
    ownerId: ID
  }

  type Query {
    users: [User!]!
    books: [Book!]!
    searchBooks(query: String!): [Book!]!
  }

  input BookInput {
    title: String!
    author: String!
    price: Float!
    qty: Int!
  }

  input BorrowBookInput {
    bookId: ID!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): AuthPayload
    createBook(bookInput: BookInput!): Book
    updateBook(id: ID!, title: String, author: String, price: Float, qty: Int): Book
    deleteBook(id: ID!): Book
    borrowBook(borrowInput: BorrowBookInput!): Book
    buyBook(bookId: ID!): Book
  }

  type AuthPayload {
    token: String
    user: User
  }
`;
  