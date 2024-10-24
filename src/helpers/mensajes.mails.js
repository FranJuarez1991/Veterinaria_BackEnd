const cloudinary = require("cloudinary").v2;
const transporter = require("../helpers/nodemailer.config");

const darBienvenidaAlUsuario = async (emailUsuario, nombreUsuario) => {
  // Subir imagen a Cloudinary y luego enviar el correo
  try {
    const result = await cloudinary.uploader.upload("BienvenidaVete.png", {
      folder: "",
      resource_type: "image",
    });

    const imageUrl = result.secure_url; // URL de la imagen en Cloudinary

    // Enviar el correo con la imagen de Cloudinary
    await transporter.sendMail({
      from: `"Veterinaria ODIE👻" <${process.env.GMAIL_USER}>`, // sender address
      to: `${emailUsuario}`, // list of receivers
      subject: "Alta en nuestra Web ✔", // Subject line
      html: `
        
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            background-color: #fff;
            padding: 30px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          h1 {
            font-size: 2.5em;
            color: #2C3E50;
          }
          p {
            font-size: 1.2em;
            color: #34495E;
          }
          .image-container {
            margin: 20px 0;
          }
          .image-container img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
          }
          .button {
            display: inline-block;
            padding: 15px 25px;
            font-size: 1.2em;
            background-color: #3498DB;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <p>Nos complace darte la bienvenida y cuidar de tu mascota.</p>
        <div class="image-container">
        <img src="${imageUrl}" alt="Publicidad Veterinaria">
        <h1>¡Bienvenido a nuestra Veterinaria ${nombreUsuario}!</h1>
          </div>
        </div>
      </body>
      `,
    });
  } catch (error) {
    console.error("Error al subir la imagen o enviar el correo:", error);
  }
};

module.exports = {
  darBienvenidaAlUsuario,
};
