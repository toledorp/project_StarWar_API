console.log("Home page loaded");

async function loadCharacters() {

    try {

        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();

        const charactersList = document.getElementById("charactersList");

        charactersList.innerHTML = "";

        data.results.forEach(character => {

            const characterElement = document.createElement("p");

            characterElement.textContent = character.name;

            charactersList.appendChild(characterElement);

        });

    } catch (error) {

        console.error("Error fetching characters:", error);

    }

}

loadCharacters();