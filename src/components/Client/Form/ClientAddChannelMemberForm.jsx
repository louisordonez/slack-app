import React, { useEffect, useState } from 'react';
import { MultiSelect, Button } from '@mantine/core';
import { UserPlus, Plus } from 'tabler-icons-react';
import { getEmailList } from '../../../services/utils/EmailList';

const ClientAddChannelMemberForm = () => {
  const [emailData, setEmailData] = useState([]);
  const [userIds, setUserIds] = useState(null);

  useEffect(() => {
    getEmailList().then((result) => setEmailData(result));
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
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
          style={{ width: '85%' }}
        />
        <Button
          compact
          style={{
            marginTop: '1.75rem',
            height: '2.25rem',
            width: '2.25rem',
          }}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default ClientAddChannelMemberForm;
