import React from 'react';
import { Modal } from '@mantine/core';
import ClientSendDirectMessageForm from '../Form/ClientSendDirectMessageForm';

const ClientSendDirectMessageModal = ({
  opened,
  onSendDirectMessageModalShown,
  onSendMessage,
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
        onSendDirectMessageModalShown={onSendDirectMessageModalShown}
        onSendMessage={onSendMessage}
      />
    </Modal>
  );
};

export default ClientSendDirectMessageModal;
