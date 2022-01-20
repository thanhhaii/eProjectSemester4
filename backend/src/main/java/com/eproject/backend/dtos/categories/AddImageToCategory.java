package com.eproject.backend.dtos.categories;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddImageToCategory {

    private List<Integer> categoryIDs;
    private String imageID;

}
