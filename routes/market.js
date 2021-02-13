const router = require("express").Router();

const market_controller = require("../controllers/MarketController");

router.get('/', market_controller.index);

// Insert new market ....

router.post('/', market_controller.create);

// delete market ....

router.delete('/:id/destroy', market_controller.delete_market);

// update market ....

router.put('/:id/update', market_controller.update_market);

// select market ....

router.get('/:id', market_controller.show_market);

// market withdraw ....

router.post('/:id/withdraw', market_controller.withdraw);

// market deposit ....
router.post('/:id/deposit', market_controller.deposit);


module.exports = router;