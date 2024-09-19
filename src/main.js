import $ from 'jquery';
import './css/styles.css';
import MemoryGame from './js/business';
import Kakashi from '../assets/images/kakashi.jpeg';
import Killua from '../assets/images/killua.jpeg';
import Kokushibo from '../assets/images/kokushibo.jpeg';
import demonSlayer from '../assets/images/demonslayer.jpeg';
import scorpion from '../assets/images/scorpion.jpeg';
import shadow from '../assets/images/shadow.jpeg';
import sukuna from  '../assets/images/sukuna.jpeg';
import zenitsu from '../assets/images/zenitsu.jpeg'

$(document).ready(function() {
  $(".kakashi-img").attr("src", Kakashi);
  $(".killua-img").attr("src", Killua);
  $(".kokushibo-img").attr("src", Kokushibo);
  $(".demonslayer-img").attr("src", demonSlayer);
  $(".scorpion-img").attr("src", scorpion);
  $(".shadow-img").attr("src", shadow);
  $(".sukuna-img").attr("src", sukuna);
  $(".zenitsu-img").attr("src", zenitsu)
  const game = new MemoryGame();
  const cards = document.querySelectorAll('.card');
  const gameContainer = document.querySelector('.memory-game');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      handleCardClick(card);
    });
  });

  shuffleCards();

  function shuffleCards() {
    const shuffledCards = game.shuffleCards(cards);
    gameContainer.innerHTML = ''; 
    shuffledCards.forEach(card => gameContainer.appendChild(card)); 
  }

  function flipCard(card) {
    card.classList.add('flipped');
  }

  function unflipCard(card) {
    card.classList.remove('flipped');
  }

  function handleCardClick(card) {
    if (card.classList.contains('flipped')) {
      return;
    }

    flipCard(card);
    game.flippedCards.push(card);

    if (game.flippedCards.length === 2) {
      const [card1, card2] = game.flippedCards;
      const isMatch = game.checkForMatch(card1, card2)
      if(isMatch){
        $(".numberOfMatches").html(game.matches)
      }
      if (!isMatch) {
        setTimeout(() => {
          unflipCard(card1);
          unflipCard(card2);
        }, 1000);
        game.flippedCards = [];
      }else{
        game.flippedCards = [];
      }
    }
  }
 });
