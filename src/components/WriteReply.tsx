import { useState } from "react";
import { db } from "../firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
// @ts-ignore
import { UserAuth } from "../context/AuthContext.jsx";

type PassFunc = {
  message?: any;
  captureId?: any;
  toggleReply?: any;
};

function WriteReply(props: PassFunc) {
  const { user } = UserAuth();
  const { captureId, toggleReply, message } = props;
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
        profile_image: user.photoURL,
        replies: [],
        username: user.displayName,
      }),
    });
  };

  return (
    <>
      <div>
        <form
          onSubmit={createReply}
          className="reply">
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
            placeholder={`@${message.username}`}
            onChange={(e) => setReplyValue(e.target.value)}
            value={replyValue}></textarea>
          <button className="cta">REPLY</button>
        </form>
      </div>
    </>
  );
}

export default WriteReply;
