const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "appgeslic@gmail.com",
    pass: "mjebqxdgrsjpusat",
  },
});

sendSolicitudCodeEmail = (email, code) => {
  return transport.sendMail({
    from: `🤑GESTION DE LICENCIAS CHOSICA🤑 <appgeslic@gmail.com> `,
    to: email,
    subject: "¡Gracias Por Realizar Tu Solicitud!",
    html: `    
      <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
        <tr>
          <td style="background-color: #ecf0f1; text-align: left; padding: 0">
            <a href="https://munichosica.gob.pe/?id=75">
              <img width="20%" style="display:block; margin: 1.5% 3%" src="data:image/jpeg;base64,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">
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
sendEmisionLicencia = (datosLicencia) => {
  const { codigo_solicitud, correo, numero_licencia, comentario, archivo } =
    datosLicencia;
  return transport.sendMail({
    from: `🤑GESTION DE LICENCIAS CHOSICA🤑 <appgeslic@gmail.com> `,
    to: correo,
    subject: "¡Su Licencia de Funcionamiento Ya Esta Lista!",
    html: `    
      <!--Copia desde aquí-->
      <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
        <tr>
          <td style="background-color: #ecf0f1; text-align: left; padding: 0">
            <a href="https://munichosica.gob.pe/?id=75">
              <img width="20%" style="display:block; margin: 1.5% 3%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMWFhUXFyAaFxcYGBgYGBgfFxoXGhUeGhoYHSggGB4lGxcVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGzIlICUtLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAIYBeAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgUHAQMEAgj/xABFEAABAwIDBQQGBggFBAMAAAABAAIDBBEFEiEGEzFBUQcUImEycYGRobEjQlJyc8EVJCUzNDXR4WJjgqKyQ1NUZBaS8f/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAA5EQABBAAEAgYIBQMFAAAAAAABAAIDEQQSITEFQRMUIlFSYQYycYGRobHRIzRCwfBisvEVJDNyov/aAAwDAQACEQMRAD8AvFCEIiEIQiLCwtUk7W2zEC/Urikxdgc9tjdgve2h9SifKxnrFZDSdlJLKjcKxHfX8JFuqkSkUjZG5m7IQQaKh8cxUwBpADtbO6hQtHtDJvC02cHPGU/ZBtf3KR2jwne5XsYDJwvewt59VBUeCyPkIMd4w4B2tvvW6hcXFuxXWQG5svLLtXO1chERZrun1jrr0tcEYa0NaLAaAL08rvXQ1VL2L0hQ1PjjHFwsQGtzX9XELspa9j2h4NgTYX0JKhZiI3GgVs5j27hdyFgFZU61QhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIRELBRdZREs7ZtZHBJUucQI25iORy6hVLR7dTVj3iOeClDW6GZ2rvYnXtsbMaF+WaOOK3ja4HPIeTW681R9DgMT6SWZ0rhUMPhgyElwPA8OHmqzsJC92d4Uome0UFY/Z/2p7qR1LWeNuY5Zoxce0DiPNWxQbQU9Ux/dpg5zRrbiPYVWXZv2cUclPHVb975HDxBhAy34ttyVn0eCwwN8DLvDS3PbxkHkSOKlIDWUNlGLLrXnBap8mfM69tBp8Vpw6ucXPzu8LeGnHVbMBhczPmaRfguKDD3PMmZrgeLTwXAa+cRwuaHE0bvN89Vdc2IukHKtFOxTEB0khDWAXsdLAcyUnbT9qFFTRF0RM772DWXt/qdwA80z0TDLE6KdlxazgeDh5qGxbs/pJ2ua7Oxrhq1pAaPZZdzDvzxhxVR4yvpVRgu2VXO2epNVSxm5O5f4XkDUBmuvRMmwm2IxKdlOWmN7WkgjUEDiW9CkDFdjaZmKGjbUHu4aC6YDMIi4EgPI0tccfNeNgKWRmKsbTTtisXbqSVpyyAchwvm5etaPwMDzmy17NFsJn1lX1DEzKANdFsWqC+UZrZrC5HAnnbyW26s1QoKJZQhCyiEIQiIQhYKIsoSzimPSRVO7DW7toYXnmM5y/OyksdxAwx3YAXucGsB4Ek/kLn2IilEJUO0MnchUZW5y/IRy9MNNvepzFKoxwSSgC7WFw9gRF3oSxieOzMip3sY1zpdXDoLXNl1YljGWmbURWNyNPvEB3tCIp1ChpcUcKuOCwyvjLieellzRYlPPJI2AMayM5S91zd3OwCImJCgqPFJSyZskeWSIHX6rtDYhck2Oy91glaG55XBuvAX/APxETQhLeIYlU0wEsojdHmAdluHC+gOq94/jMkRa2Boe7IZHX5Mba/zREwoUbUYj+rOqGWP0edvnpf8AqtuE1RlhjkcLF7A4j1i6Iu1ChpsTcKxlPlGR0bnE8wW2XHQ4hVTGUx7trWSFgBBN7dbIiZUKGwfFXSPkhlaGSx2uAbgg6ghcmL48+ObKxoMceUyk8sxsLIiZEKJx/EXQwGWMAm4tfh4iuSqq6uJm9LY3tAu5rbg2526oiYULmoKtssbZG8HC4XSiIQhCIhCEIiFw4tiTKeGSeQ2ZG0ucfUu5Vx261+7wt7QbGV7Wey93fBqIqy/+Z1GKVbhLWmihyksA04ei0kcSU49m22k8MvcMTc5pcLwSSaZgeAv5qrcKpaSoip4GXirHTeKV5tEG8QT8Ex1885gl73G2piNQyHvbSCWhmhbEOPHoiJz7Y46eoDIoAZq13oNY64aG+k4i9lX8eKYu+USR05zmIwaMFiG3B8ieKzFSUjJZJqWeqhlbI1sYewl27dZr3uuLgDX3La2YsM8TMVcGUoc+B2XSVz9XgdTclEVzdnWGUtPSMdAGtc8Ay+LXMPSDuhuuHaftXoaR+7BMzwdRHqG9blVBS01JE+IvqqieGSNz5mxZwYnnUZsvnfiuPEKTPTQU8NC5kskhyzuFt6CTuwCeJtZEX0zgWLxVcLKiF2Zjhp5dQVIlVR2Db2FlVRzgtdFICGHi3MNfiCrUnkytLugJ9wS0SLtb2p0lDUd3cHSOH7zLwZ/dMuC47TVkW8gla9jhqAdRcagjiCvmCspah0pxB8JkhfU2ubWkOf0bceVvapipkp2SVuWnqaWazHUsMeZpAt484HG3pXPJETBt7h0lLPUR4VFeCSBsdWWgOAeXSXFydHWIUDStqJZaeTEadwpqMNikLRuzGHatLra9F6ggp2SyQx4o8QvgFRI/jmlaczY/vCwN+aKaRtRG19TXzXqpf1uNjb7sRjwufp1DQiK88Z2uo6Oj34la5gZ9GA4Eu08IHNUrXYrWzRTVtTWyU0ls8ENi0SAcA3ryWjCo6eOSlFLTSVEu+e3LNfdyMPoOZm0B9S8Y1SSOayWvma6KnqDE6lDvpY2udwaRxHD3Iisvsc2/krQ6mqSDMwXa77Q8/NWmvmLYXEYYscjfTBzKd7srA7jlLR+YK+mwiLKCsErT3tnUKN0jWesVmluQVz98Z9pBq2faUfWYfEFnKUt1tKJa2oiP1qYD43HxsteE1JqpIMxv3eImQf5vofLMfamFu5EhlFs5GUu525LFOyCPOWBozm7rczzTrMPiamUpOzfslp4/S3Pl9KEz7R1LO5ynMLOjIbrxJFhbrqumGKBrN00Nya+G2niNyuSLCKRpBDBpwBJIHs4LPWYfEEylRk+n6OB01Fx/pXHjzO7iWAn6ORzXxeRzXe3802TCF5a51iWG7fJeayKCUASBrrG4vyWOtQ+JqZSoqY/tGAf5B/JGyMoZv4nEB4lcbHTQ8OKl3CHOJNMwFg7nY8guatoaaV2Z4Bd1FwfaRxTrMPiamUrW7FRKKljR4Y2kZ+TjY3soCYXoKMA2JkbY9OKaqeOBjN20AMPL53XkQU+VrLNysN2joVnrMPiCxlK5ZcC3hBnmfI1pzZTYNuNQTbjZRuHSyyzTzxxNexx3TS428LB4reRKZnVDCCLix0Wql3MbcjLNaOQ8061D4m/JZylLVBMW0dXTPsHwteLA/VcCWW8tVO7PVDBSwXc3923mOgWx0MBc55DSXtyvP2gFyDCKP7DbdNVjrMPiCZStFS79qQ/gP+YWNkZWjvNyB+sO5jyUo2OAOa8BuZoytPMDouZ+F0hJJY25NzxFys9Yh8QTKVwYfM01tTOD9GyNrS7kSNeK48OgnlhldumuFQScxNjl4NTI1kGQxANDDoWgaG63QzRtaGtIAaLAdLJ1mLxBMpSpV1Zfh1nenG4Mf5FrrKfxStjbTOLnD93awIuSRoF6dTUzg8FrSHm7h1PVa2YbSghwY244X1+BWOsw+MJlK97LwFlLE12hyi46X1UsucVbPtLPfGfaTrMPiCZSt6yFz97Z9pbYZQ7gbrZs0bjTXArFELYhCFMsIVS9ujDMcPpf+5OSR6hb5OKtpVN2k1A/SUb/APxKKacjzcLM+IRFXWKYLFKJanKWgMlezLcDJFZkQ06kcVCVOF1cNo2PJZGY5CL+Fr5CMmnM3I96dBCWUroPsYfDfreec3/JecQpnOfUAah1XBG2/wDlsY9w/wBrkRRoxbEt5XVLnRF8cQjmaQLZXcMunHxX9q48Lqa93dqZtI13dTvQ0sAJDgQM1+IOqaYqF8sUm7Y4PrqwWtyhgcMzz/gIbe/DVeY8VZPX4g+I+BsTY2uGmbd6XHtuoMTIYoTI3kpYIuklazvUG+LFs1SY6YMFT6bW7uwA4Buui4ajCsWeKeF7HhsbrQeJoDTxGoOisGOhjJZdz/FAXEZ9CRe2vJcvdWOEYcS9rwTI4yWLCL6cdCuQzi8l5XNFew/fyXddwaPZrz8Pb5+XzXV2P0lRS1NW+uJDntYczjcuN3X1520VmV+KxOikDXguLHADqbGyp/uzGMaYyZbk53F5uOQFr6C3NR75X66u97lMcbK93YoN8wpMP6O9LHZdRSq7BMQLWxta8tMhdGwPGjuOa19PWpymjxptS+rMLnzPjMZLshFi3LwvxAU9+h4WsMkTS1+UXLnm5PPIb29gXXUUoDphqSxrcjM58V/SPnbosScVcD+G2u++/wCKgZwQfqdSTm4diDKNlP3MWil34kIaXWbe4PUeS6cNxTEZ6iaWNkUJrKd/FlmObE3x5NPS0+KZqdjmSuaXaGB+gcXAeE8VGbJYiH0tBM0X7lM6KoaOUU/B58r6HkreBxT582avh3rn8QwYwjw1puxaUoKmuqYaSEPDWRF24I0cC0XOo4le8O2c3v0kzy8zQOma65uHMPjv1Oo96baPDe6zxU5AvDXHXgN1Mx26cL/VvlF+F9FrwOk8MDfstq4NONwRb/iVeVBRslGIe6yNFzTVLWE6ehLYsuefEBfSkbrgHqL+9fPlQ3exTtaL56KKojA5uhOtuvotV7YFUCSnheNc0bTf2BEXe86KAZtPRulEQkBkLsuWxvdTzuCo7Cx+0x+OfmVPBhWTh2bkCfkqmKxLoS3LzKu3IFF4vjtNTENmeGEi4HWylgqs7W2/Tw3+wfmtMLhI5pgwgfALbFTuhjzhWVSVEcsbZWWcxwuD5KLptp6N8giZK0vJyhuvH3eRWdi/4Cn/AA/6qqtlh+0Yvxz83KSLAxP6XQdm+Q5X9lHNi3s6MeKv2+6tau2mo4ZDHLI1rxxFjz4clp/+ZUHDfN9x/oq22/8A5jJpyZ8gmLGtg4G0rpoi8SNZmsTdp0udLKY4DCtDS8UXAch/KUAxeIcXZRo1P9HURStD43Nc082kEfBRc+09G2XcmVokBy5deJ5cEj9k9W4TyRA+AszW6EdFD4uP2o/8dq1HDYulcw1QFjQLZ2PeYmvbuTSueV7GtLnaNAuSbAfFLdRt3Qsdl3l+pa2496i+1bEnNijgaSA83dbiQOS49j9ioZ6XezAlz/RsSMg5cDqtIsHA2LpZaq6GgW8uJlMvRx8haecKxanqG5oXtcOY5j1jiu5zWjUgeaqfZTDaqmrhaGQMLixzreEjkeHkrH2nrdzSzSX4NNvboPmo58HEyQNZRB20ClhxD3Rl79CN1HybY0IJG+bcG3A/0TBHlIBGoIvy58F8/ihc6F03LPkPW5F7q6Ni67fUcTjxDcrvW3QqXGYCKFgcyvPQfZQ4PGPlcQ73LzW7UUUUjo5JWtc3iNdPcFLQzRvYJGkFhFw4cwqX23bevqBbi72nwhPHZrim8o3wuPihuP8ASb5fkVtPw6NkTZG156D7LEOOc6RzHcrpT+G7RUk8m7ika59ibC/LiunFcTgp255ntaPifUOaqvsv/jh9xy1bWVL6rEHRkmweImDlyzG3VZ/02IzZCOzV7BY6+8RZhuTQT9Ft7QOcG5iL8CWkD+yY2TRuZvAQWWvmFiLexV5tlsbBT0m9iaQ5lr63zDgVs7Ma5zqaoiJJDAcoPIEHRaS4OB0fSRjQGjYC2jxUrZOjkG4sJsw/aSjnkEUUgc83sNeXHiF1YtikFM0OmcGAmw5/JVV2dt/X4/uuTV2tfuIvxPyWZOHwtxDYqFEdwRmNecO6TmE3YZiENQzeQuDm3tcf3Udim1dHTuLHvBcOLW6ke5LOyNduMJllGhaXWPmTol/YXAWVszzPdzWjM7X0i480jwMOZ7njst8hf81R+LkIY1nrOVi4XtbR1DgxjwHHgHDLf1XTDEByFlTW32zzKOWN0F2scLgA+i4dOfRWbsfXmekhldxLdfWNCo5sJExrZYhofIKSDEPfIY5BqFOIQhQK4vDja5sqjxfCZJXSTVr2UprpmxhjyM7IYj4GNA1c+R2ruQBKt9VT23AtfhsnJtTYn1gW+RRFyVb6aNskpBmk79HHKz0I7sAbE0X+owC/mQsUOJMbltTxguxCWFxd43AvDzmu7rl9l1A7SS5W4iPsYlC8f6rH811VU4a6rN/3dfBIB+K2Np+LyiKJ2grKmalp3slcJhUyUjyzSzXOIaLDlp61q2Vwju1VXU2bNljaHOtbjqePC1+KkaGaKm74alpfFDiAkIHEZtQR6swW+PEYKh76mEDNLm3xHpNaD4c3Q2VXHfl313D6q1gfzDB/UFtnw2MOJbUMuCPBd1zw0J5+xRmN4/uZnxMpqYtaQLuDrnQHl61MS0sYAvlLiQ/NmBLRcBoHUlJ2138ZNx4j/iFU4Fh2YvElkwzDKd/cOVLs8exc0ULHRPcDfsXYNq3WIFFSm3EBsnxXZWY1PEQH4fTi7cw8DuHmtWwUbc73Bzt6Bo0WyhvMkn0k0VMhkZMJrtbl8eW2a1tHX6eQW+PkwOGxfQtwzSBV+/Sxe/kuRBLipIukMxCTxtY7/wASmtz0fb+yncPl7xFHJuYw9z5GZQS1lhwJJSFM4BxDSS2+hPEjlcJz2eY00cOYXG9ls29sx1IF/Mq5xrh2Dw+HEkUdGwOY3HtW/BsdiZcVlkeSKKmG0rGPysbrupMz+TjlOg6gKvMGwaZkVLPFM4NrJXU8jQDwBHhPUEXT/ABcnciIZJNc2bN4Tx6KD2IxKNsMFDUMIqI6sSxAi2Vrm+Ik/kubwkECQnyVvjd9I2ymKDGXGSqBDJWisipoRKL2DbCSxbrpkdY8istxCJ0+TcZC/EXRh7HXylodmIB0N8pDhzuoXZV5kbTOP/VxOSR3WzGvPzcF4wyovJh5+3WVE3rFzr/uXYXFTHJDSsyPjqGAMqJII2TNLQ5smk8ebhbMMzfUAnXYKkqKeE0k7TlhdaGS9w+M6s9RA0PqVSVUeenoRzkxKR/+95X0GwaDy0WCiyVR+G/zNv45+ZV3u4KjKWZrMSzuNmtnJJPAceK6fDxYk9i5fETRjJ71eiqvte/fQ/cPzTwdrKPnOz3pG7VHiR1PKw5mOYQ1w4dVFgGubO0uFb7qXGua6E5T3J42H/gKb8P+qqjZX+ZRfjO+blY2xOMwjD4i54G7ZZ4NgQR5KvdjIzJiMRH2y8+Q8ZVqAECe/wCr6PVKbUYauQr+xbu0H+YS+pnwat2NbTVz4RFLGYoyAD4SMw6XPC609oA/aEv+j5NVk7SRh2HyAgfub8uQH9FvJI1scNtv/DFhkZe6UtNVr7d1AdllFA1skjJM8psHttlyDpY6n1pQxf8Amjvx2/kpbsnkIqZB1i9+uiicY/mjvxm/ktmNLcVLfctXkHDR1yKmu1px38I5ZHfNTdPjbqTCoZWMDzYC2vP1KP7XKc/QSAaC7T7eClNgsYhNE1sjgDFo4OI5cDYqudcLGaujqP2VgdnESC6sb+5RuGdokss0cRp2ND3AXznn5WXZ2r12WBkIOr3XPqZr80l0lQ2TEmyM9F04I9XAepSHaZWbys3Y4MAb7XH+6mGHaJ4y1taWozO8wyWb1rVSNHhl8GcdMxdvfPR39F2dk9fdk0BPouzj1OJ/ooJuw2IZdHDLb0c5y2t0WjYGqMFc1rtM14j0uBcfEfFHtbJFIGuzG81d1LEcjo5Yy5tCqWNoh+1nX4b5l/VZq78Df3PFJqc6Mlu0X0FnDMz8x7VxbQH9rOP/ALDf+LQpntWw8tkhqmaG+QkdRq34AhbOdZZEebaWhZQfKP0u/n1UR2Zj9et/gf8AMrli/mmv/kn5ldXZoP18fhu/v8SuXG70+Jvc4aNmD/Y7W6kI/He3nlC0brCwnvV1SNBFnWItre1viuWojaI5MoaPAeAA5eSXNu8aj7k4RyAmQANyuF9bX4H1qB7MYnGKqkJcRlyi5J5G/FchuHPRl7iRR2711X4hpkDAL03SXhe/3v6tm3utsvpedl3Y4K/K3vhly38O8tx8rBdfZ2T39nqcm3ta/cRff/ourLLlnazLuN+ey5UcObDvfe3LkobDv5JL94/NdXZAPFP6m/msbO0hlwaZjeN3H3G64eyzEWRzyMkcG7xotfQXbxCil7UUzRvmP1ap2kCWEnavupXtdH8P63fIKb7MT+z4/In5pV7VMTjfJFGxwdkBLtbgE8NR6k67A0pjoYWu4ltz7SVXl0wjGne1YhF4x7htSY0IQucumhV123QXoGSc46iNw9r8v5qxUmdrTGuwuozciwj1iRmVEVU7XuuzFT/7VOfe1ikXaz4gy1x3ankHm5oYR7dFqqMCmqIq4NbYS1MAa5xyghjWF5F+NrFTLK+ETOFHd8lTTOaJHDwtNM0Ns0czfW6Ik/tFk3DaiE23lTK2ZzBqY2sa2xd0JITdsthAgwVhLbOmOZ/UgnTXkl+heDVYfWSDeR1kZgqM3i8eoPttZWltfQMho2wxizWjK0Knj/y7lbwA/wByz2pKFBGHXDozfi0P4W9HL5pI2uP65L94fIJm/QcjHBzstgQb346hctfV04qJ45xb6RrmvDbnQAhVuCSuhxBe0GTsnb/sPuut6Qsa6OOpb15pUpq58JJjcWmwDvVe5CaduMTe18QjdlD4AX2+tmB0+K5Mdr6UxvEV3ySOuXOZaxtbTysuT9MMM8Mr2hzWRta4EdOa9EWHEPjxT4CKzjXKC7s3z8xp37heXsxM6IO0NfVQYT1s0wGihBALTNLe4JAvzsPWtDcQoG5bOe4McXBpZzdxuvWGVTm0cckfgvPIAByvbT2rncYxj8ThqMbmdoeuunwXD5ca2iLo8/L3qWqsPzubDCDG4g2lPB5vy6BKm18j6PGg+VgIYGE5bkFhbYn5pr2blmdPEXlzhc5S69rqY7ZoI46YyRxg1FRkgD7XIYHXsPPl7Vy+FWMzCbV/jjMsjBdmjr71A4bQ92jgLHZ4xHVzRvGubM0BhPR4F7hQWF6HCPwpXX9Zap6mrzRPqIg0PgpKSNjoz6JkmN3AHk45wPYtsGCRSz0YpXi1K0xSMkPiBlaHtAP1rfmuwuIuPZiASuwiI8ppZD7D/dXwqR2IhdHXYdE8FrmMqGkHkczFd6IvLuCr+r7NGPe9+/d4nF1so0urBKFJHM+P1DSilhZIO2FXJ7Lmf99//wBQmafZeJ9K2lku4NFmu4EeaYLIstn4mV9WdlGzCRMugq1f2XC+lQ63m3X4Jm2Y2Tho7ll3vPpPdxt0HRMllhH4mV4px0WWYWJhzAapKx3YNtTUOnMzml1tLfZTPU0AfAYSdCzKT7LXXcVB7XY13SndLa7rgNHmTp/VM8kha29tkMUUYc+txqorZzYgUc29ZM52li0gahaqvYFj6k1O+cCXh+Ww5ckuurcUFP34zDJxy20te3uUrX7WSuwxtVEQyTOGu0vqOKtFk+YOzans/wCVTBgLS0sIA11TjjGEx1ERikFwefMHqEknsubm/iHZfu6qap8XlOF94Lvpcl81vyUdge1Mow6SpncHvaSG6Wv0WkXTsach0uq81LKYJCC8a1fuC6o+z+Fs0Usby0R28NgbkcSSvM+wDH1JqHzuJMmciw5cAoKnqsVlgdWNmAYNQy3EBTGH7Zl2HyVLmjeRnKRyJ5HyutntxDdQ66OXfa1E04c7sI/V8E8iw4JKm7P2GoNQ2dzTvA8ADQEEFL8VZiskBrWzNyDgwDiAbaKam2pnfhbqho3czXBp0042uL9Vq2GWM9h2+hpSOmjkH4jTpqLC66/YZktV3reuBLw/LYchw+CntosIZVwOgebB1rEcWkHQj5e1LVJtVJHhnepbPlJLW6WBOYj4C/uUA6vxMU3f98BHb0bcr2BsnRTPOrqymhZ5rHTQsboNHCymnZvYhtJPvxM55ykWIAGq7dp9k4ayznXZINA9vH1Ec1s2Ux3vVMJ3ABwuHAHS7eY8ikGTbar7wX5xuBNltl5X4X9iMbPJKXXqFl74Iow2tCpWPsubm8VQ4joBY+/knWgweOGDcRDK21r89eZ6qQheCARzF/evarvnlk0ebpWY4Imdpo3SZs/sI2mnbOJXOLb6EAcVKbV7OitYxjnlmQ5tBe6YLLCwZ5C/OTryQYeNrCwDTmoTZjAxSQ7kOLxcm5HXil/GezmKV5fFIY8xuW2u256dE+LFlls8gcXA77ocPGWhpGgSDhXZrFG8OlkdIAb5bWBI4X6p8jaALAWsvS9BYkmkkNvNraOFkQpoQhCFGpUKMxrCIqqMRzDMwPDi3kS03F/K6k0IipDb4SQ1NQ0uc6ON8FQxt7NY1z928Nty4qKqi6nllkjGtJU7+w5wVAu+3kM3+1PPanhzd9BK4fRzNdTSdBvATGT6nD4pNw6R+eimcMxfmoKpvUtzZLg+WbX1Iib9kdnozUSNLS6nbI2qpXcgZQc7feT70x9oH8Ob8OakNl8E7nSx0wcX5BbMeJ10XPtnTl9O4DiAqXEPy7lZwTss7Ce9VzLUx7vdszWuNXNJJNxzPJJG2H8ZN94f8QnOnGa4a573huoNg1vW6WNuqQiVs49GUDh9V7RZwPmovRx7I8YQTu0+86H9l0/SKIiAADYqPwB8GZ7agABzLBx1t7Oqm6vuTWl2dkhEWRrWi2o5nzSesgr1c/Deln6TpHA+FtV823zXlYsQWNy5bQnfZxr+5w5WCRzZ5DlPlYpIv/T38FYsEDoKVkeV12x5pCPqPkObL7rArm+k0obh2NvUvFezf6rq+jrHuxWYDYV8V3YPM908efOLF3hcLMGn1VZ2NYZHPEN4zPuyJGD/ABMF229qrzZWqdUzN4kjVw+q2/hABVrhee4UHZn2O5dPjZPStBFV3KgZqVxbFTSaT1MprKz/AC42EmNpPrHwWujq792m1BlmlqtOTI2lrPcHD3Jv7TcDdGJ5YiTJXOigv/226BwHkR+aVKmnzTyRx8AWUEPnbWoI/wB/uC7S4qsrYvBBJSUc893TtG8D/rePiD1HknZc9HAI2MYODWgD2Cy6URCEIREIQhEQsFZQiLyUh9rrj3aP8UfIp9S5tzgzqqlcxnpghzfO3Ee66mw7g2VpPeq+JaXREBecAZH+johNl3e7GbNw9qX9uW04w+1NlybwXycLlQz8Xqu59w7q/P6ObLpZduJbPzQ4U2LKXSOkDnNaLkXI006K61gZKHudrn2B0rvKoOeXxljW/o3O99yio24j3K4Le7ZPK9liP+TPtw36cKamkGDmPI7Pu7Zba3UPgWAyy4VLA5hbIXZmBwte3BSidut164PuvdaGE6VfqH41smDZZo/RQH+U75FKewmGippamEnLmcCDyB5LFFjVVDSuojSyF+rWusbaqRoNlKhmGyMF2zPeH2BsbD6uijADQ7tAFzhR3rXdbg5i0ZT2Wmx+yjYpMQwwWLM8N/vM462P1VL47jUdXhckjG5C17WuZ0OYe+6i4cdqmUhonU0j3kFuYgnje9/kt8Wz08OFTNcwmSR7XBg1IAtb28VucrnZ5KDsw1BFEd9clq0lrS1l0Wncag9yjMSJ/Q9P5zu+b7KwcCZEcOiE2Xd7sF2bhbzS3DgEs+DtiyESteXtadCbOJ59QVEPxaq7kcPNLJm9HNbS17jVaygTCmkCnHmNu9ZiuI6gm2j49yc8Uq6enoZ3U2TJlIGThmdp8L3VfxwM/RJOdu83oflv4rDT8yVI4vgs8GHw0zY3OfJIXvDRfL0B+HuUqzs9hNPnIfvjHfj9a17WRhjibea7d9O/y312SQSyn1a7P8rz8k0bF1++o4n88tj6xop5qQ+y1szI5IpY3tsbjMLDX0rfBPjVQxDQJXZdrXRwziYhm3XpCEKFToQhCIhCEIiEIQiIQhCIl7bjBu90U0I0fbMw9HN1aR7Uq9meFb4d+kAyyBrsh4tmj8L39NRorIcL6dVppKVkbQyNga0cAOHVEW8LTVQZ2lp5hb1hwWrgHAgrINGwqcx6gbTyZZGuyXJaWaXvxa71lc8Le8Ne17CY3auZb0cumZrvtAe9WnjWDNqGZXNF1XmPYXUQxujaMwNvGNHWHIgG3tC87PC/DOAadOTu77fHzXqMNjIcXD0UlZjocxAFew0P3Jqkk1WyLib08rZG/Va85H/HR3rXO3ZGqv4msYPtOe23zTthRYGRtdqRdxLvCWG3o6+kEtVMmZ7ieZOl7jjyF7Lpwcdx5uOwQOZYCf8AyW/RRN9GMNPK4NzAD5qQwTZ5kH0mZs09iY76RtsLnKP+oR1Xfh+JNcH5bse465iXZxe0l28M1rhcmBCVx0DyWgBhDTYWN9CfR6Gyd9n9lM0m/mYA42Nhwb5NHnzK5kz5sXKelOdx2PIeVerXkNbvQqy6HC8OjMZ92ut+Y/lLs2KwkNvNky5tQOnIX9icQvEUeUAAWAWxdvCwdDGGnfmvMYiZ00mcrjxOjEsZaQL8WE/VcPRPsKrTYfZ8jEN2/wATaFli6x+kml8T368dCNfWrYWlkLQ5zg0Au9I9baC6sqFbbLKEIiEIQiIQhCIhCEIiFgrKwUReCwdFmyys2TVYqliyLLKEWV4y+SzZekIUpeMgWSF6QixSxZeQ3XgvdkBEWLIIXpCJQXkBZCEBEWUIQiyhCEIiEIQiIQhCIhCEIiEIQiIQhCIsLTOwO0IuEIWModoQgNFRVRs3TPNzGFpZslTDXIPchCqjhuEJ/wCNvuFfRSDFzgaPPxUlTYXEy2Vo066rtCEKyyJjPVFKMPc/Vxte0IQtkQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIREIQhEQhCERCEIRF//Z">
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

module.exports = {
  sendSolicitudCodeEmail,
  sendEmisionLicencia,
};
