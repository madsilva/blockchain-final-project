var keythereum = require("keythereum");
var datadir = "/home/madsilva/fall2019/blockchain/blockchain-final-project/embark_demo/.embark/development/datadir";
var address= "0xB8516e5319E74600086d2631A90e4ce58eb063dE";
const password = "dev_password";

var keyObject = keythereum.importFromFile(address, datadir);
console.log(keyObject);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));