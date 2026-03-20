Star Wars Explorer

A web application that explores characters from the Star Wars universe using the SWAPI (Star Wars API).
The project was developed using HTML, CSS, and Vanilla JavaScript, focusing on core frontend development concepts such as API consumption, DOM manipulation, responsive layouts, and browser storage.

Features
The application includes the following features:
 * Character list fetched from the SWAPI
 * Dynamic character cards displayed on the home page
 * Search filter for characters (without reloading the page)
 * Pagination to navigate through the API results
 * Character details page with extended information
 * Favorites system using LocalStorage
 * Favorites page to manage saved characters
 * Contact form with JavaScript validation
 * Loading states while fetching data from the API
 * Responsive layout using Flexbox and CSS Grid

Technologies Used
This project was built using:
 * HTML5
 * CSS3
 * Vanilla JavaScript
 * SWAPI (Star Wars API)
No frameworks or external libraries were used.

Project Structure
PROJECT_STARWAR_API
|
|-- assets
|

│
├── assets
│
├── css
│   └── style.css
│
├── js
│   ├── home.js
│   ├── details.js
│   ├── favorites.js
│   └── contact.js
│
├── index.html
├── details.html
├── favorites.html
├── contact.html
└── README.md

How to Run the Project
1 - Clone this repository:
git clone https://github.com/toledorp/project_StarWar_API

2 - Open the project folder.

3 - Open the file:
index.html
in your browser.
You can also use VS Code Live Server for a better development experience.

API Used
This project uses the public Star Wars API (SWAPI).
Base URL:
https://swapi.dev/api/

Example endpoint used:
https://swapi.dev/api/people/

Favorites System
Favorite characters are stored locally using:
localStorage

This allows users to:
  * Save favorite characters
  * Remove favorites
  * View favorites on a dedicated page

The stored key used in the browser is:
favoriteCharacters

Form Validation
The contact form validates:
  * Required fields
  * Valid email format
All validation is handled on the client side using JavaScript.

Challenges and Decisions
Some implementation decisions made during development include:
  * Using pagination to handle the limited number of characters returned per API request.
  * Implementing a search filter that works on the currently loaded characters to keep the  
    interface responsive.
  * Using LocalStorage to persist user favorites without requiring a backend.
  * Creating a simple loading state to improve user experience during API calls.

Possible Improvements
Future improvements could include:
  * Character images integration
  * Advanced search across all pages
  * Better loading animations
  * UI enhancements and animations
  * Dark/light theme switch

Author
Developed as part of a frontend development challenge.

License
This project is intended for educational purposes.
