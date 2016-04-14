

console.log('reload');

var basePath=__dirname;
module.exports = {
    database: 'mongodb://localhost/website',
    basePath:basePath,
    upload:basePath+"\\public\\upload"
};
