export class AppConstants {

  static isAtHome = false;

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


