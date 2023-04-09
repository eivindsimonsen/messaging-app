import { useState } from "react";
import WriteReply from "./WriteReply";
import Update from "./Update";
import Reply from "./Reply";
// @ts-ignore
import { UserAuth } from "../context/AuthContext.jsx";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

type PassFunc = {
  toggleReply?: any;
  isReply?: boolean;
  reply?: boolean;
  message: {
    likes: number;
    message: string;
    postedDate: string;
    profile_image: string;
    replies: any;
    username: string;
    id: any;
    formattedDate: any;
  };
  index: number | undefined;
  replyIndex: any;
  setReplyIndex: any;
  deleteComment: any;
  updateComment: any;
  toggleUpdateReply: any;
  update: any;
};

function Comment(props: PassFunc) {
  const { user } = UserAuth();
  const { toggleReply, message, reply, index, replyIndex, setReplyIndex, deleteComment, updateComment, toggleUpdateReply, update } = props;
  const [captureId, setCaptureId] = useState(null);
  const [count, setCount] = useState<number>(message.likes);
  const [plusDisabled, setPlusDisabled] = useState(false);
  const [minusDisabled, setMinusDisabled] = useState(false);

  // Update likes
  const updateLikes = async (x: any, likesCount: number) => {
    await updateDoc(doc(db, "messages", x.id), {
      likes: likesCount,
    });
  };

  // Tagging users with @ will result in color change
  function highlightUsers(message: string) {
    const words = message.split(" ");
    const highlightedWords = words.map((word) => {
      if (word.startsWith("@")) {
        return <span className="user-color">{word}</span>;
      }
      return word;
    });
    return <>{highlightedWords.join(" ")}</>;
  }

  return (
    <>
      <div>
        <div className="comment">
          <div className="comment-likes comment-likes-desktop">
            <button
              onClick={(e) => {
                e.preventDefault();
                const newCount = count + 1;
                setCount(newCount);
                updateLikes(message, newCount);
                setPlusDisabled(true);
                setMinusDisabled(false);
              }}
              disabled={plusDisabled}>
              <i className="fa-solid fa-plus"></i>
            </button>
            <p>{message.likes}</p>
            <button
              onClick={(e) => {
                if (count === 0) return;
                e.preventDefault();
                const newCount = count - 1;
                setCount(newCount);
                updateLikes(message, newCount);
                setPlusDisabled(false);
                setMinusDisabled(true);
              }}
              disabled={minusDisabled}>
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          <div className="comment-contents">
            <div className="comment-contents-details">
              <div className="user-info-spacing">
                <img
                  src={message.profile_image}
                  alt=""
                  className="profile-img"
                />
                <p className="username">{message.username}</p>
                {user?.displayName === message.username && <div className="identifier">you</div>}
                {/* @ts-ignore */}
                {message.postedDate && <p className="active-since">{new Date(message.postedDate.seconds * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short" })}</p>}
              </div>
              <div>
                {user?.displayName === message.username && (
                  <div className="desktop-user-buttons">
                    <button
                      onClick={() => deleteComment(message.id)}
                      className="delete-btn btn-with-icon">
                      <i className="fa-solid fa-trash icon-spacing"></i>Delete
                    </button>
                    <button
                      onClick={() => {
                        toggleUpdateReply();
                        setReplyIndex(index);
                      }}
                      className="update-btn btn-with-icon">
                      <i className="fa-solid fa-pen icon-spacing"></i>Edit
                    </button>
                  </div>
                )}
                {user?.displayName && (
                  <button
                    onClick={() => {
                      toggleReply();
                      setReplyIndex(index);
                      setCaptureId(message.id);
                    }}
                    className="btn-with-icon reply-btn reply-btn-desktop">
                    <i className="fa-solid fa-reply icon-spacing"></i>
                    Reply
                  </button>
                )}
              </div>
            </div>
            <div className="comment-contents-message">
              <p>{highlightUsers(message.message)}</p>
            </div>
            {/* Mobile specific buttons */}
            <div className="card-btns-mobile">
              <div className="comment-likes comment-likes-mobile">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newCount = count + 1;
                    setCount(newCount);
                    updateLikes(message, newCount);
                  }}>
                  <i className="fa-solid fa-plus"></i>
                </button>
                <p>{message.likes}</p>
                <button
                  onClick={(e) => {
                    if (count === 0) return;
                    e.preventDefault();
                    const newCount = count - 1;
                    setCount(newCount);
                    updateLikes(message, newCount);
                  }}>
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
              <div className="mobile-user-buttons">
                {user?.displayName === message.username && (
                  <div>
                    <button
                      onClick={() => deleteComment(message.id)}
                      className="delete-btn btn-with-icon">
                      <i className="fa-solid fa-trash icon-spacing"></i>
                    </button>
                    <button
                      onClick={() => {
                        toggleUpdateReply();
                        setReplyIndex(index);
                      }}
                      className="update-btn btn-with-icon">
                      <i className="fa-solid fa-pen icon-spacing"></i>
                    </button>
                  </div>
                )}
                {user?.displayName && (
                  <button
                    onClick={() => {
                      toggleReply();
                      setReplyIndex(index);
                      setCaptureId(message.id);
                    }}
                    className="btn-with-icon reply-btn">
                    <i className="fa-solid fa-reply icon-spacing"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {reply && index === replyIndex && (
          <WriteReply
            captureId={captureId}
            message={message}
            toggleReply={toggleReply}
          />
        )}
        {update && index === replyIndex && (
          <Update
            message={message}
            updateComment={updateComment}
            toggleUpdateReply={toggleUpdateReply}
          />
        )}
      </div>
      <Reply replies={message.replies} />
    </>
  );
}

export default Comment;
