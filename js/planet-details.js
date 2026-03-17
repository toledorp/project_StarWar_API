console.log("Planet details page loaded");

function getPlanetIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function showLoadingPlanetDetails() {
    document.getElementById("loadingPlanetDetails").style.display = "block";
}

function hideLoadingPlanetDetails() {
    document.getElementById("loadingPlanetDetails").style.display = "none";
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

async function loadPlanetDetails() {
    const planetId = getPlanetIdFromUrl();
    const planetDetails = document.getElementById("planetDetails");

    if (!planetId) {
        planetDetails.innerHTML = "<p>Planet not found.</p>";
        return;
    }

    showLoadingPlanetDetails();
    planetDetails.innerHTML = "";

    try {
        const response = await fetch(`https://swapi.dev/api/planets/${planetId}/`);
        const planet = await response.json();

        const [residents, films] = await Promise.all([
            fetchResourceNames(planet.residents),
            fetchResourceNames(planet.films)
        ]);

        planetDetails.innerHTML = `
            <h3>${planet.name}</h3>
            <p><strong>Climate:</strong> ${planet.climate}</p>
            <p><strong>Terrain:</strong> ${planet.terrain}</p>
            <p><strong>Population:</strong> ${planet.population}</p>
            <p><strong>Diameter:</strong> ${planet.diameter}</p>
            <p><strong>Gravity:</strong> ${planet.gravity}</p>
            <p><strong>Rotation Period:</strong> ${planet.rotation_period}</p>
            <p><strong>Orbital Period:</strong> ${planet.orbital_period}</p>
            <p><strong>Surface Water:</strong> ${planet.surface_water}</p>

            <div class="details-block">
                <h4>Residents</h4>
                <ul>
                    ${createListItems(residents)}
                </ul>
            </div>

            <div class="details-block">
                <h4>Films</h4>
                <ul>
                    ${createListItems(films)}
                </ul>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching planet details:", error);
        planetDetails.innerHTML = "<p>Error loading planet details.</p>";
    } finally {
        hideLoadingPlanetDetails();
    }
}

loadPlanetDetails();