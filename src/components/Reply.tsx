import { useState } from "react";
// @ts-ignore
import { UserAuth } from "../context/AuthContext.jsx";
import { db } from "../firebase.js";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

type PassFunc = {
  replies: { likes: number; message: string; posted: string; profile_image: string; replies: any; username: string; test: string; subReply: any; subReplyIndex: any; postedDate: any; formattedDate: any; id: any }[];
};

function Reply(props: PassFunc) {
  const { replies } = props;
  const { user } = UserAuth();

  return (
    <>
      {replies.map((reply, index) => (
        <div key={index}>
          <div className="reply-spacing">
            <hr />
            <div className="comment reply-comment">
              <div className="comment-contents">
                <div className="comment-contents-details">
                  <div className="user-info-spacing">
                    <img
                      src={reply.profile_image}
                      alt=""
                      className="profile-img"
                    />
                    <p className="username">{reply.username}</p>
                    {user?.displayName === reply.username && <div className="identifier">you</div>}
                  </div>
                </div>
                <div className="comment-contents-message">
                  <p>{reply.message}</p>
                </div>
                {/* Mobile specific buttons */}
                <div className="card-btns-mobile">
                  <div className="comment-likes comment-likes-mobile">
                    <button>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <p>{reply.likes}</p>
                    <button>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
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
