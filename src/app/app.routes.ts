import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { RegistroComponent } from './universidad/view/registro/registro.component';
import { HorarioComponent } from './universidad/view/espaciosfisicos/horario/horario.component';
import { FranjaComponent } from './universidad/view/espaciosfisicos/franja/franja.component';
import { UbicacionComponent } from './universidad/view/espaciosfisicos/ubicacion/ubicacion.component';
import { FacturaComponent } from './universidad/view/facturacion/factura/factura.component';
import { ClienteComponent } from './universidad/view/facturacion/cliente/cliente.component';

export const routes: Routes = [
    {
        path: '', component: DashboardDemoComponent  },
    { path: 'sample', component: SampleDemoComponent },
    { path: 'forms', component: FormsDemoComponent },
    { path: 'data', component: DataDemoComponent },
    { path: 'panels', component: PanelsDemoComponent },
    { path: 'overlays', component: OverlaysDemoComponent },
    { path: 'menus', component: MenusDemoComponent },
    { path: 'messages', component: MessagesDemoComponent },
    { path: 'misc', component: MiscDemoComponent },
    { path: 'empty', component: EmptyDemoComponent },
    { path: 'charts', component: ChartsDemoComponent },
    { path: 'file', component: FileDemoComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'horario', component: HorarioComponent },
    { path: 'franja', component: FranjaComponent },
    { path: 'ubicacion', component: UbicacionComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'factura', component: FacturaComponent },
    { path: 'cliente', component: ClienteComponent },
    {
        path: 'virtual',
        loadChildren: './virtual/virtual.module#VirtualModule'
    },



];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
