package com.eproject.backend.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ChangePassword {

    private String currentPassword;
    private String newPassword;

}
