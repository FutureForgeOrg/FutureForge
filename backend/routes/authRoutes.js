import express from "express";
import { protectRoute } from "../middleware/authmiddleware.js";
import { handleSignup, handleLogin, handleLogout, handleCheckAuth,
        resendVerificationEmail, handleEmailVerification  } from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', handleSignup);
router.post('/login',handleLogin);
router.post('/logout',handleLogout);

router.get('/check-auth', protectRoute, handleCheckAuth);
// router.put('update-profile', protectRoute, handleUpdateProfile);

router.post('/resend-verification-email', resendVerificationEmail);
router.get('/verify-email/:token', handleEmailVerification);
export default router;