const express = require('express');
const router = express.Router();

// #endpoint  > api/posts
// #name      > posts route
// #access    > public
router.get('/', (req, res) => res.send('post routes'));

module.exports = router;
