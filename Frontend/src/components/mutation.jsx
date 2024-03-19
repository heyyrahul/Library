import { gql } from '@apollo/client';


export const BORROW_BOOK = gql`
  mutation BorrowBook($bookId: ID!) {
    borrowBook(bookId: $bookId) {
      id
      title
      author
      price
      qty
    }
  }
`;

export const BUY_BOOK = gql`
  mutation BuyBook($bookId: ID!) {
    buyBook(bookId: $bookId) {
      id
      title
      author
      price
      qty
    }
  }
`;


export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $role: String!) {
    createUser(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;


