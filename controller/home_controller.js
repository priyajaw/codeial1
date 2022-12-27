module.exports.home=function(req,res){
    // return res.end('<h1>express running</h1>')
console.log(req.cookies);
res.cookie('user_id',45);
    return res.render('home',{
        title:"Home"
    })
}