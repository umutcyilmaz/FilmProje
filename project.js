const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films"); 



eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    secondCardBody.addEventListener("click", deleteFilm); 
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        UI.displayMessage("Lutfen tum alanlari doldurunuz", "danger");
    }
    else{
        const newFilm = new Film(title,director,url);
        UI.addFilmToUI(newFilm);
        UI.displayMessage("Film basariyla eklendi", "success");
        Storage.addFilmToStorage(newFilm);
    } 
    UI.clearInputs(titleElement, directorElement, urlElement)
    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("Film basariyla silindi", "success");
    }
}

