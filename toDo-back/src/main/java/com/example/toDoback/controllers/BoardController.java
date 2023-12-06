package com.example.toDoback.controllers;
import com.example.toDoback.models.Board;


import com.example.toDoback.models.Card;
import com.example.toDoback.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/boards")
public class BoardController {
    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping()
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.getAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable("id") Long boardId) {
        Board board = boardService.getBoardById(boardId);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Board> createNewBoard(@RequestBody Board board) {
        boardService.createBoard(board);
        return new ResponseEntity<>(board,HttpStatus.CREATED);
    }

}
