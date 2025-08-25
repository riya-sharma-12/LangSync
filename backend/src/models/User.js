import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },

    // if some users are freind with this user then their ids will get stored in 
    // the friends array
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);


// we will try hashing the user passwords before pushing them into the database 
// because if someone will hack out database then he may gets access to users passwords
userSchema.pre("save", async function (next) {
    // if the current user passwrod is not modified don't hash it
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    // this keyword will help us to access the current user
    this.password = await bcrypt.hash(this.password, salt);
    next(); // this is kind of a middleware once completed with this we are saying that u can move to next
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

export default User;