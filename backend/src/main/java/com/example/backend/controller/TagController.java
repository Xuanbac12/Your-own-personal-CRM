package com.example.backend.controller;

import com.example.backend.dto.request.TagRequest;
import com.example.backend.dto.response.TagResponse;
import com.example.backend.entity.Tag;
import com.example.backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping
    public TagResponse createTag(@RequestBody TagRequest request){
        return tagService.createRequest(request);
    }

    @GetMapping
    public List<TagResponse> getTags(){
        return tagService.getTags();
    }

    @DeleteMapping("/{tagId}")
    public void deleteTag(@PathVariable("tagId") Long id, TagRequest request){
        tagService.deleteTag(id);
    }

    @PutMapping("/{tagId}")
    public TagResponse updateTag(@PathVariable("tagId") Long id, @RequestBody TagRequest request){
        return tagService.updateTag(id,request);
    }

    @GetMapping("/{tagId}")
    public TagResponse getTag(@PathVariable("tagId") Long id){
        return tagService.getTag(id);
    }
}
