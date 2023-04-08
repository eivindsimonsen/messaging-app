import { useState, useEffect } from "react";
import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";
import { db } from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import GoogleButton from "react-google-button";
// @ts-ignore
import { UserAuth } from "./context/AuthContext";

function App() {
  const [reply, setReply] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);

  const { googleSignIn, logOut, user } = UserAuth();

  const toggleReply = (index: any) => {
    setReply(true);
    setReplyIndex(index);
  };

  // Read messages
  useEffect(() => {
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messagesArr: any = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArr);
    });
    return () => unsubscribe();
  }, []);

  // Sign in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  // Sign Out
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <h1>{user?.displayName ? `Hello ${user.displayName}` : "Please log in"}</h1>
        {user?.displayName ? (
          <div className="todo-auth-logout">
            <button
              onClick={handleSignOut}
              className="cta">
              Sign Out
            </button>
          </div>
        ) : (
          <GoogleButton
            className="google-button"
            onClick={handleGoogleSignIn}
          />
        )}
      </header>
      <main>
        <ul>
          {messages.map((message, index) => (
            <Comment
              key={index}
              index={index}
              message={message}
              toggleReply={toggleReply}
              reply={reply}
              replyIndex={replyIndex}
              setReplyIndex={setReplyIndex}
            />
          ))}
        </ul>
      </main>
      <footer>
        <WriteComment setReplyIndex={setReplyIndex} />
      </footer>
    </>
  );
}

export default App;
