
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from './redux/recipesSlice';
import RecipeList from './components/recipes/RecipeList';
import RecipeDetail from './components/recipes/RecipeDetail';
import styles from './App.module.scss';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <div className={styles.recipeListContainer}>
        <RecipeList />
      </div>
      <div className={`recipe-detail ${styles.recipeDetailContainer}`}>
        <RecipeDetail />
      </div>
    </div>
  );
};

export default App;

