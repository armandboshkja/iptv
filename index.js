const fetch = require('node-fetch');
const fs = require('fs');
const contentDisposition = require('content-disposition');

const express = require('express')
const cors = require('cors');

const app = express();
var root = __dirname

app.listen(process.env.PORT, () =>{
  console.log('Server is working');
});

app.use(cors());
app.use(express.static(root + "/public"));


app.get('/update' , async (req,res) => {
        var time = new Date();

        fetch(`https://dailyiptvlist.com/dl/al-m3uplaylist-${time.getFullYear()}-${time.getMonth()}-${time.getDay()}-1.m3u`)
        .then(res => res.text())
        .then(body => {
            if(body.includes('EXTM3U')){
            fs.unlink('list.m3u', (err) =>{
                if (err) return console.log(err);
            })

            fs.writeFile('list.m3u', body ,function (err) {
                if (err) return console.log(err);
            });

            }
        });
})
        
        
app.get('/iptv' , async (req,res) => {
  res.writeHead(200, {
          'Content-disposition': contentDisposition(`list.m3u`)});
  
  const fileStream = fs.createReadStream('list.m3u');
  
  fileStream.pipe(res);
  
})
