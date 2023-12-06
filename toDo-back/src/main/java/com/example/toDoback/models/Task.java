package com.example.toDoback.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private Long status;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;



    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    public Task() {
    }

    public Task(Long id, String name, Long status, Board board) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.board = board;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", board=" + board +
                '}';
    }
}