import React from 'react';

import Button from '../../FormElement/Button';
import Modal from '../Modal/Modal';

const ErrorModal = (props) => {
  // !! means not empty
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
