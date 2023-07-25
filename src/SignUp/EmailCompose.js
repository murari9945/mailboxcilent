// EmailPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ComposeEmail from './ComposeEmail';
import EmailList from './EmailList';

function EmailPage() {
  return (
    <div>
      <h1>Email Page</h1>
      <Link to="/login">Logout</Link>
      <ComposeEmail />
     
    </div>
  );
}

export default EmailPage;
