var moment = require("moment");



// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// console.log(date.format("dddd, MMMM Do YYYY, h:mm:ss a")); // Sunday, December 31st 2017, 11:40:47 am
//
// date.add(100, "year").subtract(9, "month");
// console.log(date.format("MMM Do, YYYY")); // Mar 31st, 2117
//
//
// console.log(date.format("h: mm a"));


var createdAt = 1234;
var date = moment(createdAt)
console.log(date.format("h: mm a"));
