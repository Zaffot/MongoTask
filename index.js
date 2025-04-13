const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());
// connect string MongoDB Atlas
const dbURI = 'mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(dbURI) 
.then((result) => { 
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => console.log("Listening port : " + PORT))
    console.log('Connected to DB');
})
.catch((err)=>{
    console.log(err);
})

const Movie = require('./models/Movie'); //kansiopolku

// add multiple movies to DB
const addMovies = async () => {
    try {
        await Movie.insertMany([
            { name: "Inception", genre: "Sci-Fi", year: 2010, price: 5 },
            { name: "The Godfather", genre: "Crime", year: 1972, price: 8 },
            { name: "Interstellar", genre: "Sci-Fi", year: 2014, price: 6 },
            { name: "Titanic", genre: "Romance", year: 1997, price: 7 },
            { name: "Joker", genre: "Drama", year: 2019, price: 4 }
        ]);
        console.log("Movies added");

    } 
    catch(error){
        console.error("Something is not right:", error); // kulema parempi tapa console.error "console.log writes to stdout and console.error to stderr"
    }
}
// Teidostojen ajo:
//addMovies();

// FIND T&C
/*
Movie.find()
.then((result) =>{
    console.log(result);
})
.catch((err)=> {
    console.log(err)
})
*/

// FIND ALL Async 
const findAll = async() => {
    try{
        const result = await Movie.find()
        console.log(result)
    }
    catch(error){
        console.error("findAll error:", error);
    }
};
//findAll();


// FIND ONE Async 
const findOneMovie = async () => {
    try {
      const result = await Movie.findOne({ genre: "Drama" });
      console.log(result);
    } catch (error) {
      console.error("findOne error:", error);
    }
  };
//findOneMovie();


// SORT Async 
const findSortedByYear = async () => {
    try {
      const result = await Movie.find().sort({ year: 1 }); // 1 = ascending
      console.log("Movies sorted by year:", result);
    } catch (error) {
      console.error("sort error:", error);
    }
  };
//findSortedByYear();
  

// LIMIT Async 
const findLimited = async () => {
    try {
      const result = await Movie.find().limit(3);
      console.log("Limited movies:", result);
    } catch (error) {
      console.error("limit error:", error);
    }
  };
//findLimited();

//FILTER(query) Async
const findFiltered = async () => {
  try {
    const result = await Movie.find({ genre: "Sci-Fi", price: { $gt: 5 } });
    console.log("Filtered movies:", result);
  } catch (error) {
    console.error("filter error:", error);
  }
};
//findFiltered();

// Filter one
const filterOne = async () => {
    try {
      const result = await Movie.find({ price: { $gt: 10 } });
      console.log("Filtered movies:", result);
    } catch (error) {
      console.error("filter error:", error);
    }
  };
//filterOne();

//CREATE Async
const createMovie = async () =>{
    try {
         const newMovie = await Movie.create({                
            name: "Inception", 
            genre: "Sci-Fi", 
            year: 2010, 
            price: 5
     }); 
     console.log("Movie added", newMovie);

    } catch(error) {
        console.error("Something is not right:", error); 
    }
};
//createMovie();

//UPDATE Async
const updateMovie = async () => {
    try {
      const updated = await Movie.findByIdAndUpdate(
        "aaa111sss444",                     // tähän laita ID
        { 
            name: "Shrek",                     // muutetava tietto
            price: 9 
        },                                  
        { new: true }                       
      );
  
      if (updated) {
        console.log("Movie updated:", updated);
      } else {
        console.log("Movie not found.");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  
// updateMovie();

//DELETE Async
const deleteMovie = async () => {
    try {
      const deleted = await Movie.findByIdAndDelete("aaa11aasdwwas5124"); // tähän oikea ID
  
      if (deleted) {
        console.log("Movie deleted:", deleted);
      } else {
        console.log("Movie not found.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  
  //deleteMovie();

//---------------//

//CRUD API

//CREATE - POST

app.post('/movies', async (req,res)=>{
    try {
        const newMovie = await Movie.create(req.body)
            console.log("Movie added", newMovie);
            res.status(201).json(newMovie);} 
    catch(error){
        console.error("Something is not right:", error);
        res.status(500).json({ error: "Could not add movie." }); 
    }
});
// PostaManiin body 
/*
{
  "name": "Interstellar",
  "genre": "Sci-Fi",
  "year": 2014,
  "price": 7
} 
*/
// PostaManiin body 
/*

*/

//READ - GET ALL

app.get('/movies', async (req,res)=>{
    try{
        const result = await Movie.find()
        res.json(result);
    }
    catch(error){
        console.error("Not found", error);
        res.status(500).json({error: "Could not fetch movies."});
    }
});
// GET one by ID
app.get('/movies/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found." });
          }
        res.json(movie);
    }
    catch(error){
        console.error("Not found", error);
        res.status(500).json({error: "Could not fetch a movie."});
    }
});
//UPDATE PUT/ Korvaa koko dokokumentin 
app.put('/movies/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const updateMovie = await Movie.findByIdAndUpdate(id, req.body,{new: true});
        if (!updateMovie) {
            return res.status(404).json({ error: "Movie not found." });
          }
        res.json(updateMovie);
    }
    catch(error){
        console.error("Not found", error);
        res.status(500).json({error: "Could not update a movie."});
    }
});
// PostaManiin body esim. 
/*
osoite+ID sitten:
{
  "name": "Interstellar",
  "genre": "Sci-Fi",
  "year": 2014,
  "price": 7
}
*/


//UPDATE PATCH vain annettu kenttä
app.patch('/movies/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const updateMovie = await Movie.findByIdAndUpdate(id, req.body,{new: true});
        if (!updateMovie) {
            return res.status(404).json({ error: "Movie not found." });
          }
        res.json(updateMovie);
    }
    catch(error){
        console.error("Not found", error);
        res.status(500).json({error: "Could not update a movie."});
    }
});

// PostaManiin body esim. 
/*
osoite/id - sitten bodyyn:
{
  "price": 15
}
*/
//DELETE

app.delete('/movies/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const deleteMovie = await Movie.findByIdAndDelete(id);
        if (!deleteMovie) {
            return res.status(404).json({ error: "Movie not found." });
        }
        res.json("Movie Deleted");

    } catch(error) {
        console.error("Not found", error);
        res.status(500).json({error: "Could not fetch a movie."});
    }
});


