const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
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

const Movie = require ('./models/Movie')

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

// FIND ASYNC 
const findAll = async() => {
    try{
        const result = await Movie.find()
        console.log(result)
    }
    catch(error){
        console.error("findAll error:", error)
    }
}
// findAll();


//CRUD

//CREATE - POST


//READ - GET
//UPDATE PUT/ PAT
//DELETE



// API CRUD