const express = require('express');
const register = require('../helper/register');
const { jwt_token_validatotion } = require('../middleware/validator');
// const app = express();
const router = express.Router();
// const cors = require('cors');


router.get('/mydata',jwt_token_validatotion,register.mydata)
router.get('/',register.getdata)
router.post('/adddata',jwt_token_validatotion,register.adddata)


module.exports = router