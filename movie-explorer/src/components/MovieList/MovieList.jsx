import React, { useEffect, useState } from 'react';
import './MovieList.css';
import Fire from '../../assets/fire.png';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=91fbcc05160b7b7c6e69820906e02650&page=${page}`
    );
    const data = await response.json();

    setMovies(prevMovies => [...prevMovies, ...data.results]);
    setFilteredMovies(prevMovies => [...prevMovies, ...data.results]);
    setIsLoading(false);
    setHasMore(data.page < data.total_pages);
  };

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilteredMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter(movie => movie.vote_average >= rate);
      setFilteredMovies(filtered);
    }
  };

  const loadMoreRef = React.useRef(null);

  const handleScroll = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '100px',
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading]);

  return (
    <section className='movie_list'>
      <header className='align_center movie_list_header'>
        <h2 className='align_center movie_list_heading'>
          Popular <img src={Fire} alt='Fire emoji' className='navbar_emoji' />
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings = {[8,7,6]} />

          <select name="" id="" className="align_center movie_sorting">
            <option value="">Sort by</option>
            <option value=""> Date</option>
            <option value="">Rating</option>
            <option value="">Genre</option>
          </select>

          <select name="" id="" className="align_center movie_sorting">
            <option value="">Ascending</option>
            <option value=""> Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filteredMovies.length === 0 ? (
          <p className="no_results">No movies with {minRating}★ or higher found.</p>
        ) : (
          filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>

      {isLoading && <p>Loading...</p>}

      {/* Loading trigger */}
      <div ref={loadMoreRef} style={{ height: '1px' }}></div>
    </section>
  );
};

export default MovieList;
