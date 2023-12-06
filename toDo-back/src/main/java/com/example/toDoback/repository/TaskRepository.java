package com.example.toDoback.repository;

import com.example.toDoback.models.Board;
import com.example.toDoback.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Optional;
import java.util.List;

@Repository
public interface TaskRepository  extends JpaRepository<Task,Long> {

    List<Task> findByBoard(Board board);


}
