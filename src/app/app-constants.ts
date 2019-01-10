export class AppConstants {

  static skipGuide = false;
  static notifyPicoYPlaca = false;
  static location = {
    lat: undefined,
    lng: undefined
  };

  static get API_ENDPOINT(): string {
    return {
      dev: '',
      prod: ''
    }.dev;
  }

  static get PAYU() {
    return {
      test: {
        API_ENDPOINT: '',
        API_LOGIN: '',
        API_KEY: '',
        merchandID: '',
        accountId: '',
      },
      prod: {
        API_ENDPOINT: '',
        API_LOGIN: '',
        API_KEY: '',
        merchandID: '',
        accountId: '',
      }
    }.prod;
  }

  static get GOOGLE_API_KEY(): string {
    return 'AIzaSyB_TNfE3rG_JOV-3jrDNT04lml2sxPzNUc';
  }

  static get dateTranslation() {
    return {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    };
  }
}


