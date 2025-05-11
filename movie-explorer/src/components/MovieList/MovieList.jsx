import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import './MovieList.css';
import Fire from '../../assets/fire.png';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({ by: 'default', order: 'asc' });
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (sort.by !== 'default') {
      const sortedMovies = _.orderBy(filteredMovies, [sort.by], [sort.order]);
      setFilteredMovies(sortedMovies);
    }
  }, [sort, filteredMovies]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=91fbcc05160b7b7c6e69820906e02650`);
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

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
    setHasMore(data.page < data.total_pages);  // Check if more pages exist for infinite scrolling
  };

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilteredMovies(movies);  // Reset to all movies when the filter is removed
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilteredMovies(filtered);  // Update filteredMovies with the selected filter
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreFilter = (e) => {
    const genreId = Number(e.target.value);
    if (!genreId) {
      setFilteredMovies(movies); // All genres
    } else {
      const filtered = movies.filter(movie => movie.genre_ids.includes(genreId));
      setFilteredMovies(filtered);
    }
  };

  const loadMoreRef = React.useRef(null);

  const handleScroll = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
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
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular 
          <img src={Fire} alt="Fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[8, 7, 6]} />

          <select
            name="by"
            id=""
            onChange={handleSort}
            value={sort.by}
            className="align_center movie_sorting"
          >
            <option value="default">Sort by</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="align_center movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <select onChange={handleGenreFilter} className="align_center movie_sorting">
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>

        </div>
      </header>

      <div className="movie_cards">
        {filteredMovies.length === 0 ? (
          <p className="no_results">No movies found with the current filters.</p>
        ) : (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>

      {isLoading && <p>Loading...</p>}

      {/* Loading trigger */}
      <div ref={loadMoreRef} style={{ height: '1px' }}></div>
    </section>
  );
};

export default MovieList;
