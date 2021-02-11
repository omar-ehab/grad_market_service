const router = require("express").Router();

const market_controller = require("../controllers/MarketController");

    // CRUD Routes  <=====



        // Insert new market ....
        
router.post('/insert', market_controller.create);

        // delete market ....

router.delete('/delete/:id', market_controller.delete_market);

        // update market ....

router.put('/update/:id', market_controller.update_market);

        // select market ....

router.get('/select/:id', market_controller.select_market);

        // market withdraw ....

router.post('/withdraw/:id', market_controller.withdraw);

        // market deposit ....

router.post('/deposit/:id', market_controller.deposit);


module.exports = router;