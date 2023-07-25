// ComposeEmail.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmail } from './emailActions';

function ComposeEmail() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const handleSendEmail = () => {
    const emailData = {
      recipient,
      subject,
      body,
    };

    dispatch(sendEmail(emailData));
    // Clear the fields after sending the email
    setRecipient('');
    setSubject('');
    setBody('');
  };

  return (
    <div>
      <h1>Compose Email</h1>
      <form>
        <div>
          <label>Recipient:</label>
          <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <button type="button" onClick={handleSendEmail}>Send Email</button>
      </form>
    </div>
  );
}

export default ComposeEmail;
