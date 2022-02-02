import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReservaService } from '../service/reserva.service';
import { IReserva, Reserva } from '../reserva.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IInstalacion } from 'app/entities/instalacion/instalacion.model';
import { InstalacionService } from 'app/entities/instalacion/service/instalacion.service';

import { ReservaUpdateComponent } from './reserva-update.component';

describe('Reserva Management Update Component', () => {
  let comp: ReservaUpdateComponent;
  let fixture: ComponentFixture<ReservaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reservaService: ReservaService;
  let clienteService: ClienteService;
  let instalacionService: InstalacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReservaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ReservaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReservaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reservaService = TestBed.inject(ReservaService);
    clienteService = TestBed.inject(ClienteService);
    instalacionService = TestBed.inject(InstalacionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cliente query and add missing value', () => {
      const reserva: IReserva = { id: 456 };
      const cliente: ICliente = { id: 8967 };
      reserva.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 59986 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reserva });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Instalacion query and add missing value', () => {
      const reserva: IReserva = { id: 456 };
      const instalacion: IInstalacion = { id: 50407 };
      reserva.instalacion = instalacion;

      const instalacionCollection: IInstalacion[] = [{ id: 76834 }];
      jest.spyOn(instalacionService, 'query').mockReturnValue(of(new HttpResponse({ body: instalacionCollection })));
      const additionalInstalacions = [instalacion];
      const expectedCollection: IInstalacion[] = [...additionalInstalacions, ...instalacionCollection];
      jest.spyOn(instalacionService, 'addInstalacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reserva });
      comp.ngOnInit();

      expect(instalacionService.query).toHaveBeenCalled();
      expect(instalacionService.addInstalacionToCollectionIfMissing).toHaveBeenCalledWith(instalacionCollection, ...additionalInstalacions);
      expect(comp.instalacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reserva: IReserva = { id: 456 };
      const cliente: ICliente = { id: 16056 };
      reserva.cliente = cliente;
      const instalacion: IInstalacion = { id: 46320 };
      reserva.instalacion = instalacion;

      activatedRoute.data = of({ reserva });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reserva));
      expect(comp.clientesSharedCollection).toContain(cliente);
      expect(comp.instalacionsSharedCollection).toContain(instalacion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reserva>>();
      const reserva = { id: 123 };
      jest.spyOn(reservaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reserva });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reserva }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reservaService.update).toHaveBeenCalledWith(reserva);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reserva>>();
      const reserva = new Reserva();
      jest.spyOn(reservaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reserva });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reserva }));
      saveSubject.complete();

      // THEN
      expect(reservaService.create).toHaveBeenCalledWith(reserva);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reserva>>();
      const reserva = { id: 123 };
      jest.spyOn(reservaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reserva });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reservaService.update).toHaveBeenCalledWith(reserva);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackClienteById', () => {
      it('Should return tracked Cliente primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClienteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackInstalacionById', () => {
      it('Should return tracked Instalacion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInstalacionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
