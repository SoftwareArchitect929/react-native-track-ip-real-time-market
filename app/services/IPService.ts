import axios from 'axios';
import { IPDetails } from '../Types';

export const fetchIPDetails = async (ip = '') => {
  try {
    const response = await axios.get(`https://ipwho.is/${ip}`);
    return response.data as IPDetails;
  } catch (error) {
    console.error('Error fetching IP details:', error);
    return null;
  }
};
