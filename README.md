# To access it, 

Just Install the packages by npm install

Used Port No. 4000,

To start the server type: "npm run serve"

To See all the movies use 
"http://localhost:4000/movies"

I have added a default movie.

To Search a movie,
# "http://localhost:4000/search/?q=SEARCH"

in SEARCH, please write in this format:- title:annabelle or genre:horror

For all the steps below, you need to use POSTMAN or Other Application to make API calls for PUT, POST, DELETE.

Because browser can only understand GET and POST, additionally we need to add req.body for title and genre.

To Add a movie
# "http://localhost:4000/movies" Note this is a POST Call.

We will send data in body like this:-
{
            "title": "mission impossible",
            "genre": "horror",
            "admin": true
}

Note if admin value is not given it will not add the movie and return a different message

Once you get the success message, please go to your browser and again make # "http://localhost:4000/movies" call to se your movie added.

To Update Details a movie
# "http://localhost:4000/movies/ID" Note this is a PUT Call.

Add the ID from the movie

We will send data in body like this:-
{
            "title": "mission impossible",
            "genre": "thriller",
            "admin": true
}

Note if admin value is not given it will not add the movie and return a different message

Once you get the success message, please go to your browser and again make # "http://localhost:4000/movies" call to se your movie updated.

To Delete a movie
# "http://localhost:4000/movies/ID" Note this is a DELETE Call.

Add the ID from the movie

We will send data in body like this:-
{
            "admin": true
}

Note if admin value is not given it will not add the movie and return a different message

Once you get the success message, please go to your browser and again make # "http://localhost:4000/movies" call to se your movie deleted.

Note, I have not used MongoDB but I have added the code and commented that out. Since I don't want to share the API_KEY on GitHub.

Also, for testing scripts, we usually work in a large team and don't write any test scripts as it is taken care by other team members.


