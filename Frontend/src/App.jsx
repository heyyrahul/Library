import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar';
  

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </Router>
    </ApolloProvider>
  );
}
 
export default App;
