import image from "../assets/image-maxblagun.png";

function WriteComment() {
  return (
    <form className="write-comment">
      <img
        src={image}
        alt=""
      />
      <textarea
        name="reply"
        rows={4}
        placeholder="Replying to username.."></textarea>
      <button className="cta">SEND</button>
    </form>
  );
}

export default WriteComment;
