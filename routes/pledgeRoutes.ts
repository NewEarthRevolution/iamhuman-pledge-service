import express from 'express';
import * as pledgeService from '../services/pledgeService';
import { CustomRequest } from '../types/express';
import Pledge from '../models/Pledge'; // Adjust import path as needed


const router = express.Router();

router.post('/pledges', async (req, res) => {
  try {
    const clientIp = grabIpFromReq(req)

    const newPledge = await pledgeService.createPledge(req.body, "147.235.221.149");
    res.status(201).json(newPledge);
  } catch (error) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

router.get('/latest-pledges', async (req, res) => {
  try {
    const latestPledges = await Pledge.find()
                                      .sort({ createdAt: -1 })
                                      .limit(10) // Adjust the limit as needed
                                      .select('name location.countryName -_id');
    res.json(latestPledges);
  } catch (error) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

router.get('/name-map', async (req, res) => {
  try {
    const nameMap = await Pledge.find()
                                .sort({ createdAt: -1 })
                                .limit(20) // Adjust based on your requirement
                                .select('name location.countryName -_id'); // Fetch names and country names
    res.json(nameMap);
  } catch (error) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

const grabIpFromReq = (req: CustomRequest): string => {
  let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (Array.isArray(clientIp)) {
    // Filter out IPv6 addresses
    clientIp = clientIp.find(ip => ip.includes('.') && !ip.includes(':'));
  } else if (typeof clientIp === 'string' && clientIp.includes(',')) {
    // Split and filter if the header is a string with multiple IPs
    const ips = clientIp.split(',').map(ip => ip.trim());
    clientIp = ips.find(ip => ip.includes('.') && !ip.includes(':'));
  }

  return clientIp || '0.0.0.0';
};

export default router;
