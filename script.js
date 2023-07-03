// Array para almacenar las notas
let notes = [];

// Obtener elementos del DOM
const addButton = document.getElementById("add-button");
const modal = document.getElementById("modal");
const modalClose = document.getElementsByClassName("close")[0];
const noteForm = document.getElementById("note-form");

// Función para abrir la ventana modal
function openModal() {
    modal.style.display = "block";
}

// Función para cerrar la ventana modal
function closeModal() {
    modal.style.display = "none";
}

// Función para agregar una nueva nota
function addNote() {
    openModal();
}

// Función para manejar el envío del formulario de la nota
function handleFormSubmit(event) {
    event.preventDefault();

    const titleInput = document.getElementById("note-title");
    const contentInput = document.getElementById("note-content");

    const title = titleInput.value;
    const content = contentInput.value;

    if (title && content) {
        notes.unshift({ title, content }); // Agregamos las notas al principio del array para que las más recientes aparezcan primero
        displayNotes();
        closeModal();
        titleInput.value = "";
        contentInput.value = "";
    }
}

// Función para mostrar las notas en la página
function displayNotes() {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";

    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");

        // Agregamos un atributo "data-index" al elemento para poder identificar la nota correspondiente en el array
        noteElement.setAttribute("data-index", index);

        noteElement.innerHTML = `
            <div class="note-header">
                <h3>${note.title}</h3>
                <button class="delete-button" onclick="deleteNote(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <p>${note.content}</p>
        `;

        mainElement.appendChild(noteElement);
    });
}

// Función para eliminar una nota
function deleteNote(index) {
    notes.splice(index, 1);
    displayNotes();
}

// Event Listener para el botón de agregar nota
addButton.addEventListener("click", addNote);

// Event Listener para cerrar la ventana modal
modalClose.addEventListener("click", closeModal);

// Event Listener para el envío del formulario de la nota
noteForm.addEventListener("submit", handleFormSubmit);

// Mostrar notas iniciales (si las hubiera) al cargar la página
displayNotes();
