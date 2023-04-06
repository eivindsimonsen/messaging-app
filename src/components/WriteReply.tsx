import image from "../assets/image-maxblagun.png";

type PassFunc = {
  isReply?: boolean;
  reply?: boolean;
};

function WriteReply(props: PassFunc) {
  const { isReply } = props;

  return (
    <>
      <div className={isReply ? "reply-spacing" : ""}>
        {isReply ? <hr /> : null}
        <form className="reply">
          <img
            src={image}
            alt=""
          />
          <textarea
            name="reply"
            rows={4}
            placeholder="Replying to username.."></textarea>
          <button className="cta">REPLY</button>
        </form>
      </div>
    </>
  );
}

export default WriteReply;
