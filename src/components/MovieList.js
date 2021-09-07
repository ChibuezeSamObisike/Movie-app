import React, { Component } from "react";
const MovieList = ({
  movies,
  favouriteComponent: FavouriteComponent,
  handleFavouriteClick,
}) => {
  return (
    <React.Fragment>
      {movies.map((movie, index) => {
        return (
          <div className="d-flex image-container justify-content-center m-3">
            <img src={movie.Poster} className="img-container" alt="movie"></img>
            <div
              onClick={() => handleFavouriteClick(movie)}
              className="overlay d-flex align-items justify-content-center"
            >
              <FavouriteComponent />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default MovieList;
