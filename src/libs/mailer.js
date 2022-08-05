const nodemailer = require("nodemailer");
const { iconImg } = require("./constants");
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "appgeslic@gmail.com",
    pass: "mjebqxdgrsjpusat",
  },
});

const sendSolicitudCodeEmail = (email, code) => {
  return transport.sendMail({
    from: `GESTION DE LICENCIAS CHOSICA <appgeslic@gmail.com> `,
    to: email,
    subject: "¡Gracias Por Realizar Tu Solicitud!",
    html: `    
    <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1; text-align: left; padding: 0">
        <a href="https://munichosica.gob.pe/?id=75">
       ${iconImg}
        </a>
      </td>
    </tr>

    <tr>
      <td style="padding: 0">
        <img style="padding: 0; display: block" src="https://aplicativos.munlima.gob.pe/uploads/Licencias/banner.jpg"
          width="100%">
      </td>
    </tr>

    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Solicitud de Licenciamiento</h2>
          <p style="margin: 2px; font-size: 15px">
            Buenas contribuyente;<br><br>
            Tenga usted una calurosa bienvenida a nuestro Sistema de Licenciamiento.<br><br>
            Este correo te brindará el código, con el fin de poder Verificar la su solicitud correspondiente<br>
            Código:</p>
          <ul style="font-size: 15px;  margin: 10px 0">
            <li>${code}</li>
          </ul>
          <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
            <img style="padding: 0; width: 200px; margin: 5px"
              src="https://cdn-icons-png.flaticon.com/512/191/191181.png">
            <img style="padding: 0; width: 200px; margin: 5px"
              src="https://comprasestatales.org/wp-content/uploads/2015/05/municipalidad_de_chosica.png">
          </div>
          <div style="width: 100%; text-align: center">
            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db"
              href="http://geslic.ga/estado-tramite/consultar">Ir a la página</a>
          </div>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Info</p>
        </div>
      </td>
    </tr>
  </table>
      `,
  });
};
const sendEmisionLicencia = (datosLicencia) => {
  const { codigo_solicitud, correo, numero_licencia, comentario, archivo } =
    datosLicencia;
  return transport.sendMail({
    from: `GESTION DE LICENCIAS CHOSICA <appgeslic@gmail.com> `,
    to: correo,
    subject: "¡Su Licencia de Funcionamiento Ya Esta Lista!",
    html: `    
      <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
        <tr>
          <td style="background-color: #ecf0f1; text-align: left; padding: 0">
            <a href="https://munichosica.gob.pe/?id=75">
              ${iconImg}
            </a>
          </td>
        </tr>
    
        <tr>
          <td style="padding: 0">
            <img style="padding: 0; display: block" src="https://aplicativos.munlima.gob.pe/uploads/Licencias/banner.jpg"
              width="100%">
          </td>
        </tr>
    
        <tr>
          <td style="background-color: #ecf0f1">
            <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
              <h2 style="color: #e67e22; margin: 0 0 7px">Solicitud de Licenciamiento</h2>
              <p style="margin: 2px; font-size: 15px">
                Buenaa contribuyente tenga usted una calurosa bienvenida a nuestro Sistema de Licenciamiento<br>
                Este correo te brindara el codigo, con el fin de poder Cancelar tu solicitud correspondiente<br>
                Codigo:</p>
              <ul style="font-size: 15px;  margin: 10px 0">
                <li>${codigo_solicitud}</li>
                <li>${numero_licencia}</li>
                <li>${comentario}</li>

              </ul>
              <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
                <img style="padding: 0; width: 200px; margin: 5px"
                  src="https://cdn-icons-png.flaticon.com/512/191/191181.png">
                <img style="padding: 0; width: 200px; margin: 5px"
                  src="https://comprasestatales.org/wp-content/uploads/2015/05/municipalidad_de_chosica.png">
              </div>
              <div style="width: 100%; text-align: center">
                <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db"
                  href="https://docs.google.com/viewerng/viewer?url=https://storage.googleapis.com/app-geslic.appspot.com/documents/licencias/${codigo_solicitud}/${archivo}">Ver Documento</a>
              </div>
              <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Info</p>
            </div>
          </td>
        </tr>
      </table>
      <!--hasta aquí-->
    
      `,
  });
};

const sendSolicitudRechazada = (email, code,motivo) => {
  return transport.sendMail({
    from: `GESTION DE LICENCIAS CHOSICA <appgeslic@gmail.com> `,
    to: email,
    subject: "Su Solicitud Fue Rechazada",
    html: `    
    <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1; text-align: left; padding: 0">
        <a href="https://munichosica.gob.pe/?id=75">
        ${iconImg}  
        </a>
      </td>
    </tr>

    <tr>
      <td style="padding: 0">
        <img style="padding: 0; display: block" src="https://aplicativos.munlima.gob.pe/uploads/Licencias/banner.jpg"
          width="100%">
      </td>
    </tr>

    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Solicitud de Licenciamiento</h2>
          <p style="margin: 2px; font-size: 15px">
            Buenas contribuyente;<br><br>
            Lamentamos informarle que su solicitud no fue aprobada por las siguientes razones:<br><br>
            Observaciones: ${motivo}</p>
          <ul style="font-size: 15px;  margin: 10px 0">
            <li>${code}</li>
          </ul>
          <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
            <img style="padding: 0; width: 200px; margin: 5px"
              src="https://cdn-icons-png.flaticon.com/512/191/191181.png">
            <img style="padding: 0; width: 200px; margin: 5px"
              src="https://cdn-icons-png.flaticon.com/512/4335/4335073.png">
          </div>
          <div style="width: 100%; text-align: center">
            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db"
              href="http://geslic.ga">Volver a Solicitar</a>
          </div>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Info</p>
        </div>
      </td>
    </tr>
  </table>
      `,
  });
};

const sendPagoRechazado = (email) => {
  return transport.sendMail({
    from: `GESTION DE LICENCIAS CHOSICA <appgeslic@gmail.com> `,
    to: email,
    subject: "Hubo un problema con el pago",
    html: `
    <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    <tr>
      <td style="background-color: #ecf0f1; text-align: left; padding: 0">
        <a href="https://munichosica.gob.pe/?id=75">
        ${iconImg}
        </a>
      </td>
    </tr>

    <tr>
      <td style="padding: 0">
        <img style="padding: 0; display: block" src="https://aplicativos.munlima.gob.pe/uploads/Licencias/banner.jpg"
          width="100%">
      </td>
    </tr>

    <tr>
      <td style="background-color: #ecf0f1">
        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Solicitud de Licenciamiento</h2>
          <p style="margin: 2px; font-size: 15px">
            Buenas contribuyente;<br><br>
            Lamentamos informarle que su voucher de pago no fue aprobada, esto puede deberse por la siguientes razones:<br><br>
            Observaciones:<br>
            - El voucher no es visible <br>
            - El voucher de pago es incorrecto al monto solicitado <br></vr></p>
          <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
            <img style="padding: 0; width: 200px; margin: 5px"
              src="https://cdn-icons-png.flaticon.com/512/191/191181.png">
            <img style="padding: 0; width: 200px; margin: 5px"
              src="https://cdn-icons-png.flaticon.com/512/4335/4335073.png">
          </div>
          <div style="width: 100%; text-align: center">
            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db"
              href="http://geslic.ga/estado-tramite/consultar">Volver a la Pagina</a>
          </div>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Info</p>
        </div>
      </td>
    </tr>
  </table>`,
  });
};

module.exports = {
  sendSolicitudCodeEmail,
  sendEmisionLicencia,
  sendSolicitudRechazada,
  sendPagoRechazado,
};
