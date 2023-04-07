import image from "../assets/image-maxblagun.png";
import { useState } from "react";
import { db } from "../firebase";
import { doc, arrayUnion, updateDoc, serverTimestamp } from "firebase/firestore";

type PassFunc = {
  message?: any;
  captureId?: any;
  toggleReply?: any;
};

function WriteReply(props: PassFunc) {
  const { captureId, toggleReply } = props;
  const [replyValue, setReplyValue] = useState<string>("");

  // Update
  const createReply = async (e: any) => {
    e.preventDefault();
    toggleReply();

    const currentDate = new Date();
    const postDate = currentDate.toLocaleString();

    const daysAgo = Math.round((currentDate.getTime() - Date.parse(postDate)) / (1000 * 60 * 60 * 24));

    let formattedDate = `${daysAgo} days ago`;
    if (daysAgo === 0) {
      formattedDate = "today";
    } else if (daysAgo === 1) {
      formattedDate = "yesterday";
    }

    await updateDoc(doc(db, "messages", captureId), {
      replies: arrayUnion({
        likes: 0,
        message: replyValue,
        postedDate: formattedDate,
        profile_image: "https://example.com/profile_image.jpg",
        replies: [],
        username: "Eivind Simonsen",
      }),
    });
  };

  return (
    <>
      <div>
        <form
          onSubmit={createReply}
          className="reply">
          <img
            src={image}
            alt=""
          />
          <textarea
            name="reply"
            rows={4}
            placeholder="Replying to username.."
            onChange={(e) => setReplyValue(e.target.value)}
            value={replyValue}></textarea>
          <button className="cta">REPLY</button>
        </form>
      </div>
    </>
  );
}

export default WriteReply;
