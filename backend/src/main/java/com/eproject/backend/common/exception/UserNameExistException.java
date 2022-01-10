package com.eproject.backend.common.exception;

public class UserNameExistException extends Exception {

    public UserNameExistException(String message) {
        super(message);
    }

    public UserNameExistException() {
    }
}
