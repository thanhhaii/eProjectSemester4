package com.eproject.backend.controllers;

import com.eproject.backend.dtos.MessageResponse;
import com.eproject.backend.dtos.UploadFileResponse;
import com.eproject.backend.dtos.images.ImageInfo;
import com.eproject.backend.services.ImageCategoryService;
import com.eproject.backend.services.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
@Slf4j
@RequiredArgsConstructor
public class ImageController{

    private final ImageService imageService;
    private final ImageCategoryService imageCategoryService;

    @PostMapping("/upload")
    public ResponseEntity<UploadFileResponse> uploadImage(@RequestParam("file") MultipartFile file){
        UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UploadFileResponse result = imageService.uploadFile(file, userContext.getPrincipal().toString());
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable("id") String imageID){
        try {
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            if(!imageService.isOwnerImage(imageID, userContext.getPrincipal().toString())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            imageCategoryService.deleteImageCategory(imageID);
            imageService.deleteImage(imageID);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/update-info/{id}")
    public ResponseEntity<?> updateInfoImage(@PathVariable("id") String imageID, ImageInfo imageInfo){
        try {
            UsernamePasswordAuthenticationToken userContext = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            if(!imageService.isOwnerImage(imageID, userContext.getPrincipal().toString())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            imageService.updateImageInfo(imageInfo, imageID);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new MessageResponse(e.getMessage()));
        }
    }

}
