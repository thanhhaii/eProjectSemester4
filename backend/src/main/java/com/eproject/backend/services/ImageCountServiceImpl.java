package com.eproject.backend.services;

import com.eproject.backend.entities.ImageCount;
import com.eproject.backend.repositories.ImageCountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageCountServiceImpl implements ImageCountService{

    private final ImageCountRepo imageCountRepo;

    @Override
    public void createImageCount(String imageID) {
        imageCountRepo.save(new ImageCount(imageID, 0, 0));
    }

    @Override
    public void updateCountDownload(String imageID) {
        imageCountRepo.updateCountDownload(imageID);
    }

    @Override
    public void addCountAddToCollection(String imageID) {
        imageCountRepo.updateCountDownload(imageID);
    }

    @Override
    public void removeImageFromCollection(String imageID) {
        imageCountRepo.removeFromCollection(imageID);
    }


}
