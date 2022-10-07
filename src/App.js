import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import Backdrop from './Backdrop';
import './App.css';
import foodList from './food.json';

const App = () => {
    const APP_ID = '40338a40';
    const APP_KEY = '17d384dd82710a2503e421e4a0621d77';

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('burger');

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        if (!query) {
            return;
        }
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    };

    const getRandomRecipes = async e => {
        e.preventDefault();
        const num = Math.floor(Math.random() * (foodList.length - 1));
        setSearch(foodList[num]);
        setQuery(foodList[num]);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
    };

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };

    return (
        <div className="App">
            <Backdrop />
            <form onSubmit={getSearch} className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    value={search}
                    onChange={updateSearch}
                />
                <button className="search-button" type="submit">
                    Search
                </button>
                <button className="random-button" onClick={getRandomRecipes}>
                    Suprise me!
                </button>
            </form>
            <div className="recipes">
                {recipes.map(recipe => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                        dishType={recipe.recipe.dishType}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
