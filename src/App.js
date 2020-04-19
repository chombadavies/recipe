import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = 'eec3253b'
  const APP_KEY = '19e659c2fc754499c55fc8a6b2433a15'

  const [recipes, setRecipes] = useState([]); 
 const [search, setSearch]= useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes(); 
  }, [query])



  const getRecipes = async () => {
    const response = await fetch
    (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits); 
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
    console.log(search)
   

  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('')
  } 

  return (
    <div className="App">
      <form onSubmit = {getSearch} className='search-form' >
        <input type='text' className='search-bar' value ={search} onChange ={updateSearch} />
        <button type='submit' className='search-button' >SEARCH</button>
      </form>
      <div className ="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key ={recipe.recipe.label}
        title= {recipe.recipe.label}
        calories ={recipe.recipe.calories} 
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  ); 
}

export default App;
