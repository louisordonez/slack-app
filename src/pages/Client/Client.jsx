import React, { useEffect, useState } from 'react';
import { AppShell } from '@mantine/core';
import './Client.scss';
import ClientNavbar from '../../components/Client/Navbar/ClientNavbar';
import ClientHeader from '../../components/Client/Header/ClientHeader';
import ClientMessage from '../../components/Client/Message/ClientMessage';
import ClientCreateChannelModal from '../../components/Client/Modal/ClientCreateChannelModal';
import ClientSendDirectMessageModal from '../../components/Client/Modal/ClientSendDirectMessageModal';
import ClientChannelDetails from '../../components/Client/Modal/ClientChannelDetails';
import {
  CHANNELS_ENDPOINT,
  DIRECT_MESSAGES_ENDPOINT,
} from '../../services/constants/SlackAvionApiUrl';
import { getLocalStorageItem } from '../../services/utils/LocalStorage'; // eslint-disable-next-line
import { axiosGetCall, axiosPostCall } from '../../services/utils/AxiosApiCall';
import { showSuccessToast, showErrorToast } from '../../components/Toast/Toast';

const Client = ({ onUserLogOut, onIsLoadingVisible }) => {
  if (getLocalStorageItem('userHeaders') === null) {
    window.location.assign('/');
  }

  const userHeaders = getLocalStorageItem('userHeaders')[0];

  const [opened, setOpened] = useState(false);
  const [isCreateChannelModalShown, setIsCreateChannelModalShown] =
    useState(false);
  const [channels, setChannels] = useState([]); // eslint-disable-next-line
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [messageHeaderName, setMessageHeaderName] = useState('');
  const [isChannelDetailsShown, setIsChannelDetailsShown] = useState(false);
  const [isSendDirectMessageModalShown, setIsSendDirectMessageModalShown] =
    useState(false);

  useEffect(() => {
    handleShowChannels();
    // eslint-disable-next-line
  }, []);

  const handleOpened = () => setOpened((state) => !state);

  const handleCreateChannelModal = () =>
    setIsCreateChannelModalShown((state) => !state);

  const handleCreateChannel = (object) => {
    const onCreateChannelSuccess = (response) => {
      onIsLoadingVisible(false);

      if (response.data.errors !== undefined) {
        const errorMessage = response.data.errors;

        errorMessage.map((message) => showErrorToast(message));

        return false;
      }

      showSuccessToast(`Channel successfully created`);
      handleShowChannels();
      handleCreateChannelModal();
    };

    const onCreateChannelError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);

      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosPostCall(
      CHANNELS_ENDPOINT,
      object,
      userHeaders,
      onCreateChannelSuccess,
      onCreateChannelError
    );
  };

  const handleShowChannels = () => {
    const onShowChannelsSuccess = (response) => {
      onIsLoadingVisible(false);
      setChannels(response.data.data);
    };

    const onShowChannelsError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);
      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosGetCall(
      CHANNELS_ENDPOINT,
      userHeaders,
      onShowChannelsSuccess,
      onShowChannelsError
    );
  };

  const handleSelectedChannel = (channelId, channelName) => {
    setSelectedChannelId(channelId);
    setMessageHeaderName(channelName);
  };

  const handleSendDirectMessageModal = () =>
    setIsSendDirectMessageModalShown((state) => !state);
  // eslint-disable-next-line
  const handleShowDirectMessages = () => {
    const onShowDirectMessagesSuccess = (response) => {
      onIsLoadingVisible(false);
      // setChannels(response.data.data);
    };

    const onShowDirectMessagesError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);
      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosGetCall(
      // `${DIRECT_MESSAGES_ENDPOINT}?receiver_id=2361&receiver_class=User`,
      userHeaders,
      onShowDirectMessagesSuccess,
      onShowDirectMessagesError
    );
  };

  const handleSendDirectMessage = (object) => {
    const onSendDirectMessageSuccess = (response) => {
      onIsLoadingVisible(false);

      if (response.data.errors !== undefined) {
        const errorMessage = response.data.errors;

        errorMessage.map((message) => showErrorToast(message));

        return false;
      }

      showSuccessToast(`Direct Message successfully sent`);
      // handleShowDirectMessages();
      handleSendDirectMessageModal();
    };

    const onSendDirectMessageError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);

      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosPostCall(
      DIRECT_MESSAGES_ENDPOINT,
      object,
      userHeaders,
      onSendDirectMessageSuccess,
      onSendDirectMessageError
    );
  };

  const handleChannelDetailsModal = () =>
    setIsChannelDetailsShown((state) => !state);

  return (
    <>
      <AppShell
        className="client-container"
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <ClientNavbar
            hidden={opened}
            onUserLogOut={onUserLogOut}
            onCreateChannelModalShown={handleCreateChannelModal}
            onSendDirectMessageModalShown={handleSendDirectMessageModal}
            onIsLoadingVisible={onIsLoadingVisible}
            channels={channels}
            onSelectedChannel={handleSelectedChannel}
          />
        }
        header={<ClientHeader opened={opened} onOpened={handleOpened} />}
      >
        <ClientMessage
          messageHeaderName={messageHeaderName}
          onChannelDetailsModalShown={handleChannelDetailsModal}
        />
      </AppShell>
      <ClientCreateChannelModal
        opened={isCreateChannelModalShown}
        onCreateChannelModalShown={handleCreateChannelModal}
        onCreateChannel={handleCreateChannel}
      />
      <ClientSendDirectMessageModal
        opened={isSendDirectMessageModalShown}
        onSendDirectMessageModalShown={handleSendDirectMessageModal}
        onSendDirectMessage={handleSendDirectMessage}
      />
      <ClientChannelDetails
        opened={isChannelDetailsShown}
        onChannelDetailsModalShown={handleChannelDetailsModal}
        messageHeaderName={messageHeaderName}
      />
    </>
  );
};

export default Client;
