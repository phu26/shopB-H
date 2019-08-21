// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    //law
    //urlApi:'http://localhost:61186/api/v1.0',
    urlApi:'https://localhost:5001/api/v1.0',
    //urlApi:'https://law-tuyensinhapi.azurewebsites.net/api/v1.0',
    urlApp:'http://localhost:4200/',
    urlApiUpload:"https://neu-uploadservice.azurewebsites.net/api/UploadFile/UploadFiles",
    urlSSO:'https://law-tuyensinh-sso.azurewebsites.net',
    urlAPISSO:'https://law-tuyensinh-nguoidungapi.azurewebsites.net/',
    //urlAppComplete:'http%3a%2f%2fdaihoc.neu.edu.vn%2f',
    urlAppComplete: 'http%3a%2f%2flocalhost%3a4200%2f',
    truong: 'law'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
