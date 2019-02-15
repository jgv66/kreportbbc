import { Component } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email     = '';
  pssw      = '';
  empresa   = '';
  empresas  = [];
  usuarios  = [];

  constructor(  private datos: DatosService,
                private funciones: FuncionesService,
                private router: Router ) {}

  ngOnInit() {
    this.datos.getDataEmpresas().subscribe( data => { this.empresas = data['datos'];
                                                      console.log( data['datos'] );  } );  // todo el configp
    this.usrdata();
  }

  async usrdata() {
    const usr = await this.datos.readDatoLocal( 'KRpt_bbc_usuario' )
        .then(  data => { try {
                            this.email = data.EMAIL;
                          } catch (error) {
                            this.email = '';
                          }
                        },
                error => { console.log(error); } );
  }

  doLogin() {
    if ( this.email === '' || this.pssw === '' ) {
      this.funciones.msgAlert('Datos vacíos', 'Debe ingresar correo y clave para verificar accesos.' );
    } else {
      this.datos.getVerificar( {  reporte:  'usuario',
                                  email:    this.email,
                                  pssw:     this.pssw,
                                  empresa:  '01' } )
        .subscribe( data => {
                    console.log(data);
                    const rs = data['datos'][0];
                    if ( rs ) {
                      //
                      this.datos.saveDatoLocal( 'KRpt_bbc_usuario', rs );
                      this.empresas.forEach( element => {
                        if ( element.codigo === this.empresa ) {
                          this.datos.saveDatoLocal( 'KRpt_Susa_empresa', element.razonsocial );
                        }
                      });
                      //
                      this.router.navigate( ['/menu'] );
                    } else {
                      this.funciones.msgAlert( 'Usuario no encontrado', 'Correija y reintente' );
                    }
      },
      err => {
        console.error('ERROR. verifique sus datos de usuario/rut', err);
      });
    }
  }

}

