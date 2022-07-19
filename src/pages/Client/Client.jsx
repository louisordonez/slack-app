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
  MESSAGES_ENDPOINT,
} from '../../services/constants/SlackAvionApiUrl';
import { getLocalStorageItem } from '../../services/utils/LocalStorage';
import { axiosGetCall, axiosPostCall } from '../../services/utils/AxiosApiCall';
import { showSuccessToast, showErrorToast } from '../../components/Toast/Toast';
import { getEmailList } from '../../services/utils/EmailList';

const Client = ({ onUserLogOut, onIsLoadingVisible }) => {
  if (getLocalStorageItem('userHeaders') === null) {
    window.location.assign('/');
  }

  const userHeaders = getLocalStorageItem('userHeaders')[0];

  const [opened, setOpened] = useState(false);
  const [isCreateChannelModalShown, setIsCreateChannelModalShown] =
    useState(false);
  const [isChannelDetailsShown, setIsChannelDetailsShown] = useState(false);
  const [isSendDirectMessageModalShown, setIsSendDirectMessageModalShown] =
    useState(false);
  const [emailList, setEmailList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [messageHeaderName, setMessageHeaderName] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);
  const [receiverClass, setReceiverClass] = useState('');

  useEffect(() => {
    handleShowChannels();
    getEmailList().then((result) => setEmailList(result));
  }, [messages]);

  const handleOpened = () => setOpened((state) => !state);

  const handleSendDirectMessageModal = () =>
    setIsSendDirectMessageModalShown((state) => !state);

  const handleSendMessage = (object) => {
    const onSendMessageSuccess = (response) => {
      onIsLoadingVisible(false);

      if (response.data.errors !== undefined) {
        const errorMessage = response.data.errors;

        errorMessage.map((message) => showErrorToast(message));

        return false;
      }

      showSuccessToast(`Message successfully sent`);
    };

    const onSendMessageError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);

      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosPostCall(
      MESSAGES_ENDPOINT,
      object,
      userHeaders,
      onSendMessageSuccess,
      onSendMessageError
    );
  };

  const handleShowMessages = (id, receiver) => {
    const onShowDirectMessagesSuccess = (response) => {
      const createDirectMessagesList = (list) => {
        let newDirectMessagesArray = [];

        list.map((object) => {
          const date = new Date(object.created_at);
          const dateMonth =
            date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
          const dateDay =
            date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
          const dateYear = date.getFullYear();
          const fullDate = `${dateMonth}-${dateDay}-${dateYear}`;
          const time = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const messageObj = {
            'sender-id': object.sender.id,
            'sender-email': object.sender.email,
            'receiver-id': object.receiver.id,
            'receiver-email': object.receiver.email,
            body: object.body,
            timestamp: `${fullDate} ${time}`,
          };

          return newDirectMessagesArray.push(messageObj);
        });

        return newDirectMessagesArray;
      };

      setMessages(createDirectMessagesList(response.data.data));
      onIsLoadingVisible(false);
    };

    const onShowDirectMessagesError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);
      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosGetCall(
      `${MESSAGES_ENDPOINT}?receiver_id=${id}&receiver_class=${receiver}`,
      userHeaders,
      onShowDirectMessagesSuccess,
      onShowDirectMessagesError
    );
  };

  const handleSelectedUser = (id) => {
    onIsLoadingVisible(true);

    if (id.length !== 0) {
      const emailObj = emailList.find((user) => user.value === id[0]);

      setSelectedId(id[0]);
      setReceiverClass('User');
      setMessageHeaderName(emailObj.label);
      handleShowMessages(id[0], 'User');
    } else {
      setSelectedId(null);
      setReceiverClass('');
      setMessageHeaderName('');
      setMessages([]);
    }

    onIsLoadingVisible(false);
  };

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
    if (receiverClass === 'User') {
      showErrorToast(`Clear selected user first`);
    } else {
      setSelectedId(channelId);
      setMessageHeaderName(channelName);
      setReceiverClass('Channel');
      handleShowMessages(channelId, 'Channel');
    }
  };

  const handleChannelDetailsModal = () => {
    if (receiverClass === 'Channel') {
      setIsChannelDetailsShown((state) => !state);
    }
  };

  return (
    <>
      <AppShell
        className="client-container"
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <ClientNavbar
            hidden={opened}
            channels={channels}
            onUserLogOut={onUserLogOut}
            onCreateChannelModalShown={handleCreateChannelModal}
            onSendDirectMessageModalShown={handleSendDirectMessageModal}
            onIsLoadingVisible={onIsLoadingVisible}
            onSelectedUser={handleSelectedUser}
            onSelectedChannel={handleSelectedChannel}
          />
        }
        header={<ClientHeader opened={opened} onOpened={handleOpened} />}
      >
        <ClientMessage
          messageHeaderName={messageHeaderName}
          selectedId={selectedId}
          receiverClass={receiverClass}
          messages={messages}
          onChannelDetailsModalShown={handleChannelDetailsModal}
          onSendMessage={handleSendMessage}
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
        onSendMessage={handleSendMessage}
      />
      <ClientChannelDetails
        opened={isChannelDetailsShown}
        messageHeaderName={messageHeaderName}
        onChannelDetailsModalShown={handleChannelDetailsModal}
      />
    </>
  );
};

export default Client;
