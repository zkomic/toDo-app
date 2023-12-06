package com.example.toDoback.services;

import com.example.toDoback.models.Board;
import com.example.toDoback.models.Task;
import com.example.toDoback.repository.BoardRepository;
import com.example.toDoback.repository.CardRepository;
import com.example.toDoback.models.Card;
import com.example.toDoback.exceptions.ObjectNotFoundException;
import com.example.toDoback.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.ArrayList;
import java.util.List;
@Service
public class CardService {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    BoardRepository boardRepository;
    @Autowired
    TaskRepository taskRepository;

    public List<Card> getAllCards(Long boardId) {
        Board board = boardRepository.findById(boardId).orElse(null);
        return cardRepository.findByBoard(board);
    }

    public Card newCard(Card card) {
        return cardRepository.save(card);
    }

    public Card updateCard(Card card) {
        return cardRepository.save(card);
    }

    public void deleteCard(Long id) {
        Card card = cardRepository.findById(id).orElse(null);

        if(card != null) {
            List <Task> tasks = taskRepository.findAll();
            List <Task> tasksToDelete = new ArrayList<>();
            for (Task task: tasks) {
                if(task.getStatus().equals(card.getStatus()) && task.getBoard().equals(card.getBoard())) {
                    tasksToDelete.add(task);
                }
            }
            taskRepository.deleteAll(tasksToDelete);
            cardRepository.delete(card);
            }
        }
    }

