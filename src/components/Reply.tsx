import image from "../assets/image-maxblagun.png";
import WriteReply from "./WriteReply";
import { useState } from "react";

type PassFunc = {
  message: { likes: number; message: string; posted: string; profile_image: string; replies: any; username: string; test: string; subReply: any; subReplyIndex: any }[];
};

function Reply(props: PassFunc) {
  const [subReply, setSubReply] = useState<any>(false);
  const [subReplyIndex, setSubReplyIndex] = useState<any>(null);
  const { message } = props;

  const toggleSubReply = (index: any) => {
    setSubReply(!subReply);
    setSubReplyIndex(index);
  };

  return (
    <>
      {message.map((replies, index) => (
        <>
          <div
            key={index}
            className="reply-spacing">
            <hr />
            <div className="comment reply-comment">
              <div className="comment-likes comment-likes-desktop">
                <button>
                  <i className="fa-solid fa-plus"></i>
                </button>
                <p>{replies.likes}</p>
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
                    <p className="username">{replies.test}</p>
                    <p className="active-since">{replies.test}</p>
                  </div>
                  <button
                    onClick={() => {
                      toggleSubReply(index);
                    }}
                    className="btn-with-icon reply-btn reply-btn-desktop">
                    <i className="fa-solid fa-reply icon-spacing"></i>
                    Reply
                  </button>
                </div>
                <div className="comment-contents-message">
                  <p>{replies.test}</p>
                </div>
                {/* Mobile specific buttons */}
                <div className="card-btns-mobile">
                  <div className="comment-likes comment-likes-mobile">
                    <button>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <p>{replies.likes}</p>
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
          </div>
          {subReply && index === subReplyIndex && <WriteReply />}
        </>
      ))}
    </>
  );
}

export default Reply;
