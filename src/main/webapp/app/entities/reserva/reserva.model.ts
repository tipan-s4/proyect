import dayjs from 'dayjs/esm';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { IInstalacion } from 'app/entities/instalacion/instalacion.model';

export interface IReserva {
  id?: number;
  fechaInicio?: dayjs.Dayjs | null;
  fechaFin?: dayjs.Dayjs | null;
  tipoPago?: string | null;
  total?: number | null;
  cliente?: ICliente | null;
  instalacion?: IInstalacion | null;
}

export class Reserva implements IReserva {
  constructor(
    public id?: number,
    public fechaInicio?: dayjs.Dayjs | null,
    public fechaFin?: dayjs.Dayjs | null,
    public tipoPago?: string | null,
    public total?: number | null,
    public cliente?: ICliente | null,
    public instalacion?: IInstalacion | null
  ) {}
}

export function getReservaIdentifier(reserva: IReserva): number | undefined {
  return reserva.id;
}
