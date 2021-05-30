const express = require('express');
const router = express.Router();

// #endpoint  > api/auth
// #name      > auth route
// #access    > public
router.get('/', (req, res) => res.send('auth routes'));

module.exports = router;
