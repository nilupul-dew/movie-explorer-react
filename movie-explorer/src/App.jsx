import React, { useState } from 'react'; 
import './App.css'
import Fire from "./assets/fire.png"
import Star from "./assets/glowing star.png"
import Upcoming from "./assets/upcoming.png"
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';



const App = () => {
  {/*const [searchQuery, setSearchQuery] = useState(""); */ }
  return (
    <div className='app'>
      <Navbar  />
      <MovieList  type="popular" title="Popular" emoji={Fire}/>
      <MovieList  type="top_rated" title="Top Rated" emoji={Star}/>
      <MovieList  type="upcoming" title="Upcoming" emoji={Upcoming}/>
    </div>
  )
}

export default App
