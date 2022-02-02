package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Material.
 */
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cantidad_reservada")
    private Integer cantidadReservada;

    @Column(name = "cantidad_disponible")
    private Integer cantidadDisponible;

    @ManyToOne
    private Instalacion instalacion;

    @OneToMany(mappedBy = "material")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reserva", "material" }, allowSetters = true)
    private Set<RegistroMaterialUtilizado> registroMaterialUtilizados = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Material id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Material nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCantidadReservada() {
        return this.cantidadReservada;
    }

    public Material cantidadReservada(Integer cantidadReservada) {
        this.setCantidadReservada(cantidadReservada);
        return this;
    }

    public void setCantidadReservada(Integer cantidadReservada) {
        this.cantidadReservada = cantidadReservada;
    }

    public Integer getCantidadDisponible() {
        return this.cantidadDisponible;
    }

    public Material cantidadDisponible(Integer cantidadDisponible) {
        this.setCantidadDisponible(cantidadDisponible);
        return this;
    }

    public void setCantidadDisponible(Integer cantidadDisponible) {
        this.cantidadDisponible = cantidadDisponible;
    }

    public Instalacion getInstalacion() {
        return this.instalacion;
    }

    public void setInstalacion(Instalacion instalacion) {
        this.instalacion = instalacion;
    }

    public Material instalacion(Instalacion instalacion) {
        this.setInstalacion(instalacion);
        return this;
    }

    public Set<RegistroMaterialUtilizado> getRegistroMaterialUtilizados() {
        return this.registroMaterialUtilizados;
    }

    public void setRegistroMaterialUtilizados(Set<RegistroMaterialUtilizado> registroMaterialUtilizados) {
        if (this.registroMaterialUtilizados != null) {
            this.registroMaterialUtilizados.forEach(i -> i.setMaterial(null));
        }
        if (registroMaterialUtilizados != null) {
            registroMaterialUtilizados.forEach(i -> i.setMaterial(this));
        }
        this.registroMaterialUtilizados = registroMaterialUtilizados;
    }

    public Material registroMaterialUtilizados(Set<RegistroMaterialUtilizado> registroMaterialUtilizados) {
        this.setRegistroMaterialUtilizados(registroMaterialUtilizados);
        return this;
    }

    public Material addRegistroMaterialUtilizado(RegistroMaterialUtilizado registroMaterialUtilizado) {
        this.registroMaterialUtilizados.add(registroMaterialUtilizado);
        registroMaterialUtilizado.setMaterial(this);
        return this;
    }

    public Material removeRegistroMaterialUtilizado(RegistroMaterialUtilizado registroMaterialUtilizado) {
        this.registroMaterialUtilizados.remove(registroMaterialUtilizado);
        registroMaterialUtilizado.setMaterial(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Material)) {
            return false;
        }
        return id != null && id.equals(((Material) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", cantidadReservada=" + getCantidadReservada() +
            ", cantidadDisponible=" + getCantidadDisponible() +
            "}";
    }
}
