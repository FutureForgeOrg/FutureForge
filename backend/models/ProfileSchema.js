import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BaseUser",
    required: true,
    unique: true
  },
  name: String,
  title: String,
  about: String,
  skills: [String],
  experience: [
    {
      role: String,
      company: String,
      duration: String,
      description: String
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      link: String
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  social: [
    {
      platform: String,
      link: String
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model("Profile", profileSchema);
