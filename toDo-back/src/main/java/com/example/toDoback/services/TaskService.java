package com.example.toDoback.services;

import com.example.toDoback.exceptions.ObjectNotFoundException;
import com.example.toDoback.models.Board;
import com.example.toDoback.models.Card;
import com.example.toDoback.models.Task;
import com.example.toDoback.repository.BoardRepository;
import com.example.toDoback.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.toDoback.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;
    @Autowired
    CardRepository cardRepository;
    @Autowired
    BoardRepository boardRepository;

    public List<Task> getTasks(Long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(!board.isPresent())
            throw new RuntimeException("nop");

        return taskRepository.findByBoard(board.get());
    }

    public Task createTask (Task task, Board board) {
        task.setBoard(board);
        return taskRepository.save(task);
    }

    public void editTask (Task task) {
        taskRepository.save(task);
    }


    public void deleteTask(Long boardId, Long id) {
        Board board = boardRepository.findById(boardId).get();

        Optional<Task> taskToRemove = board.getTasks().stream()
                .filter(task -> task.getId().equals(id))
                .findFirst();

        taskToRemove.ifPresent(task -> {
            board.getTasks().remove(task);
            taskRepository.deleteById(task.getId());
        });
        boardRepository.save(board);
    }

}
