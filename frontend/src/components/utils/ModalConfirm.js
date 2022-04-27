import {Modal, Button} from 'react-bootstrap';

export default function ModalConfirm(props) 
{
  return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You want delete the record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={ props.handleDelete }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
