// Inbox.js
// Inbox.js (for receiving user)
import React, { useState, useEffect } from "react";
import "./Inbox.css";
import { useDispatch } from "react-redux";
import { authActions } from "./authReducer";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Inbox() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const enteredEmail = localStorage.getItem("email");
  const changedEmail = enteredEmail.replace("@", "").replace(".", "");
  const [emails, setEmails] = useState([]);
  const [expandedEmailId, setExpandedEmailId] = useState(null);
  const [isVisible, setIsVisible] = useState([]);

  const toggleEmail = (id) => {
    setExpandedEmailId((prevId) => (prevId === id ? null : id));
    console.log(id);
  };

  useEffect(() => {
    dispatch(authActions.islogin(token));
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mailbox-39159-default-rtdb.firebaseio.com/user/inbox/${changedEmail}.json`
        );
        const data = await response.json();
        console.log("DATA", data);

        if (response.ok) {
          const emailsData = Object.entries(data).map(([id, email]) => ({
            id: id,
            enteredEmail: email.enteredEmail,
            subject: email.subject,
            emailContent: email.emailContent,
          }));
          setEmails(emailsData);
          const visibilityData = Object.entries(data).map(
            ([id, email]) => email.visibility
          );
          setIsVisible(visibilityData);
          console.log("Emails Data", emailsData);
        }
      } catch (error) {
        console.error("Error fetching data from the database:", error);
      }
    };

    fetchData();
  }, [changedEmail, dispatch, token]);

  const hideBtnHandler = async (index, emailId) => {
    setIsVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = false;
      return updatedVisibility;
    });

    try {
      const response = await fetch(
        `https://mailbox-39159-default-rtdb.firebaseio.com/user/inbox/${changedEmail}/${emailId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: emailId,
            enteredEmail: emails[index].enteredEmail,
            subject: emails[index].subject,
            emailContent: emails[index].emailContent,
            visibility: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("PUT", response);
        throw new Error("Error updating visibility data in the database");
      }
    } catch (error) {
      console.error("Error updating visibility data in the database:", error);
    }
  };

  const dltbtnhandler = async (emailId) => {
    setEmails((prevEmail) => prevEmail.filter((email) => email.id !== emailId));
    console.log(emailId);

    try {
      const response = await fetch(
        `https://mailbox-39159-default-rtdb.firebaseio.com/user/inbox/${changedEmail}/${emailId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting data from the database");
      }
    } catch (error) {
      console.error("Error deleting data from the database:", error);
    }
  };

  const counter = isVisible.filter((visible) => visible).length;

  return (
    <div className="inbox-container">
      {/* <p>Unread Messages: {counter}</p> */}
      <p
        className="text-lg font-semibold  px-2 py-1 ml-3 mt-4 mb-2  bg-gradient-to-r from-purple-800 to-yellow-600 text-white rounded-md"
        style={{ marginRight: "84rem", borderRadius: "20px" }}
      >
        Unread Messages: {counter}
      </p>

      {emails.map((email, index) => (
        <div
          key={email.id}
          className={`email-item ${
            expandedEmailId === email.id ? "expanded" : ""
          }`}
          onClick={() => toggleEmail(email.id)}
        >
          <div className="email-item-content">
            <button
              onClick={() => dltbtnhandler(email.id)}
              className=" ml-4 mr-4 px-2 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-800"
            >
              X
            </button>
            <div
              className="email-header"
              onClick={() => hideBtnHandler(index, email.id)}
            >
              {isVisible[index] && <VisibilityIcon className="text-blue-500 mr-2" />}
              <span className="email-sender">{email.enteredEmail}</span>
              <span className="email-subject">{email.subject}</span>
            </div>
          </div>
          {expandedEmailId === email.id && (
            <div className="email-content">
              <span className="email-sender">{email.enteredEmail}</span>
              <span className="email-subject">{email.subject}</span>
              <p className="email-body">{email.emailContent}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}