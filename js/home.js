console.log("Home page loaded");

let allCharacters = [];
let currentPage = 1;
let totalPages = 1;

function showLoading() {
    document.getElementById("loadingMessage").style.display = "block";
}

function hideLoading() {
    document.getElementById("loadingMessage").style.display = "none";
}

async function loadCharacters(page = 1) {
    showLoading();

    try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await response.json();

        allCharacters = data.results;
        currentPage = page;
        totalPages = Math.ceil(data.count / 10);

        renderCharacters(allCharacters);
        updatePaginationControls();

    } catch (error) {
        console.error("Error fetching characters:", error);

        const charactersList = document.getElementById("charactersList");
        charactersList.innerHTML = "<p>Error loading characters.</p>";
    } finally {
        hideLoading();
    }
}

function getCharacterId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

function renderCharacters(characters) {
    const charactersList = document.getElementById("charactersList");
    charactersList.innerHTML = "";

    if (characters.length === 0) {
        charactersList.innerHTML = "<p>No characters found.</p>";
        return;
    }

    characters.forEach((character) => {
        const characterId = getCharacterId(character.url);

        const characterCard = document.createElement("div");

        characterCard.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Birth Year:</strong> ${character.birth_year}</p>
            <a href="./details.html?id=${characterId}">View Details</a>
        `;

        charactersList.appendChild(characterCard);
    });
}

function handleSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredCharacters = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm)
    );

    renderCharacters(filteredCharacters);
}

function updatePaginationControls() {
    document.getElementById("pageInfo").textContent = `Page ${currentPage}`;

    document.getElementById("prevButton").disabled = currentPage === 1;
    document.getElementById("nextButton").disabled = currentPage === totalPages;
}

document.getElementById("searchInput").addEventListener("input", handleSearch);

document.getElementById("prevButton").addEventListener("click", () => {
    if (currentPage > 1) {
        loadCharacters(currentPage - 1);
    }
});

document.getElementById("nextButton").addEventListener("click", () => {
    if (currentPage < totalPages) {
        loadCharacters(currentPage + 1);
    }
});

loadCharacters();