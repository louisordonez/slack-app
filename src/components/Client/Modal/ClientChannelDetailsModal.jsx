import React from 'react';
import { Modal, Text } from '@mantine/core';
import ClientAddChannelMemberForm from '../Form/ClientAddChannelMemberForm';

const ClientChannelDetailsModal = ({
  opened,
  selectedId,
  messageHeaderName,
  channelDetails,
  onChannelDetailsModalShown,
  onAddChannelMember,
}) => {
  const showChannelOwnerDetails = () => {
    if (channelDetails.length !== 0) {
      return (
        <>
          <Text>{channelDetails['owner_email']}</Text>
          <Text className="client-channel-details-label">Owner</Text>
        </>
      );
    }
  };

  const showChannelMembersDetails = () => {
    if (channelDetails.length !== 0) {
      return (
        <>
          <Text style={{ marginTop: '1.4rem' }}>Members</Text>
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
        <ClientAddChannelMemberForm
          selectedId={selectedId}
          onAddChannelMember={onAddChannelMember}
        />
        {showChannelMembersDetails()}
      </Modal>
    </>
  );
};

export default ClientChannelDetailsModal;
