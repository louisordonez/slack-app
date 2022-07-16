import React from 'react';
import { Modal } from '@mantine/core';
import ClientCreateChannelForm from '../Form/ClientCreateChannelForm';

const ClientCreateChannelModal = ({ opened, onCreateChannelModalShown }) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onCreateChannelModalShown(false)}
      title="Creat Channel"
    >
      <ClientCreateChannelForm />
    </Modal>
  );
};

export default ClientCreateChannelModal;
