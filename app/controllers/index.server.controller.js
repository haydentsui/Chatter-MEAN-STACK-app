var path = require('path')

exports.render = function(req, res) {
    
     res.render('index', {
       title: 'Hello World',
       user: JSON.stringify(req.user)
     });

     
  // res.sendFile(path.resolve(__dirname + '/../views/index.html'));
};



