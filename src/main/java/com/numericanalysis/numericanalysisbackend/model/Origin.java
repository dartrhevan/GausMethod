package com.numericanalysis.numericanalysisbackend.model;

public enum Origin {
    Equations(0),
    Systems(1),
    Interpolation(2);

    private Origin(int number) {
        this.number = number;
    }

    private int number;

    public int getNumber() {
        return number;
    }
}
