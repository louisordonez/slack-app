import React, { useState, useEffect } from 'react';
import { Text, Group, MultiSelect } from '@mantine/core';
import { User } from 'tabler-icons-react';

const ClientDirectMessagesNavbar = ({
  emailList,
  receiverClass,
  onSelectedUser,
}) => {
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    if (receiverClass === 'Channel') {
      setUserId([]);
    }
  }, [receiverClass]);

  const handleSelected = (e) => {
    setUserId(e);
    onSelectedUser(e);
  };

  return (
    <>
      <Text className="client-stack-direct-messages-header bold-font">
        <Group position="apart">Direct Messages</Group>
      </Text>
      <div className="client-stack-direct-messages-container">
        <MultiSelect
          searchable
          label="Select user"
          icon={<User size={16} />}
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={userId}
          onChange={(e) => handleSelected(e)}
          data={emailList}
          maxSelectedValues={1}
        />
      </div>
    </>
  );
};

export default ClientDirectMessagesNavbar;
