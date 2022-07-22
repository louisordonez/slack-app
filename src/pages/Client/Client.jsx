import React, { useEffect, useState } from 'react';
import { AppShell } from '@mantine/core';
import ClientNavbar from '../../components/Client/Navbar/ClientNavbar';
import ClientHeader from '../../components/Client/Header/ClientHeader';
import ClientMessage from '../../components/Client/Message/ClientMessage';
import ClientCreateChannelModal from '../../components/Client/Modal/ClientCreateChannelModal';
import ClientChannelDetailsModal from '../../components/Client/Modal/ClientChannelDetailsModal';
import {
  CHANNELS_ENDPOINT,
  ADD_MEMBER_ENDPOINT,
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
  const [isChannelDetailsModalShown, setIsChannelDetailsModalShown] =
    useState(false);
  const [emailList, setEmailList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [messageHeaderName, setMessageHeaderName] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);
  const [receiverClass, setReceiverClass] = useState('');
  const [channelDetails, setChannelDetails] = useState([]);

  useEffect(() => {
    getEmailList().then((result) => setEmailList(result));

    const interval = setInterval(() => {
      handleShowMessages(selectedId, receiverClass);
      handleShowChannels();
    }, 1000);

    return () => clearInterval(interval);
  }, [messages]);

  const handleOpened = () => setOpened((state) => !state);

  const handleSendChatMessage = (object) => {
    const onSendChatMessageSuccess = (response) => {
      if (response.data.errors !== undefined) {
        const errorMessage = response.data.errors;

        errorMessage.map((message) => showErrorToast(message));

        return false;
      }

      handleShowMessages(selectedId, receiverClass);
    };

    const onSendChatMessageError = (error) => {
      const errorMessage = error.response.data.errors;

      errorMessage.map((message) => showErrorToast(message));
    };

    axiosPostCall(
      MESSAGES_ENDPOINT,
      object,
      userHeaders,
      onSendChatMessageSuccess,
      onSendChatMessageError
    );
  };

  const handleShowMessages = (id, receiver) => {
    const onShowMessagesSuccess = (response) => {
      const createMessagesList = (list) => {
        let newMessagesArray = [];

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
            date: fullDate,
            time: time,
          };

          return newMessagesArray.push(messageObj);
        });

        return newMessagesArray;
      };

      setMessages(createMessagesList(response.data.data));
    };

    const onShowMessagesError = (error) => {
      return false;
    };

    axiosGetCall(
      `${MESSAGES_ENDPOINT}?receiver_id=${id}&receiver_class=${receiver}`,
      userHeaders,
      onShowMessagesSuccess,
      onShowMessagesError
    );
  };

  const handleSelectedUser = (id) => {
    if (id.length !== 0) {
      const emailObj = emailList.find((user) => user.value === id[0]);

      setSelectedId(id[0]);
      setReceiverClass('User');
      setMessageHeaderName(emailObj.label);
      handleShowMessages(id[0], 'User');
    } else {
      setMessages([]);
      setSelectedId(null);
      setReceiverClass('');
      setMessageHeaderName('');
    }
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
      setChannels(response.data.data);
    };

    const onShowChannelsError = (error) => {
      return false;
    };

    axiosGetCall(
      CHANNELS_ENDPOINT,
      userHeaders,
      onShowChannelsSuccess,
      onShowChannelsError
    );
  };

  const handleSelectedChannel = (channelId, channelName) => {
    setSelectedId(channelId);
    setMessageHeaderName(channelName);
    setReceiverClass('Channel');
    handleShowMessages(channelId, 'Channel');
  };

  const handleChannelDetails = () => {
    onIsLoadingVisible(true);

    const onChannelDetailsSuccess = (response) => {
      let channelDetailsResponse = response.data.data;
      let newChannelMembers = [];

      getEmailList().then((result) => {
        channelDetailsResponse['owner_email'] = result.find(
          (user) => user.value === channelDetailsResponse['owner_id']
        ).label;

        channelDetailsResponse['channel_members'].map((member) => {
          const findMember = result.find(
            (user) => user.value === member['user_id']
          );

          return newChannelMembers.push(findMember);
        });

        channelDetailsResponse['channel_members'] = newChannelMembers;

        setChannelDetails(channelDetailsResponse);
        onIsLoadingVisible(false);
      });
    };

    const onChannelDetailsError = (error) => {
      onIsLoadingVisible(false);
    };

    axiosGetCall(
      `${CHANNELS_ENDPOINT}${selectedId}`,
      userHeaders,
      onChannelDetailsSuccess,
      onChannelDetailsError
    );
  };

  const handleChannelDetailsModalShown = () => {
    if (receiverClass === 'Channel') {
      if (isChannelDetailsModalShown === true) {
        setIsChannelDetailsModalShown((state) => !state);
      } else {
        handleChannelDetails();
        setIsChannelDetailsModalShown((state) => !state);
      }
    }
  };

  const handleAddChannelMember = (object) => {
    const onAddChannelSuccess = (response) => {
      onIsLoadingVisible(false);

      if (response.data.errors !== undefined) {
        const errorMessage = response.data.errors;

        showErrorToast(errorMessage);

        return false;
      }

      handleChannelDetails();
      showSuccessToast(`User successfully added`);
    };

    const onAddChannelError = (error) => {
      return false;
    };

    onIsLoadingVisible(true);

    axiosPostCall(
      ADD_MEMBER_ENDPOINT,
      object,
      userHeaders,
      onAddChannelSuccess,
      onAddChannelError
    );
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
            receiverClass={receiverClass}
            onUserLogOut={onUserLogOut}
            onCreateChannelModalShown={handleCreateChannelModal}
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
          onSendChatMessage={handleSendChatMessage}
          onChannelDetailsModalShown={handleChannelDetailsModalShown}
        />
      </AppShell>
      <ClientCreateChannelModal
        opened={isCreateChannelModalShown}
        onCreateChannelModalShown={handleCreateChannelModal}
        onCreateChannel={handleCreateChannel}
      />
      <ClientChannelDetailsModal
        opened={isChannelDetailsModalShown}
        selectedId={selectedId}
        messageHeaderName={messageHeaderName}
        channelDetails={channelDetails}
        onChannelDetailsModalShown={handleChannelDetailsModalShown}
        onAddChannelMember={handleAddChannelMember}
      />
    </>
  );
};

export default Client;
