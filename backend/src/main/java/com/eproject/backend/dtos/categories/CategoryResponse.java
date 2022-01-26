package com.eproject.backend.dtos.categories;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {

    private Integer id;
    private String categoryName;
    private String description;
    private Date createdAt;
    private Date updatedAt;

}
