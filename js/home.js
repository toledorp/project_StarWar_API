console.log("Home page loaded");

async function loadCharacters() {
    try {

        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();

        console.log("Characters:", data.results);

    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

loadCharacters();