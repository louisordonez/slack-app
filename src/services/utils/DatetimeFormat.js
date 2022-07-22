export const convertDatetime = (timestamp) => {
  const newDate = new Date(timestamp);
  const date = newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = newDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date, time };
};

export const getCurrentDatetime = () => {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date, time };
};
