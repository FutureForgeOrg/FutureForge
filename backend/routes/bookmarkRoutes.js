import express from 'express';
import {protectRoute} from '../middleware/authmiddleware.js';
import { getAllBookmarks, deleteBookmark, postBookmark } from '../controllers/bookmarkController.js';

const router = express.Router();

router.get('/', protectRoute, getAllBookmarks);
router.post('/', protectRoute, postBookmark);

router.delete('/:jobId', protectRoute, deleteBookmark);

export default router;
