#include <iostream>
#include <fstream>
#include <ctime>
#include <clocale>
#include <cstring>
#include <io.h>
#include <fcntl.h>
#include <string>
using namespace std;

//Форматирование 1.1.2010 к 01.01.2010
string formatMonthDate(int DataMonth);

//Случайная дата в пределах 5 лет от текущей
string generatorDate();

//Генерация даты учитывая количество дней в месяце
int day(int Month);

//Генерация строки латинских символов двух регистров
string generatorEng();

//Генерация строки русских символов двух регистров
string generatorRus();

double generatorDouble();

int generatorInt();

string generatorDate()
{
  time_t now = time(0);
  tm *ltm = localtime(&now);
  int Month, Year, Day;
  string DayStr;

  Year = 1900 + ltm->tm_year - rand() % 6;

  //Блок if учитывающий что при 4 годах разницы нельзя сгенерировать любой месяц
  if (Year == 2016)
  {
    Month = rand() % ((1 + ltm->tm_mon)) + 1;

    //Генерация даты с учетом (если сгенерировался текущий месяц )
    if (Month == 1 + ltm->tm_mon)
    {
      Day = rand() % ltm->tm_mday + 1;
    }

    else 
      Day = day(Month);
  }

   //Генерация любого месяца разница в годах < 4
  else
  {
    Month = rand() % 12 + 1;
    Day = day(Month);
  }

  return formatMonthDate(Day) + "." + formatMonthDate(Month) + "." + to_string(Year);
}

//Приведение 1. к 01.
string formatMonthDate(int DataMonth)
{
  string str;
  if (DataMonth < 10)
  {
    str = "0" + to_string(DataMonth);
  }
  else
    str = to_string(DataMonth);
  return str;
}

//Генератор дня с учетом дней в месяце
int day(int Month)
{
  int Day;
  if (Month == 4 || Month == 6 || Month == 9 || Month == 11)
    Day = rand() % 30 + 1;

  else if (Month == 2)
    Day = rand() % 28 + 1;

  else
    Day = rand() % 31 + 1;
  return Day;
}

double generatorDouble()
{
  return (rand() % 2000000000 + 1) / 100000000.0;
}

int generatorInt()
{
  return rand() % 100000000 + 1;
}

string generatorEng()
{
  string rez;
  char letter;
  for (int i = 0; i < 10; i++)
  {
    int value = rand() % ('Z' - 'A' + 'z' - 'a');
    letter = 'A' + value;
    if (letter > 'Z')
    {
      letter = 'a' + value - ('Z' - 'A');
    }
    rez += letter;
  }
  return rez;
}

string generatorRus()
{

  string rus[] = {"А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я", "я", "ю", "э", "ь", "ы", "ъ", "щ", "ш",
                  "ч", "ц", "х", "ф", "у", "т", "с", "р", "п", "о", "н", "м", "л", "к", "й", "и", "з", "ж", "ё", "е", "д", "г", "в", "б", "а"};
  string rez;

  for (int i = 0; i < 10; i++)
  {
    rez += rus[rand() % 66];
  }
  return rez;
}