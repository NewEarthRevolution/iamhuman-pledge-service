import mongoose, { Document, Schema } from 'mongoose';

export interface ICountry {
  countryName: string;
  countryCodeISO: string;
}

export interface InPledge extends Document {
  name: string;
  email: string;
}

export interface IPledge extends Document {
  name: string;
  email: string;
  location?: ICountry;
}

const LocationSchema: Schema = new Schema({
  countryName: { type: String, required: true },
  countryCodeISO: { type: String, required: true },
});

const PledgeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: LocationSchema, required: true },
});

export default mongoose.model<IPledge>('Pledge', PledgeSchema);
