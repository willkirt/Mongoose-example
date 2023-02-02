if(process.env.NODE_ENV === "production"){
    module.exports = {mongoURI:"mongodb+srv://Willkirt:wordpass@cluster0.i7ttdpi.mongodb.net/?retryWrites=true&w=majority"}
}
else{
    module.exports = {mongoURI:"mongodb://localhost:27017/gameEntries"}
}