if(process.env.NODE_ENV === "production"){
    module.exports = {mongoURI:"mongodb+srv://Willkirt:wordpass@cluster0.i7ttdpi.mongodb.net/test"}
}
else{
   module.exports = {mongoURI:"mongodb://127.0.0.1:27017/gameEntries"}
}