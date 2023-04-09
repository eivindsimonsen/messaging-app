import { useState } from "react";
// @ts-ignore
import { UserAuth } from "../context/AuthContext.jsx";

type PassFunc = {
  message: any;
  updateComment: any;
  toggleUpdateReply: any;
};

function Update(props: PassFunc) {
  const { user } = UserAuth();
  const { message, updateComment, toggleUpdateReply } = props;
  const [updatedReply, setUpdatedReply] = useState(message.message);

  return (
    <div>
      <form className="reply">
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
          onChange={(e) => setUpdatedReply(e.target.value)}>
          {message.message}
        </textarea>

        <button
          onClick={(e) => {
            e.preventDefault();
            updateComment({ ...message, message: updatedReply });
            toggleUpdateReply(false);
          }}
          className="cta">
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default Update;
