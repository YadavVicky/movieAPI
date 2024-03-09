const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();

//Movie Details
var movies = [
    {genre: "horror", title: "annabelle doll", id: uuidv4()}
];

//For this project, I will not use MongoDB since I need to provide API Key and also create Schema for the same. Still I have created Model Folder.
//There You will find the Schema which we can use here

//we will use below code to connect to MongoDB Server
// mongoose.connect('mongodb+srv://YOUR_CRED.fjy4n.mongodb.net/******?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, 'Connection error:'));
// db.once("open",()=>{
//     console.log("Database connected");
// })

//when sending data through JSON
app.use(bodyParser.json());

//cors
app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});

//Routes

//##########################
//          MOVIES
//##########################
app.get('/movies', async (req, res)=>{
    res.status(200).json(movies);
});

//##########################
//          SEARCH
//##########################
app.get('/search', async (req, res)=>{
    let query = req.query;
    let subQuery = query.q.split(":");
    let category = subQuery[0];
    let name = subQuery[1];
    let result = []; 
    if(movies.length > 0){
        for(let movie of movies){
            if(category === "title"){
                if(movie.title.includes(name)){
                    result.push(movie);
                }
            }else{
                if(movie.genre === name){
                    result.push(movie);
                }
            }
        }
    }
    if(result.length === 0){
        res.status(200).json({message: "No Movies Found.", "category" : category, "name" : name});
    }else{
        res.status(200).json({message: "Your Movies.", "category" : category, "name" : name, "result": result});
    }
});

//##########################
//          ADD
//##########################
app.post('/movies', async (req, res)=>{
    const { title, genre, admin } = req.body;
    // checking for Admin
    if(admin === true){
        //here we add add title and genre check, whether details are present or not.
        await movies.push({title, genre, id: uuidv4()});
        res.status(200).json({message: "Added Sucessfully."}); 
    }else{
        res.status(200).json({message: "You don't have Cred To Proceed."}); 
    }
});

//##########################
//          UPDATE
//##########################
app.put('/movies/:id', async (req, res)=>{
    //Get the Params
    const { id } = req.params;
    const { title, genre, admin } = req.body;
    //checking for Admin
    // here we use mongoose method findByIdAndUpdate to update.
    if(admin === true){
        movies = movies.filter((movie)=>movie.id !== id);
        movies.push({ id, title, genre });
        res.status(200).json({message: "Updated Sucessfully."}); 
    }else{
        res.status(200).json({message: "You don't have Cred To Proceed."});
    }
    
});

//##########################
//          DELETE
//##########################
app.delete('/movies/:id', async (req, res)=>{
    //Get the Params
    const { id } = req.params;
    const { admin } = req.body;
    //checking for Admin
    // here we use mongoose method findByIdAndDelete to delete.
    if(admin === true){
        movies = movies.filter((movie)=>movie.id !== id);
        res.status(200).json({message: "Deleted Sucessfully."}); 
    }else{
        res.status(200).json({message: "You don't have Cred To Proceed."});
    }
    
});

//server line
app.listen(4000, ()=>{
	console.log('Server Started!!');
})

