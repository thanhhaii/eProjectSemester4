package com.eproject.backend.dtos.images;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ImageInfo {

    private int width;
    private int height;
    private String description;
    private String title;

}
