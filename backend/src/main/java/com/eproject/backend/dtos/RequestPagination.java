package com.eproject.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestPagination {

    private int start = 0;
    private int limit = 20;
    private String keyword = "";
    private String filterType = "";
    private String filterValue = "";

}
