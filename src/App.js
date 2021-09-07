import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

//Get items from local storage
const getItemsfromStorage = () => {
  const item = localStorage.getItem("favourites");
  return JSON.parse(item);
};

//Set's the item in local storage
const saveToLocalStorage = (items) => {
  localStorage.setItem("favourites", JSON.stringify(items));
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourties, setFavourites] = useState(
    getItemsfromStorage() ? getItemsfromStorage() : []
  );

  //API call here
  const getMovieRequest = async () => {
    try {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cad42c6`;
      const repsonse = await fetch(url);
      const responseJson = await repsonse.json();
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
      console.log(responseJson);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => getMovieRequest(), [searchValue]);

  const addFavourite = (movie) => {
    const newFav = [...favourties, movie];
    saveToLocalStorage(newFav);
    setFavourites(newFav);
  };

  const removeFavouriteMovie = (movie) => {
    const newMov = favourties.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newMov);
    saveToLocalStorage(newMov);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          favouriteComponent={AddFavourite}
          movies={movies}
          handleFavouriteClick={addFavourite}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          favouriteComponent={RemoveFavourites}
          movies={favourties}
          handleFavouriteClick={removeFavouriteMovie}
        />
      </div>
    </div>
  );
}

export default App;
