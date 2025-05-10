import React from "react";
import "./MovieCard.css";
import Star from '../../assets/star.png'

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};


const MovieCard = ({movie}) => {

  const genres = movie.genre_ids
  ? movie.genre_ids.map(id => genreMap[id]).filter(Boolean)
  : [];

  return (
    <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' className="movie_card">
      <img
         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
         alt='movie poster'
        className="movie_poster"
      />
      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.original_title}</h3>
        <div className="align-center movie_date_rate">
          <p>{genres.join(", ")}</p>
          <p>{movie.release_date}</p>
          <p>{movie.vote_average} <img src={Star} alt="rating icon" className="card_emoji" /></p>
          

        </div>
        <p className="movie_description" >{movie.overview.slice(0,100)+"..."}</p>
      </div>
      
    </a>
  );
};

export default MovieCard;
