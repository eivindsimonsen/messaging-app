import { useState } from "react";
import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";
import Reply from "./components/Reply";

function App() {
  const [reply, setReply] = useState(false);
  const [isReply, setIsReply] = useState(true);

  const toggleReply = () => {
    setReply(true);
  };

  return (
    <>
      <header>
        <h1>Hello Username</h1>
        <button>Login</button>
      </header>
      <main>
        <Comment toggleReply={toggleReply} />
        <Reply reply={reply} />
        <Comment isReply={isReply} />
      </main>
      <footer>
        <WriteComment />
      </footer>
    </>
  );
}

export default App;
