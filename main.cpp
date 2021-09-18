
#include <iostream>
#include <fstream>
#include <ctime>
#include <clocale>
#include <cstring>
#include <io.h>
#include <fcntl.h>
#include <string>

//Функция Создает 100 файлов и заполняет их строками  
#include "workWithFile.h"
using namespace std;


int main()
{
  srand(time(0));
  setlocale(LC_ALL, "");

// Функция создает файлы , определение функции в workWithFile.h
  openFile();
  return 0;
}
