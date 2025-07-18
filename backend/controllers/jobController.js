// import Job from "../models/JobSchema.js"

// export const getAllScrappedJobs = async (req, res) => {
//     try {
//         const {
//             page = 1,
//             limit = 10,
//             job_title,
//             location,
//             company_name,
//             keyword,
//         } = req.query;

//         const filter = {};

//         if (job_title) {
//             filter.job_title = { $regex: job_title, $options: 'i' };
//         }

//         if (location) {
//             filter.location = { $regex: location, $options: 'i' };
//         }

//         if (company_name) {
//             filter.company_name = { $regex: company_name, $options: 'i' };
//         }

//         if (keyword) {
//             filter.description = { $regex: keyword, $options: 'i' };
//         }

//         const jobs = await Job.find(filter)
//             .sort({ scraped_date: -1 })
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         const total = await Job.countDocuments(filter);

//         res.status(201).json({
//             total,
//             page: parseInt(page),
//             limit: parseInt(limit),
//             jobs,
//         });
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error: 'Server error while fetching jobs'
//         });
//     }
// }

// basic workflow :- 
// Redis stores just 10 job documents (most recent ones)
// The rest (page 2, page 3, etc.) are never cached — they always go to MongoDB
// After each scrape (25th July, 30th July…), the cache is cleared and refreshed with the new latest 10

// GET http://localhost:8080/api/jobs?page=1&limit=10 -> served from cache
// but not /?page=2 as mostly will care about page1 and latest are shown first (without filter search)

import Job from "../models/JobSchema.js";
import redisClient from "../utils/redis.js";

export const getAllScrappedJobs = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            job_title,
            location,
            company_name,
            keyword,
        } = req.query;

        const filter = {};

        // multiple keywords split by space and build dynamic regex
        if (job_title) {
            const keywords = job_title.split(" ").map(k => k.trim()).filter(Boolean);
            filter.$and = keywords.map(keyword => ({
                job_title: { $regex: keyword, $options: "i" }
            }));
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (company_name) {
            filter.company_name = { $regex: company_name, $options: "i" };
        }

        if (keyword) {
            filter.description = { $regex: keyword, $options: "i" };
        }

        // Only caches page=1 and no filters (the most accessed content)

        const shouldCache = page == 1 && !job_title && !location && !company_name && !keyword;
        const cacheKey = `latest_jobs_static`;

        if (shouldCache) {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log("Served from Redis cache");
                return res.status(200).json(JSON.parse(cachedData));
            }
        }

        const jobs = await Job.find(filter)
            .sort({ scraped_date: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        const total = await Job.countDocuments(filter);

        const response = {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            jobs,
        };

        if (shouldCache) {
            await redisClient.set(cacheKey, JSON.stringify(response)); // no expiry as fetching every 6 time per month
            console.log("Cached in Redis (no TTL)");
        }

        return res.status(200).json(response);

    } catch (err) {
        console.error("Error fetching jobs:", err);
        return res.status(500).json({
            error: "Server error while fetching jobs"
        });
    }
};
