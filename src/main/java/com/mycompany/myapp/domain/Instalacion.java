package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Instalacion.
 */
@Entity
@Table(name = "instalacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Instalacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio_por_hora")
    private Double precioPorHora;

    @Column(name = "disponible")
    private Boolean disponible;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Instalacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Instalacion nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecioPorHora() {
        return this.precioPorHora;
    }

    public Instalacion precioPorHora(Double precioPorHora) {
        this.setPrecioPorHora(precioPorHora);
        return this;
    }

    public void setPrecioPorHora(Double precioPorHora) {
        this.precioPorHora = precioPorHora;
    }

    public Boolean getDisponible() {
        return this.disponible;
    }

    public Instalacion disponible(Boolean disponible) {
        this.setDisponible(disponible);
        return this;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instalacion)) {
            return false;
        }
        return id != null && id.equals(((Instalacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Instalacion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", precioPorHora=" + getPrecioPorHora() +
            ", disponible='" + getDisponible() + "'" +
            "}";
    }
}
