export interface ICliente {
  id?: number;
  dni?: string | null;
  nombre?: string | null;
  apellidos?: string | null;
  telefono?: number | null;
  direccion?: string | null;
  edad?: string | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public dni?: string | null,
    public nombre?: string | null,
    public apellidos?: string | null,
    public telefono?: number | null,
    public direccion?: string | null,
    public edad?: string | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
