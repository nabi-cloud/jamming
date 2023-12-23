import React, { useState } from 'react';

import './SearchBar.css';

function SearchBar({ onSearch }) {
   const [term, setTerm] = useState('');

   // Method to search a term
   const search = () => {
      onSearch(term);
   };

   // Event handler when term is typed in input
   const handleTermChange = (event) => {
      setTerm(event.target.value);
      event.preventDefault();
   };

   // Event handler when searching on key press
   const handleKeyPress = (event) => {
      // Check if the pressed key is "Enter"
      if (event.key === 'Enter') {
         onSearch(term);

         // Check if the pressed key is "Return"
      } else if (event.key === 'Return') {
         onSearch(term);
      }
   };

   return (
      <div className="SearchBar">
         <input
            placeholder="Enter a song title"
            onChange={ handleTermChange }
            onKeyDown={ handleKeyPress }
         />
         <button className="SearchButton" 
            onClick={ search }
         >SEARCH</button>
      </div>
   );
};

export default SearchBar;
