import React from "react";

const BannerItem = ({ item }) => {
  const { title, poster_path } = item;
  return (
    <div className="w-full h-full rounded-lg bg-white relative">
      <div className="absolute overlay inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        className="w-full h-full object-cover rounded-lg"
        alt=""
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-5">
          <span className="border py-2 px-4 rounded-lg">Adventure</span>
          <span className="border py-2 px-4 rounded-lg">Adventure</span>
          <span className="border py-2 px-4 rounded-lg">Adventure</span>
        </div>
        <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium mt-5">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
