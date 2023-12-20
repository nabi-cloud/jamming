import React from 'react';

import './SearchBar.css';

function SearchBar() {
   return (
      <div className="SearchBar">
         <input placeholder="Enter a song title" />
         <button className="SearchButton">SEARCH</button>
      </div>
   );
};

export default SearchBar;
