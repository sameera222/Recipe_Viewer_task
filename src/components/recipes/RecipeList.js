import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRecipe,
  addFavorite,
  updateRecipesOrder,
} from "../../redux/recipesSlice";
import styles from "./RecipeList.module.scss";
import { gsap } from "gsap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RecipeList = () => {
  const recipes = useSelector((state) => state.recipes.items);
  const dispatch = useDispatch();

  const handleSelect = (recipe) => {
    dispatch(selectRecipe(recipe));
    gsap.to(".recipe-detail", {
      opacity: 0,
      duration: 0.5,
      onComplete: () =>
        gsap.to(".recipe-detail", { opacity: 1, duration: 0.5 }),
    });
  };

  const handleFavorite = (id) => {
    dispatch(addFavorite(id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedRecipes = [...recipes];
    const [removedRecipe] = updatedRecipes.splice(startIndex, 1);
    updatedRecipes.splice(endIndex, 0, removedRecipe);

    dispatch(updateRecipesOrder(updatedRecipes));
  };

  return (
    <div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="recipes">
            {(provided) => (
              <div
                className={styles.recipeList}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {recipes.map((recipe, index) => (
                  <Draggable
                    key={recipe.idMeal}
                    draggableId={recipe.idMeal}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={styles.recipeItem}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleSelect(recipe)}
                      >
                        <h3>{recipe.strMeal}</h3>
                        <button onClick={() => handleFavorite(recipe.idMeal)}>
                          {recipe.isFavorite ? "Unfavorite" : "Favorite"}
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default RecipeList;
