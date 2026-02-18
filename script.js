const API_KEY = "fc4df188a2e850a9372bd505ad7a98f9";

const moviesDiv = document.querySelector(".movies");
const searchInput = document.getElementById("searchInput");

function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      moviesDiv.innerHTML = "";

      data.results.forEach(movie => {
        if (movie.poster_path) {

          const poster =
            "https://image.tmdb.org/t/p/w500" + movie.poster_path;

          moviesDiv.innerHTML += `
            <div class="movie-card">
              <img src="${poster}">
              <h3>${movie.title}</h3>
              <a href="https://www.youtube.com/results?search_query=${movie.title}+trailer"
                 target="_blank">
                 Watch Trailer
              </a>
            </div>
          `;
        }
      });
    });
}

// ===== CATEGORIES =====

function loadPopular() {
  fetchMovies("https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY);
}

function loadTrending() {
  fetchMovies("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY);
}

function loadTopRated() {
  fetchMovies("https://api.themoviedb.org/3/movie/top_rated?api_key=" + API_KEY);
}

// ===== SEARCH =====

searchInput.addEventListener("keyup", function () {
  const text = searchInput.value;

  if (text.length > 2) {
    fetchMovies(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      API_KEY +
      "&query=" +
      text
    );
  } else {
    loadPopular();
  }
});

// ===== AUTO LOAD =====
loadPopular();
const notifyBtn = document.getElementById("notifyBtn");

if ("Notification" in window) {

  notifyBtn.addEventListener("click", () => {

    Notification.requestPermission().then(permission => {

      if (permission === "granted") {

        new Notification("🎬 FlickZone", {
          body: "You will now receive notifications about new movies!"
        });

        setInterval(() => {
          new Notification("🔥 New Movies Added!", {
            body: "Visit FlickZone to discover new movies today!"
          });
        }, 3600000); // every 1 hour

      }

    });

  });

}