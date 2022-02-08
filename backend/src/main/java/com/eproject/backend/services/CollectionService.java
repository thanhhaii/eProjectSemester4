package com.eproject.backend.services;

import com.eproject.backend.entities.Collection;

public interface CollectionService {

    void addImageToCollection(String userID, String imageID);

    void removeImageFormCollection(String userID, String idImageItem);

    Collection getImageCollection(String ownerID);

    boolean checkExistInCollection(String ownerID, String imageID);

}
