import React from 'react';
import { Modal } from '@mantine/core';

const ClientChannelDetails = ({
  opened,
  messageHeaderName,
  onChannelDetailsModalShown,
}) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onChannelDetailsModalShown(false)}
      title={`${messageHeaderName}`}
    ></Modal>
  );
};

export default ClientChannelDetails;
