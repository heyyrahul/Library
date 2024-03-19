
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries'; 
import BuyBook from './BuyBooks';
import BorrowBook from './BorrowBooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/Home.css';

function Home() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  const notify = (type, message) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Books</h1>
      <div className="book-list">
        {data.books.map(book => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Quantity: {book.qty}</p>
            <div className="book-actions">
              <BuyBook bookId={book.id} notify={notify} />
              <BorrowBook bookId={book.id} notify={notify} />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Home;
 