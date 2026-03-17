console.log("Unspecified species page loaded");

function showLoadingUnspecifiedSpecies() {
    document.getElementById("loadingUnspecifiedSpecies").style.display = "block";
}

function hideLoadingUnspecifiedSpecies() {
    document.getElementById("loadingUnspecifiedSpecies").style.display = "none";
}

function getCharacterId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function fetchAllPeople() {
    let url = "https://swapi.dev/api/people/";
    const allPeople = [];

    while (url) {
        const response = await fetch(url);
        const data = await response.json();

        allPeople.push(...data.results);
        url = data.next;
    }

    return allPeople;
}

async function loadUnspecifiedSpeciesCharacters() {
    const container = document.getElementById("unspecifiedSpeciesList");

    showLoadingUnspecifiedSpecies();

    try {
        const allPeople = await fetchAllPeople();

        const unspecifiedPeople = allPeople.filter((person) => person.species.length === 0);

        if (unspecifiedPeople.length === 0) {
            container.innerHTML = "<p>No characters found.</p>";
            return;
        }

        container.innerHTML = "";

        unspecifiedPeople.forEach((character) => {
            const characterId = getCharacterId(character.url);

            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${character.name}</h3>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Birth Year:</strong> ${character.birth_year}</p>
                <a href="./details.html?id=${characterId}">View Details</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading unspecified species characters:", error);
        container.innerHTML = "<p>Error loading characters.</p>";
    } finally {
        hideLoadingUnspecifiedSpecies();
    }
}

loadUnspecifiedSpeciesCharacters();