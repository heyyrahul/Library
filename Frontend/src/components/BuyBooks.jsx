
import React from 'react';
import { useMutation } from '@apollo/client';
import { BUY_BOOK } from './mutation';
import { GET_BOOKS } from '../queries';

function BuyBook({ bookId, notify, onBookBought }) {
  const [buyBook, { loading }] = useMutation(BUY_BOOK, {
    variables: { bookId },
    refetchQueries: [{ query: GET_BOOKS }],
    onError: (error) => {
      console.error('Buy book error:', error);
   
    },
    onCompleted: () => {
      onBookBought(); 
    }
  });

  const handleBuy = async () => {
    try {
      await buyBook();
      notify('success', 'Book successfully bought');
    } catch (error) {
      console.error('Buy book error:', error);
      notify('error', 'Error buying book');
    }
  };

  return (
    <div>
      <button onClick={handleBuy} disabled={loading}>Buy Book</button>
    </div>
  );
}

export default BuyBook;
