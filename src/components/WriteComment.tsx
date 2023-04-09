import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// @ts-ignore
import { UserAuth } from "../context/AuthContext.jsx";

type PassFunc = {
  setReplyIndex: any;
};

function WriteComment(props: PassFunc) {
  const { user } = UserAuth();
  const [messageValue, setMessageValue] = useState<string>("");
  const { setReplyIndex } = props;

  // Create message
  const createMessage = async (e: any) => {
    e.preventDefault();

    await addDoc(collection(db, "messages"), {
      likes: 0,
      message: messageValue,
      postedDate: serverTimestamp(),
      profile_image: user.photoURL,
      replies: [],
      username: user.displayName,
    });

    setMessageValue("");
    setReplyIndex(null);
  };

  return (
    <>
      {user?.displayName && (
        <form
          onSubmit={createMessage}
          className="write-comment">
          {user?.displayName ? (
            <img
              src={user.photoURL}
              alt=""
              className="profile-img"
            />
          ) : (
            <img
              src="https://us.123rf.com/450wm/viktorijareut/viktorijareut1905/viktorijareut190500748/123236862-default-avatar-profile-icon-grey-photo-placeholder.jpg"
              alt=""
              className="profile-img"
            />
          )}
          <textarea
            name="reply"
            rows={4}
            placeholder="Write a comment"
            onChange={(e) => setMessageValue(e.target.value)}
            value={messageValue}></textarea>
          <button className="cta">SEND</button>
        </form>
      )}
    </>
  );
}

export default WriteComment;
