package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer_types")
@NoArgsConstructor
@Getter
@Setter
public class CustomerType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String color;

    @ManyToMany(mappedBy = "customerTypes")

    private Set<Customer> customers = new HashSet<>();

    // ✅ Xóa liên kết khỏi khách hàng trước khi xóa loại
    @PreRemove
    private void removeFromCustomers() {
        for (Customer customer : customers) {
            customer.getCustomerTypes().remove(this);
        }
    }
}
