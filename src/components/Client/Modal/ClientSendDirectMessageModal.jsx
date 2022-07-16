import React from 'react';
import { Modal } from '@mantine/core';
import ClientSendDirectMessageForm from '../Form/ClientSendDirectMessageForm';

const ClientSendDirectMessageModal = ({
  opened,
  onSendDirectMessageModalShown,
}) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onSendDirectMessageModalShown(false)}
      title="Send Direct Message"
    >
      <ClientSendDirectMessageForm />
    </Modal>
  );
};

export default ClientSendDirectMessageModal;
