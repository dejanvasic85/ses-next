import React from 'react';
import ReactModal from 'react-modal';

import { Icon } from './Icon/Icon';

ReactModal.setAppElement('#__next');

export function Modal({ children, isOpen, onClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName="modal modal-open modal-bottom sm:modal-middle"
      className="modal-box"
      onRequestClose={onClose}
    >
      <button className="btn btn-ghost absolute top-2 right-2" onClick={onClose}>
        <Icon name="x" />
      </button>
      {children}
    </ReactModal>
  );
}
