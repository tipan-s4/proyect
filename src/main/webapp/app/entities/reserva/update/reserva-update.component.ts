import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IReserva, Reserva } from '../reserva.model';
import { ReservaService } from '../service/reserva.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IInstalacion } from 'app/entities/instalacion/instalacion.model';
import { InstalacionService } from 'app/entities/instalacion/service/instalacion.service';

@Component({
  selector: 'jhi-reserva-update',
  templateUrl: './reserva-update.component.html',
})
export class ReservaUpdateComponent implements OnInit {
  isSaving = false;

  clientesSharedCollection: ICliente[] = [];
  instalacionsSharedCollection: IInstalacion[] = [];

  editForm = this.fb.group({
    id: [],
    fechaInicio: [],
    fechaFin: [],
    tipoPago: [],
    total: [],
    cliente: [],
    instalacion: [],
  });

  constructor(
    protected reservaService: ReservaService,
    protected clienteService: ClienteService,
    protected instalacionService: InstalacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reserva }) => {
      if (reserva.id === undefined) {
        const today = dayjs().startOf('day');
        reserva.fechaInicio = today;
        reserva.fechaFin = today;
      }

      this.updateForm(reserva);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reserva = this.createFromForm();
    if (reserva.id !== undefined) {
      this.subscribeToSaveResponse(this.reservaService.update(reserva));
    } else {
      this.subscribeToSaveResponse(this.reservaService.create(reserva));
    }
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  trackInstalacionById(index: number, item: IInstalacion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReserva>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(reserva: IReserva): void {
    this.editForm.patchValue({
      id: reserva.id,
      fechaInicio: reserva.fechaInicio ? reserva.fechaInicio.format(DATE_TIME_FORMAT) : null,
      fechaFin: reserva.fechaFin ? reserva.fechaFin.format(DATE_TIME_FORMAT) : null,
      tipoPago: reserva.tipoPago,
      total: reserva.total,
      cliente: reserva.cliente,
      instalacion: reserva.instalacion,
    });

    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, reserva.cliente);
    this.instalacionsSharedCollection = this.instalacionService.addInstalacionToCollectionIfMissing(
      this.instalacionsSharedCollection,
      reserva.instalacion
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.instalacionService
      .query()
      .pipe(map((res: HttpResponse<IInstalacion[]>) => res.body ?? []))
      .pipe(
        map((instalacions: IInstalacion[]) =>
          this.instalacionService.addInstalacionToCollectionIfMissing(instalacions, this.editForm.get('instalacion')!.value)
        )
      )
      .subscribe((instalacions: IInstalacion[]) => (this.instalacionsSharedCollection = instalacions));
  }

  protected createFromForm(): IReserva {
    return {
      ...new Reserva(),
      id: this.editForm.get(['id'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value
        ? dayjs(this.editForm.get(['fechaInicio'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaFin: this.editForm.get(['fechaFin'])!.value ? dayjs(this.editForm.get(['fechaFin'])!.value, DATE_TIME_FORMAT) : undefined,
      tipoPago: this.editForm.get(['tipoPago'])!.value,
      total: this.editForm.get(['total'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      instalacion: this.editForm.get(['instalacion'])!.value,
    };
  }
}
