console.log("Films page loaded");

function showLoadingFilms() {
    document.getElementById("loadingFilms").style.display = "block";
}

function hideLoadingFilms() {
    document.getElementById("loadingFilms").style.display = "none";
}

async function loadFilms() {
    showLoadingFilms();

    try {
        const response = await fetch("https://swapi.dev/api/films/");
        const data = await response.json();

        renderFilms(data.results);

    } catch (error) {
        console.error("Error fetching films:", error);
        document.getElementById("filmsList").innerHTML = "<p>Error loading films.</p>";
    } finally {
        hideLoadingFilms();
    }
}

function renderFilms(films) {
    const filmsList = document.getElementById("filmsList");
    filmsList.innerHTML = "";

    if (films.length === 0) {
        filmsList.innerHTML = "<p>No films found.</p>";
        return;
    }

    const sortedFilms = [...films].sort((a, b) => a.episode_id - b.episode_id);

    sortedFilms.forEach((film) => {
        const filmCard = document.createElement("div");

        filmCard.innerHTML = `
            <h3>Episode ${film.episode_id}: ${film.title}</h3>
            <p><strong>Director:</strong> ${film.director}</p>
            <p><strong>Producer:</strong> ${film.producer}</p>
            <p><strong>Release Date:</strong> ${film.release_date}</p>
            <p><strong>Opening Crawl:</strong> ${film.opening_crawl.substring(0, 180)}...</p>
        `;

        filmsList.appendChild(filmCard);
    });
}

loadFilms();