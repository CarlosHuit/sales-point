import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 40  },
    lastName:  { type: String, required: true, maxlength: 40  },
    email:     { type: String, required: true, unique: true, index: true },
    password:  { type: String, required: true, maxlength: 100 },
  }
);


export default mongoose.model('User', UserSchema)