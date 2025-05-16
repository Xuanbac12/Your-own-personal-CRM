package com.example.backend.repository;

import com.example.backend.entity.Customer;
import com.example.backend.entity.CustomerType;
import com.example.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    List<Customer> findByCustomerTypesContaining(CustomerType type);

    List<Customer> findByTagsContaining(Tag tag);

}
