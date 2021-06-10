package dk.sogn.eksamen.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity

public class Parish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int parishCode;
    private String name;
    private double infectionPressure;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date shutDownTime;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="commune_id")
    private Commune commune;

    public Parish() {
    }

    public Parish(long id) {
        this.id = id;
    }

    public Parish(long id, int parishCode, String name, double infectionPressure, Date shutDownTime, Commune commune) {
        this.id = id;
        this.parishCode = parishCode;
        this.name = name;
        this.infectionPressure = infectionPressure;
        this.shutDownTime = shutDownTime;
        this.commune = commune;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getParishCode() {
        return parishCode;
    }

    public void setParishCode(int parishCode) {
        this.parishCode = parishCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getInfectionPressure() {
        return infectionPressure;
    }

    public void setInfectionPressure(double infectionPressure) {
        this.infectionPressure = infectionPressure;
    }

    public Date getShutDownTime() {
        return shutDownTime;
    }

    public void setShutDownTime(Date shutDownTime) {
        this.shutDownTime = shutDownTime;
    }

    public Commune getCommune() {
        return commune;
    }

    public void setCommune(Commune commune) {
        this.commune = commune;
    }
}
