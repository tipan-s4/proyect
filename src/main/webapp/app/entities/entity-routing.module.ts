import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'instalacion',
        data: { pageTitle: 'proyectApp.instalacion.home.title' },
        loadChildren: () => import('./instalacion/instalacion.module').then(m => m.InstalacionModule),
      },
      {
        path: 'material',
        data: { pageTitle: 'proyectApp.material.home.title' },
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
      },
      {
        path: 'registro-material-utilizado',
        data: { pageTitle: 'proyectApp.registroMaterialUtilizado.home.title' },
        loadChildren: () =>
          import('./registro-material-utilizado/registro-material-utilizado.module').then(m => m.RegistroMaterialUtilizadoModule),
      },
      {
        path: 'cliente',
        data: { pageTitle: 'proyectApp.cliente.home.title' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'reserva',
        data: { pageTitle: 'proyectApp.reserva.home.title' },
        loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaModule),
      },
      {
        path: 'penalizacion',
        data: { pageTitle: 'proyectApp.penalizacion.home.title' },
        loadChildren: () => import('./penalizacion/penalizacion.module').then(m => m.PenalizacionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
