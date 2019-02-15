import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

declare var google;

@Component({
  selector: 'app-ventas011',
  templateUrl: './ventas011.page.html',
  styleUrls: ['./ventas011.page.scss'],
})
export class Ventas011Page implements OnInit {

  usuario = '';

  constructor(  private datos: DatosService,
                private funciones: FuncionesService ) {
    this.datos.readDatoLocal( 'KRpt_bbc_usuario' ).
      then( dato => { this.usuario = dato; console.log( dato ); } );
   }

  ngOnInit() {
    console.log('ngOnInit Ventas011', this.usuario );
    this.datos.getReport( { reporte: 11,
                            empresa: '03' } )
        .subscribe( data => { this.cargaDatos( data ); },
                    err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION', err ); } 
                  );
  }

  cargaDatos( data ) {
    let total0 = 0;
    let total1 = 0;
    let dif    = 0;
    //
    let tit0 = '';
    let tit1 = '';
    let titx = '';
    //
    const rs = data.datos;
    console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje       = [];
      const eje_table = [];
      //
      rs.forEach( element => {
        // Y-titulos de grafico
        titx = (element.peri0 + 2000).toString();
        tit0 = (element.peri0 + 2000).toString();
        tit1 = (element.peri1 + 2000).toString();
        // matriz para barras
        if ( element.ventas0 > 0 ) {
          eje.push( [ element.sucursal, element.ventas0 / 1000000 ] );
        }
        if ( element.ventas1 > 0 ) {
          dif = (( element.ventas0 - element.ventas1 ) / element.ventas1) * 100;
        } else {
          dif = 0;
        }
        if ( element.ventas0 > 0 && element.ventas1 > 0 ) {
          eje_table.push( [ element.sucursal,
                          { v: element.ventas0, f: (element.ventas0 / 1000000).toFixed(2).toString() },
                          { v: element.ventas1, f: (element.ventas1 / 1000000).toFixed(2).toString() },
                          { v: dif,             f: dif                        .toFixed(2).toString() },
                          element.nombresuc ] );
        }
        total0 += element.ventas0;
        total1 += element.ventas1;
      });
      //
      if ( total1 > 0 ) {
        dif = ((total0 - total1) / total1) * 100;
      } else {
        dif = 0;
      }
      eje_table.push( [ '>>>',
                        {v: total0, f: (total0 / 1000000).toFixed(2).toString() },
                        {v: total1, f: (total1 / 1000000).toFixed(2).toString() },
                        {v: dif,    f: dif               .toFixed(2).toString() },
                        'Totales' ] );
      // crear el grafico de pie
      const data_pie = new google.visualization.DataTable();
          data_pie.addColumn('string', 'Sucursal');
          data_pie.addColumn('number', 'Venta');
          data_pie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pie_chart = new google.visualization.PieChart(document.getElementById('pie_chart_div'));
      const options   = { title: 'Año : ' + titx,
                        'width': '100%',
                        'height': '100%',
                        'is3D': true,
                        'chartArea': { 'left': '10', 'top': '20', 'bottom': '50', 'width': '150%', 'height': '100%'},
                        };
      pie_chart.draw(data_pie, options );

      // tabla representando los datos
      const data_table = new google.visualization.DataTable();
          data_table.addColumn('string', 'Suc.');
          data_table.addColumn('number', tit0 );
          data_table.addColumn('number', tit1 );
          data_table.addColumn('number', '% Dif.');
          data_table.addColumn('string', 'Descripción');
          data_table.addRows( eje_table );
      const table = new google.visualization.Table(document.getElementById('table_div'));
      // colocar un flecha
      const formatter = new google.visualization.ArrowFormat();
      formatter.format(data_table, 3); // Apply formatter to second column
      //
      table.draw(data_table, {allowHtml: true, showRowNumber: false, width: '100%', height: '100%'});

    }
  }

}
