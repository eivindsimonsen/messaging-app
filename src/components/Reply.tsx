import React from "react";
// @ts-ignore
import { UserAuth } from "../context/AuthContext.jsx";

type PassFunc = {
  replies: { likes: number; message: string; posted: string; profile_image: string; replies: any; username: string; test: string; subReply: any; subReplyIndex: any; postedDate: any; formattedDate: any; id: any }[];
};

function Reply(props: PassFunc) {
  const { replies } = props;
  const { user } = UserAuth();

  // Tagging users with @ will result in color change
  function highlightUsers(message: string) {
    const words = message.split(" ");
    const highlightedWords = words.map((word, index) => {
      if (word.startsWith("@")) {
        return (
          <span
            className="user-color"
            key={index}>
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
    return <React.Fragment>{highlightedWords}</React.Fragment>;
  }

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
                  <p>{highlightUsers(reply.message)}</p>
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
