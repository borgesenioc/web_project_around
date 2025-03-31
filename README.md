# Tripleten web_project_around (Around The U.S.)

An interactive web project showcasing modern web development techniques, responsive design, and modular code organization using HTML, CSS, and advanced JavaScript (ES Modules).

## Features

-   **Modular CSS:** Organized styles in the `blocks/` directory (e.g., [`header.css`](blocks/header.css), [`popup.css`](blocks/popup.css))
-   **Responsive Design:** Media queries ensure a smooth experience on both desktop and mobile devices.
-   **Dynamic JavaScript:** Advanced ES Module architecture drives dynamic interactivity:
    -   The [`index.js`](scripts/index.js) orchestrates module loading and coordinates core functionalities.
    -   Feature-specific modules like [`popup.js`](scripts/popup.js) and [`submitProfileForm.js`](scripts/submitProfileForm.js) manage popups, form validation, and event handling.
    -   Emphasis on maintainability and scalability through clean separation of concerns and modern async patterns.
-   **Code Quality:** Configured with [Prettier (`.prettierrc`](.prettierrc)) and [EditorConfig (`.editorconfig`](.editorconfig)) for consistent styling.

## Project Structure

-   **HTML:** Core structure defined in [`index.html`](index.html)
-   **CSS:**
    -   Global styles in [`pages/index.css`](pages/index.css)
    -   Component styles in `blocks/`
    -   Third-party styles in [`vendor/`](vendor/)
-   **JavaScript:**
    -   Entry point in [`index.js`](scripts/index.js) that manages module integration.
    -   Feature-specific scripts in the `scripts/` folder emphasizing a modular, event-driven architecture.
-   **Assets:** Organized images and fonts in the `images/` and [`vendor/fonts/fonts.css`](vendor/fonts/fonts.css) directories.

## Getting Started

1. Clone the repository.
2. Open [`index.html`](index.html) in your browser to see the project in action.
3. Use Visual Studio Code for an enhanced development experience.

## Technologies

-   HTML5 & CSS3
-   JavaScript (ES Modules, async/await, event-driven architecture)
-   Responsive design
-   Prettier, EditorConfig

## Author

Enio Borges
