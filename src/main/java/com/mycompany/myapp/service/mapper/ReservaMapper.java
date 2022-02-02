package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Reserva;
import com.mycompany.myapp.service.dto.ReservaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reserva} and its DTO {@link ReservaDTO}.
 */
@Mapper(componentModel = "spring", uses = { ClienteMapper.class, InstalacionMapper.class })
public interface ReservaMapper extends EntityMapper<ReservaDTO, Reserva> {
    @Mapping(target = "cliente", source = "cliente", qualifiedByName = "id")
    @Mapping(target = "instalacion", source = "instalacion", qualifiedByName = "id")
    ReservaDTO toDto(Reserva s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ReservaDTO toDtoId(Reserva reserva);
}
