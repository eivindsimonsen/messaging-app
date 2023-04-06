import image from "../assets/image-maxblagun.png";
import { useState } from "react";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

type PassFunc = {
  isReply?: boolean;
  reply?: boolean;
};

function Reply(props: PassFunc) {
  const { isReply } = props;

  return (
    <>
      <div className={isReply ? "reply-spacing" : ""}>
        {isReply ? <hr /> : null}
        <form className="reply">
          <img
            src={image}
            alt=""
          />
          <textarea
            name="reply"
            rows={4}
            placeholder="Replying to username.."></textarea>
          <button className="cta">REPLY</button>
        </form>
      </div>
    </>
  );
}

export default Reply;
