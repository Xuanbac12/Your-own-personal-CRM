package com.example.backend.entity;

import com.example.backend.common.Auditable;
import com.example.backend.common.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customers")

@NoArgsConstructor
@Getter
@Setter
public class Customer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String fullName;

    private LocalDate dateOfBirth;

    private String email;

    private String phone;

    private String address;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String avatarUrl;

    @Column(columnDefinition = "TEXT")
    private String note;

    @ManyToMany
    @JoinTable(
        name = "customer_type_assignments",
        joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id")
    )
    private Set<CustomerType> customerTypes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "customer_tag_assignments",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private  Set<Tag> tags = new HashSet<>();
}
