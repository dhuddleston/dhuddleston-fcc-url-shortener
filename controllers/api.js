var express = require('express');
var validUrl = require('valid-url');

var ShortUrl = require('../models/shortUrl');

// Using module.exports so that the Express app and database can be used
module.exports = function(app, mongoose){
    app.get('/:url', getUrl);
    
    function getUrl(req, res){
        var url = (process.env.APP_URL + req.params.url);
        ShortUrl.findOne({ shortenedUrl: url }, 'originalUrl shortenedUrl', function (err, result) {
          if(err) { console.log('error', err); }
              console.log('result',result);
          if( result ) {
              console.log('Found original url: ' + result);
              console.log(req.params.url);
              res.redirect(result.originalUrl);
          }
          else
          {
              res.send({
                 "error": "The requested URL was not found in the database." 
              });
          }
      }); 

    }
    
    // The * at the end allows us to pass in URLs with protocols such as HTTPS://
    app.get('/new/:url*', postUrl);
    
    function postUrl(req, res){
        var shortUrl = new ShortUrl();
        var url = req.url.slice(5);
        if(validUrl.isUri(url))
        {
            
            ShortUrl.findOne({'originalUrl': url}, 'originalUrl shortenedUrl', function(err, existingUrl){
               if(err) {res.json({error: 'An error occured'})}
               
               if(existingUrl)
               {
                   res.send
                   ({
                       "message": "This URL already exists in the database at: ", url:existingUrl
                   });
               }
               else
               {
                    shortUrl.originalUrl=url;
                    shortUrl.shortenedUrl=process.env.APP_URL + makeShortUrl();
                    
                    shortUrl.save(function(err, data){
                       if(err)
                       {
                           res.send(err);
                       }
                       else
                       {
                           res.json(data);
                       }
                    });
               }
            });
        }
        else
        {
            res.send("Not a valid URL. Please try again");
            console.log(url);
        }
    }
    
    // Choosing a random number between 1000 and 9999 will create a random 4 digit code
    function makeShortUrl(){
        var shortNum = Math.floor(Math.random() * 9999) + 1000;
        return shortNum.toString();
    }
    
};