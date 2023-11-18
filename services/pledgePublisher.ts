import redisClient from '../clients/redisClient';
// Connect when your application starts
redisClient.connect();

export type PledgeUpdateMessage = {
    name: string;
    countryName: string;
};

export const publishToFeedService = async (message: PledgeUpdateMessage) => {
    const serializedMessage = JSON.stringify(message);
    console.log("publishing", message);
    await redisClient.publish('pledgeUpdates', serializedMessage);
};
