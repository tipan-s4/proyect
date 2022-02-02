package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Penalizacion} entity.
 */
public class PenalizacionDTO implements Serializable {

    private Long id;

    private String motivo;

    private Double totalAPagar;

    private ClienteDTO cliente;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public Double getTotalAPagar() {
        return totalAPagar;
    }

    public void setTotalAPagar(Double totalAPagar) {
        this.totalAPagar = totalAPagar;
    }

    public ClienteDTO getCliente() {
        return cliente;
    }

    public void setCliente(ClienteDTO cliente) {
        this.cliente = cliente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PenalizacionDTO)) {
            return false;
        }

        PenalizacionDTO penalizacionDTO = (PenalizacionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, penalizacionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PenalizacionDTO{" +
            "id=" + getId() +
            ", motivo='" + getMotivo() + "'" +
            ", totalAPagar=" + getTotalAPagar() +
            ", cliente=" + getCliente() +
            "}";
    }
}
