import React from "react";
import { useSelector } from "react-redux";
import styles from "./RecipeDetail.module.scss";

const RecipeDetail = () => {
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  console.log(selectedRecipe, "se");

  return (
    <div>
      {selectedRecipe === null && (
        <h1>Please select a recipe to see details.</h1>
      )}

      <div
        className={`${styles.recipeDetail} ${
          selectedRecipe ? styles.show : ""
        }`}
      >
        {selectedRecipe && (
          <>
            <h2>{selectedRecipe.strMeal}</h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
            />
            <p>{selectedRecipe.strInstructions}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
