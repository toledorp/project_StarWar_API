console.log("Species page loaded");

function showLoadingSpecies() {
    document.getElementById("loadingSpecies").style.display = "block";
}

function hideLoadingSpecies() {
    document.getElementById("loadingSpecies").style.display = "none";
}

function getSpeciesId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function loadSpecies() {
    showLoadingSpecies();

    try {
        const response = await fetch("https://swapi.dev/api/species/");
        const data = await response.json();

        renderSpecies(data.results);

    } catch (error) {
        console.error("Error fetching species:", error);
    } finally {
        hideLoadingSpecies();
    }
}

function renderSpecies(speciesListData) {
    const speciesList = document.getElementById("speciesList");
    speciesList.innerHTML = "";

    speciesListData.forEach((species) => {
        const id = getSpeciesId(species.url);

        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${species.name}</h3>
            <p><strong>Classification:</strong> ${species.classification}</p>
            <p><strong>Language:</strong> ${species.language}</p>
            <p><strong>Average Lifespan:</strong> ${species.average_lifespan}</p>
            <a href="./species-details.html?id=${id}">View Details</a>
        `;

        speciesList.appendChild(card);
    });

    const unspecifiedCard = document.createElement("div");

    unspecifiedCard.innerHTML = `
        <h3>Unspecified Species</h3>
        <p><strong>Classification:</strong> Unknown</p>
        <p><strong>Language:</strong> Not informed</p>
        <p><strong>Average Lifespan:</strong> Not informed</p>
        <a href="./unspecified-species.html">View Details</a>
    `;

    speciesList.appendChild(unspecifiedCard);
}

loadSpecies();