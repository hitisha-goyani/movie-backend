import express from "express";
import { addMovie, deleteMovie, getMovieById, getMovies, updateMovie } from "../controller/moviecontroller.js";
import uploads from "../middleware/fileUpload.js";

const router = express.Router();

//add movie and image
router.get("/", (req, res) => {
  res.render("add");
});

router.get("/add", (req, res) => {
  res.render("add");
});
router.post("/add", uploads.single("image"), addMovie);
//get all movie
router.get("/get", getMovies);
//get specific movie
router.get("/edit/:id", getMovieById);
//edit movie and image
router.post("/edit/:id", uploads.single("image"), updateMovie);
//delete movie
router.get("/delete/:id", deleteMovie);


export default router;
