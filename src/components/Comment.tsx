import React, { useState } from "react";
import image from "../assets/image-amyrobson.png";
import WriteReply from "./WriteReply";
import Reply from "./Reply";

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
};

function Comment(props: PassFunc) {
  const { toggleReply, message, reply, index, replyIndex, setReplyIndex } = props;
  const [captureId, setCaptureId] = useState(null);

  return (
    <>
      <div>
        <div className="comment">
          <div className="comment-likes comment-likes-desktop">
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
            <p>{message.likes}</p>
            <button>
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          <div className="comment-contents">
            <div className="comment-contents-details">
              <div>
                <img
                  src={image}
                  alt=""
                />
                <p className="username">{message.username}</p>
                <p className="active-since">{message.postedDate}</p>
              </div>
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
            </div>
            <div className="comment-contents-message">
              <p>{message.message}</p>
            </div>
            {/* Mobile specific buttons */}
            <div className="card-btns-mobile">
              <div className="comment-likes comment-likes-mobile">
                <button>
                  <i className="fa-solid fa-plus"></i>
                </button>
                <p>{message.likes}</p>
                <button>
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
              <button className="btn-with-icon reply-btn">
                <i className="fa-solid fa-reply icon-spacing"></i>
                Reply
              </button>
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
      </div>
      <Reply replies={message.replies} />
    </>
  );
}

export default Comment;
