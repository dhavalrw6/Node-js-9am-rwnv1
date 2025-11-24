import { Router } from "express";
import { addMoviePage, deshboard, addMovie, viewMovies, deleteMovie } from "../../controllers/server/adminPanel.controller.js";
import imageUpload from "../../middlewares/imageUpload.js";

const adminPanelRouter = Router();

adminPanelRouter.get('/',deshboard);
adminPanelRouter.get('/add-movie',addMoviePage);
adminPanelRouter.post('/add-movie',imageUpload,addMovie);
adminPanelRouter.get('/view-movies',viewMovies);

// delete movie data 
adminPanelRouter.get('/delete/movie/:id',deleteMovie);


export default adminPanelRouter;