import image from "../assets/image-maxblagun.png";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

type PassFunc = {
  setReplyIndex: any;
};

function WriteComment(props: PassFunc) {
  const [messageValue, setMessageValue] = useState<string>("");
  const { setReplyIndex } = props;

  // Create message
  const createMessage = async (e: any) => {
    e.preventDefault();

    await addDoc(collection(db, "messages"), {
      likes: 0,
      message: messageValue,
      posted: "04.02.23",
      profile_image: "link to image",
      replies: [],
      username: "Eivind Simonsen",
    });

    setMessageValue("");
    setReplyIndex(null);
  };

  return (
    <form
      onSubmit={createMessage}
      className="write-comment">
      <img
        src={image}
        alt=""
      />
      <textarea
        name="reply"
        rows={4}
        placeholder="Replying to username.."
        onChange={(e) => setMessageValue(e.target.value)}
        value={messageValue}></textarea>
      <button className="cta">SEND</button>
    </form>
  );
}

export default WriteComment;
