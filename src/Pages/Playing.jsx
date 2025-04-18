import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Playing = () => {
  const [play, setPlay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTZiNDUwNzg1NmJmMzMyZTNkNzMwOGE3MjU5M2E5NiIsIm5iZiI6MTcyODA1NzM1OS4zNzksInN1YiI6IjY3MDAxMDBmZTg0ZWViMzVhMGY4MWM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HwDYzUcxm5dQPwgKgD7BG2T8UX7JUV-eJScSkcqchgU",
    },
  };

  useEffect(() => {
    const fetchPlayingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setPlay(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayingMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <p className="text-white text-xl mt-4">Cargando películas...</p>
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

  if (play.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-white text-xl">
          No hay películas en cartelera actualmente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Películas en Cartelera
        </h2>
        <p className="text-gray-400">
          Descubre las últimas películas y sus tráilers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {play.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20"
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="aspect-[2/3] relative">
              <img
                className="w-full h-full object-cover"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/path/to/placeholder.jpg"
                }
                alt={movie.title || "Película sin título"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                {movie.title || "Título no disponible"}
              </h3>
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-300">
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-green-500 text-white px-6 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Ver Tráiler
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playing;
