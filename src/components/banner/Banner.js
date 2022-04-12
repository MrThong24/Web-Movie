import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import BannerItem from "./BannerItem";
const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=15c341b825db8ff13a434873cd1e9f60`,
    fetcher
  );
  const movies = data?.results || [];
  console.log(movies);
  return (
    <div>
      <section className="banner h-[500px] page-container mb-20 overflow-hidden">
        <Swiper grabCursor="true" slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Banner;
