// @ts-nocheck
import Modal from "react-bootstrap/Modal";

function ModalDelete(props) {
  const { deleteComment, message } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Delete comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="modal-btn-cancel"
          onClick={props.onHide}>
          NO, CANCEL
        </button>
        <button
          className="modal-btn-delete"
          onClick={() => {
            deleteComment(message.id);
            props.onHide();
          }}>
          YES, DELETE
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
