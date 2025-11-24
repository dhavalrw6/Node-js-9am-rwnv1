import Movie from "../../models/movie.model.js";
import fs from "fs";
export const deshboard = (req,res)=>{
    return res.render('./server/index.ejs');
}

export const addMoviePage = (req,res)=>{
    return res.render('./server/pages/addMovie.ejs');
}

export const addMovie = async(req,res)=>{
    try {
        req.body.image = req.file.path;      
        let data = await Movie.create(req.body);
        console.log(data);        
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        return res.redirect(req.get('Referrer') || '/');
    }
}

export const viewMovies =async(req,res)=>{
    try {
        let movies = await Movie.find({});
        return res.render('./server/pages/view-movies.ejs',{
            movies
        });
    } catch (error) {
        console.log(error.message);        
        return res.render('./server/pages/view-movies.ejs',{
            movies:[]
        });
    }
}

export const deleteMovie = async(req,res)=>{
    try {
        let {id} = req.params;
        let data = await Movie.findByIdAndDelete(id);
        fs.unlinkSync(data.image);    
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);        
        return res.redirect(req.get('Referrer') || '/');
    }
}