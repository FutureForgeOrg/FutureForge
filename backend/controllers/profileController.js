import Profile from "../models/ProfileSchema.js";

export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const profileData = req.body;

    // Find if profile exists
    let profile = await Profile.findOne({ userId });

    if (profile) {
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
