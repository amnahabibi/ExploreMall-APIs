// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });

    // Display all shops
    app.get('/all_brands', (request, response) => {
        pool.query('SELECT * FROM shop', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

       // Display all categories
    app.get('/all_categories', (request, response) => {
        pool.query('SELECT * FROM category', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });


    app.get('/all_eatery', (request, response) => {
        pool.query('SELECT * FROM eatery', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/all_entertainment', (request, response) => {
        pool.query('SELECT * FROM entertainment', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    
    app.get('/subscribe/:name/:email/:contact', (request, response) => {

        const name = request.params.name;
        const email = request.params.email;
        const contact = request.params.contact;

        const query = 'INSERT INTO subscriber SET subscriber_name = ?, subscriber_email = ?, subscriber_contact = ?';

        pool.query(query, [name, email, contact], (error, result) => {

            if(error){
                response.send(
                    {
                        "status" : false,
                        "message" : error
                    }
                )
            }

            if (result.affectedRows > 0){
               response.send(
                   {
                       "status" : true,
                       "message" : "record added",
                       "subscriber_id" : result.insertId
                   }
               )
            }
            else{
                response.send(
                    {
                        "status" : false,
                        "message" : "record not added"
                    }
                )
            }

        });
    });



     
    // Display Shops by category
    app.get('/brands_by_category/:category_id', (request, response) => {
        
        const category_id = request.params.category_id;
        const query = 'SELECT * FROM shop WHERE category_id = ?';
        
        pool.query(query, [category_id], (error, result) => {
        
            if (error) throw error;

            response.send(result);
        
        });
    });

       // Display Specific Brand Details
       app.get('/get_brand_details/:shop_id', (request, response) => {
        
        const shop_id = request.params.shop_id;
        const query = 'SELECT * FROM shop WHERE shop_id = ?';
        
        pool.query(query, [shop_id], (error, result) => {
        
            if (error) throw error;

            response.send(result);
        
        });
    });

        // Get shops according to the tagid
           app.get('/get_shops/:tag_id', (request, response) => {
        
            const tag_id = request.params.tag_id;
            const query = 'SELECT shop.shop_name, shop.shop_id FROM shop_tag, shop WHERE shop_tag.shop_id = shop.shop_id AND shop_tag.tag_id = ?';
            
            pool.query(query, [tag_id], (error, result) => {
            
                if (error) throw error;
    
                response.send(result);
            
            });
        });

        // Display Specific Eatery Details
        app.get('/get_eatery_details/:eatery_id', (request, response) => {
        
            const eatery_id = request.params.eatery_id;
            const query = 'SELECT * FROM eatery WHERE eatery_id = ?';
            
            pool.query(query, [eatery_id], (error, result) => {
            
                if (error) throw error;
    
                response.send(result);
            
            });
        });

        // Display Specific Entertainment Details
            app.get('/get_entertainment_details/:entertainment_id', (request, response) => {
        
                const entertainment_id = request.params.entertainment_id;
                const query = 'SELECT * FROM entertainment WHERE entertainment_id = ?';
                
                pool.query(query, [entertainment_id], (error, result) => {
                
                    if (error) throw error;
        
                    response.send(result);
                
                });
            });

}

// Export the router
module.exports = router;
