const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const OAuth2 = OAuth2Client;
const Handlebars = require('handlebars');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", (req, res) => {
  const mailConfig = "cristinacroitoru835@gmail.com";
  const scopMail = req.body.scopMail;
  const personToEmail = req.body.personToEmail;

  const data = {
    nume: req.body.nume,
    email: req.body.email,
    telefon: req.body.telefon,
    judetSelectat: req.body.judetSelectat,
    orasSelectat: req.body.orasSelectat,
    serviciuPrincipal: req.body.serviciuPrincipal,
    serviciu_secundar: req.body.serviciu_secundar,
    dataSelectata: req.body.dataSelectata,
    detalii_suplimentare: req.body.detalii_suplimentare
  };

let templateString;
if(scopMail === 'confirmare Client'){
   templateString = `<!DOCTYPE html>
<html lang="ro">
  <head>
    <meta charset="UTF-8">
    <title>Confirmare cerere de serviciu - Mesteri la un Click</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 20px;
      }

      h2 {
        font-size: 24px;
        font-weight: bold;
      }

      h3 {
        font-size: 18px;
        font-weight: bold;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h2>Salutare {{nume}},</h2>

    <p>Vă mulțumim că ați ales Mesteri la un Click!</p>

    <h3>Detaliile cererii dumneavoastră de serviciu:</h3>

    <table>
      <tr>
        <th>Nume</th>
        <td>{{nume}} {{prenume}}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{email}}</td>
      </tr>
      <tr>
        <th>Telefon</th>
        <td>{{telefon}}</td>
      </tr>
      <tr>
        <th>Județ</th>
        <td>{{judetSelectat}}</td>
      </tr>
      <tr>
        <th>Oraș</th>
        <td>{{orasSelectat}}</td>
      </tr>
      <tr>
        <th>Serviciul dorit</th>
        <td>{{serviciu_secundar}}</td>
      </tr>
      <tr>
        <th>Data selectată</th>
        <td>{{dataSelectata}}</td>
      </tr>
      <tr>
        <th>Detalii suplimentare</th>
        <td>{{detalii_suplimentare}}</td>
      </tr>
    </table>

    <p>Un meseriaș calificat va lua legătura cu dumneavoastră în scurt timp pentru a stabili detaliile programării.</p>

    <p>Cu stimă,</p>
    <p>Echipa Mesteri la un Click</p>
  </body>
  </html>`;
}

else if(scopMail === 'Trimitere mail la meserias') {
  templateString = `<!DOCTYPE html>
  <html lang="ro">
  <head>
    <meta charset="UTF-8">
    <title>Notificare serviciu nou - Mesteri la un Click</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 20px;
      }
  
      h2 {
        font-size: 24px;
        font-weight: bold;
      }
  
      h3 {
        font-size: 18px;
        font-weight: bold;
      }
  
      table {
        border-collapse: collapse;
        width: 100%;
      }
  
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
  
      .btn {
        display: inline-block;
        padding: 10px 20px;
        color: rgb(0, 71, 171);
        color: white;
        text-decoration: none;
        border: 1px solid rgb(0, 71, 171);
        border-radius: 8px;
      }
  
      .btn:hover {
        background-color: rgb(0, 71, 171);
        color: white;
        border: 1px solid black;
        border-radius: 8px;
      }

    </style>
  </head>
  <body>
    <h2>Bună ziua,</h2>
  
    <p>Vă informăm că a fost adăugat un nou serviciu pe platforma Mesteri la un Click, care ar putea să vă intereseze:</p>
  
    <h3>Detalii despre serviciu:</h3>
  
    <table>
    <tr>
      <th>Nume</th>
      <td>{{nume}} {{prenume}}</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>{{email}}</td>
    </tr>
    <tr>
      <th>Telefon</th>
      <td>{{telefon}}</td>
    </tr>
    <tr>
      <th>Județ</th>
      <td>{{judetSelectat}}</td>
    </tr>
    <tr>
      <th>Oraș</th>
      <td>{{orasSelectat}}</td>
    </tr>
    <tr>
      <th>Serviciul dorit</th>
      <td>{{serviciu_secundar}}</td>
    </tr>
    <tr>
      <th>Data selectată</th>
      <td>{{dataSelectata}}</td>
    </tr>
    <tr>
      <th>Detalii suplimentare</th>
      <td>{{detalii_suplimentare}}</td>
    </tr>
    </table>


    <p>Pentru mai multe informații sau pentru a aplica la acest serviciu, vă rugăm să accesați platforma noastră.</p>
    <a href="http://localhost:4200" class="btn">Accesați platforma</a>
  
    <p>Cu stimă,</p>
    <p>Echipa Mesteri la un Click</p>
  </body>
  </html>
  `
}

const template = Handlebars.compile(templateString);
const htmlContent = template(data);

  const oauth2Client = new OAuth2(
    {}
  );

  oauth2Client.setCredentials({
    refresh_token:
      {},
  });
  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {},
    tls: {
      rejectUnauthorized: false,
    },
  });

  // data.email
  const mailOptions = {
    from: mailConfig,
    to: personToEmail, // Replace with receiver email address
    subject: "Detaliile cererii dumneavoastră de serviciu",
    generateTextFromHTML: true,
    html: htmlContent,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
