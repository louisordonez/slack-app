import React, { useState } from 'react';
import { MultiSelect, ActionIcon } from '@mantine/core';
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
          className="client-channel-details-add-member-multiselect"
          label="Select users"
          nothingFound="Nothing found"
          icon={<UserPlus size={16} />}
          required
          searchable
          clearable
          maxDropdownHeight={160}
          limit={20}
          value={userId}
          onChange={setUserId}
          data={emailList}
          maxSelectedValues={1}
        />
        <ActionIcon
          className="client-channel-details-add-member-button"
          variant="default"
          onClick={handleAdd}
        >
          <span className="bold-font">+</span>
        </ActionIcon>
      </div>
    </>
  );
};

export default ClientAddChannelMemberForm;
