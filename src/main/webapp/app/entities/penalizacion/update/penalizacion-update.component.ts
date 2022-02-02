import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPenalizacion, Penalizacion } from '../penalizacion.model';
import { PenalizacionService } from '../service/penalizacion.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Component({
  selector: 'jhi-penalizacion-update',
  templateUrl: './penalizacion-update.component.html',
})
export class PenalizacionUpdateComponent implements OnInit {
  isSaving = false;

  clientesSharedCollection: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    motivo: [],
    totalAPagar: [],
    cliente: [],
  });

  constructor(
    protected penalizacionService: PenalizacionService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ penalizacion }) => {
      this.updateForm(penalizacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const penalizacion = this.createFromForm();
    if (penalizacion.id !== undefined) {
      this.subscribeToSaveResponse(this.penalizacionService.update(penalizacion));
    } else {
      this.subscribeToSaveResponse(this.penalizacionService.create(penalizacion));
    }
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPenalizacion>>): void {
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

  protected updateForm(penalizacion: IPenalizacion): void {
    this.editForm.patchValue({
      id: penalizacion.id,
      motivo: penalizacion.motivo,
      totalAPagar: penalizacion.totalAPagar,
      cliente: penalizacion.cliente,
    });

    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(
      this.clientesSharedCollection,
      penalizacion.cliente
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
  }

  protected createFromForm(): IPenalizacion {
    return {
      ...new Penalizacion(),
      id: this.editForm.get(['id'])!.value,
      motivo: this.editForm.get(['motivo'])!.value,
      totalAPagar: this.editForm.get(['totalAPagar'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
    };
  }
}
