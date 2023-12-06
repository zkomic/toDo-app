package com.example.toDoback.exceptions;

public class ObjectNotFoundException extends RuntimeException {
    public ObjectNotFoundException(String messages) {
        super(messages);
    }
}
