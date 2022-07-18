import React, { useState, useEffect } from 'react';
import { Text, Button, Group, MultiSelect } from '@mantine/core';
import './ClientDirectMessagesNavbar.scss';
import { getEmailList } from '../../../../services/utils/EmailList';

const ClientDirectMessagesNavbar = ({
  onSendDirectMessageModalShown,
  onSelectedId,
}) => {
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    getEmailList().then((result) => setEmailData(result));
  });
  return (
    <>
      <Text className="client-stack-direct-messages-header bold-font">
        <Group position="apart">
          Direct Messages
          <Button
            variant="default"
            compact
            onClick={onSendDirectMessageModalShown}
          >
            +
          </Button>
        </Group>
      </Text>
      <div className="client-stack-direct-messages-container">
        <MultiSelect
          searchable
          clearable
          label="Select user"
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          onChange={onSelectedId}
          data={emailData}
          maxSelectedValues={1}
        />
      </div>
    </>
  );
};

export default ClientDirectMessagesNavbar;
