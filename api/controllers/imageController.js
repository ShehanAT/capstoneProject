const https = require('https');
const request = require('request');
const flickrApiKey = require('../config/keys').flickrApiKey;
const flickrApiSecret = require('../config/keys').flickrApiSecret;
const subscriptionKey = process.env.AZURECOMPUTERVISIONSUBSCRIPTIONKEY;





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
module.exports.callOCRData = function(req, res, next){
    const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';
    const imageUrl = req.body.tag;
    console.log(imageUrl);
    const params = {
        'language': 'unk',
        'detectOrientation': 'true',
    };
    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
    request.post(options, (err, resp, body) => {
        if(err){
            console.log('Error: ', err);
            return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
        res.json({
            "data": jsonResponse
        });
    });
}