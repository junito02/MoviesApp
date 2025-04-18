import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopularMovies = () => {
  const [popular, setPopular] = useState([]); // Estado para las películas populares
  const [isLoading, setIsLoading] = useState(true); // Estado para la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores
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
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );
        if (!response.ok) {
          throw new Error("Error al obtener las películas populares");
        }
        const data = await response.json();
        setPopular(data.results || []); // Asegura que 'results' sea un arreglo
      } catch (err) {
        setError(err.message); // Guarda el error si ocurre
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchPopularMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  if (isLoading) {
    return (
      <div className="loading flex flex-col items-center justify-center h-screen">
        <p className="text-white text-2xl mt-4">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error text-center text-white text-2xl mt-4">
        <p>{error}</p>
      </div>
    );
  }

  if (popular.length === 0) {
    return (
      <div className="no-movies text-center text-white text-2xl mt-4">
        <p>No hay películas populares disponibles.</p>
      </div>
    );
  }

  return (
    <div className="mt-[100px] flex flex-col items-center overflow-hidden">
      <h2 className="text-blue-600 text-3xl font-bold uppercase text-center mb-8 p-4 bg-transparent">
        Películas Populares
      </h2>
      <div className="max-w-[1200px] min-w-[300px] flex flex-wrap justify-center">
        {popular.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 p-2"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              className="poster w-full h-[300px] object-cover rounded-lg transition-shadow hover:shadow-xl"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/path/to/placeholder.jpg"
              } // Imagen de placeholder si no hay póster
              alt={movie.title || "Película sin título"} // Título alternativo
            />
            <h3 className="mt-2 text-center text-gray-50 font-semibold">
              {movie.title || "Título no disponible"} {/* Título alternativo */}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
