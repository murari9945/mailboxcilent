// EmailList.js
import React from 'react';
import { useSelector } from 'react-redux';

function EmailList({ type }) {
  // Use the useSelector hook to get the list of emails from the Redux state
  const emails = useSelector((state) => state.emails);

  // Filter the emails based on the type (inbox or sent box)
  const filteredEmails = emails.filter((email) => email.type === type);

  return (
    <div>
      <h1>{type === 'inbox' ? 'Inbox' : 'Sent Box'}</h1>
      {filteredEmails.map((email) => (
        <div key={email.id}>
          <p>From: {email.sender}</p>
          <p>To: {email.recipient}</p>
          <p>Subject: {email.subject}</p>
          <p>Body: {email.body}</p>
        </div>
      ))}
    </div>
  );
}

export default EmailList;
