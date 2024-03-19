// SignIn.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../Css/SignIn.css'; // Import the CSS file
import { LOGIN_USER } from './mutation';
const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signIn({ variables: { email, password } });
      // localStorage.setItem('token', data.signIn.token);
      alert('Sign in successfully');
      window.location.href = '/';
     
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="signin-container"> 
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>Sign In</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default SignIn;
