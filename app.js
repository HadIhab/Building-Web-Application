const express = require('express');
const app = express();

app.get('/',function(req, res){
  res.send('Hello from my library app');
});

app.listen(3000,function(){
  console.log('Listening on port 3000');
});