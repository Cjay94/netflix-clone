import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTvShow = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTvShow = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({ success: true, content: randomTvShow })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getTvShowTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, trailers: data.results });

    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getTvShowDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });

    } catch (error) {

        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getSimilarTvShows = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getTvShowByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(200).json({ success: true, category: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getTvShowGenre = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/genre/tv/list?language=en");

        res.status(200).json({ success: true, content: data })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}