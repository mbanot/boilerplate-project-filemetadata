var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



app.post('/api/fileanalyse',  upload.single('upfile'), function(req, res){
  console.log(req.file)
  res.json({
    name: req.file.originalname, 
    type: req.file.mimetype, 
    size: req.file.size
  });

  // {
  //   fieldname: 'upfile',
  //   originalname: 'Screenshot 2024-12-03 at 09.07.05.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: 'uploads/',
  //   filename: 'e98c9afc57ce28f3a5e7d4e4b4b95f81',
  //   path: 'uploads/e98c9afc57ce28f3a5e7d4e4b4b95f81',
  //   size: 179115
  // }
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
