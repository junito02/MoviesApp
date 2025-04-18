import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Credits = ({ movieId }) => {
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTZiNDUwNzg1NmJmMzMyZTNkNzMwOGE3MjU5M2E5NiIsIm5iZiI6MTcyODA1NzM1OS4zNzksInN1YiI6IjY3MDAxMDBmZTg0ZWViMzVhMGY4MWM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HwDYzUcxm5dQPwgKgD7BG2T8UX7JUV-eJScSkcqchgU",
    },
  };

  useEffect(() => {
    const fetchCredits = async () => {
      if (!movieId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=es-ES`,
          options
        );

        if (!response.ok) {
          throw new Error("Error al obtener los créditos.");
        }

        const data = await response.json();
        setCredits(data.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <p className="text-white text-lg mt-4">Cargando elenco...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-red-500/10 p-4 rounded-lg">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (credits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-white text-lg">
          No hay información del elenco disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Elenco Principal
        </h2>
        <p className="text-gray-400">
          Conoce a los actores y actrices de la película
        </p>
      </div>

      <div className="relative px-4 md:px-8">
        <Slider {...settings}>
          {credits.map(({ id, name, character, profile_path }) => (
            <div key={id} className="px-2">
              <div className="group relative bg-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
                <div className="aspect-[2/3] relative">
                  {profile_path ? (
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                      alt={name}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300 truncate">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">{character}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Credits;
