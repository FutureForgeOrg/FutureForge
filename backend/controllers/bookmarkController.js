import mongoose from 'mongoose';
import Bookmark from '../models/Bookmark.js';
import Job from "../models/JobSchema.js";

export const getAllBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 5, keyword = '' } = req.query;

        // Step 1: Get all bookmarks for user
        const bookmarks = await Bookmark.find({ user: userId }).sort({ createdAt: -1 });

        const jobIds = bookmarks.map(b => b.jobId);

        // Step 2: Fetch valid jobs from another DB
        const jobQuery = {
            _id: { $in: jobIds.map(id => new mongoose.Types.ObjectId(id)) }
        };

        if (keyword) {
            const regex = new RegExp(keyword, 'i');
            jobQuery.$or = [
                { job_title: { $regex: regex } },
                { job_description: { $regex: regex } }
            ];
        }

        const jobs = await Job.find(jobQuery);

        // Step 3: Create a map of jobId => job
        const jobMap = {};
        jobs.forEach(job => {
            jobMap[job._id.toString()] = job;
        });

        // Step 4: Filter and match jobs with bookmarks
        const validBookmarks = bookmarks
            .filter(b => jobMap[b.jobId?.toString()])
            .map(b => ({
                _id: b._id,
                job: jobMap[b.jobId.toString()],
                createdAt: b.createdAt,
            }));

        // Step 5: Apply pagination manually
        const total = validBookmarks.length;
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const paginated = validBookmarks.slice(startIndex, startIndex + parseInt(limit));

        res.status(200).json({
            success: true,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            bookmarks: paginated,
        });

    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};


export const postBookmark = async (req, res) => {
    try {
        const userId = req.user.id;
        const { jobId } = req.body;

        // Validate jobId
        if (!jobId) {
            return res.status(400).json({
                message: 'Job ID is required'
            });
        }

        // Ensure job actually exists
        const jobExists = await Job.findById(jobId);
        if (!jobExists) {
            return res.status(404).json({
                message: 'Job not found'
            });
        }

        // const existing2 = await Bookmark.findOne({ user: userId, jobId });
        // console.log("DEBUG duplicate check:", { userId, jobId, existing2 });

        // // Check for duplicate
        // const existing = await Bookmark.findOne({ user: userId, jobId });
        // if (existing) {
        //     return res.status(409).json({ message: 'Already bookmarked' });
        // }

        // Create bookmark
        const bookmark = await Bookmark.findOneAndUpdate(
            { user: userId, jobId },
            { $setOnInsert: { user: userId, jobId } },
            { new: true, upsert: true }
        );

        res.status(201).json({
            success: true,
            message: 'Bookmark added successfully',
            bookmark,
        });


    } catch (error) {
        console.error('Error creating bookmark:', error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};



export const deleteBookmark = async (req, res) => {
    try {
        const bookmarkId = req.params.bookmarkId;

        const deleted = await Bookmark.deleteOne({ user: req.user.id, _id: bookmarkId })

        if (deleted.deletedCount === 0) {
            return res.status(404).json({
                message: 'Bookmark not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Bookmark removed successfully'
        });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}