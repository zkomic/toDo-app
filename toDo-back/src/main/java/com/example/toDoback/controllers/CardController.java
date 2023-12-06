package com.example.toDoback.controllers;

import com.example.toDoback.models.Card;
import com.example.toDoback.models.Task;
import com.example.toDoback.services.BoardService;
import com.example.toDoback.services.CardService;
import com.example.toDoback.services.TaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/cards")
public class CardController {

    @Autowired
    CardService cardService;


    @GetMapping("/getAllCards/{boardId}")
    public ResponseEntity<List<Card>> getAllCards(@PathVariable("boardId") Long boardId) {
        List<Card> cards = cardService.getAllCards(boardId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping("/createCard")
    public ResponseEntity<Card> newCard(@RequestBody Card card) {
        Card newCard = cardService.newCard(card);
        return new ResponseEntity<>(newCard, HttpStatus.CREATED);
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<?> updateCard(@PathVariable("cardId") Long cardId, @RequestBody Card card) {
        if (!card.getId().equals(cardId)) {
            return new ResponseEntity<>("ID's do not match!", HttpStatus.BAD_REQUEST);
        }
        Card updatedCard = cardService.updateCard(card);
        if (updatedCard != null) {
            return new ResponseEntity<>(updatedCard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error, card not updated!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<?> deleteCard(@PathVariable("cardId") Long cardId) {
        cardService.deleteCard(cardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}