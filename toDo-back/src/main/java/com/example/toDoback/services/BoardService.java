package com.example.toDoback.services;
import com.example.toDoback.exceptions.ObjectNotFoundException;
import com.example.toDoback.models.Board;

import com.example.toDoback.models.Card;
import com.example.toDoback.models.Task;
import com.example.toDoback.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class BoardService {
    @Autowired
    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public void createBoard(Board board) {
        List<Card> cards = new ArrayList<Card>();
        Card todo = new Card();
        todo.setName("To do");
        todo.setStatus(1L);
        todo.setBoard(board);
        cards.add(todo);

        Card inProgress = new Card();
        inProgress.setName("In progress");
        inProgress.setStatus(2L);
        inProgress.setBoard(board);
        cards.add(inProgress);

        Card done = new Card();
        done.setName("Done");
        done.setStatus(3L);
        done.setBoard(board);
        cards.add(done);

        board.setCards(cards);
        boardRepository.save(board);
    }

    public List<Board> getAllBoards() { return boardRepository.findAll(); }

    public Board updateBoard(Board board) {
        return boardRepository.save(board);
    }

    public void deleteBoard(Long id) { boardRepository.deleteById(id); }

    public Board getBoardById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Board with id: " + id + " doesn't exist!"));
    }


}
