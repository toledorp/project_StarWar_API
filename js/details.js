console.log("Details page loaded");

function getCharacterIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

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

function toggleFavorite(character) {
    const favorites = getFavorites();
    const favoriteExists = favorites.some((favorite) => favorite.id === character.id);

    let updatedFavorites = [];

    if (favoriteExists) {
        updatedFavorites = favorites.filter((favorite) => favorite.id !== character.id);
    } else {
        updatedFavorites = [...favorites, character];
    }

    saveFavorites(updatedFavorites);
}

async function loadCharacterDetails() {
    const characterId = getCharacterIdFromUrl();

    if (!characterId) {
        document.getElementById("characterDetails").innerHTML = "<p>Character not found.</p>";
        return;
    }

    try {
        const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
        const character = await response.json();

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

        const characterDetails = document.getElementById("characterDetails");

        characterDetails.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Height:</strong> ${character.height} cm</p>
            <p><strong>Mass:</strong> ${character.mass} kg</p>
            <p><strong>Hair Color:</strong> ${character.hair_color}</p>
            <p><strong>Skin Color:</strong> ${character.skin_color}</p>
            <p><strong>Eye Color:</strong> ${character.eye_color}</p>
            <p><strong>Birth Year:</strong> ${character.birth_year}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <button id="favoriteButton">${favoriteText}</button>
        `;

        const favoriteButton = document.getElementById("favoriteButton");

        favoriteButton.addEventListener("click", () => {
            toggleFavorite(characterData);
            loadCharacterDetails();
        });

    } catch (error) {
        console.error("Error fetching character details:", error);
        document.getElementById("characterDetails").innerHTML = "<p>Error loading character details.</p>";
    }
}

loadCharacterDetails();