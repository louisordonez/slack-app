import React from 'react';
import { Modal } from '@mantine/core';
import CreateChannelForm from '../Form/CreateChannelForm';

const CreateChannelModal = ({ opened, onCreateChannelModalShown }) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onCreateChannelModalShown(false)}
      title="Creat Channel"
    >
      <CreateChannelForm />
    </Modal>
  );
};

export default CreateChannelModal;
