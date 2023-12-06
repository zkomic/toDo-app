package com.example.toDoback.repository;

import com.example.toDoback.models.Board;
import com.example.toDoback.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import com.example.toDoback.models.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

List<Card> findByBoard(Board board);


}
