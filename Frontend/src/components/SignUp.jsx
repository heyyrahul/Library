import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../Css/SignUp.css'; 
import { CREATE_USER } from './mutation';


const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!, $role: String!) {
    signUp(name: $name, email: $email, password: $password, role: $role) {
      token
    }
  }
`;

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUp({ variables: { name, email, password, role: 'USER' } });
      // localStorage.setItem('token', data.signUp.token);
      alert('Sign up successfully');
      window.location.href = '/';

    
    } catch (error) {
      console.error('Sign-up error:', error);
      alert(`Check Credentials`);
    }
  };

  return (
    <div className="signup-container"> 
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>Sign Up</button>
    
      </form>
    </div>
  );
}

export default SignUp;
