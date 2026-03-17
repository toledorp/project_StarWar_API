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

function getResourceId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function fetchResources(urls) {
    try {
        const requests = urls.map((url) => fetch(url).then((response) => response.json()));
        const results = await Promise.all(requests);

        return results.map((item) => ({
            name: item.name || item.title,
            url: item.url
        }));
    } catch (error) {
        console.error("Error fetching related resources:", error);
        return [];
    }
}

function createResourceList(items, type) {
    if (items.length === 0) {
        return "<p>Not available</p>";
    }

    return `
        <div class="resource-grid-list">
            ${items.map((item) => {
                const id = getResourceId(item.url);

                if (type === "people") {
                    return `<a class="resource-tag" href="./details.html?id=${id}">${item.name}</a>`;
                }

                if (type === "films") {
                    return `<a class="resource-tag" href="./film-details.html?id=${id}">${item.name}</a>`;
                }

                return `<span class="resource-tag">${item.name}</span>`;
            }).join("")}
        </div>
    `;
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
            fetchResources(planet.residents),
            fetchResources(planet.films)
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
                ${createResourceList(residents, "people")}
            </div>

            <div class="details-block">
                <h4>Films</h4>
                ${createResourceList(films, "films")}
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