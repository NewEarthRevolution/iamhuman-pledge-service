import Pledge from '../models/Pledge';
import { publishToFeedService, PledgeUpdateMessage } from './pledgePublisher';

export const startChangeStream = () => {
  const changeStream = Pledge.watch();
  console.log("watching database");

  changeStream.on('change', (change) => {
    console.log("noticed change in mongo");
    if (change.operationType === 'insert') {
      const newPledge = change.fullDocument;
      const message: PledgeUpdateMessage = {
        name: newPledge.name,
        countryName: newPledge.location.countryName
      };

      publishToFeedService(message);
    }
  });
};

// db.createUser({
//   user: "root",
//   pwd: "root",
//   roles: [{ role: "root", db: "admin" }]
// });
