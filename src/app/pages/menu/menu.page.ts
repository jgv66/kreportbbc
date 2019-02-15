import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public itemes_Sucursales: Array<{ titulo: string, page: string, item: string }> = [
    /*{ titulo: 'Ventas por Sucursal', page: 'ventas001', item: 'Mes actual' },*/
    { titulo: 'Ventas comparativas mes en curso',  page: 'ventas001', item: 'Facturación sucursales' },
    { titulo: 'Ventas comparativas mes en curso',  page: 'ventas011', item: 'Facturación anual sucursales' },
    { titulo: 'Ventas comparativas mes en curso',  page: 'ventas002', item: 'Movimiento últimas 4 semanas' },
    { titulo: 'Ventas comparativas mes en curso',  page: 'ventas003', item: 'Ventas últimas 4 semanas' },
  ];

public itemes_SucPasado: Array<{ titulo: string, page: string, item: string }> = [
    { titulo: 'Reportes y  KPI', page: 'ventap001', item: 'Reporte 1' },
    { titulo: 'Reportes y  KPI', page: 'ventap001', item: 'Reporte 2' },
    { titulo: 'Reportes y  KPI', page: 'ventap001', item: 'Reporte 3' },
    { titulo: 'Reportes y  KPI', page: 'ventap001', item: 'Reporte 4' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

