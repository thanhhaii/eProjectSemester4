package com.eproject.backend.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    private String firstName;
    private String lastName;
    private int phone;
    private String avatar;

}
