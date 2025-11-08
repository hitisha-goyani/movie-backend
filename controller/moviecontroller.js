import HttpError from "../middleware/errorHandler.js";
import Movie from "../model/movie.js";



// Add a new movie
 const addMovie = async (req, res,next) => {
  try {
    const { title,genere, year,rating } = req.body;

    const image = req.file ? req.file.filename : null;

    const newMovie = {
       title, 
       genere, 
       year,
       rating ,
       image
    }

    const movie = new Movie(newMovie);

     if (!movie) {
      return next(new HttpError("failed to add movie", 500));
    }

    await movie.save();

    res.redirect("/movie/get");
  } catch (error) {
    next(new HttpError(error.message,500))
  }
};
// Get all movies
const getMovies = async (req, res,next) => {
  try {

    const movies = await Movie.find();

     if (!movies) {
      return next(new HttpError("movie not found", 404));
    }
      res.render("index", { movies }); 

  } catch (error) {
      next(new HttpError(error.message,500))
  }
};



// Get a single movie 
const getMovieById = async (req, res,next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({message: "Movie not found",});
    }

        res.render("edit", { movie });
  } catch (error) {
    next(new HttpError(error.message,500))
  }
};

// Update movie
const updateMovie = async (req, res,next) => {
  try {
    const { title,genere, year,rating } = req.body;

    const updateData = { title,genere, year,rating  };

    if (req.file) {
      updateData.image = req.file.filename;
    }
    const id = req.params.id;

  
    await Movie.findByIdAndUpdate(id, updateData);
    res.redirect("/movie/get");
  } catch (error) {
      next(new HttpError(error.message,500))
  }
};

// Delete movie
const deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movie/get");
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};


export  {addMovie,getMovies,getMovieById, updateMovie,deleteMovie  }