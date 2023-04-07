import image from "../assets/image-maxblagun.png";
import { useState } from "react";
import { db } from "../firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";

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
    console.log(captureId);
    await updateDoc(doc(db, "messages", captureId), {
      replies: arrayUnion({
        likes: 0,
        message: replyValue,
        posted: "04.02.23",
        profile_image: "link to image",
        replies: [],
        username: "Eivind Simonsen",
      }),
    });
  };

  return (
    <>
      <div className="reply-spacing">
        <hr />
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
