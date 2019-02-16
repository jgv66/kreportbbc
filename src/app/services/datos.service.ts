
import { Injectable }         from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { LoadingController }  from '@ionic/angular';
import { tap, map }           from 'rxjs/operators';
import { Observable }         from 'rxjs';
import { Storage }            from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class DatosService {

  cualquierDato:  any;
  xDato:          any;
  loading:        any;
  params:         any;
  url             = 'https://api.kinetik.cl/babycenter';
  puerto          = '';

  constructor(  private http: HttpClient,
                private loadingCtrl: LoadingController,
                private storage: Storage ) {
  }

  async showLoading() {
  this.loading = await this.loadingCtrl.create({
            message: 'Rescatando',
            duration: 7000
          });
    return await this.loading.present();
  }

  /* FUNCIONES LOCALES */
  saveDatoLocal( token: any, dato: any ) {
    this.storage.set( token, JSON.stringify(dato) );
  }

  async readDatoLocal(token: any) {
    const dato = await this.storage.get(token).then( data => data );
    this.cualquierDato = !dato ? undefined : JSON.parse( dato );
    return this.cualquierDato;
  }

  async __readDatoLocal(token: any) {
    const dato = await this.storage.get(token)
    .then( data => { this.cualquierDato = !dato ? undefined : JSON.parse( dato );
                return this.cualquierDato; } );
  }

  guardaMientras( dato ) {
    this.cualquierDato = dato;
  }

  rescataMientras() {
    return this.cualquierDato ;
  }

  deleteDatoLocal( token: any ) {
    this.storage.remove( token ).then( () => console.log( 'DatosService.deleteDatoLocal EXISTE y REMOVIDO->', token ) );
  }

  /* FUNCIONES REMOTAS */
  getDataEmpresas(): Observable<any> {   /* debo cambiarlo por GET */
    const body = { datos: { empresa: '01', reporte: 777 }};
    return this.http.post( this.url + '' + this.puerto + '/krpt', body );
  }

  getDataUsuarios(): Observable<any> {   /* debo cambiarlo por GET */
    const body = { datos: { empresa: '01', reporte: 778 }};
    return this.http.post( this.url + '' + this.puerto + '/krpt', body );
  }

  getDataUser( proceso: any, email: any, clave: any, empresa: any ): Observable<any> {
    this.showLoading();
    const datos = { rutocorreo: email, clave: clave, empresa: empresa };
    const body  = { sp: 'ksp_buscarUsuario', datos: datos };
    return this.http.post( this.url + this.puerto + '/' + proceso, body )
                    .pipe( tap( value =>  { if ( this.loading ) { this.loading.dismiss(); } }) );
  }

  getReport( filtros: any ): Observable<any> {
    this.showLoading();
    const body = { datos: filtros };
    return this.http.post( this.url + this.puerto + '/krpt', body )
    .pipe( tap( value => { if ( this.loading ) { this.loading.dismiss(); } }) );
  }

  getVerificar( filtros: any ): Observable<any> {
    this.showLoading();
    const body = { datos: filtros };
    return this.http.post( this.url + this.puerto + '/kverifica', body )
    .pipe( tap( value => { if ( this.loading ) { this.loading.dismiss(); } }) );
  }

}
