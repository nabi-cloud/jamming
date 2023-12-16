import React from 'react';

import './SearchBar.css';

function SearchBar() {
   return (
      <div className="SearchBar">
         <input placeholder="Enter a Song, Album, or Artist" />
         <button className="SearchButton">SEARCH</button>
      </div>
   );
};

export default SearchBar;
