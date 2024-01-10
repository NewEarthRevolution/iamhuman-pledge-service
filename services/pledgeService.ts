import Pledge, { InPledge, IPledge } from '../models/Pledge';

export const createPledge = async (pledgeData: InPledge): Promise<IPledge> => {

  const pledge = new Pledge({
    name: pledgeData.name,
    email: pledgeData.email,
    location: {
      countryCodeISO: pledgeData.location.countryCodeISO,
      countryName: pledgeData.location.countryName
    }
  });
  await pledge.save();
  return pledge;
};

export const getAllPledges = async (): Promise<IPledge[]> => {
    return Pledge.find();
};
