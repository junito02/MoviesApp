import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]); // Estado para almacenar películas próximas
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
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
    const fetchUpcomingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Error al obtener las películas próximas");
        }
        const data = await response.json();
        setUpcoming(data.results || []); // Asegura que 'results' siempre sea un arreglo
      } catch (err) {
        setError(err.message); // Guarda el mensaje de error
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchUpcomingMovies();
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

  if (upcoming.length === 0) {
    return (
      <div className="text-center text-white text-2xl mt-4">
        <p>No hay películas próximas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="mt-[100px] flex flex-col items-center overflow-hidden">
      <h2 className="text-orange-400 text-3xl font-bold uppercase text-center mb-8 p-4 bg-transparent">
        Películas Próximas
      </h2>
      <div className="max-w-[1200px] min-w-[300px] flex flex-wrap justify-center">
        {upcoming.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 p-2"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              className="poster w-full h-[300px] object-cover rounded-lg transition-shadow hover:shadow-xl"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className="mt-2 text-center text-gray-50 font-semibold">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
