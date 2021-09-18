import { movieList, seatsDetails } from "./db.js";

const movieSelected = document.getElementById("movies-list");
const seatsContainer = document.querySelector(".cinema-container .seats");
const resetButton = document.querySelector(".price-reset-container .reset");
const counter = document.getElementById("counter");
const amount = document.getElementById("amount");

let ticketPrice = 0;
let allSeats = 0;

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