import Profile from "../models/ProfileSchema.js";
import BaseUser from "../models/BaseUser.js"

export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const profileData = req.body;

    // Find if profile exists
    let profile = await Profile.findOne({ userId });

    if (profile) {

      if (profileData.name) {
        await BaseUser.findByIdAndUpdate(userId, {
          username: profileData.name
        })
      }

      // Update profile
      profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: profileData },
        { new: true }
      );
      return res.json({ message: "Profile updated", profile });
    }

    // Create profile
    profile = new Profile({
      userId,
      ...profileData
    });

    await profile.save();

    if (profileData.name) {
      await BaseUser.findByIdAndUpdate(userId, {
        username: profileData.name
      })
    }

    res.status(201).json({ message: "Profile created", profile });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;

  // required fields and their weights
  const sections = [
    { key: "name", weight: 10 },
    { key: "title", weight: 10 },
    { key: "about", weight: 10 },
    { key: "skills", weight: 15 },
    { key: "experience", weight: 15 },
    { key: "projects", weight: 15 },
    { key: "education", weight: 15 },
    { key: "social", weight: 10 },
  ];

  let score = 0;

  sections.forEach((section) => {
    const value = profile[section.key];

    if (Array.isArray(value)) {
      if (value.length > 0) score += section.weight;
    } else if (value && value.trim() !== "") {
      score += section.weight;
    }
  });

  return score;
};

export const getProfileCompletionStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found", completion: 0 });
    }

    const completion = calculateProfileCompletion(profile);

    res.json({
      completion
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

