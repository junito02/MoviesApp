import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrailerFullscreen, setIsTrailerFullscreen] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTZiNDUwNzg1NmJmMzMyZTNkNzMwOGE3MjU5M2E5NiIsIm5iZiI6MTcyODA1NzM1OS4zNzksInN1YiI6IjY3MDAxMDBmZTg0ZWViMzVhMGY4MWM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HwDYzUcxm5dQPwgKgD7BG2T8UX7JUV-eJScSkcqchgU",
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );

        if (!movieResponse.ok) {
          throw new Error("Error al obtener los detalles de la película.");
        }

        const movieData = await movieResponse.json();
        setMovie(movieData);

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const videoData = await videoResponse.json();

        const trailer = videoData.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <p className="text-white text-xl mt-4">Cargando detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-500/10 p-4 rounded-lg">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-white text-xl">No se pudo encontrar la película.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d1e] via-transparent to-transparent z-20" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-30 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Volver</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="relative z-30 -mt-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-[#060d1e]/95 rounded-lg shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {movie.vote_average?.toFixed(1)}
                  </span>
                  <span>{movie.release_date?.split("-")[0]}</span>
                  <span>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trailer Section */}
          {trailerKey && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Tráiler</h2>
                <button
                  onClick={() => setIsTrailerFullscreen(!isTrailerFullscreen)}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {isTrailerFullscreen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                className={`relative ${
                  isTrailerFullscreen ? "fixed inset-0 z-50 bg-black" : ""
                }`}
              >
                <div
                  className={`${
                    isTrailerFullscreen ? "h-screen" : "aspect-video"
                  } relative`}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=${
                      isTrailerFullscreen ? 1 : 0
                    }`}
                    title="Tráiler"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Credits Section */}
          <div className="mt-8">
            <Credits movieId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
