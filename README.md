# FreeCodeCamp API Basejump: URL Shortener Microservice
Created by Daniel Huddleston (dhuddleston) using MongoDB, Mongoose, Express.js, Jade, and Node.js

## User Stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

## Example Input:
```
https://bitroku.herokuapp.com/new/https://www.freecodecamp.com
```
## Example Output:
```
{"__v":0,"shortenedUrl":"https://bitroku.herokuapp.com/2130","originalUrl":"https://www.freecodecamp.com","_id":"57884ea241f3e0030026561e"}
```
## Example Usage:
```
https://bitroku.herokuapp.com/2130
```
## Redirects to the original URL at:
```
https://www.freecodecamp.com
```