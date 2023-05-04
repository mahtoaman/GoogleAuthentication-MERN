const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    bio: {
      type: String,
    },
    about: {
      type: String,
    },
    location: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    education: {
      type: String,
    },
    school: {
      type: String,
    },
    interests: {
      type: [String],
    },
    userProfileImageUrl: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    profession: {
      type: String,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    skills: {
      type: [String],
    },

    achievements: {
      type: [String],
    },
    isDomainExpert: {
      type: Boolean,
      default: false,
    },
    experience: {
      type: String,
      // required: function () {
      //   return this.isDomainExpert;
      // },
    },
    domainExpertise: {
      type: [String],
      // required: function () {
      //   return this.isDomainExpert;
      // },
    },
    googleId: {
      type: String,
    },
    sessionPrice: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const userDB = new mongoose.model("users", userSchema);

module.exports = userDB;
