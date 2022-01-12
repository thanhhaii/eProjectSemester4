package com.eproject.backend.dtos.pagination;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pagination {

    private int start = 0;
    private int limit = 20;
    private int currentPage;
    private String keyword;
    private int totalItem;

}
