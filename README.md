# Tripleten web_project_around (Around The U.S.)

An interactive web project showcasing modern web development techniques, responsive design, and object-oriented programming using HTML, CSS, and ES6 JavaScript classes.

## Features

-   **Modular CSS:** Organized styles in the `blocks/` directory (e.g., [`header.css`](blocks/header.css), [`popup.css`](blocks/popup.css))
-   **Responsive Design:** Media queries ensure a smooth experience on both desktop and mobile devices.
-   **Object-Oriented JavaScript:** Modern ES6 classes for improved code organization:
    -   The [`Card`](scripts/Card.js) class handles card creation and functionality.
    -   The [`FormValidator`](scripts/FormValidator.js) class manages form validation.
    -   [`utils.js`](scripts/utils.js) contains utility functions and configuration.
    -   [`index.js`](scripts/index.js) orchestrates these components together.
-   **Popup Functionality:** Open and close profile editor and card creation forms.
-   **Form Validation:** Real-time validation for all forms with visual feedback.
-   **Interactive Elements:** Add cards, like cards, remove cards, and view enlarged images.
-   **Code Quality:** Configured with [Prettier (`.prettierrc`](.prettierrc)) and [EditorConfig (`.editorconfig`](.editorconfig)) for consistent styling.

## Project Structure

-   **HTML:** Core structure defined in [`index.html`](index.html)
-   **CSS:**
    -   Global styles in [`pages/index.css`](pages/index.css)
    -   Component styles in `blocks/`
    -   Third-party styles in [`vendor/`](vendor/)
-   **JavaScript:**
    -   Entry point in [`index.js`](scripts/index.js) that coordinates components.
    -   `Card.js` and `FormValidator.js` contain the primary ES6 classes.
    -   `utils.js` contains utility functions, initial card data, and configuration.
-   **Assets:** Organized images and fonts in the `images/` and [`vendor/fonts/fonts.css`](vendor/fonts/fonts.css) directories.

## Getting Started

1. Clone the repository.
2. Open using a live server (e.g., VS Code's Live Server extension) to ensure modules work correctly.
3. Interact with the page to add cards, edit profile, and view images.

## Technologies

-   HTML5 & CSS3
-   JavaScript (ES6 Classes, Modules)
-   Object-Oriented Programming
-   BEM Methodology
-   Responsive design
-   Prettier, EditorConfig

## Author

Enio Borges
