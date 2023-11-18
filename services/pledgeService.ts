import Pledge, { InPledge, IPledge } from '../models/Pledge';
import getLocationFromIp from './ipLocationService';

export const createPledge = async (pledgeData: InPledge, ipAddress: string): Promise<IPledge> => {
  const locationData = await getLocationFromIp(ipAddress); // Await the asynchronous call
  
  if (!locationData) {
    throw new Error("Location data could not be retrieved");
  }

  const pledge = new Pledge({
    name: pledgeData.name,
    email: pledgeData.email,
    location: {
      countryCodeISO: locationData.countryCodeISO,
      countryName: locationData.countryName
    }
  });
  await pledge.save();
  return pledge;
};

export const getAllPledges = async (): Promise<IPledge[]> => {
    return Pledge.find();
};
