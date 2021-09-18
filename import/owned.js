const { appendFile } = require("fs");
const fs = require("fs");
const mysql = require("mysql");
let marker = false;

function owned(filter) {
    let count = 0;
    for (let i = 1; i < 6; i++) {

        let fileContent1 = fs.readFileSync("./test/Test" + i + ".txt", "utf8");
        let fileContentMass1 = fileContent1.split("\n");
        if (i > 1 || marker) {
            fs.appendFileSync("./test/owned.txt", '\n', function (error) {

                if (error) throw error;

            });
        }

        for (let j = 0; j < fileContentMass1.length; j++) {

            if (fileContentMass1[j].indexOf(filter) > 0) {
                delete fileContentMass1[j];
                count++;
                console.log("Deleted string : " + count);
            }
            else {
                if (j == fileContentMass1.length - 1) {
                    fs.appendFileSync("./test/owned.txt", fileContentMass1[j], function (error) {

                        if (error) throw error;

                    });
                }
                else {
                    fs.appendFileSync("./test/owned.txt", fileContentMass1[j] + '\n', function (error) {

                        if (error) throw error;

                    });
                }
            }

        }
        marker = true;
    
        fs.writeFileSync("./test/Test" + i + ".txt", fileContentMass1.join('\n'),function (error,data){
            if (error) throw error;
            else console.log("....Сompleted")
        });

    }
}

module.exports = owned;