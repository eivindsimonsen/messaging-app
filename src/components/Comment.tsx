import image from "../assets/image-amyrobson.png";
import Reply from "./Reply";

type PassFunc = {
  toggleReply?: any;
  isReply?: boolean;
  reply?: boolean;
  message: {
    message: string;
    replies: any;
  };
  index: number | undefined;
  replyIndex: any;
  setReplyIndex: any;
};

function Comment(props: PassFunc) {
  const { toggleReply, isReply, message, reply, index, replyIndex, setReplyIndex } = props;

  return (
    <>
      <div className={isReply ? "reply-spacing" : ""}>
        {isReply ? <hr /> : null}
        <div className="comment">
          <div className="comment-likes comment-likes-desktop">
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
            <p>12</p>
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
                <p className="username">username</p>
                <p className="active-since">1 Month ago</p>
              </div>
              <button
                onClick={() => {
                  toggleReply();
                  setReplyIndex(index);
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
                <p>12</p>
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
        {reply && index === replyIndex && <Reply />}
      </div>
      <p>{message.replies}</p>
    </>
  );
}

export default Comment;
