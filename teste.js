const { validarPesquisa } = require("../../utils/easy");
const Firebird = require('node-firebird');
const crypto = require('../../utils/criptografia')
const { convert, exeRawQuery } = require("../../database/queries");

exports.cadastrarEmpresa = async (req, res, next) => {
  const params = req.body;
  console.log(req.body)
  try {
    const cadastro = validarPesquisa(params, [
      'CNPJ',
      'IP',
      'PORTA',
      'ATIVO',
      'DIALETO',
      'BANCODADOS',
      'ORDEMCAIXA',
      'NIVELCLIENTE',
      'SALDOMATERIAL',
      'CODIGOTABELAPRECO',
      'USERBANCO',
      'PASSWORDBANCO'
    ]);
    const senhaCriptografada = await crypto.criptografarSenha(cadastro.PASSWORDBANCO)
    const userCriptografado =  await crypto.criptografarSenha(cadastro.USERBANCO)

    //Firebird.attach(require('../../database/firebird.config'), function (err, db) {
    //  if (err) throw err;

     const sql = (`
        INSERT INTO CADOG1WEB (CNPJ, IP, PORTA, ATIVO, DIALETO, BANCODADOS, BANCOINSTANCIA,
        ORDEMCAIXA, NIVELCLIENTE, SALDOMATERIAL, CODIGOTABELAPRECO, USERBANCO, PASSWORDBANCO)
        VALUES(cadastro.CNPJ, cadastro.IP, cadastro.PORTA, cadastro.ATIVO, cadastro.DIALETO, cadastro.BANCODADOS, cadastro.BANCOINSTANCIA
        , cadastro.ORDEMCAIXA, cadastro.NIVELCLIENTE, cadastro.SALDOMATERIAL, cadastro.CODIGOTABELAPRECO, userCriptografado, senhaCriptografada)
      `,
      function (err, result) {
        if (err) {
          console.log(err);
        }
      });
      res.json({ mensagem: "Nova empresa cadastrada com sucesso!" });
    //});
  } catch (error) {
    next(error);
  }
};


