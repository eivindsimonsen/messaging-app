import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";

function App() {
  return (
    <>
      <header>
        <h1>Hello Username</h1>
        <button>Login</button>
      </header>
      <main>
        <Comment />
      </main>
      <footer>
        <WriteComment />
      </footer>
    </>
  );
}

export default App;
