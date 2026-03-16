console.log("Details page loaded");

function getCharacterIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
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
        `;
    } catch (error) {
        console.error("Error fetching character details:", error);
        document.getElementById("characterDetails").innerHTML = "<p>Error loading character details.</p>";
    }
}

loadCharacterDetails();