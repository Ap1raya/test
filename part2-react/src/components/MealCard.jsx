import React from "react";

const MealCard = ({ meal }) => (
    <div className="meal-card">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h3>{meal.strMeal}</h3>
        <h3>Category: {meal.strCategory}</h3>
        <h3>Area: {meal.strArea}</h3>
    </div>
);

export default MealCard;
