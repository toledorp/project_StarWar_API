console.log("Film details page loaded");

function getFilmIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function showLoadingFilmDetails() {
    document.getElementById("loadingFilmDetails").style.display = "block";
}

function hideLoadingFilmDetails() {
    document.getElementById("loadingFilmDetails").style.display = "none";
}

async function fetchResourceNames(urls) {
    try {
        const requests = urls.map((url) => fetch(url).then((response) => response.json()));
        const results = await Promise.all(requests);

        return results.map((item) => item.name || item.title);
    } catch (error) {
        console.error("Error fetching related resources:", error);
        return [];
    }
}

function createListItems(items) {
    if (items.length === 0) {
        return "<li>Not available</li>";
    }

    return items.map((item) => `<li>${item}</li>`).join("");
}

async function loadFilmDetails() {
    const filmId = getFilmIdFromUrl();
    const filmDetails = document.getElementById("filmDetails");

    if (!filmId) {
        filmDetails.innerHTML = "<p>Film not found.</p>";
        return;
    }

    showLoadingFilmDetails();
    filmDetails.innerHTML = "";

    try {
        const response = await fetch(`https://swapi.dev/api/films/${filmId}/`);
        const film = await response.json();

        const [characters, planets, starships] = await Promise.all([
            fetchResourceNames(film.characters),
            fetchResourceNames(film.planets),
            fetchResourceNames(film.starships)
        ]);

        filmDetails.innerHTML = `
            <h3>Episode ${film.episode_id}: ${film.title}</h3>
            <p><strong>Director:</strong> ${film.director}</p>
            <p><strong>Producer:</strong> ${film.producer}</p>
            <p><strong>Release Date:</strong> ${film.release_date}</p>

            <div class="details-block">
                <h4>Opening Crawl</h4>
                <p>${film.opening_crawl.replace(/\r\n/g, "<br>")}</p>
            </div>

            <div class="details-block">
                <h4>Characters</h4>
                <ul>
                    ${createListItems(characters)}
                </ul>
            </div>

            <div class="details-block">
                <h4>Planets</h4>
                <ul>
                    ${createListItems(planets)}
                </ul>
            </div>

            <div class="details-block">
                <h4>Starships</h4>
                <ul>
                    ${createListItems(starships)}
                </ul>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching film details:", error);
        filmDetails.innerHTML = "<p>Error loading film details.</p>";
    } finally {
        hideLoadingFilmDetails();
    }
}

loadFilmDetails();