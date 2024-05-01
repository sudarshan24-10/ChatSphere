import mongoose from 'mongoose';

const userSchema= mongoose.Schema( {
    firstName: { type: String, required: true },
    lastName:{type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true });

  const UserModel = mongoose.model("User", userSchema);

  export default UserModel;