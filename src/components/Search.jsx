import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24">
          <path d="M15.78 13.59h-.79l-.28-.27a9.48 9.48 0 0 0 2.29-6.1A9.52 9.52 0 0 0 7.5 0 9.52 9.52 0 0 0 0 9.52 9.52 9.52 0 0 0 7.5 19a9.48 9.48 0 0 0 6.1-2.29l.27.28v.79l5.76 5.74a1 1 0 0 0 1.42-1.42l-5.74-5.76zm-6.27 0a6.93 6.93 0 1 1 0-13.86 6.93 6.93 0 0 1 0 13.86z" />
        </svg>
      </button>
    </form>
  );
};

export default Search;