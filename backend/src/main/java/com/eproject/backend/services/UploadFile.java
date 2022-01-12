package com.eproject.backend.services;

import com.eproject.backend.dtos.UploadFileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface UploadFile {

    UploadFileResponse uploadFile(MultipartFile file);

}
