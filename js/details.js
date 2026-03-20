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

function showLoadingDetails() {
    document.getElementById("loadingDetails").style.display = "block";
}

function hideLoadingDetails() {
    document.getElementById("loadingDetails").style.display = "none";
}

function getResourceId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function fetchResource(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching resource:", error);
        return null;
    }
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

                if (type === "films") {
                    return `<a class="resource-tag" href="./film-details.html?id=${id}">${item.name}</a>`;
                }

                return `<span class="resource-tag">${item.name}</span>`;
            }).join("")}
        </div>
    `;
}

async function loadCharacterDetails() {
    const characterId = getCharacterIdFromUrl();
    const characterDetails = document.getElementById("characterDetails");

    if (!characterId) {
        characterDetails.innerHTML = "<p>Character not found.</p>";
        return;
    }

    showLoadingDetails();
    characterDetails.innerHTML = "";

    try {
        const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
        const character = await response.json();

        const [homeworld, films] = await Promise.all([
            fetchResource(character.homeworld),
            fetchResources(character.films)
        ]);

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

        characterDetails.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Height:</strong> ${character.height} cm</p>
            <p><strong>Mass:</strong> ${character.mass} kg</p>
            <p><strong>Hair Color:</strong> ${character.hair_color}</p>
            <p><strong>Skin Color:</strong> ${character.skin_color}</p>
            <p><strong>Eye Color:</strong> ${character.eye_color}</p>
            <p><strong>Birth Year:</strong> ${character.birth_year}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p>
                <strong>Homeworld:</strong>
                ${
                    homeworld
                        ? `<a class="resource-tag" href="./planet-details.html?id=${getResourceId(homeworld.url)}">${homeworld.name}</a>`
                        : "Not available"
                }
            </p>

            <div class="details-block">
                <h4>Films</h4>
                ${createResourceList(films, "films")}
            </div>

            <button id="favoriteButton">${favoriteText}</button>
        `;

        const favoriteButton = document.getElementById("favoriteButton");

        favoriteButton.addEventListener("click", () => {
            toggleFavorite(characterData);
            loadCharacterDetails();
        });

    } catch (error) {
        console.error("Error fetching character details:", error);
        characterDetails.innerHTML = "<p>Error loading character details.</p>";
    } finally {
        hideLoadingDetails();
    }
}

loadCharacterDetails();