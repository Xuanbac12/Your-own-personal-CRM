package com.example.backend.service;

import com.example.backend.dto.request.TagRequest;
import com.example.backend.dto.response.TagResponse;
import com.example.backend.entity.Customer;
import com.example.backend.entity.Tag;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public TagResponse toResponseDTO(Tag tag){
        return new TagResponse(
                tag.getId(),
                tag.getName(),
                tag.getColor()
        );
    }

    public TagResponse createRequest(TagRequest request){
        Tag tag = new Tag();

        tag.setName(request.getName());
        tag.setColor(request.getColor());
        Tag saved = tagRepository.save(tag);
        return toResponseDTO(saved);
    }

    public List<TagResponse> getTags(){
        List<Tag> tags = tagRepository.findAll();

        return tags.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTag(Long tagId) {
        Tag toDelete = tagRepository.findById(tagId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Tag với id: " + tagId));

        // ❌ Không cho xóa tag mặc định
        if ("Không xác định".equalsIgnoreCase(toDelete.getName())) {
            throw new IllegalArgumentException("Không thể xóa tag mặc định");
        }

        // ✅ Lấy hoặc tạo tag mặc định "Không xác định"
        Tag defaultTag = tagRepository.findByName("Không xác định")
                .orElseGet(() -> {
                    Tag newDefault = new Tag();
                    newDefault.setName("Không xác định");
                    newDefault.setColor("#9CA3AF"); // màu xám mặc định
                    return tagRepository.save(newDefault);
                });

        // ✅ Gỡ tag khỏi các khách hàng đang sử dụng
        List<Customer> affected = customerRepository.findByTagsContaining(toDelete);
        for (Customer customer : affected) {
            customer.getTags().remove(toDelete);
            customer.getTags().add(defaultTag); // gán tag mặc định
        }
        customerRepository.saveAll(affected);

        // ✅ Xóa tag (sau khi đã gỡ liên kết và thay thế)
        tagRepository.delete(toDelete);
    }

    public TagResponse updateTag(Long id, TagRequest request){
        Tag tag = tagRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy tag"));

        tag.setName(request.getName());
        tag.setColor(request.getColor());

        Tag saved = tagRepository.save(tag);
        return toResponseDTO(saved);
    }

    public TagResponse getTag(Long id){
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(" Không tìm thấy Tag"));
        return toResponseDTO(tag);
    }

}
