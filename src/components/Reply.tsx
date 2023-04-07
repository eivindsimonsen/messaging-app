import image from "../assets/image-maxblagun.png";

type PassFunc = {
  replies: { likes: number; message: string; posted: string; profile_image: string; replies: any; username: string; test: string; subReply: any; subReplyIndex: any }[];
};

function Reply(props: PassFunc) {
  const { replies } = props;

  return (
    <>
      {replies.map((replies, index) => (
        <div key={index}>
          <div className="reply-spacing">
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
                    <p className="username">{replies.username}</p>
                    <p className="active-since">{replies.posted}</p>
                  </div>
                </div>
                <div className="comment-contents-message">
                  <p>{replies.message}</p>
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
        </div>
      ))}
    </>
  );
}

export default Reply;
