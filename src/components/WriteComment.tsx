import image from "../assets/image-maxblagun.png";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

function WriteComment() {
  const [todosArr, setTodosArr] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "test"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newTodosArr: any[] = [];
      querySnapshot.forEach((doc) => {
        newTodosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodosArr(newTodosArr);
      console.log(newTodosArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <form className="write-comment">
      <img
        src={image}
        alt=""
      />
      <textarea
        name="reply"
        rows={4}
        placeholder="Replying to username.."></textarea>
      <button className="cta">SEND</button>
    </form>
  );
}

export default WriteComment;
