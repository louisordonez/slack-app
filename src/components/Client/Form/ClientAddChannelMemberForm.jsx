import React, { useEffect, useState } from 'react';
import { MultiSelect, Button } from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';
import { getEmailList } from '../../../services/utils/EmailList';

const ClientAddChannelMemberForm = () => {
  const [emailData, setEmailData] = useState([]);
  const [userIds, setUserIds] = useState(null);

  useEffect(() => {
    getEmailList().then((result) => setEmailData(result));
  }, []);

  return (
    <>
      <div className="client-channel-details-container">
        <MultiSelect
          required
          searchable
          clearable
          icon={<UserPlus size={16} />}
          label="Select users"
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={userIds}
          onChange={setUserIds}
          data={emailData}
          className="client-channel-details-add-member-multiselect"
        />
        <Button compact className="client-channel-details-add-member-button">
          +
        </Button>
      </div>
    </>
  );
};

export default ClientAddChannelMemberForm;
