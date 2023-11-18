import axios from 'axios';
import { ICountry } from '../models/Pledge';

export const getLocationFromIp = async (ip: string): Promise<ICountry | null> => {
  try {
    const response = await axios.get(`https://api.iplocation.net/?ip=${ip}`);
    const data = response.data;
    
    if (data && data.country_name && data.country_code2) {
      return {
        countryName: data.country_name,
        countryCodeISO: data.country_code2
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching IP location: ${error}`);
    return null;
  }
};
export default getLocationFromIp;