import React, { useState, useEffect } from 'react';

import './SearchBar.css';

function SearchBar({ onSearch }) {
   const [term, setTerm] = useState('');

   // Effect to retrieve the search term from local storage on component mount
   useEffect(() => {
      const storedTerm = localStorage.getItem('searchTerm');
      if (storedTerm) {
         setTerm(storedTerm);
      }
   }, []); // Empty dependency array ensures this effect runs only once on mount

   // Method to search a term
   const search = () => {
      onSearch(term);
   };

   // Event handler when term is typed in input
   const handleTermChange = (event) => {
      const newTerm = event.target.value;
      setTerm(newTerm);
   
      // Store the search term in local storage
      localStorage.setItem('searchTerm', newTerm);
   };

   // Event handler when searching on key press
   const handleKeyPress = (event) => {
      // Check if the pressed key is "Enter"
      if (event.key === 'Enter' || event.key === 'Go' || event.key === 'Search') {
         onSearch(term);
      }
   };

   return (
      <div className="SearchBar">
         <input
            {...{
               placeholder: "Enter a song title",
               onChange: handleTermChange,
               onKeyDown: handleKeyPress,
               id: 'searchTerm',
               value: term
            }}
         />
         <button className="SearchButton" 
            onClick={ search }
         ><i className="fa-solid fa-magnifying-glass"></i> SEARCH</button>
      </div>
   );
};

export default SearchBar;
