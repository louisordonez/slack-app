import axios from 'axios';
import { BASE_URL } from '../constants/App/SlackAvionApiUrl';

export const axiosGetCall = async (endpoint, onSuccess, onError) => {
  return axios
    .get(`${BASE_URL}${endpoint}`)
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};

export const axiosPostCall = async (
  endpoint,
  json,
  headers,
  onSuccess,
  onError
) => {
  return axios
    .post(`${BASE_URL}${endpoint}`, json, headers)
    .then((response) => onSuccess(response))
    .catch((error) => onError(error));
};
