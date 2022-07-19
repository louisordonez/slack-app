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
  const [channels, setChannels] = useState([]);
  const [messageHeaderName, setMessageHeaderName] = useState('');
  const [isChannelDetailsShown, setIsChannelDetailsShown] = useState(false);
  const [isSendDirectMessageModalShown, setIsSendDirectMessageModalShown] =
    useState(false);
  const [messages, setMessages] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);

  useEffect(() => {
    handleShowChannels();
    getEmailList().then((result) => setEmailList(result));
  }, [messages]);

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

  const handleSelected = (name) => {
    setMessageHeaderName(name);
  };

  const handleSelectedId = (id) => {
    onIsLoadingVisible(true);

    if (id.length !== 0) {
      const emailObj = emailList.find((user) => user.value === id[0]);

      setSelectedId(id[0]);
      setMessageHeaderName(emailObj.label);
      handleShowDirectMessages(id[0]);
    } else {
      setSelectedId(null);
      setMessageHeaderName('');
      setMessages([]);
    }

    onIsLoadingVisible(false);
  };

  const handleSendDirectMessageModal = () =>
    setIsSendDirectMessageModalShown((state) => !state);

  const handleShowDirectMessages = (id) => {
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
      `${DIRECT_MESSAGES_ENDPOINT}?receiver_id=${id}&receiver_class=User`,
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
            onSelected={handleSelected}
            channels={channels}
            onSelectedId={handleSelectedId}
          />
        }
        header={<ClientHeader opened={opened} onOpened={handleOpened} />}
      >
        <ClientMessage
          messageHeaderName={messageHeaderName}
          onChannelDetailsModalShown={handleChannelDetailsModal}
          messages={messages}
          selectedId={selectedId}
          onSendDirectMessage={handleSendDirectMessage}
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
