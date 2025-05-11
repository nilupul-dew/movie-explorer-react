import React, { useState } from 'react';  // Add useState import
import './Navbar.css'
import Fire from '../../assets/fire.png'
import Star from '../../assets/glowing star.png'
import Party from '../../assets/upcoming.png'


  const Navbar = ({ setSearchQuery }) => {
    const [inputValue, setInputValue] = useState('');

  // Handle search query change
  const handleSearch = (e) => {
    setInputValue(e.target.value);  // Update inputValue state
    setSearchQuery(e.target.value);  // Pass the value to the parent component (App.jsx)
  };

  return  <nav className='navbar'> <h1>Movie Explorer</h1> 
    {/* Search bar */}
    {/*<input 
        type="text"
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={handleSearch}
        className="search-bar"
      />*/}

    <div className="navbar_links">
        <a href="">Popular <img src={Fire} alt="Fire emoji" className='align_center navbar_emoji' /> </a>
        <a href="">Top Rated <img src={Star} alt="Star emoji" className='align_center navbar_emoji' /> </a>
        <a href="">Upcoming <img src={Party} alt="Party emoji" className='align_center navbar_emoji' /> </a>
    </div>
  </nav>
}

export default Navbar
