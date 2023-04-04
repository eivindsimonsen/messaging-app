function Comment() {
  return (
    <>
      <div className="comment">
        <div className="comment-likes">
          <button>+</button>
          <p>12</p>
          <button>-</button>
        </div>
        <div className="comment-contents">
          <div className="comment-contents-details">
            <div>
              <img
                src="../assets/image-amyrobson.png"
                alt=""
              />
              <p>Username</p>
              <p>1 Month ago</p>
            </div>
            <button>Reply</button>
          </div>
          <div className="comment-contents-message">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et officiis itaque, accusantium minus nemo enim illo impedit temporibus adipisci magnam! Qui, voluptate cupiditate sequi, neque, deserunt aperiam cum reiciendis eligendi odit mollitia debitis officiis voluptatibus aut facilis veritatis id! Itaque.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
