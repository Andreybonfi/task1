#include <fstream>
#include "generator.h"

void openFile()
{
  ofstream fout;
  for (int i = 1; i < 101; i++)
  {
    fout.open("./test/Test" + to_string(i) + ".txt"); 
    //Заполнение файла сгенерированной строкой 
    for (int i = 0; i < 9999; i++)
    {
//Семейство функций generator...() , определение функций содержится в generator.h
      fout
          << generatorDate() << "||" << generatorEng() << "||" << generatorRus() << "||" << generatorInt() << "||" << generatorDouble() << endl;
    }
     fout
          << generatorDate() << "||" << generatorEng() << "||" << generatorRus() << "||" << generatorInt() << "||" << generatorDouble();
    fout.close();
  }
}
