package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String color;

    @ManyToMany(mappedBy = "tags")

    private Set<Customer> customers = new HashSet<>();

    @PreRemove
    private void removeFromCustomers() {
        for (Customer customer : customers) {
            customer.getTags().remove(this);
        }
    }


}
