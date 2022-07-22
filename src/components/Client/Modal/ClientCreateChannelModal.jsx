import React from 'react';
import { Modal } from '@mantine/core';
import ClientCreateChannelForm from '../Form/ClientCreateChannelForm';

const ClientCreateChannelModal = ({
  opened,
  emailList,
  onCreateChannelModalShown,
  onCreateChannel,
}) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onCreateChannelModalShown(false)}
      title="Create Channel"
    >
      <ClientCreateChannelForm
        opened={opened}
        emailList={emailList}
        onCreateChannel={onCreateChannel}
      />
    </Modal>
  );
};

export default ClientCreateChannelModal;
