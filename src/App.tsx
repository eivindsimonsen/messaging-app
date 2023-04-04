import "./sass/style.scss";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";

function App() {
  return (
    <>
      <header>Login</header>
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
