import { useState, useEffect } from "react";
import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";
import { db } from "./firebase";
import { collection, onSnapshot, query, deleteDoc, doc, updateDoc, orderBy } from "firebase/firestore";
import GoogleButton from "react-google-button";
// @ts-ignore
import { UserAuth } from "./context/AuthContext";

function App() {
  const [reply, setReply] = useState(false);
  const [update, setUpdate] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);

  const { googleSignIn, logOut, user } = UserAuth();

  const toggleReply = (index: any) => {
    setReply(!reply);
    setReplyIndex(index);
  };

  const toggleUpdateReply = (index: any) => {
    setUpdate(!update);
    setReplyIndex(index);
  };

  // Read comments
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("likes", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messagesArr: any = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArr);
    });
    return () => unsubscribe();
  }, []);

  // Update comment
  const updateComment = async (comment: any) => {
    await updateDoc(doc(db, "messages", comment.id), {
      message: comment.message,
    });
  };

  // Delete comment
  const deleteComment = async (id: any) => {
    const confirmed = window.confirm("This will remove the comment, and all its replies. Do you wish to proceed?");

    if (confirmed) {
      await deleteDoc(doc(db, "messages", id));
    }
  };

  // Sign in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

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
        <h1>{user?.displayName ? `Hello, ${user.displayName}` : "FakeBook"}</h1>
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
              deleteComment={deleteComment}
              updateComment={updateComment}
              toggleUpdateReply={toggleUpdateReply}
              update={update}
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
