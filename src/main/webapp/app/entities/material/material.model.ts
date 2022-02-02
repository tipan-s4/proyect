import { IInstalacion } from 'app/entities/instalacion/instalacion.model';
import { IRegistroMaterialUtilizado } from 'app/entities/registro-material-utilizado/registro-material-utilizado.model';

export interface IMaterial {
  id?: number;
  nombre?: string | null;
  cantidadReservada?: number | null;
  cantidadDisponible?: number | null;
  instalacion?: IInstalacion | null;
  registroMaterialUtilizados?: IRegistroMaterialUtilizado[] | null;
}

export class Material implements IMaterial {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public cantidadReservada?: number | null,
    public cantidadDisponible?: number | null,
    public instalacion?: IInstalacion | null,
    public registroMaterialUtilizados?: IRegistroMaterialUtilizado[] | null
  ) {}
}

export function getMaterialIdentifier(material: IMaterial): number | undefined {
  return material.id;
}
