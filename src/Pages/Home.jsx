import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTZiNDUwNzg1NmJmMzMyZTNkNzMwOGE3MjU5M2E5NiIsIm5iZiI6MTcyODA1NzM1OS4zNzksInN1YiI6IjY3MDAxMDBmZTg0ZWViMzVhMGY4MWM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HwDYzUcxm5dQPwgKgD7BG2T8UX7JUV-eJScSkcqchgU",
  },
};

const fetchMovies = async (endpoint) => {
  const res = await fetch(endpoint, API_OPTIONS);
  if (!res.ok) throw new Error("Error al obtener películas");
  const data = await res.json();
  return data.results || [];
};

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const searchTimeout = useRef();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetchMovies(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      ),
      fetchMovies("https://api.themoviedb.org/3/movie/upcoming?language=en-US"),
      fetchMovies(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US"
      ),
    ])
      .then(([pop, upc, play]) => {
        setPopular(pop);
        setUpcoming(upc);
        setPlaying(play);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Búsqueda de películas
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          search
        )}&language=en-US`,
        API_OPTIONS
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results || []);
        })
        .catch(() => setSearchResults([]))
        .finally(() => setIsSearching(false));
    }, 500); // debounce
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
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

  // Banner destacado: la película más popular
  const bannerMovie = popular[0];

  return (
    <div className="bg-black min-h-screen pb-8 w-full">
      {/* Banner destacado */}
      {bannerMovie && (
        <div className="relative w-full h-[60vw] max-h-[500px] flex items-end bg-black/80 overflow-hidden mb-8 shadow-2xl">
          <img
            src={`https://image.tmdb.org/t/p/original${
              bannerMovie.backdrop_path || bannerMovie.poster_path
            }`}
            alt={bannerMovie.title}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
          />
          <div className="relative z-10 p-8 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
              {bannerMovie.title}
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-6 line-clamp-3 drop-shadow">
              {bannerMovie.overview}
            </p>
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all duration-300"
              onClick={() => handleMovieClick(bannerMovie.id)}
            >
              Ver Detalles
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      )}

      {/* Input de búsqueda */}
      <div className="flex flex-col items-center mb-8 px-4">
        <input
          type="text"
          className="w-full max-w-xl px-5 py-3 rounded-full bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 shadow-lg"
          placeholder="Buscar películas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Resultados de búsqueda */}
      {search && (
        <SectionCarousel
          title={isSearching ? "Buscando..." : `Resultados para "${search}"`}
          movies={searchResults}
          color="from-pink-400 to-blue-400"
          onMovieClick={handleMovieClick}
        />
      )}

      {/* Carrusel horizontal genérico */}
      {!search && (
        <>
          <SectionCarousel
            title="Populares"
            movies={popular}
            color="from-blue-400 to-purple-500"
            onMovieClick={handleMovieClick}
          />
          <SectionCarousel
            title="Próximamente"
            movies={upcoming}
            color="from-orange-400 to-pink-500"
            onMovieClick={handleMovieClick}
          />
          <SectionCarousel
            title="En Cartelera"
            movies={playing}
            color="from-green-400 to-blue-500"
            onMovieClick={handleMovieClick}
          />
        </>
      )}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

function SectionCarousel({ title, movies, color, onMovieClick }) {
  const carouselRef = useRef(null);
  // Drag-to-scroll logic
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let isDown = false;
    let startX;
    let scrollLeft;
    const onMouseDown = (e) => {
      isDown = true;
      carousel.classList.add("cursor-grabbing");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      carousel.classList.remove("cursor-grabbing");
    };
    const onMouseUp = () => {
      isDown = false;
      carousel.classList.remove("cursor-grabbing");
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll-fast
      carousel.scrollLeft = scrollLeft - walk;
    };
    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = carousel.scrollLeft;
    };
    const onTouchMove = (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.5;
      carousel.scrollLeft = touchScrollLeft - walk;
    };
    carousel.addEventListener("mousedown", onMouseDown);
    carousel.addEventListener("mouseleave", onMouseLeave);
    carousel.addEventListener("mouseup", onMouseUp);
    carousel.addEventListener("mousemove", onMouseMove);
    carousel.addEventListener("touchstart", onTouchStart);
    carousel.addEventListener("touchmove", onTouchMove);
    return () => {
      carousel.removeEventListener("mousedown", onMouseDown);
      carousel.removeEventListener("mouseleave", onMouseLeave);
      carousel.removeEventListener("mouseup", onMouseUp);
      carousel.removeEventListener("mousemove", onMouseMove);
      carousel.removeEventListener("touchstart", onTouchStart);
      carousel.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  if (!movies?.length) return null;
  return (
    <section className="mb-8">
      <h2
        className={`text-2xl md:text-3xl font-bold mb-4 px-4 text-transparent bg-clip-text bg-gradient-to-r ${color}`}
      >
        {title}
      </h2>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-x-4 px-4 scrollbar-hide cursor-grab select-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {movies.slice(0, 15).map((movie) => (
          <div
            key={movie.id}
            className="group relative min-w-[140px] max-w-[180px] sm:min-w-[180px] sm:max-w-[220px] bg-gray-800/60 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 cursor-pointer flex-shrink-0"
            onClick={() => onMovieClick(movie.id)}
            style={{ height: 260 }}
          >
            <img
              className="w-full h-full object-cover object-top"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/path/to/placeholder.jpg"
              }
              alt={movie.title || "Película sin título"}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <h3 className="text-base font-semibold text-white group-hover:text-pink-400 transition-colors duration-300 truncate">
                {movie.title || "Título no disponible"}
              </h3>
              <div className="flex items-center mt-1 space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-300 text-xs">
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
              <button className="bg-pink-600/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-pink-500/30">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
