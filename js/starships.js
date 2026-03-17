console.log("Starships page loaded");

function showLoadingStarships() {
    document.getElementById("loadingStarships").style.display = "block";
}

function hideLoadingStarships() {
    document.getElementById("loadingStarships").style.display = "none";
}

function getStarshipId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function loadStarships() {
    showLoadingStarships();

    try {
        const response = await fetch("https://swapi.dev/api/starships/");
        const data = await response.json();

        renderStarships(data.results);

    } catch (error) {
        console.error("Error fetching starships:", error);
    } finally {
        hideLoadingStarships();
    }
}

function renderStarships(starships) {
    const container = document.getElementById("starshipsList");
    container.innerHTML = "";

    starships.forEach((ship) => {
        const id = getStarshipId(ship.url);

        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${ship.name}</h3>
            <p><strong>Model:</strong> ${ship.model}</p>
            <p><strong>Manufacturer:</strong> ${ship.manufacturer}</p>
            <p><strong>Crew:</strong> ${ship.crew}</p>

            <a href="./starship-details.html?id=${id}">View Details</a>
        `;

        container.appendChild(card);
    });
}

loadStarships();