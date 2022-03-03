# initial-backend
This is the backend of the an e-commerce website build on MongoDB, Express.js, Node.JS. This backend will work for both React and Angular framework.  


* CONTENT OF THE DOCUMENT 
   1. MongoDB Connection
   2. Start the project
   3. Structure 
   4. API check via Postman

--------------------------------------------------------------------------------------------------------------

1. MongoDB Connections
   In .env file, enter your MongoDB API Key in the constant CONNECTION_STRING. (Visit for more: https://mongodb.com)


   Eg. CONNECTION_STRING = mongodb+srv://ecommerce-user:Capstone123@cluster0.tnseq.mongodb.net/ecommerce-database?retryWrites=true&w=majority


--------------------------------------------------------------------------------------------------------------

2. Start the project

    [$] git clone https://github.com/NIIT-Capstone/backend.git

    [$] cd backend/

    [$] npm start 

    * IN CASE OF ERROR GO TO PACKAGE.JSON AND CLICK ON THE DEBUG OPTION
    * Install all the dependencies which will be shown in the from of errors in the terminal.

   (SS OF PACKAGE.JSON)

--------------------------------------------------------------------------------------------------------------

3. Structure

   * Helpers -> It contains jwt token information.
   * Models -> It contains all the structure of the tables of the database which is exported as models.
   * Node_modules -> node files. 
   * public -> All the uploded image files. 
   * Routes -> It contains APIs which will be needed in categories, orders, products and users section of 
               the website in the respective files. 

               eg. router.get(`/`, async (req, res) =>{
                const categoryList = await Category.find();//To make it wait till it gets the categories

                if(!categoryList) {
                    res.status(500).json({success: false})
                } 
                res.status(200).send(categoryList);
                })
    
   * App.js -> In this we have configuration files of server, mongodb database, routes and middleware.

   * package.json -> It contains all the dependencies of the project. 

--------------------------------------------------------------------------------------------------------------

4. API check via Postman

    [Check] In the terminal you will see "MongoDB up and running!" which will indicate you can test your API. 

    eg. GET http://127.0.0.1:8888/api/v1/categories
    
    * You will first have to create authorization token by login API. (POST http://127.0.0.1:8888/api/v1/users/login ) [BODY-RAW-JSON]

    * To know more visit (https://learning.postman.com/docs/getting-started/introduction/)



