const env = process.env.NODE_ENV;
let config: {[key:string]:string};
//DEVELOPMENT
if (env === 'development') {
  
    config ={
        MONGODB_DATABASE: "mongodb://localhost:27017/test?retryWrites=true&w=majority&authSource=admin&keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000"
    }
} else {
    config ={
        MONGODB_DATABASE: "mongodb://localhost:27017/test?retryWrites=true&w=majority&authSource=admin&keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000"
    }
}
export default config;



