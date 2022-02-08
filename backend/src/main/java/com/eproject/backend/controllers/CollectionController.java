package com.eproject.backend.controllers;

import com.eproject.backend.dtos.MessageResponse;
import com.eproject.backend.dtos.collections.AddImageToCollection;
import com.eproject.backend.dtos.images.GetListImageResponse;
import com.eproject.backend.entities.Collection;
import com.eproject.backend.entities.ImageCollection;
import com.eproject.backend.services.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/collections")
public class CollectionController {

    private final CollectionService collectionService;

    @PostMapping("")
    public ResponseEntity<?> addImageToCollection(@RequestBody AddImageToCollection imageID){
        try{
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            collectionService.addImageToCollection(userContext.getPrincipal().toString(), imageID.getImageID());
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{imageID}")
    public ResponseEntity<?> removeImageCollection(@PathVariable String imageID){
        try{
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            collectionService.removeImageFormCollection(userContext.getPrincipal().toString(), imageID);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/is-exist-collection/{imageID}")
    public ResponseEntity<?> checkIsExistCollection(@PathVariable String imageID){
        try{
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            return ResponseEntity.ok(collectionService.checkExistInCollection(userContext.getPrincipal().toString(), imageID));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllCollection(){
        try {
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            Collection collection = collectionService.getImageCollection(userContext.getPrincipal().toString());
            List<GetListImageResponse> getListImageResponseList = new ArrayList<>();
            for(ImageCollection imageCollection: collection.getImageCollections()){
                getListImageResponseList.add(new GetListImageResponse(imageCollection.getImage()));
            }
            return ResponseEntity.ok(getListImageResponseList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(e.getMessage()));
        }
    }

}
