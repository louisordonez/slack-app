import React from 'react';
import { Modal } from '@mantine/core';
import ClientSendDirectMessageForm from '../Form/ClientSendDirectMessageForm';

const ClientSendDirectMessageModal = ({
  opened,
  onSendDirectMessageModalShown,
  onSendDirectMessage,
}) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onSendDirectMessageModalShown(false)}
      title="Send Direct Message"
    >
      <ClientSendDirectMessageForm
        opened={opened}
        onSendDirectMessage={onSendDirectMessage}
        onSendDirectMessageModalShown={onSendDirectMessageModalShown}
      />
    </Modal>
  );
};

export default ClientSendDirectMessageModal;
