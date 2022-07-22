import React, { useEffect, useState } from 'react';
import { AppShell } from '@mantine/core';
import ClientNavbar from '../../components/Navbar/Client/ClientNavbar';
import ClientHeader from '../../components/Header/Client/ClientHeader';
import ClientSearchUserModal from '../../components/Modal/Client/ClientSearchUserModal';
import ClientMessage from '../../components/Message/ClientMessage';
import ClientCreateChannelModal from '../../components/Modal/Client/ClientCreateChannelModal';
import ClientChannelDetailsModal from '../../components/Modal/Client/ClientChannelDetailsModal';
import {
  CHANNELS_ENDPOINT,
  ADD_MEMBER_ENDPOINT,
  MESSAGES_ENDPOINT,
} from '../../services/constants/SlackAvionApiUrl';
import { getLocalStorageItem } from '../../services/utils/LocalStorage';
import { axiosGetCall, axiosPostCall } from '../../services/utils/AxiosApiCall';
import { showSuccessToast, showErrorToast } from '../../components/Toast/Toast';
import { getEmailList } from '../../services/utils/EmailList';
import { convertDatetime } from '../../services/utils/DatetimeFormat';

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
  const [isSearchUserModalShown, setIsSearchUserModalShown] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [messageHeaderName, setMessageHeaderName] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);
  const [receiverClass, setReceiverClass] = useState('');
  const [channelDetails, setChannelDetails] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getEmailList().then((result) => setEmailList(result));
      handleShowChannels();
      handleShowMessages(selectedId, receiverClass);
      handleChannelDetails();
    }, 1000);

    return () => clearInterval(interval);
  }, [emailList, channels, messages, channelDetails]);

  const handleSearchUserModal = () =>
    setIsSearchUserModalShown((state) => !state);

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
          const { date, time } = convertDatetime(object.created_at);
          const messageObj = {
            'sender-id': object.sender.id,
            'sender-email': object.sender.email,
            body: object.body,
            date,
            time,
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

      handleShowMessages(null, 'User');
      setSelectedId(id[0]);
      setReceiverClass('User');
      setMessageHeaderName(emailObj.label);
      setMessages([]);
      handleShowMessages(id[0], 'User');
      setOpened(false);
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

      handleShowChannels();
      handleCreateChannelModal();
      showSuccessToast(`Channel successfully created`);
      setOpened(false);
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
    setMessages([]);
    handleShowMessages(channelId, 'Channel');
    setOpened(false);
  };

  const handleChannelDetailsModalShown = () => {
    if (receiverClass === 'Channel') {
      setChannelDetails([]);
      setIsChannelDetailsModalShown((state) => !state);
    }
  };

  const handleChannelDetails = () => {
    if (receiverClass === 'Channel') {
      const onChannelDetailsSuccess = (response) => {
        let channelDetailsResponse = response.data.data;
        let newChannelMembers = [];

        channelDetailsResponse['owner_email'] = emailList.find(
          (user) => user.value === channelDetailsResponse['owner_id']
        ).label;

        channelDetailsResponse['channel_members'].map((member) => {
          const findMember = emailList.find(
            (user) => user.value === member['user_id']
          );

          return newChannelMembers.push(findMember);
        });

        channelDetailsResponse['channel_members'] = newChannelMembers.reverse();

        setChannelDetails(channelDetailsResponse);
      };

      const onChannelDetailsError = (error) => {
        return false;
      };

      axiosGetCall(
        `${CHANNELS_ENDPOINT}${selectedId}`,
        userHeaders,
        onChannelDetailsSuccess,
        onChannelDetailsError
      );
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
            onIsLoadingVisible={onIsLoadingVisible}
            onUserLogOut={onUserLogOut}
            onSelectedChannel={handleSelectedChannel}
            onSearchUserModalShown={handleSearchUserModal}
            onCreateChannelModalShown={handleCreateChannelModal}
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
      <ClientSearchUserModal
        opened={isSearchUserModalShown}
        emailList={emailList}
        receiverClass={receiverClass}
        onSelectedUser={handleSelectedUser}
        onSearchUserModalShown={handleSearchUserModal}
      />

      <ClientCreateChannelModal
        opened={isCreateChannelModalShown}
        emailList={emailList}
        onCreateChannelModalShown={handleCreateChannelModal}
        onCreateChannel={handleCreateChannel}
      />
      <ClientChannelDetailsModal
        opened={isChannelDetailsModalShown}
        selectedId={selectedId}
        messageHeaderName={messageHeaderName}
        emailList={emailList}
        channelDetails={channelDetails}
        onChannelDetailsModalShown={handleChannelDetailsModalShown}
        onAddChannelMember={handleAddChannelMember}
      />
    </>
  );
};

export default Client;
