export class AppConstants {

  static skipGuide = false;
  static notifyPicoYPlaca = false;
  static location = {
    lat: undefined,
    lng: undefined
  };

  static get API_ENDPOINT(): string {
    return {
      dev: 'https://alto-back-tonmil931210.c9users.io/',
      prod: 'https://alto-back.herokuapp.com/'
    }.prod;
  }

  static get PAYU() {
    return {
      test: {
        API_ENDPOINT: 'https://sandbox.gateway.payulatam.com/ppp-web-gateway',
        API_LOGIN: 'pRRXKOl8ikMmt9u',
        API_KEY: '4Vj8eK4rloUd272L48hsrarnUA',
        merchandID: '508029',
        accountId: '512321',
      },
      prod: {
        API_ENDPOINT: 'https://gateway.payulatam.com/ppp-web-gateway/',
        API_LOGIN: '1351pbS2u4ynN1Y',
        API_KEY: 'WPSiPCiY12lXWprXsSrsACw6jo',
        merchandID: '681982',
        accountId: '684779',
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


