package com.eproject.backend.dtos.images;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ImageUpdateInfo {

    private String title;
    private String description;
    private List<Integer> categoryIDs;

}
