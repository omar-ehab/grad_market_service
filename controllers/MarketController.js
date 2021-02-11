const {sequelize, Market} = require("../models");

const Joi = require("joi");

async function create(req, res){
   
    try{

        const schema = Joi.object({
            name: Joi.string().required().alphanum(),
            createdBy: Joi.string().required().alphanum()
        });

        const validate_result = await schema.validate(req.body);

        if(validate_result.error){
            
            res.status(422).json({
                success: false,
                error_message: validate_result.error.message
            });
        }
        else {

            const market = await Market.findOne({
                where: {
                    name: req.body.name
                }
            });
    
            if(market){
                
                res.status(422).json({
                    success: false,
                    error_message: "name must be unique"
                });
            }
            else {
    
                const market = await Market.create(req.body);
            
                res.json({
                    success: true,
                    market
                });
            }

        }



        
    } catch(err) {
        res.status(500).json({
            "success": false,
            "error_message": err.message
        });
    }


}


async function delete_market(req, res){


    try {

        const market = await Market.findOne({
            where: {
                id: req.params.id
            }
        });



        if(market){
            await market.destroy();
            res.json({
                success: true,
                message: "deleted successfully"
            })
        }
        else {
            res.status(404).json({
                success: false,
                error_message: "not found"
            })
        }

    } catch (err){

        res.status(500).json({
            "success": false,
            "error_message": err.message
        })

    }

    
}


async function update_market(req, res){



    const data = req.body;
    try {

        const schema = Joi.object({
            name: Joi.string().alphanum(),
            createdBy: Joi.string().alphanum()
        });

        const validate_result = await schema.validate(req.body);

        if(validate_result.error){

            res.status(422).json({
                success: false,
                error_message: validate_result.error.message
            });
        }
        else {

            market = await Market.findOne({
                where: {
                    id: req.params.id
                }
            });
         
    
            if(market) {
                
                
                var keys_array = Object.keys(data);
                
                keys_array.forEach(function (key, index, array){
    
                    if(key !== "id" && key !== 'balance'){
                        market[key] = data[key];
                    }
                    
                });
    
                await market.save();
                
                res.json({
                    success: true,
                    message: "updated successfully",
                    market
                });
    
            }
            else {
                res.status(404).json({
                    success: false,
                    error_message: "not found"
                })          
    
            }
        }


    } catch(err) {
        
        res.status(500).json({
            "success": false,
            "error_message": err.message
        })

    }

}


async function select_market(req, res){

   

    try {

        const market = await Market.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if(market) {
            res.json({
                success: true,
                market
            });    
        }
        else {
            res.status(404).json({
                success: false,
                error_message: "not found"
            })
        }
        
    } catch(err) {
        
        res.status(500).json({
            "success": false,
            "error_message": err.message
        })

    }

}

async function withdraw(req, res) {

    try {

        const schema = Joi.object({
            balance: Joi.number().greater(0)
        });

        const validate_result = await schema.validate(req.body);

        if(validate_result.error){
            
            res.status(422).json({
                success: false,
                error_message: validate_result.error.message
            });
        }
        else {

            const market = await Market.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if(market){
                
                const t = await sequelize.transaction();

                try {
                    await market.withdraw(req.body.balance, t);
                    await t.commit();

                    res.json({
                        success: true,
                        market
                    });
                }
                catch(err) {
                    await t.rollback();

                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                
                

            }
            else {
    
                res.status(404).json({
                    success: false,
                    error_message: "not found"
                })
            }

        }


    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }


}

async function deposit(req, res) {

    try {

        const schema = Joi.object({
            balance: Joi.number().greater(0)
        });

        const validate_result = await schema.validate(req.body);

        if(validate_result.error){
            
            res.status(422).json({
                success: false,
                error_message: validate_result.error.message
            });
        }
        else {

            const market = await Market.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if(market){
                
                const t = await sequelize.transaction();

                try {
                    await market.deposit(req.body.balance, t);
                    await t.commit();

                    res.json({
                        success: true,
                        market
                    });
                }
                catch(err) {
                    await t.rollback();

                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                
                

            }
            else {
    
                res.status(404).json({
                    success: false,
                    error_message: "not found"
                })
            }

        }


    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }


}

module.exports = {
    create,
    delete_market,
    update_market,
    select_market,
    withdraw,
    deposit
}