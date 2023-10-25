var express = require('express');
var router = express.Router();

// Define a route for /computation
router.get('/', (req, res) => {
  // Add the computation logic here
  const id = 'dronamraju';
  const lastDigit = id[id.length - 1];

  const x = parseFloat(req.query.x);

  let result;
  switch (lastDigit % 4) {
    case 0:
      result = Math.log(x || Math.random());
      break;
    case 1:
      result = Math.log10(x || Math.random());
      break;
    case 2:
      result = Math.exp(x || Math.random());
      break;
    case 3:
      result = Math.sqrt(x || Math.random());
      break;
    default:
      result = 'Invalid last digit';
  }

  const response = `[Math.log()] applied to ${x || 'a random value'} is ${result}`;
  res.send(response);
});

module.exports = router;
