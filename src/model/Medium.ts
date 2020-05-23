import { model, Schema } from 'mongoose';


const mediumSchema = new Schema({
  discr: { type: String }, // video,image
  url: { type: String },
  filename: { type: String },
  filepath: { type: String },
  thumb_url: { type: String },
  source: { type: String, default: 'downloads' },
  vid_length: { type: String },
  height: { type: Number },
  width: { type: Number },
  size: { type: Number },
  mimetype: { type: String },
  purpose: { type: String, default: 'post' }, // baniere, profil or any other
  used: { type: Boolean, default: false },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},                              { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

model('Medium', mediumSchema);
