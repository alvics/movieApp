
$(document).ready(() => {
  $('#searchForm').on('submit', e => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  let loader = `<div class="spinner-border mb-3" style="margin: 0 auto"></div>`;
  document.getElementById('movies').innerHTML = loader;
  axios
    .get('https://www.omdbapi.com/?&apikey=db5f16ed&s=' + searchText)
    .then(function(response) {
      // handle success
      // console.log(response);
      let movies = response.data.Search;
      let output = '';
      movies.forEach(movie => {
        output += `
              <div class="col-md-3">
               <div class="text-center">
                <img src='${movie.Poster}' style="height:240px;" class="img-fluid mt-4">
                 <h5 class="text-white pt-3">${movie.Title}</h5>
                 <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="movie.html">Movie Details</a>
               </div>
              </div>
              `;
        // console.log(movie.Title);
      });
      $('#movies').html(output) = result;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}

// Movies Details in Session Storage
function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios
    .get('https://www.omdbapi.com/?&apikey=db5f16ed&i=' + movieId)
    .then(function(response) {
      // handle success
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
           <div class="col-md-4">
             <img src="${movie.Poster}" class="img-fluid mt-3">
           </div>
          <div class="col-md-8 mb-5">
             <h2 class="text-white mt-4" style="opacity:0.8">${movie.Title}</h2>
             <ul class="list-group mt-5">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rate}</li>
                <li class="list-group-item"><strong>IMBD Rating:</strong> ${movie.imbdRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
             </ul>
          </div>
        </div>

        <div class="row">
        <div class="bg-dark text-white p-5 w-100 rounded" style="margin-top:-15px">
        <h2>Plot</h2>
        <p>${movie.Plot}</p>
        <hr>
        <a href="https://imdb.com/title/${movie.imdbID}" teaget="blank" class="btn btn-secondary">View IMDB</a>
        <a href="index.html" class="btn btn-primary">Back to Search</a>
        </div>
        </div>
      `;
      $('#movie').html(output);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}
