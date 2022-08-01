import { USERS_ENDPOINT } from '../constants/SlackAvionApiUrl';
import { getLocalStorageItem } from '../utils/LocalStorage';
import { axiosGetCall } from '../utils/AxiosApiCall';

export const onEmailListSuccess = (response) => {
  const createNewEmailList = (list) => {
    const newEmailList = list.map((object) => {
      return {
        value: object.id,
        label: object.email,
      };
    });

    return newEmailList.sort((a, b) => a.value - b.value);
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
