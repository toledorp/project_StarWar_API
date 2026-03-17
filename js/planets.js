console.log("Planets page loaded");

function showLoadingPlanets() {
    document.getElementById("loadingPlanets").style.display = "block";
}

function hideLoadingPlanets() {
    document.getElementById("loadingPlanets").style.display = "none";
}

function getPlanetId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function loadPlanets() {
    showLoadingPlanets();

    try {
        const response = await fetch("https://swapi.dev/api/planets/");
        const data = await response.json();

        renderPlanets(data.results);

    } catch (error) {
        console.error("Error fetching planets:", error);
        document.getElementById("planetsList").innerHTML = "<p>Error loading planets.</p>";
    } finally {
        hideLoadingPlanets();
    }
}

function renderPlanets(planets) {
    const planetsList = document.getElementById("planetsList");
    planetsList.innerHTML = "";

    if (planets.length === 0) {
        planetsList.innerHTML = "<p>No planets found.</p>";
        return;
    }

    planets.forEach((planet) => {
        const planetId = getPlanetId(planet.url);
        const planetCard = document.createElement("div");

        planetCard.innerHTML = `
            <h3>${planet.name}</h3>
            <p><strong>Climate:</strong> ${planet.climate}</p>
            <p><strong>Terrain:</strong> ${planet.terrain}</p>
            <p><strong>Population:</strong> ${planet.population}</p>
            <a href="./planet-details.html?id=${planetId}">View Details</a>
        `;

        planetsList.appendChild(planetCard);
    });
}

loadPlanets();