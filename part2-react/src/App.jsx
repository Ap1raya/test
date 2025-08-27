import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MealCard from './components/MealCard';


function App() {
  // State สำหรับ meals, searchTerm, isLoading, error
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch ข้อมูลเมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    if (!searchTerm) {
      setMeals([]);
      setError(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setMeals(data.meals);
          setError(null);
        } else {
          setMeals([]);
          setError('No meals found.');
        }
      })
      .catch(() => {
        setMeals([]);
        setError('Failed to fetch data.');
      })
      .finally(() => setIsLoading(false));
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container">
      <header>
        <h1>🍳 Recipe Finder (React)</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <div className="results-grid">
          {/* Conditional Rendering */}
          {isLoading ? (
            <div className="status-message">Loading...</div>
          ) : error ? (
            <div className="status-message">{error}</div>
          ) : meals.length > 0 ? (
            meals.map(meal => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          ) : searchTerm ? (
            <div className="status-message">No recipes found.</div>
          ) : (
            <div className="placeholder">Type something in the search box to find recipes!</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;