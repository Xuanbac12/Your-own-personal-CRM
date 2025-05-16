package com.example.backend.service;

import com.example.backend.dto.request.CustormerRequest;
import com.example.backend.dto.response.CustomerResponse;
import com.example.backend.dto.response.CustomerTypeResponse;
import com.example.backend.dto.response.TagResponse;
import com.example.backend.entity.Customer;
import com.example.backend.entity.CustomerType;
import com.example.backend.entity.Tag;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.CustomerTypeRepository;
import com.example.backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerTypeRepository customerTypeRepository;

    @Autowired
    private TagRepository tagRepository;

    public CustomerResponse toResponseDTO(Customer customer){

        List<CustomerTypeResponse> customerTypes = customer.getCustomerTypes().stream()
                .map(type -> new CustomerTypeResponse(type.getId(), type.getName(), type.getDescription(), type.getColor()))
                .collect(Collectors.toList());

        List<TagResponse> tagNames = customer.getTags().stream()
                .map(tag -> new TagResponse(tag.getId(), tag.getName(), tag.getColor()))
                .collect(Collectors.toList());


        return new CustomerResponse(
                customer.getId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getAvatarUrl(),
                customer.getNote(),
                customer.getGender().getLabel(),
                customer.getDateOfBirth(),
                customerTypes,
                tagNames
        );
    }

    public CustomerResponse createRequest(CustormerRequest request){
        Customer customer = new Customer();

        customer.setFullName(request.getFullName());
        customer.setDateOfBirth(request.getDateOfBirth());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setGender(request.getGender());
        customer.setAvatarUrl(request.getAvatarUrl());
        customer.setNote(request.getNote());

        //Lấy danh sách CustomerType từ danh sách ID
        List<CustomerType> customerTypeList = customerTypeRepository.findAllById(request.getCustomerTypeIds());
        if(customerTypeList.size() != request.getCustomerTypeIds().size()){
            throw new RuntimeException("Một số CustomerType không tồn tại");
        }
        customer.setCustomerTypes(new HashSet<>(customerTypeList));

        //Lấy danh sách Tag từ danh sách ID
        List<Tag> tagList = tagRepository.findAllById(request.getTagIds());
        if(tagList.size() != request.getTagIds().size()){
            throw new RuntimeException("Một số Tag không tồn tại");
        }
        customer.setTags(new HashSet<>(tagList));

        Customer saved =  customerRepository.save(customer);
        return toResponseDTO(saved);
    }

    public List<CustomerResponse> getCustomers() {
        List<Customer> customers = customerRepository.findAll();

        return customers.stream()
                .map(this::toResponseDTO) // chuyển từng Customer → CustomerResponse
                .collect(Collectors.toList());
    }

    public void deleteCustomer(String id){
        customerRepository.deleteById(id);
    }

    public CustomerResponse getCustomers(String id){
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return toResponseDTO(customer);
    }

    public CustomerResponse updateCustomer(String id, CustormerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng với id: " + id));

        // Cập nhật thông tin cơ bản
        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setDateOfBirth(request.getDateOfBirth());
        customer.setGender(request.getGender());
        customer.setAvatarUrl(request.getAvatarUrl());
        customer.setNote(request.getNote());

        // Cập nhật customerTypes
        List<CustomerType> types = customerTypeRepository.findAllById(request.getCustomerTypeIds());
        if (types.size() != request.getCustomerTypeIds().size()) {
            throw new RuntimeException("Một số loại khách hàng không tồn tại!");
        }
        customer.setCustomerTypes(new HashSet<>(types));

        // Cập nhật tags
        List<Tag> tags = tagRepository.findAllById(request.getTagIds());
        if (tags.size() != request.getTagIds().size()) {
            throw new RuntimeException("Một số Tag không tồn tại!");
        }
        customer.setTags(new HashSet<>(tags));

        // Lưu lại
        Customer saved = customerRepository.save(customer);
        return toResponseDTO(saved);
    }



}
