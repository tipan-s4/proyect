import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReserva, getReservaIdentifier } from '../reserva.model';

export type EntityResponseType = HttpResponse<IReserva>;
export type EntityArrayResponseType = HttpResponse<IReserva[]>;

@Injectable({ providedIn: 'root' })
export class ReservaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reservas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reserva: IReserva): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reserva);
    return this.http
      .post<IReserva>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reserva: IReserva): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reserva);
    return this.http
      .put<IReserva>(`${this.resourceUrl}/${getReservaIdentifier(reserva) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(reserva: IReserva): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reserva);
    return this.http
      .patch<IReserva>(`${this.resourceUrl}/${getReservaIdentifier(reserva) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReserva>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReserva[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReservaToCollectionIfMissing(reservaCollection: IReserva[], ...reservasToCheck: (IReserva | null | undefined)[]): IReserva[] {
    const reservas: IReserva[] = reservasToCheck.filter(isPresent);
    if (reservas.length > 0) {
      const reservaCollectionIdentifiers = reservaCollection.map(reservaItem => getReservaIdentifier(reservaItem)!);
      const reservasToAdd = reservas.filter(reservaItem => {
        const reservaIdentifier = getReservaIdentifier(reservaItem);
        if (reservaIdentifier == null || reservaCollectionIdentifiers.includes(reservaIdentifier)) {
          return false;
        }
        reservaCollectionIdentifiers.push(reservaIdentifier);
        return true;
      });
      return [...reservasToAdd, ...reservaCollection];
    }
    return reservaCollection;
  }

  protected convertDateFromClient(reserva: IReserva): IReserva {
    return Object.assign({}, reserva, {
      fechaInicio: reserva.fechaInicio?.isValid() ? reserva.fechaInicio.toJSON() : undefined,
      fechaFin: reserva.fechaFin?.isValid() ? reserva.fechaFin.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio ? dayjs(res.body.fechaInicio) : undefined;
      res.body.fechaFin = res.body.fechaFin ? dayjs(res.body.fechaFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reserva: IReserva) => {
        reserva.fechaInicio = reserva.fechaInicio ? dayjs(reserva.fechaInicio) : undefined;
        reserva.fechaFin = reserva.fechaFin ? dayjs(reserva.fechaFin) : undefined;
      });
    }
    return res;
  }
}
