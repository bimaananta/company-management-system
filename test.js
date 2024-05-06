let string = "product";

string = (string.split("_").length === 1) ? string : string.split("_");

console.log(string);