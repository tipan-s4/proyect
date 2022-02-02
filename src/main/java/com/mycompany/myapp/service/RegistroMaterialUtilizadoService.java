package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.RegistroMaterialUtilizadoDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.RegistroMaterialUtilizado}.
 */
public interface RegistroMaterialUtilizadoService {
    /**
     * Save a registroMaterialUtilizado.
     *
     * @param registroMaterialUtilizadoDTO the entity to save.
     * @return the persisted entity.
     */
    RegistroMaterialUtilizadoDTO save(RegistroMaterialUtilizadoDTO registroMaterialUtilizadoDTO);

    /**
     * Partially updates a registroMaterialUtilizado.
     *
     * @param registroMaterialUtilizadoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RegistroMaterialUtilizadoDTO> partialUpdate(RegistroMaterialUtilizadoDTO registroMaterialUtilizadoDTO);

    /**
     * Get all the registroMaterialUtilizados.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RegistroMaterialUtilizadoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" registroMaterialUtilizado.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RegistroMaterialUtilizadoDTO> findOne(Long id);

    /**
     * Delete the "id" registroMaterialUtilizado.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
