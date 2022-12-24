import { fetcher } from "utils/api";
import Watchlist from "models/Watchlist";
import History from "models/History";
import dbConnect from "utils/dbConnect";

const getRecommendedMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`;

const getSimilarMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

export default async function handler(req, res) {
  await dbConnect();

  const watchlistMovies = await Watchlist.find({}, "id title");
  const historyMovies = await History.find({}, "id title");

  const recMovieBasedOnSimilar = [...watchlistMovies];
  recMovieBasedOnSimilar.push(...historyMovies);

  const randomMovie =
    recMovieBasedOnSimilar[
      Math.floor(Math.random() * recMovieBasedOnSimilar.length)
    ];
  const recommendedMovie = await fetcher(
    getRecommendedMovieUrl(randomMovie?.id)
  );
  const similarMovie = await fetcher(getSimilarMovieUrl(randomMovie?.id));

  res.status(200).json({ recommendedMovie, similarMovie, randomMovie });
}
