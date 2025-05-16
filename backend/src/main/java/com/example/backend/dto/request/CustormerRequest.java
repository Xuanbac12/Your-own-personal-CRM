package com.example.backend.dto.request;

import com.example.backend.common.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class CustormerRequest {

    private String fullName;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;

    private String email;

    private String phone;

    private String address;

    private Gender gender;

    private String avatarUrl;

    private String note;

    private Set<Long> customerTypeIds;

    private Set<Long> tagIds;
}
