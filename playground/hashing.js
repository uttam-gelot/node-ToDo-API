const jwt = require("jsonwebtoken");
const {SHA256} = require("crypto-js");
const bcrypt = require("bcryptjs");

var password = "123abc!";

// bcrypt.genSalt(10, (error, salt) =>
// {
//     bcrypt.hash(password, salt, (error, hash) =>
//     {
//         console.log(hash);
//     }); 
// });

var hashed = "$2a$10$HGeXfKIkuE8iOibdOr1G3.aAJB/q9fuPfJVplrh/6SWPeE2HLCixa";
bcrypt.compare(password, hashed, (error, result) =>
{
    console.log(result);
});