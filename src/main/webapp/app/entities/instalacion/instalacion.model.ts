export interface IInstalacion {
  id?: number;
  nombre?: string | null;
  precioPorHora?: number | null;
  disponible?: boolean | null;
}

export class Instalacion implements IInstalacion {
  constructor(public id?: number, public nombre?: string | null, public precioPorHora?: number | null, public disponible?: boolean | null) {
    this.disponible = this.disponible ?? false;
  }
}

export function getInstalacionIdentifier(instalacion: IInstalacion): number | undefined {
  return instalacion.id;
}
