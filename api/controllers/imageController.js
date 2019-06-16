const https = require('https');
const request = require('request');
const flickrApiKey = require('../config/keys').flickrApiKey;
const flickrApiSecret = require('../config/keys').flickrApiSecret;



module.exports.callFlickr = function(req, res, next){
 var imageUrls = new Array(10);
 request('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+flickrApiKey+'&tags='+req.body.tag+'&per_page=10&page=1&format=json&nojsoncallback=1', {json: true}, (err, resp, body) => {
     if(err){ return console.log(err); }
     for(var i = 0; i < imageUrls.length ; i++){
         if(body.photos.photo[i]['farm'] == 0){
             continue;
         }
         imageUrls[i] = 'https://farm'+body.photos.photo[i]['farm']+'.staticflickr.com/'+body.photos.photo[i]['server']+'/'+body.photos.photo[i]['id']+'_'+body.photos.photo[i]['secret']+'.jpg';

     }
     res.json({
         "data":imageUrls
     });
 })
    
}