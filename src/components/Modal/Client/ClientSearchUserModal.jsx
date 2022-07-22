import React, { useState, useEffect } from 'react';
import { Modal, MultiSelect } from '@mantine/core';
import { Search } from 'tabler-icons-react';

const ClientSearchUserModal = ({
  opened,
  emailList,
  receiverClass,
  onSelectedUser,
  onSearchUserModalShown,
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
    onSearchUserModalShown(false);
    setUserId([]);
  };

  return (
    <Modal
      size="lg"
      opened={opened}
      withCloseButton={false}
      onClose={() => onSearchUserModalShown(false)}
      styles={{ modal: { background: 'none' } }}
    >
      <MultiSelect
        searchable
        size="xl"
        icon={<Search size={24} />}
        maxDropdownHeight={160}
        nothingFound="Nothing found"
        limit={20}
        value={userId}
        onChange={(e) => handleSelected(e)}
        data={emailList}
        maxSelectedValues={1}
      />
    </Modal>
  );
};

export default ClientSearchUserModal;
