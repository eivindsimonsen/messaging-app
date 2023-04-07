import { useState, useEffect } from "react";
import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";
import { db } from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

function App() {
  const [reply, setReply] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);

  const toggleReply = (index: any) => {
    setReply(!reply);
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

  console.log(messages);

  return (
    <>
      <header>
        <h1>Hello Username</h1>
        <button>Login</button>
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
