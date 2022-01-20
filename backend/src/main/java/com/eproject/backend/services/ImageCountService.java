package com.eproject.backend.services;

public interface ImageCountService {

    void createImageCount(String imageID);

    void updateCountDownload(String imageID);

    void addCountAddToCollection(String imageID);

    void removeImageFromCollection(String imageID);
}
