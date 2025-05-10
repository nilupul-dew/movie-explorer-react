import React from 'react';

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
  return (
    <ul className="align_center movie_filter">
      {/* All Movies filter */}
      <li className={minRating === 0 ? 'movie_filter_item active' : 'movie_filter_item'}
        onClick={() => onRatingClick(0)}> All Movies </li>

      {/* Dynamic Rating Filters */}
      {ratings.map((rate) => (
        <li key={rate} className={minRating === rate ? 'movie_filter_item active' : 'movie_filter_item'} 
        onClick={() => onRatingClick(rate)}> {rate}+ Star </li>
      ))}
    </ul>
  );
};

export default FilterGroup;
