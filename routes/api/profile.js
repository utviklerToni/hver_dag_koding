const express = require('express');
const router = express.Router();

// #endpoint  > api/profile
// #name      > profile route
// #access    > public
router.get('/', (req, res) => res.send('profile routes'));

module.exports = router;
