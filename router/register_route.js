const express = require('express');
const register = require('../helper/register');
// const app = express();
const router = express.Router();
// const cors = require('cors');



router.post('/',register.login)
router.post('/register',register.register)


module.exports = router