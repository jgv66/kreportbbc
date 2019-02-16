import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

declare var google;

@Component({
  selector: 'app-ventas002',
  templateUrl: './ventas002.page.html',
  styleUrls: ['./ventas002.page.scss'],
})
export class Ventas002Page implements OnInit {

  usuario = '';
  ano_anterior = (new Date()).getFullYear();

  constructor(  private datos: DatosService,
                private funciones: FuncionesService ) {
    this.ano_anterior -= 1;
    this.datos.readDatoLocal( 'KRpt_bbc_usuario' ).
      then( dato => { this.usuario = dato; } );
   }

  ngOnInit() {
    console.log('ngOnInit Ventas002', this.usuario );
    this.datos.getReport( { reporte: 2, empresa: '03' } )
        .subscribe( data => { this.cargaDatos( data ); },
                    err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION', err ); }
                  );
  }

  cargaDatos( data ) {
    const total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const t = Array<string>(8);
    const rs = data.datos;
    //
    console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Vendedores  no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje       = [ ['Sucursal', 'Actual', 'Anterior' ] ];
      const eje_table = [];
      //
      rs.forEach( element => {
        // nombres de columnas
        t[0] = element.peri0 ; t[1] = element.peri00 ;
        t[2] = element.peri1 ; t[3] = element.peri11 ;
        t[4] = element.peri2 ; t[5] = element.peri22 ;
        t[6] = element.peri3 ; t[7] = element.peri33 ;
        // 
        if ( element.visitas0 && element.visitas00 ) {
          //
          eje.push( [ element.sucursal, element.visitas0, element.visitas00 ] );
          //
          eje_table.push( [ element.sucursal,
                            { v: element.promedio,  f: element.promedio .toFixed(0).toString() },
                            { v: element.promedio0, f: element.promedio0.toFixed(0).toString() },
                            { v: element.visitas0,  f: element.visitas0 .toFixed(0).toString() },
                            { v: element.visitas00, f: element.visitas00.toFixed(0).toString() },
                            { v: element.visitas1,  f: element.visitas1. toFixed(0).toString() },
                            { v: element.visitas11, f: element.visitas11.toFixed(0).toString() },
                            { v: element.visitas2,  f: element.visitas2 .toFixed(0).toString() },
                            { v: element.visitas22, f: element.visitas22.toFixed(0).toString() },
                            { v: element.visitas3,  f: element.visitas3 .toFixed(0).toString() },
                            { v: element.visitas33, f: element.visitas33.toFixed(0).toString() },
                            element.nombresuc.substring(0, 24 ) ] );
          //
          total[0] += element.visitas0; total[4] += element.visitas00;
          total[1] += element.visitas1; total[5] += element.visitas11;
          total[2] += element.visitas2; total[6] += element.visitas22;
          total[3] += element.visitas3; total[7] += element.visitas33;
        }
        //
      });
      //
      total[8] = ( total[0] + total[1] + total[2] + total[3] ) / 4;
      total[9] = ( total[4] + total[5] + total[6] + total[7] ) / 4;
      //
      eje_table.push( [ '>>>',
                        {v: total[8], f: total[8].toFixed(0).toString() }, {v: total[9], f: total[9].toFixed(0).toString() },
                        {v: total[0], f: total[0].toFixed(0).toString() }, {v: total[4], f: total[4].toFixed(0).toString() },
                        {v: total[1], f: total[1].toFixed(0).toString() }, {v: total[5], f: total[5].toFixed(0).toString() },
                        {v: total[2], f: total[2].toFixed(0).toString() }, {v: total[6], f: total[6].toFixed(0).toString() },
                        {v: total[3], f: total[3].toFixed(0).toString() }, {v: total[7], f: total[7].toFixed(0).toString() },
                        'Totales' ] );

      // tabla de datos
      const data_table = new google.visualization.DataTable();
      data_table.addColumn('string', 'Suc.');
      data_table.addColumn('number', 'Pr.Act');
      data_table.addColumn('number', 'Pr.Ant');
      data_table.addColumn('number', t[0] );
      data_table.addColumn('number', t[1] );
      data_table.addColumn('number', t[2] );
      data_table.addColumn('number', t[3] );
      data_table.addColumn('number', t[4] );
      data_table.addColumn('number', t[5] );
      data_table.addColumn('number', t[6] );
      data_table.addColumn('number', t[7] );
      data_table.addColumn('string', 'Nombre Sucursal_______________');
      data_table.addRows( eje_table );
      //
      const table = new google.visualization.Table(document.getElementById('table_div'));
      table.draw(data_table, {showRowNumber: false, width: '100%', height: '100%'});
      //
      eje[0][1] = t[0];
      eje[0][2] = t[1];
      //
      const datax = new google.visualization.arrayToDataTable( eje );
      const options = {
        width: 350,
        height: 500,
        chartArea: { left: '15%', width: '90%', height: '87%' },  /* left: '10%', top: '5%', width: '40%', height: '87%'  */
        chart: { title: 'Movimiento últimas 4 semanas', subtitle: 'Comparando años', },
        legend: { position: 'top', maxLines: 1 },
        /*bar: { groupWidth: '75%' },*/
        isStacked: false,
        hAxis: { title: 'Movimientos de Venta', minValue: 0 },
        vAxis: { title: 'Sucursales' }
      };

      // const chart = new google.charts.Bar(document.getElementById('bar_chart_div'));
      const chart = new google.visualization.BarChart(document.getElementById('bar_chart_div'));
      chart.draw(datax, options);

    }
  }

}
