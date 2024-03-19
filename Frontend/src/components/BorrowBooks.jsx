
import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_BOOKS } from '../queries'; 
 
const BORROW_BOOK = gql`
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

function BorrowBook({ bookId, notify }) {
  const [borrowBook, { loading, error }] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }] 
  });

  const handleBorrow = async () => {
    try {
      const { data } = await borrowBook({ variables: { bookId } });
      if (notify) {
        notify('success', 'Book borrowed successfully!');
      }

    } catch (error) {
      console.error('Borrow book error:', error);
      if (notify) {
        notify('error', 'Failed to borrow book');
      }
    }
  };

  return (
    <div>
      <button onClick={handleBorrow} disabled={loading}>Borrow Book</button>
   
    </div>
  );
}

export default BorrowBook;
