package com.eproject.backend.services;

import com.eproject.backend.entities.Collection;
import com.eproject.backend.entities.Image;
import com.eproject.backend.entities.ImageCollection;
import com.eproject.backend.entities.ImageCollectionId;
import com.eproject.backend.repositories.CollectionRepository;
import com.eproject.backend.repositories.ImageCollectionRepository;
import com.eproject.backend.repositories.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService{

    private final CollectionRepository collectionRepository;
    private final ImageRepository imageRepository;
    private final ImageCollectionRepository imageCollectionRepository;

    @Override
    public void addImageToCollection(String userID, String imageID) {
        Collection collection;
        if(!collectionRepository.hasCollection(userID)){
            collection = collectionRepository.save(new Collection(userID));
        }else {
            collection = collectionRepository.getCollectionByOwnerID(userID);
        }
        Image image = imageRepository.findById(imageID).get();
        imageCollectionRepository.save(new ImageCollection(collection, image));
    }

    @Override
    public void removeImageFormCollection(String userID, String imageID) {
        Collection collection = collectionRepository.getCollectionByOwnerID(userID);
        imageCollectionRepository.deleteById(new ImageCollectionId(imageID, collection.getId()));
    }

    @Override
    public Collection getImageCollection(String ownerID) {
        if(!collectionRepository.hasCollection(ownerID)){
            return collectionRepository.save(new Collection(ownerID));
        }
        return collectionRepository.getCollectionByOwnerID(ownerID);
    }

    @Override
    public boolean checkExistInCollection(String ownerID, String imageID) {
        Collection collection = collectionRepository.getCollectionByOwnerID(ownerID);
        return imageCollectionRepository.checkImageExistOnCollection(collection.getId(), imageID);
    }
}
