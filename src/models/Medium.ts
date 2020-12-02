import { model, Schema, Model, Document } from 'mongoose';

export interface IMedium extends Document {
  tcd: string; // Type code
  scd: string; // Status code
  url: string;
  path: string;
  thumb: string | null;
  length: number | null;
  fname: string;
  height: number | null;
  width: number | null;
  size: number | null;
  mimetype: string;
  ext: string;
  createDate: Date;
}

const mediaSchema = new Schema({
  tcd: { type: String, maxlength: 1 }, // Type code
  scd: { type: String, maxlength: 1 }, // Status code
  url: { type: String },
  path: { type: String },
  thumb: { type: String, required: false },
  length: { type: String },
  fname: { type: String },
  height: { type: Number },
  width: { type: Number },
  size: { type: Number },
  mimetype: { type: String },
  ext: { type: String },
  createDate: { type: Date, default: Date.now },
});



// tslint:disable-next-line: variable-name
export const Medium: Model<IMedium> = model<IMedium>('Media', mediaSchema);
