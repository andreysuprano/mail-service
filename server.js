const express = require('express');
const app = express();
const port = 3001;
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

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
                                <img width="200" src="data:image/png;base64,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" title="logo" alt="logo">
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
                                            <div style="display:flex; align-items:center; justify-content:center;">
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0; max-width:400px;">
                                                    ${mensagem}
                                                </p>
                                            </div>
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
