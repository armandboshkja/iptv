const fetch = require('node-fetch');
const fs = require('fs');
setInterval(mainFunction(), 1680000);

function mainFunction(){
    var time = new Date();

    fetch(`https://dailyiptvlist.com/dl/al-m3uplaylist-${time.getFullYear()}-${time.getMonth()}-${time.getDay()}-1.m3u`)
    .then(res => res.text())
    .then(body => {
        if(body.includes('EXTM3U')){
        fs.unlink('public/list.m3u', (err) =>{
            if (err) return console.log(err);
        })

        fs.writeFile('public/list.m3u', body ,function (err) {
            if (err) return console.log(err);
        });

        }
    });
}
