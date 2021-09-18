const { appendFile } = require("fs");
const mysql = require("mysql");
const fs = require("fs");

let marker = false;

//Функции доступные через меню 
console.log("Owned (1)\nImport Date to Db (2)\nGenerator (3)\nInt_summ (4)\nDouble_Mediana (5)\nExit (6)");

//Параматры  для подключения БД
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
    password: "",
});

//Создание соединения с БД  
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }

});

//Cоздание сканера консоли для управления меню . При ввидении данных в консоль сканер реализует алгоритм управления. 
var stdin = process.openStdin();
stdin.addListener("data", function (d) {
    switch (d.toString().trim().split("/")[0]) {
        case '1':
            //Команда для запуска функции с параметром 
            owned(d.toString().trim().split("/")[1]);   
            break;
        case '2':
            importDate(); //Отправка данных в БД
            break;
        case '3':
            generator();  //Создание текстовых файлов
            break;
        case '4':
            fullsum();    // Получение суммы целых чисел 
            break;
        case '5':
            Mediana();   // Получение медианы дробных чисел 
            break;
        case '6':
            exit();       // Закрытие соединения с БД
            break;
        default:
            break;

    }
});

//Создание "Чайлд процесс" который запускает main.exe . Что создает нужное количество файлов 
function generator() {
    var exec = require('child_process').execFile;
    var runLiberOffice = function () {
        exec('main.exe', function (err, data) {
            if (err) console.log(err);
            else console.log("....Сompleted");
        });
    }
    //Запуск "Чайлд процесс"
    runLiberOffice(); 
}

//Функция реализет обьеденение файлов в один с поиском строк по подстроке "filter" и удалением их из исходнного и обьедененного файлов
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
        //Переменнная позволяющая заполнить файл без пустой строки в начале/в конце файла
        marker = true; 

        //перезапись исходного файла с учетом фильтра 
        fs.writeFileSync("./test/Test" + i + ".txt", fileContentMass1.join('\n'), function (error, data) {
            if (error) throw error;
            else console.log("....Сompleted")
        });

    }
}

//Функция реализующая запись данных в БД
function importDate() {


    let fileContent = fs.readFileSync("./test/owned.txt", "utf8");
    let fileContentMass = fileContent.split("\n");


    console.log("Import : 0/" + fileContentMass.length + ".....loading")
    for (let i = 0; i < fileContentMass.length; i++) {

        //Структура  с данными разделенными по соотвествующим полям БД  
        const users = [
            [fileContentMass[i].split("||")[0].split('.')[2] + "." + fileContentMass[i].split("||")[0].split('.')[1] + "." + fileContentMass[i].split("||")[0].split('.')[0],
            fileContentMass[i].split("||")[1], fileContentMass[i].split("||")[2], fileContentMass[i].split("||")[3], fileContentMass[i].split("||")[4]]
        ];
        const sql = `INSERT INTO generator(my_date, eng, rus, my_int , my_double ) VALUES ?`;
        connection.query(sql, [users], function (err, results) {
            if (err) console.log(err);
        });

        //Визуализация процесса выгрузки данных 
        if ((i + 1) == fileContentMass.length)
            console.log("Import : " + (i + 1) + "/" + fileContentMass.length + ".....loading End!");
        else
            console.log("Import : " + (i + 1) + "/" + fileContentMass.length + ".....loading Start!");
    }


}

//Функция  получающая  от БД сумму всех эллементов столбца целых чисел 
function fullsum() {

    const sql = `SELECT SUM(my_int) FROM generator `;
    connection.query(sql, function (err, results) {
        if (err) console.log(err);
        if (results) console.log(results);

    });

}

//Функция  получающая  от БД Медиану всех эллементов столбца дробных чисел  
function Mediana() {
    let Med;
    const sql = `SELECT
    ((SUBSTRING_INDEX(SUBSTRING_INDEX(group_concat(my_double order by my_double), ',', floor(1+((count(my_double)-1) / 2))), ',', -1))
    +
    (SUBSTRING_INDEX(SUBSTRING_INDEX(group_concat(my_double order by my_double), ',', ceiling(1+((count(my_double)-1) / 2))), ',', -1)))/2
    as median
    FROM generator`;
    connection.query(sql, function (err, results) {
        if (err) console.log(err);
        console.log(results);

    });

}

//Закрытие подключения к БД
function exit() {
    connection.end(function (err) {
        if (err) {
            return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
}



