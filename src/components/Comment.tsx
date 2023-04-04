import image from "../assets/image-amyrobson.png";

function Comment({ toggleReply, isReply }) {
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
                onClick={toggleReply}
                className="btn-with-icon reply-btn reply-btn-desktop">
                <i className="fa-solid fa-reply icon-spacing"></i>
                Reply
              </button>
            </div>
            <div className="comment-contents-message">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quia pariatur velit perferendis? Est deleniti quae sapiente maxime, corrupti eveniet qui? Fuga labore blanditiis aliquid.</p>
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
      </div>
    </>
  );
}

export default Comment;
