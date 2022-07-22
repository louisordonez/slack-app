import React, { useState } from 'react';
import { MultiSelect, Button } from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';

const ClientAddChannelMemberForm = ({
  selectedId,
  emailList,
  onAddChannelMember,
}) => {
  const [userId, setUserId] = useState([]);

  const handleAdd = () => {
    let newMember;

    if (userId.length === 0) {
      newMember = {
        id: selectedId,
        member_id: '',
      };

      onAddChannelMember(newMember);
    } else {
      newMember = {
        id: selectedId,
        member_id: userId[0],
      };

      onAddChannelMember(newMember);
      setUserId([]);
    }
  };

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
          value={userId}
          onChange={setUserId}
          data={emailList}
          className="client-channel-details-add-member-multiselect"
          maxSelectedValues={1}
        />
        <Button
          compact
          className="client-channel-details-add-member-button"
          onClick={handleAdd}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default ClientAddChannelMemberForm;
