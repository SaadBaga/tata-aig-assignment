import fetch from 'isomorphic-unfetch';
import config from '../config/index';

export const checkLogin = async (requestData) => {
  let data = await fetch(`${config.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });
  data = await data.json();
  return data;
};


export const register = async (requestData) => {
  let data = await fetch(`${config.API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });
  data = await data.json();
  return data;
};