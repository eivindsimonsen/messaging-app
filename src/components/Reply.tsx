import image from "../assets/image-maxblagun.png";

function Reply() {
  return (
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
  );
}

export default Reply;
