import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="px-5">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px]  w-[800px] mx-auto relative -mt-[200px] z-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          className="w-full h-full object-cover rounded-xl "
          alt=""
        />
      </div>
      <h1 className="text-center text-3xl font-bold text-white mt-10 mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10 ">
          {genres.map((item, index) => (
            <span
              className="border-primary text-primary border py-2 px-5 rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed max-w-[600px] mx-[auto] mb-20">
        {overview}
      </p>

      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast && cast.length <= 0) return null;
  return (
    <div className="py-10 ">
      <h2 className="text-center text-2xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-10 ">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              className=" w-full h-[300px] object-cover rounded-lg "
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      {results.slice(0, 1).map((item) => (
        <div key={item.id} className="w-full aspect-video">
          <iframe
            width="900"
            height="506"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-fill"
          ></iframe>
        </div>
      ))}
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  console.log(data);
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="movie-list">
        <h3 className="text-3xl font-medium mb-10 text-center">
          Similar Movies
        </h3>
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
