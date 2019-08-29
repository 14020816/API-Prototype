using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp11
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            //string a = NumberToWords(1121399000);
            //string b = NumberToMoneyWord(a);
            //Console.Write(NumberToWords(1121399000));
            testMoney();
            var money = ConvertToMoney.ConvertNo(234);
            Console.ReadLine();
        }
       
        private static void testMoney()
        {
            List<double> testList = new List<double>();
            List<string> resultList = new List<string>();
            testList.Add(0101010001000000);
            testList.Add(0);
            testList.Add(01);
            testList.Add(012);
            testList.Add(01234);
            testList.Add(012345);
            testList.Add(123456);
            testList.Add(1234567);
            testList.Add(1234567);
            testList.Add(12345678);
            testList.Add(123456789);
            testList.Add(1234567899);
            testList.Add(123456789991234);

            for(int i = 0; i < testList.Count; i++)
            {
                Console.WriteLine("Number: " + testList[i]);
                Console.WriteLine("Money: " + ConvertToMoney.ConvertNo(testList[i]));
                resultList.Add("Number: " + testList[i].ToString("C0") + "\n" + "Money: " + ConvertToMoney.ConvertNo(testList[i]));

            }
            //return false;
            System.IO.File.WriteAllLines(@"F:\LUCND\WriteLines.txt", resultList);
        }

        public static string NumberToWords(double doubleNumber)
        {
            var beforeFloatingPoint = (float)Math.Floor(doubleNumber);
            var beforeFloatingPointWord = $"{NumberToWords(beforeFloatingPoint)} đồng";
            return beforeFloatingPointWord;
        }
        public static string NumberToMoneyWord(string word)
        {
            return word.Trim();
        }
        private static string NumberToWords(int number)
        {
            if (number == 0)
                return "không";

            if (number < 0)
                return "phẩy " + NumberToWords(Math.Abs(number));

            var words = "";

            if (number / 1000000000 > 0)
            {
                words += NumberToWords(number / 1000000000) + " tỷ";
                number %= 1000000000;
            }

            if (number / 1000000 > 0)
            {
                words += NumberToWords(number / 1000000) + " triệu";
                number %= 1000000;
            }

            if (number / 1000 > 0)
            {
                words += NumberToWords(number / 1000) + " nghìn";
                number %= 1000;
            }

            if (number / 100 > 0)
            {
                words += NumberToWords(number / 100) + " trăm";
                number %= 100;
            }

            words = SmallNumberToWord(number, words);

            return words;
        }

        private static string SmallNumberToWord(int number, string words)
        {
            if (number <= 0) return words;
            if (words != " ")
                words += " ";
            var unitsMap = new[] { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"};
            var tensMap = new[] { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười" };
            {
                if (number / 10 > 0)
                {
                    words += tensMap[number / 10];
                }
                if ((number % 10) > 0)
                    words += " " + unitsMap[number % 10];
            }
            return words;
        }
    }
}