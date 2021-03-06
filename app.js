import { movieList, seatsDetails } from "./db.js";

const movieSelected = document.getElementById("movies-list");
const seatsContainer = document.querySelector(".cinema-container .seats");
const resetButton = document.querySelector(".price-reset-container .reset");
const buyButton = document.querySelector(".price-reset-container .buy");
const eraseAllButton = document.querySelector(".price-reset-container .erase-all");
const counter = document.getElementById("counter");
const amount = document.getElementById("amount");

let ticketPrice = 0;
let allSeats = 0;

function updateCounterAndPrice() {
   const selectedSeats = document.querySelectorAll(".seats .available-seat.selected");
   counter.innerText = selectedSeats.length;
   amount.innerText = selectedSeats.length * ticketPrice;
}

const updateSelectedSeatsList = () => {
   const selectedSeats = document.querySelectorAll(".seats .available-seat.selected");
   const selectedSeatsIndexes = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));
   localStorage.setItem("selectedSeatsIndexes", JSON.stringify(selectedSeatsIndexes));
}

const populateMovieList = () => {
   movieList.movies.forEach(movie => {
      const option = document.createElement("option");
      option.setAttribute("value", movie.price);
      option.innerText = `${movie.title} (${movie.price} ${movieList.currency})`;
      movieSelected.appendChild(option);
   });

   ticketPrice = movieSelected.value;
}

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
}

const populateFromLOcalStorage = () => {
   const selectedSeatsIndexes = JSON.parse(localStorage.getItem("selectedSeatsIndexes"));
   if (selectedSeatsIndexes !== null && selectedSeatsIndexes.length > 0) {
      allSeats.forEach((seat, index) => {
         if (selectedSeatsIndexes.indexOf(index) > -1) {
            seat.classList.add("selected");
         }
      });
   }

   const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
   if (selectedMovieIndex !== null) {
      movieSelected.selectedIndex = selectedMovieIndex;
      ticketPrice = movieSelected.value;
   } else {
      localStorage.setItem("selectedMovieIndex", 0);
   }

   updateCounterAndPrice();
}

const populatedUI = () => {
   populateMovieList();
   populateSeats();
   populateFromLOcalStorage();
}

function deleteAllState() {
   counter.innerText = 0;
   amount.innerText = 0;
   
   movieSelected.selectedIndex = 0;
   ticketPrice = movieSelected.value;

   localStorage.clear();
   localStorage.setItem("selectedMovieIndex", 0);
}

// ---- init ----
populatedUI();

// ---- events ----
movieSelected.addEventListener("change", e => {
   ticketPrice = e.target.value;
   localStorage.setItem("selectedMovieIndex", movieSelected.selectedIndex);
   updateCounterAndPrice()
});

seatsContainer.addEventListener("click", e => {
   if (
      e.target.classList.contains("available-seat") &&
      !e.target.classList.contains("occupied")
   ) {
      e.target.classList.toggle("selected");
      updateCounterAndPrice();
      updateSelectedSeatsList();
   }
});

resetButton.addEventListener("click", () => {
   document
      .querySelectorAll(".seats .available-seat.selected")
      .forEach(seat => seat.classList.remove("selected"));
   
   deleteAllState();
});

buyButton.addEventListener("click", () => {
   document
      .querySelectorAll(".seats .available-seat.selected")
      .forEach(seat => {
         seat.classList.remove("selected");
         seat.classList.add("occupied");
      });
   
   deleteAllState();
});

eraseAllButton.addEventListener("click", () => {
   document
      .querySelectorAll(".seats .available-seat")
      .forEach(seat => {
         seat.classList.remove("selected");
         seat.classList.remove("occupied");
      });
   
   deleteAllState();
});