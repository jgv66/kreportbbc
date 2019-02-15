import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {

  /*@Input()  titulo: string;*/
  @Input()  itemes: any;

  collapsed = true;
  titulo    = '';

  constructor( private router: Router,
               private funciones: FuncionesService ) {
    // this.titulo = this.itemes[0].titulo ;
  }

  ngOnInit() {
  }

  navigateTo( page: any ) {
    if ( page === 'ventas001' || page === 'ventas011' ||
         page === 'ventas002' ||
         page === 'ventas003' ||
         page === 'ventas004' ||
         page === 'ventas005' ) {
      this.router.navigate( [`${page}`] );
    } else {
      this.funciones.muestraySale( 'Reporte no adquirido. Contacte a www.kinetik.cl', 2 );
    }
  }

  toggleCollapsible() {
    this.collapsed = !this.collapsed;
  }


}
