const express = require('express');
const app = express();
const port = 3001;
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

router.post('/ateei/mail', async (req, res) => {
	try {
		const { email, nome, telefone, mensagem, assunto } = req.body;
		let transporter = nodemailer.createTransport({
			host: 'mail.ateei.com.br',
			port: 465,
			secure: true,
			auth: {
				user: 'site@ateei.com.br',
				pass: '!S(L_cFoV!!M'
			}
		});

		let info = await transporter.sendMail({
			from: '"Site Ateei" <ateei@ateei.com.br>',
			to: 'ateei@ateei.com.br',
			subject: `✔ Lead Novo do site | ${assunto}`,
			html: `
            <!doctype html>
        <html lang="en-US">
    
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>New Lead Email</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
    
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <a href="https://ateei.com.br" title="logo" target="_blank">
                                <img width="200" src="https://firebasestorage.googleapis.com/v0/b/projetcs-storage.appspot.com/o/ateei%2Fdownload.png?alt=media&token=11a10c99-4e8f-471f-ae8b-86f050deb65d" title="logo" alt="logo">
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Uhuulll Novo Lead!</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h6>Nome: ${nome}</h6>
                                            <h6>Telefone: ${telefone}</h6>
                                            <h6>Email: ${email}</h6>
                                            <h6>Assunto: ${assunto}</h6>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                ${mensagem}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>supranodigital.com</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    
    </html>`
		});

		if (info.accepted) {
			return res.sendStatus(200);
		}
		return res.sendStatus(500);
	} catch (err) {
		return res.sendStatus(500);
	}
});

app.use(router);

app.listen(port, () => {
	console.log(`servidor de envio de email is onfire!`);
});
