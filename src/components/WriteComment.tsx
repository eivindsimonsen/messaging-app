import image from "../assets/image-maxblagun.png";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

type PassFunc = {
  setReplyIndex: any;
};

function WriteComment(props: PassFunc) {
  const [messageValue, setMessageValue] = useState<string>("");
  const { setReplyIndex } = props;

  // Create message
  const createMessage = async (e: any) => {
    e.preventDefault();

    const currentDate = new Date();
    const postDate = currentDate.toLocaleString();

    const daysAgo = Math.round((currentDate.getTime() - Date.parse(postDate)) / (1000 * 60 * 60 * 24));

    let formattedDate = `${daysAgo} days ago`;
    if (daysAgo === 0) {
      formattedDate = "today";
    } else if (daysAgo === 1) {
      formattedDate = "yesterday";
    }

    await addDoc(collection(db, "messages"), {
      likes: 0,
      message: messageValue,
      postedDate: formattedDate,
      profile_image: "https://example.com/profile_image.jpg",
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
