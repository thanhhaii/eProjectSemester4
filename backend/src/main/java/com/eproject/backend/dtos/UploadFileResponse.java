package com.eproject.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadFileResponse {

    private String url;
    private Number height;
    private Number width;
    private String fileType;
    private String fileID;

}
