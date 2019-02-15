import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

declare var google;

@Component({
  selector: 'app-ventas005',
  templateUrl: './ventas005.page.html',
  styleUrls: ['./ventas005.page.scss'],
})
export class Ventas005Page implements OnInit {

  usuario = '';
  information = [];
  lista = false;

  constructor(  private datos: DatosService,
                private funciones: FuncionesService ) {
    this.information = [];
    this.datos.readDatoLocal( 'KRpt_Susa_usuario' ).
      then( dato => { this.usuario = dato; console.log( dato ); } );
   }

  ngOnInit() {
    console.log('ngOnInit Ventas005', this.usuario );
    this.datos.getReport( { reporte: 5,
                            empresa: '01',
                            sucursal: '001' } )
        .subscribe( data => { this.cargaDatos( data ); },
                    err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION', err ); }
                  );
  }

  cargaDatos( data ) {
    const total = [0, 0, 0, 0, 0];
    let t1 = 0; let t2 = 0; let t3 = 0; let t4 = 0;
    const rs = data.datos;
    console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Vendedores  no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje       = [ [ 'Período'   , 'Clientes'],
                          [ 'Año 2019'  , 0 ],
                          [ 'Últimas.4' , 0 ],
                          [ 'Semana'    , 0 ],
                          [ 'Sin Vista' , 0 ]];
      const eje_table = [];
      //
      rs.forEach( element => {
        this.information.push( {  open: false,
          vendedor:   element.vendedor,
          nombre:     element.nombreven,
          asignados:  element.asignados,
          anno:       element.anno,
          ultimas4:   element.ultimas4,
          semana:     element.semana,
          sinvisita:  element.sinvisita
        });
        // Y-titulos de grafico
        t1 += element.anno      ; eje[1][1] = t1;
        t2 += element.ultimas4  ; eje[2][1] = t2;
        t3 += element.semana    ; eje[3][1] = t3;
        t4 += element.sinvisita ; eje[4][1] = t4;
        //
        eje_table.push( [ element.vendedor,
                          { v: element.asignados, f: element.asignados.toFixed(0).toString() },
                          { v: element.anno     , f: element.anno     .toFixed(0).toString() },
                          { v: element.ultimas4 , f: element.ultimas4 .toFixed(0).toString() },
                          { v: element.semana   , f: element.semana   .toFixed(0).toString() },
                          { v: element.sinvisita, f: element.sinvisita.toFixed(0).toString() },
                          element.nombreven.substring(0, 12 ) ] );
        //
        total[0] += element.anno     ;
        total[1] += element.ultimas4 ;
        total[2] += element.semana   ;
        total[3] += element.sinvisita;
        total[4] += element.asignados;
        });
      //
      eje_table.push( [ '>>>',
                        {v: total[4], f: total[4].toFixed(0).toString() },
                        {v: total[0], f: total[0].toFixed(0).toString() },
                        {v: total[1], f: total[1].toFixed(0).toString() },
                        {v: total[2], f: total[2].toFixed(0).toString() },
                        {v: total[3], f: total[3].toFixed(0).toString() },
                        'Totales' ] );

      // grafica de barras
      const datos = google.visualization.arrayToDataTable( eje );
      const opciones = {
        title:      'Clientes sin visitar',
        chartArea:  { width: '50%'},
        hAxis:      { title: 'Total de Clientes', minValue: 0 },
        vAxis:      { title: 'Períodos' }
      };
      const bar_Chart = new google.visualization.BarChart(document.getElementById('bar_chart_div'));
      bar_Chart.draw( datos, opciones );

      // tabla de datos
      const data_table = new google.visualization.DataTable();
      data_table.addColumn('string', 'Vend');
      data_table.addColumn('number', 'Asig');
      data_table.addColumn('number', 'Año') ;
      data_table.addColumn('number', 'Ult4' ) ;
      data_table.addColumn('number', 'Sem' ) ;
      data_table.addColumn('number', 'SIN' ) ;
      data_table.addColumn('string', 'Nombre Vendedor');
      data_table.addRows( eje_table );
      const table = new google.visualization.Table(document.getElementById('table_div'));

      table.draw(data_table, {showRowNumber: false, width: '100%', height: '100%'});
    }
  }

  toggleSection( i ) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem( i, j ) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  toggleList() {
    this.lista = !this.lista;
  }

  ClientesSinVisita() {
    this.funciones.muestraySale( 'Reporte no adquirido. Contacte a www.kinetik.cl', 2 );
  }
}
