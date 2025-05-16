package com.example.backend.controller;

import com.example.backend.dto.request.CustormerRequest;
import com.example.backend.dto.response.CustomerResponse;
import com.example.backend.entity.Customer;
import com.example.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public CustomerResponse createCustomer(@RequestBody CustormerRequest request){
        return customerService.createRequest(request);
    }
    @GetMapping
    public List<CustomerResponse> getCustomers(){
        return customerService.getCustomers();
    }
    @GetMapping("/{userId}")
    public CustomerResponse getCustomer(@PathVariable("userId") String customerId){
        return customerService.getCustomers(customerId);
    }
    @DeleteMapping("/{customerId}")
    String deleteCustomer(@PathVariable("customerId") String customerId){
        customerService.deleteCustomer(customerId);
        return "Customer has been delete";
    }

    @PutMapping("/{customerId}")
    public CustomerResponse updateCustomer(@PathVariable("customerId") String userId, @RequestBody CustormerRequest request){
        return customerService.updateCustomer(userId, request);
    }

}
