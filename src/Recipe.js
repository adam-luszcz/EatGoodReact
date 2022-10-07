import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients, dishType}) => {



    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p className={style.dishType}>{dishType}</p>
            <ol className={style.ingredients}>
                {ingredients.map((ingredient, idx) => (
                    <li className={style.ingredient} key={idx + Math.random()}>{ingredient.text}</li>
                ))}
            </ol>
            <p className={style.calories}>{Math.round(calories)} calories</p>
            <img className={style.image} src={image} alt=""/>
        </div>
    );
};

export default Recipe;