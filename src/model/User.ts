import { model, Schema } from 'mongoose';


const userSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  telphone: { type: String },

},                            { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('User', userSchema);
