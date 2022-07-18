import { USERS_ENDPOINT } from '../constants/SlackAvionApiUrl';
import { getLocalStorageItem } from '../utils/LocalStorage';
import { axiosGetCall } from '../utils/AxiosApiCall';

export const onEmailListSuccess = (response) => {
  const userData = getLocalStorageItem('userData')[0];

  const createNewEmailList = (list) => {
    let newEmailListArray = [];

    list.forEach((object) => {
      const newEmailData = {
        value: object.id,
        label: object.email,
      };

      newEmailListArray.push(newEmailData);
    });

    return newEmailListArray
      .sort((a, b) => a.value - b.value)
      .filter((u) => u.value !== userData.id);
  };

  return createNewEmailList(response.data.data);
};

export const onEmailListError = (error) => {
  const errorResponse = error.response.data.errors;

  return errorResponse;
};

export const getEmailList = async () => {
  const userHeaders = getLocalStorageItem('userHeaders')[0];

  return axiosGetCall(
    USERS_ENDPOINT,
    userHeaders,
    onEmailListSuccess,
    onEmailListError
  );
};
