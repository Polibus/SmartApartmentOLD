module.exports = {
    port: process.env.Port || 3001,
    //database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/test-app'
    database: process.env.DATABASE || 'mongodb+srv://admin:admin1@nauka.gfjtzc3.mongodb.net/Node-API?retryWrites=true&w=majority'
};