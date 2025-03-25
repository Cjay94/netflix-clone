import express from 'express';
import { getMovieByList, getMovieDetails, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:list", getMovieByList);

export default router;