// home page
module.exports.home = function(req, res){
    console.log(req.url);
    return res.render('home', {
        title : 'Home'
    });
}
