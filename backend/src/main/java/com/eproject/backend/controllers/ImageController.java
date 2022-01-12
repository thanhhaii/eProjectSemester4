package com.eproject.backend.controllers;

import com.eproject.backend.dtos.UploadFileResponse;
import com.eproject.backend.services.UploadFile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
@Slf4j
public class ImageController{

    @Autowired
    private UploadFile iUploadFile;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<UploadFileResponse> uploadImage(@RequestParam("file") MultipartFile file){
        UploadFileResponse result = iUploadFile.uploadFile(file);
        return ResponseEntity.ok(result);
    }

}
