import React from 'react';
import { Modal } from '@mantine/core';
import ClientCreateChannelForm from '../Form/ClientCreateChannelForm';

const ClientCreateChannelModal = ({
  opened,
  onCreateChannelModalShown,
  onCreateChannel,
}) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onCreateChannelModalShown(false)}
      title="Creat Channel"
    >
      <ClientCreateChannelForm
        opened={opened}
        onCreateChannel={onCreateChannel}
      />
    </Modal>
  );
};

export default ClientCreateChannelModal;
