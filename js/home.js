console.log("Home page loaded");

let allCharacters = [];
let currentPage = 1;
let totalPages = 1;

function getFavorites() {
    const favorites = localStorage.getItem("favoriteCharacters");
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favoriteCharacters", JSON.stringify(favorites));
}

function isFavorite(characterId) {
    const favorites = getFavorites();
    return favorites.some((favorite) => favorite.id === characterId);
}

function toggleFavorite(characterData) {
    const favorites = getFavorites();
    const favoriteExists = favorites.some((favorite) => favorite.id === characterData.id);

    let updatedFavorites = [];

    if (favoriteExists) {
        updatedFavorites = favorites.filter((favorite) => favorite.id !== characterData.id);
    } else {
        updatedFavorites = [...favorites, characterData];
    }

    saveFavorites(updatedFavorites);
    renderCharacters(allCharacters);
}

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
        const favoriteText = isFavorite(characterId) ? "Remove from Favorites" : "Add to Favorites";

        const characterData = {
            id: characterId,
            name: character.name,
            height: character.height,
            mass: character.mass,
            hair_color: character.hair_color,
            skin_color: character.skin_color,
            eye_color: character.eye_color,
            birth_year: character.birth_year,
            gender: character.gender
        };

        const characterCard = document.createElement("div");

        characterCard.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Birth Year:</strong> ${character.birth_year}</p>
            <a href="./details.html?id=${characterId}">View Details</a>
            <button class="favorite-button" data-id="${characterId}">${favoriteText}</button>
        `;

        charactersList.appendChild(characterCard);

        const favoriteButton = characterCard.querySelector(".favorite-button");
        favoriteButton.addEventListener("click", () => {
            toggleFavorite(characterData);
        });
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