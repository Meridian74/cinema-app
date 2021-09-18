import { movieList, seatsDetails } from "./db.js";

const movieSelected = document.getElementById("movies-list");
const seatsContainer = document.querySelector(".cinema-container .seats");
const resetButton = document.querySelector(".price-reset-container .reset");
const counter = document.getElementById("counter");
const amount = document.getElementById("amount");

let ticketPrice = 0;
let allSeats = 0;

function updateCounterAndPrice() {
   const selectedSeats = document.querySelectorAll(".seats .available-seat.selected");
   counter.innerText = selectedSeats.length;
   amount.innerText = selectedSeats.length * ticketPrice;
}

const populateMovieList = () => {
   movieList.movies.forEach(movie => {
      const option = document.createElement("option");
      option.setAttribute("value", movie.price);
      option.innerText = `${movie.title} (${movie.price} ${movieList.currency})`;
      movieSelected.appendChild(option);
   });

   ticketPrice = movieSelected.value;
};

const populateSeats = () => {
   const seatsNumber = seatsDetails.rows * seatsDetails.columns;
   for (let i = 0; i < seatsNumber; i++) {
      const seat = document.createElement("div");
      seat.classList.add("available-seat");
      if (seatsDetails.occupied.includes(i)) {
         seat.classList.add("occupied");
      }
      seatsContainer.appendChild(seat);
   }

   allSeats = document.querySelectorAll(".seats .available-seat");
};

const populateFromLOcalStorage = () => {

};

const populatedUI = () => {
   populateMovieList();
   populateSeats();
   populateFromLOcalStorage();
};


populatedUI();

movieSelected.addEventListener("change", e => {
   ticketPrice = e.target.value;
   updateCounterAndPrice()
});

seatsContainer.addEventListener("click", e => {
   if (
      e.target.classList.contains("available-seat") &&
      !e.target.classList.contains("occupied")
   ) {
      e.target.classList.toggle("selected");
      updateCounterAndPrice()
   }
});

resetButton.addEventListener("click", () => {
   document
      .querySelectorAll(".seats .available-seat.selected")
      .forEach(seat => seat.classList.remove("selected"));
   
   counter.innerText = 0;
   amount.innerText = 0;
   movieSelected.selectedIndex = 0;
   ticketPrice = movieSelected.value;
});