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
  }

  type Query {
    users: [User!]!
    books: [Book!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): AuthPayload
    createBook(title: String!, author: String!, price: Float!, qty: Int!): Book
    updateBook(id: ID!, title: String, author: String, price: Float, qty: Int): Book
    deleteBook(id: ID!): Book
  }

  type AuthPayload {
    token: String
    user: User
  }
`;
