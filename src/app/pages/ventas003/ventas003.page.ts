import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

declare var google;

@Component({
  selector: 'app-ventas003',
  templateUrl: './ventas003.page.html',
  styleUrls: ['./ventas003.page.scss'],
})
export class Ventas003Page implements OnInit {

  usuario = '';
  ano_anterior = (new Date()).getFullYear();

  constructor(  private datos: DatosService,
                private funciones: FuncionesService ) {
    this.ano_anterior -= 1;
    this.datos.readDatoLocal( 'KRpt_bbc_usuario' ).
      then( dato => { this.usuario = dato; console.log( dato ); } );
   }

  ngOnInit() {
    console.log('ngOnInit Ventas003', this.usuario );
    this.datos.getReport( { reporte: 3, empresa: '03' } )
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
        if ( element.ventas0 && element.ventas00 ) {
          //
          eje.push( [ element.sucursal, element.ventas0, element.ventas00 ] );
          //
          eje_table.push( [ element.sucursal,
                            { v: element.promedio,  f: ( element.promedio  / 1000000 ).toFixed(2).toString() },
                            { v: element.promedio0, f: ( element.promedio0 / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas0,   f: ( element.ventas0   / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas00,  f: ( element.ventas00  / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas1,   f: ( element.ventas1   / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas11,  f: ( element.ventas11  / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas2,   f: ( element.ventas2   / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas22,  f: ( element.ventas22  / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas3,   f: ( element.ventas3   / 1000000 ).toFixed(2).toString() },
                            { v: element.ventas33,  f: ( element.ventas33  / 1000000 ).toFixed(2).toString() },
                            element.nombresuc.substring(0, 24 ) ] );
          //
          total[0] += element.ventas0; total[4] += element.ventas00;
          total[1] += element.ventas1; total[5] += element.ventas11;
          total[2] += element.ventas2; total[6] += element.ventas22;
          total[3] += element.ventas3; total[7] += element.ventas33;
        }
        //
      });
      //
      total[8] = ( total[1] + total[2] + total[3] ) / 3;
      total[9] = ( total[5] + total[6] + total[7] ) / 3;
      //
      eje_table.push( [ '>>>',
                        {v: total[8], f: ( total[8] / 1000000 ).toFixed(2).toString() },
                        {v: total[9], f: ( total[9] / 1000000 ).toFixed(2).toString() },
                        {v: total[0], f: ( total[0] / 1000000 ).toFixed(2).toString() },
                        {v: total[4], f: ( total[4] / 1000000 ).toFixed(2).toString() },
                        {v: total[1], f: ( total[1] / 1000000 ).toFixed(2).toString() },
                        {v: total[5], f: ( total[5] / 1000000 ).toFixed(2).toString() },
                        {v: total[2], f: ( total[2] / 1000000 ).toFixed(2).toString() },
                        {v: total[6], f: ( total[6] / 1000000 ).toFixed(2).toString() },
                        {v: total[3], f: ( total[3] / 1000000 ).toFixed(2).toString() },
                        {v: total[7], f: ( total[7] / 1000000 ).toFixed(2).toString() },
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
        chartArea: { left: '15%', width: '90%', height: '87%' },  /* left: '10%', top: '5%', width: '40%', height: '87%'  */
        chart: { title: 'Ventas últimas 4 semanas', subtitle: 'Comparando años', },
        legend: { position: 'top', maxLines: 1 },
        isStacked: false,
        hAxis: { title: 'Ventas', minValue: 0 },
        vAxis: { title: 'Sucursales' }
      };

      // const chart = new google.charts.Bar(document.getElementById('bar_chart_div'));
      const chart = new google.visualization.BarChart(document.getElementById('bar_chart_div'));
      chart.draw(datax, options);

    }
  }

}
