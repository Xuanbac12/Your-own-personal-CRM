package com.example.backend.service;


import com.example.backend.dto.request.CustomerTypeRequest;
import com.example.backend.dto.response.CustomerResponse;
import com.example.backend.dto.response.CustomerTypeResponse;
import com.example.backend.entity.Customer;
import com.example.backend.entity.CustomerType;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.CustomerTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerTypeService {

    @Autowired
    private CustomerTypeRepository customerTypeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerTypeResponse toResponseDTO (CustomerType customerType){
        return new CustomerTypeResponse(
                customerType.getId(),
                customerType.getName(),
                customerType.getDescription(),
                customerType.getColor()
        );
    }

    public CustomerTypeResponse createRequest(CustomerTypeRequest request){

        CustomerType customerType = new CustomerType();

        customerType.setName(request.getName());
        customerType.setDescription(request.getDescription());
        customerType.setColor(request.getColor());

         CustomerType saved = customerTypeRepository.save(customerType);
         return  toResponseDTO(saved);
    }

    public List<CustomerTypeResponse> getCustomerTypes(){
        List<CustomerType> customerTypes = customerTypeRepository.findAll();

        return customerTypes.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public CustomerTypeResponse updateCustomerType(Long id, CustomerTypeRequest request){
        CustomerType customerType = customerTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy CustomerType"));

        customerType.setName(request.getName());
        customerType.setDescription(request.getDescription());
        customerType.setColor(request.getColor());

        CustomerType saved = customerTypeRepository.save(customerType);
        return toResponseDTO(saved);
    }

    public CustomerTypeResponse getCustomerType(Long id){
        CustomerType customerType = customerTypeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy CustomerType"));

        return toResponseDTO(customerType);
    }

    @Transactional
    public void deleteCustomerType(Long typeId) {
        CustomerType toDelete = customerTypeRepository.findById(typeId)
                .orElseThrow(() -> new EntityNotFoundException("CustomerType not found"));

        // ❌ Không cho xóa loại mặc định
        if ("Chưa phân loại".equals(toDelete.getName())) {
            throw new IllegalArgumentException("Cannot delete default type");
        }

        // ✅ Lấy hoặc tạo loại mặc định
        CustomerType defaultType = customerTypeRepository.findByName("Chưa phân loại")
                .orElseGet(() -> {
                    CustomerType newDefault = new CustomerType();
                    newDefault.setName("Chưa phân loại");
                    newDefault.setColor("#6B7280");
                    newDefault.setDescription("Loại mặc định cho khách hàng chưa được phân loại");
                    return customerTypeRepository.save(newDefault);
                });

        // ✅ Cập nhật lại khách hàng
        List<Customer> affected = customerRepository.findByCustomerTypesContaining(toDelete);
        for (Customer customer : affected) {
            customer.getCustomerTypes().remove(toDelete);
            customer.getCustomerTypes().add(defaultType);
        }

        customerRepository.saveAll(affected);

        // ✅ Xóa loại (gọi @PreRemove tự động xóa liên kết còn lại nếu có)
        customerTypeRepository.delete(toDelete);
    }
}
