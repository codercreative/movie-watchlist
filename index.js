// https://www.omdbapi.com/

// fetch(`${baseUrl}${OMDB_API_KEY}&s=amelie`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
// })

const OMDB_API_KEY = `5586fb4b`;
const baseUrl = `https://www.omdbapi.com/`;

const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieSection = document.getElementById("movie-section");

searchBtn.addEventListener("click", fetchAndRenderMovies);

function fetchAndRenderMovies(e) {
  e.preventDefault();

  // Clear the existing content
  movieSection.innerHTML = "";

  let movieName = input.value;
  return fetch(`${baseUrl}?&s=${movieName}&apikey=${OMDB_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.Search;
      let html = ""; //Accumulate the HTML for all movies here

      movies.forEach(function (movie) {
        // Fetch the movie details using IMDbID
        fetch(`${baseUrl}?&i=${movie.imdbID}&apikey=${OMDB_API_KEY}`)
          .then((res) => res.json())
          .then((movieDetails) => {
            console.log(movieDetails);
            const { Poster, Title, imdbRating, Runtime, Genre, Plot } =
              movieDetails;

            // const posterUrl =
            //   Poster === "N/A" ? "images/default-poster.png" : Poster;

            const plotUrl = Plot === "N/A" ? " " : Plot;

            // Build the HTML for the movie
            const movieHtml = `
            <div class="movie-container">
              <div class="poster-container">
              <img src="${
                Poster === "N/A" ? "images/default-poster.png" : Poster
              }" alt="${Title}" class="poster">
              </div>
              <div class="movie-text-container"> 
                <div class="movie-title-container">   
                  <h2 class="movie-title">${Title}</h2>
                  <img class="star-icon" src="images/star-icon.png" alt="star icon" />
                  <p>${imdbRating}</p>
                </div>  
                <div class="movie-details-container">    
                  <span>${Runtime}</span>
                  <span>${Genre}</span>
                  <div class="movie-watchlist-container">
                     <img class="add-icon" src="images/add-icon.png" alt="plus icon" />
                    <p>Watchlist</p>
                  </div>
                </div>
                <p class="plot">${plotUrl}</p>
              </div>
            </div>`;

            // Append the movie HTML to the existing accumulated HTML
            html += movieHtml;

            // Update the movie section with the accumulated HTML
            movieSection.innerHTML = html;
          });
      });
    });
}
