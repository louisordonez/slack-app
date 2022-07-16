import axios from 'axios';
import { BASE_URL } from '../constants/SlackAvionApiUrl';

export const axiosGetCall = async (
  endpoint,
  reqHeaders,
  onSuccess,
  onError
) => {
  return axios
    .get(`${BASE_URL}${endpoint}`, {
      headers: reqHeaders,
    })
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};

export const axiosPostCall = async (
  endpoint,
  body,
  reqHeaders,
  onSuccess,
  onError
) => {
  return axios
    .post(`${BASE_URL}${endpoint}`, body, {
      headers: reqHeaders,
    })
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};
