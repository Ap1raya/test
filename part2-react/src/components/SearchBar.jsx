import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <input
        id="search-input"
        type="text"
        placeholder="e.g., Chicken, Pasta, Thai..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
