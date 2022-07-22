import React, { useState, useEffect } from 'react';
import { Text, Group, MultiSelect } from '@mantine/core';
import { User } from 'tabler-icons-react';
import { getEmailList } from '../../../../services/utils/EmailList';

const ClientDirectMessagesNavbar = ({ receiverClass, onSelectedUser }) => {
  const [emailData, setEmailData] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    getEmailList().then((result) => setEmailData(result));

    if (receiverClass === 'Channel') {
      setValue([]);
    }
  }, [receiverClass]);

  const handleSelected = (e) => {
    setValue(e);
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
          value={value}
          onChange={(e) => handleSelected(e)}
          data={emailData}
          maxSelectedValues={1}
        />
      </div>
    </>
  );
};

export default ClientDirectMessagesNavbar;
