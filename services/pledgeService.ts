import Pledge, { InPledge, IPledge } from '../models/Pledge';

export const createPledge = async (pledgeData: InPledge): Promise<IPledge> => {
  // Check if a pledge with the same email already exists
  const existingPledge = await Pledge.findOne({ email: pledgeData.email });

  if (existingPledge) {
    // Throw an error if a pledge with the provided email already exists
    throw new Error('A pledge with this email already exists.');
  }

  // Create a new pledge if the email does not exist
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
