package com.eproject.backend.common.exception;

public class EmailExistException extends Exception {

    public EmailExistException(String message) {
        super(message);
    }

    public EmailExistException() {
    }
}
