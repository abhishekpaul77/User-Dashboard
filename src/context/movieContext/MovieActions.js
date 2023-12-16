export const getMoviesStart = () => ({
  type: "GET_MOVIES_START",
});

export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = () => ({
  type: "GET_MOVIES_FAILURE",
});

export const CreateMoviesStart = () => ({
  type: "CREATE_MOVIES_START",
});

export const CreateMoviesSuccess = (movie) => ({
  type: "CREATE_MOVIES_SUCCESS",
  payload: movie,
});

export const CreateMoviesFailure = () => ({
  type: "CREATE_MOVIES_FAILURE",
});

export const updateMovieStart = () => ({
  type: "UPDATE_MOVIE_START",
});

export const updateMovieSuccess = (movie) => ({
  type: "UPDATE_MOVIE_SUCCESS",
  payload: movie,
});

export const updateMovieFailure = () => ({
  type: "UPDATE_MOVIE_FAILURE",
});

export const deleteMovieStart = () => ({
  type: "DELETE_MOVIE_START",
});
export const deleteMovieSuccess = (id) => ({
  type: "DELETE_MOVIE_SUCCESS",
  payload:id
});
export const deleteMovieFailure = () => ({
  type: "DELETE_MOVIE_FAILURE",
});
