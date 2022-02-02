import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PenalizacionService } from '../service/penalizacion.service';
import { IPenalizacion, Penalizacion } from '../penalizacion.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

import { PenalizacionUpdateComponent } from './penalizacion-update.component';

describe('Penalizacion Management Update Component', () => {
  let comp: PenalizacionUpdateComponent;
  let fixture: ComponentFixture<PenalizacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let penalizacionService: PenalizacionService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PenalizacionUpdateComponent],
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
      .overrideTemplate(PenalizacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PenalizacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    penalizacionService = TestBed.inject(PenalizacionService);
    clienteService = TestBed.inject(ClienteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cliente query and add missing value', () => {
      const penalizacion: IPenalizacion = { id: 456 };
      const cliente: ICliente = { id: 81986 };
      penalizacion.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 73689 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ penalizacion });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const penalizacion: IPenalizacion = { id: 456 };
      const cliente: ICliente = { id: 48693 };
      penalizacion.cliente = cliente;

      activatedRoute.data = of({ penalizacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(penalizacion));
      expect(comp.clientesSharedCollection).toContain(cliente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Penalizacion>>();
      const penalizacion = { id: 123 };
      jest.spyOn(penalizacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ penalizacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: penalizacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(penalizacionService.update).toHaveBeenCalledWith(penalizacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Penalizacion>>();
      const penalizacion = new Penalizacion();
      jest.spyOn(penalizacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ penalizacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: penalizacion }));
      saveSubject.complete();

      // THEN
      expect(penalizacionService.create).toHaveBeenCalledWith(penalizacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Penalizacion>>();
      const penalizacion = { id: 123 };
      jest.spyOn(penalizacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ penalizacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(penalizacionService.update).toHaveBeenCalledWith(penalizacion);
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
  });
});
