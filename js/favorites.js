console.log("Favorites page loaded");

function getFavorites() {
    const favorites = localStorage.getItem("favoriteCharacters");
    return favorites ? JSON.parse(favorites) : [];
}

function removeFavorite(characterId) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((character) => character.id !== characterId);

    localStorage.setItem("favoriteCharacters", JSON.stringify(updatedFavorites));

    loadFavorites();
}

function loadFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    const favorites = getFavorites();

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>No favorite characters found.</p>";
        return;
    }

    favorites.forEach((character) => {
        const characterItem = document.createElement("div");

        characterItem.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Height:</strong> ${character.height} cm</p>
            <p><strong>Mass:</strong> ${character.mass} kg</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <a href="./details.html?id=${character.id}">View Details</a>
            <button class="favorite-button" data-id="${character.id}">Remove from Favorites</button>
        `;

        favoritesList.appendChild(characterItem);
    });

    const removeButtons = document.querySelectorAll(".favorite-button");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            removeFavorite(button.dataset.id);
        });
    });
}

loadFavorites();