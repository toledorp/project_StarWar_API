console.log("Home page loaded");

async function loadCharacters() {
    try {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();

        const charactersList = document.getElementById("charactersList");
        charactersList.innerHTML = "";

        data.results.forEach((character) => {
            const characterId = getCharacterId(character.url);

            const characterLink = document.createElement("a");
            characterLink.href = `./details.html?id=${characterId}`;
            characterLink.textContent = character.name;

            const characterItem = document.createElement("p");
            characterItem.appendChild(characterLink);

            charactersList.appendChild(characterItem);
        });
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

function getCharacterId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

loadCharacters();