var express = require('express');
var router = express.Router();

// Initialize sum and more
let sum = 0;
let more = 0;

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Increment more and add it to sum
  more += 1;
  sum += more;

  // Send the response with the updated sum
  res.send(`Sum is: ${sum}`);
});

module.exports = router;
