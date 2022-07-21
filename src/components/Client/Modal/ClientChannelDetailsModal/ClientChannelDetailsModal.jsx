import React from 'react';
import { Modal, Text } from '@mantine/core';
import './ClientChannelDetailsModal.scss';

const ClientChannelDetailsModal = ({
  opened,
  messageHeaderName,
  channelDetails,
  onChannelDetailsModalShown,
}) => {
  const showChannelOwnerDetails = () => {
    if (channelDetails) {
      return (
        <>
          <Text>{channelDetails['owner_email']}</Text>
          <Text className="client-channel-details-label">Owner</Text>
        </>
      );
    }
  };

  const showChannelMembersDetails = () => {
    if (channelDetails) {
      return (
        <>
          <Text>Members</Text>
          <div className="client-channel-details-members-container">
            {channelDetails['channel_members'].map((member, key) => {
              return <Text key={key}>{member.label}</Text>;
            })}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => onChannelDetailsModalShown(false)}
        title={`${messageHeaderName}`}
      >
        {showChannelOwnerDetails()}
        {showChannelMembersDetails()}
      </Modal>
    </>
  );
};

export default ClientChannelDetailsModal;
