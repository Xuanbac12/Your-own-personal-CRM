package com.example.backend.common;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Gender {
    NAM("Nam"),
    NU("Nữ");

    private final String label;

    Gender(String label){
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Gender fromLabel(String input) {
        for (Gender gender : Gender.values()) {
            if (gender.label.equalsIgnoreCase(input)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid gender value: " + input);
    }

}
