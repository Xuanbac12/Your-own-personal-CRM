package com.example.backend.controller;

import com.example.backend.dto.request.CustomerTypeRequest;
import com.example.backend.dto.response.CustomerTypeResponse;
import com.example.backend.service.CustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customerType")
public class CustomerTypeController {

    @Autowired
    private CustomerTypeService customerTypeService;

    @PostMapping
     public CustomerTypeResponse createCustomerType(@RequestBody CustomerTypeRequest request){
       return customerTypeService.createRequest(request);
    }

    @GetMapping
    public List<CustomerTypeResponse> getCustomerTypes(){
        return customerTypeService.getCustomerTypes();
    }

    @GetMapping("/{customerTypeId}")
    public CustomerTypeResponse getCustomerType(@PathVariable("customerTypeId") Long id){
        return customerTypeService.getCustomerType(id);
    }

    @PutMapping("/{customerTypeId}")
    public CustomerTypeResponse updateCutomerType(@PathVariable("customerTypeId") Long customerId, @RequestBody CustomerTypeRequest request){
        return customerTypeService.updateCustomerType(customerId, request);
    }

    @DeleteMapping("/{customerTypeId}")
    public void deleteCustomerType(@PathVariable("customerTypeId") Long id){
        customerTypeService.deleteCustomerType(id);
    }
}
