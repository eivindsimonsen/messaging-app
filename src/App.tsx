import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";
import Reply from "./components/Reply";

function App() {
  return (
    <>
      <header>
        <h1>Hello Username</h1>
        <button>Login</button>
      </header>
      <main>
        <Comment />
        <Reply />
      </main>
      <footer>
        <WriteComment />
      </footer>
    </>
  );
}

export default App;
