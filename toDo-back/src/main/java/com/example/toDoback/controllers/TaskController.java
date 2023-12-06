package com.example.toDoback.controllers;

import com.example.toDoback.models.Board;
import com.example.toDoback.models.Task;
import com.example.toDoback.services.BoardService;
import com.example.toDoback.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("boards/{boardId}")
public class TaskController {

    @Autowired
    TaskService taskService;
    @Autowired
    BoardService boardService;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable("boardId") Long boardId) {
        List<Task> tasks = taskService.getTasks(boardId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/tasks/addTask")
    public ResponseEntity<Task> createNewTask(@PathVariable("boardId") Long boardId, @RequestBody Task task) {
        Board board =  boardService.getBoardById(boardId);
        Task newTask = taskService.createTask(task, board);
        return new ResponseEntity<>(newTask,HttpStatus.CREATED);
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<?> editTask(@PathVariable("boardId") Long boardId,@PathVariable("taskId") Long taskId, @RequestBody Task task) {
        taskService.editTask(task);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId) {
        taskService.deleteTask(boardId, taskId);
        return new ResponseEntity<>(HttpStatus.OK);
    }










}
