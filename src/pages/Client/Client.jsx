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

const Client = ({ onUserLogOut, onIsLoadingVisible }) => {
  if (getLocalStorageItem('userHeaders') === null) {
    window.location.assign('/');
  }

  const userHeaders = getLocalStorageItem('userHeaders')[0];

  const [opened, setOpened] = useState(false);
  const [isCreateChannelModalShown, setIsCreateChannelModalShown] =
    useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messageHeaderName, setMessageHeaderName] = useState('');
  const [isChannelDetailsShown, setIsChannelDetailsShown] = useState(false);
  const [isSendDirectMessageModalShown, setIsSendDirectMessageModalShown] =
    useState(false);
  const [directMessages, setDirectMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    handleShowChannels();
    handleShowDirectMessages();
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

  const handleSelected = (id, name) => {
    setSelectedId(id);
    setMessageHeaderName(name);
  };

  const handleSendDirectMessageModal = () =>
    setIsSendDirectMessageModalShown((state) => !state);

  const handleShowDirectMessages = () => {
    const onShowDirectMessagesSuccess = (response) => {
      const createDirectMessagesList = (list) => {
        let newDirectMessagesListArray = [];

        list.forEach((object) => {
          const newMessagesListData = {
            id: object.receiver.id,
            email: object.receiver.email,
          };

          newDirectMessagesListArray.push(newMessagesListData);
        });

        const seen = new Set();

        const filteredDirectMessagesListArray =
          newDirectMessagesListArray.filter((el) => {
            const duplicate = seen.has(el.id);
            seen.add(el.id);
            return !duplicate;
          });

        return filteredDirectMessagesListArray;
      };

      // let date = new Date(response.data.data[0].created_at);
      // let dateMonth =
      //   date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
      // let dateDay = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
      // let dateYear = date.getFullYear();
      // let fullDate = `${dateMonth}-${dateDay}-${dateYear}`;
      // let currentRegularTime = date.toLocaleTimeString([], {
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });

      // const receiver = [
      //   {
      //     // 'sender-id': response.data.data[0].sender.id,
      //     // 'sender-email': response.data.data[0].sender.email,
      //     id: response.data.data[0].receiver.id,
      //     email: response.data.data[0].receiver.email,
      //     // body: response.data.data[0].body,
      //     // timestamp: `${fullDate} ${currentRegularTime}`,
      //   },
      // ];

      setDirectMessages(createDirectMessagesList(response.data.data));
      onIsLoadingVisible(false);

      // console.log(receiver);
      // setChannels(response.data.data);
    };

    const onShowDirectMessagesError = (error) => {
      const errorMessage = error.response.data.errors;

      onIsLoadingVisible(false);
      errorMessage.map((message) => showErrorToast(message));
    };

    onIsLoadingVisible(true);

    axiosGetCall(
      `${DIRECT_MESSAGES_ENDPOINT}?receiver_id=2361&receiver_class=User`,
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
      handleShowDirectMessages();
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
            onSelected={handleSelected}
            channels={channels}
            directMessages={directMessages}
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
