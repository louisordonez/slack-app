export const convertDatetime = (timestamp) => {
  const newDate = new Date(timestamp);
  const dateMonth =
    newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth();
  const dateDay =
    newDate.getDay() < 10 ? `0${newDate.getDay()}` : newDate.getDay();
  const dateYear = newDate.getFullYear();
  const date = `${dateMonth}-${dateDay}-${dateYear}`;
  const time = newDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date, time };
};
