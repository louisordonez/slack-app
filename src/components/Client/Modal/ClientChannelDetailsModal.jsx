import React, { useRef, useEffect, useState } from 'react';
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
  const [details, setDetails] = useState([]);

  const bottomDiv = useRef(null);

  useEffect(() => {
    setDetails(channelDetails);

    if (bottomDiv.current !== null) {
      bottomDiv.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [channelDetails]);

  const showChannelOwnerDetails = () => {
    if (details.length !== 0) {
      return (
        <>
          <Text>{details['owner_email']}</Text>
          <Text className="client-channel-details-label">Owner</Text>
        </>
      );
    }
  };

  const showChannelMembersDetails = () => {
    if (details.length !== 0) {
      return (
        <>
          <Text style={{ marginTop: '1.4rem' }}>Members</Text>
          <div className="client-channel-details-members-container">
            {details['channel_members'].map((member, key) => {
              return <Text key={key}>{member.label}</Text>;
            })}
            <div ref={bottomDiv}></div>
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
        onClose={() => {
          onChannelDetailsModalShown(false);
          setDetails([]);
        }}
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
