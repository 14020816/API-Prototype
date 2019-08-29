using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp11
{
  
        public static class ConvertToMoney
        {
            private static string[] ChuSo = new string[10] { " không", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín" };
            private static string[] Tien = new string[6] { "", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ" };
            // Hàm đọc số có 3 chữ số
            private static string DocSo3ChuSo(int baso)
            {
                int tram, chuc, donvi;
                string KetQua = "";
                tram = (int)(baso / 100);
                chuc = (int)((baso % 100) / 10);
                donvi = baso % 10;
                if ((tram == 0) && (chuc == 0) && (donvi == 0)) return "";
                if (tram != 0)
                {
                    KetQua += ChuSo[tram] + " trăm";
                    if ((chuc == 0) && (donvi != 0)) KetQua += " linh";
                }
                if ((chuc != 0) && (chuc != 1))
                {
                    KetQua += ChuSo[chuc] + " mươi";
                    if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh";
                }
                if (chuc == 1) KetQua += " mười";
                switch (donvi)
                {
                    case 1:
                        if ((chuc != 0) && (chuc != 1))
                        {
                            KetQua += " mốt";
                        }
                        else
                        {
                            KetQua += ChuSo[donvi];
                        }
                        break;
                    case 5:
                        if (chuc == 0)
                        {
                            KetQua += ChuSo[donvi];
                        }
                        else
                        {
                            KetQua += " lăm";
                        }
                        break;
                    default:
                        if (donvi != 0)
                        {
                            KetQua += ChuSo[donvi];
                        }
                        break;
                }
                return KetQua;
            }
            // Hàm đọc số thành chữ
            public static string DocTienBangChu(long SoTien)
            {
                int lan, i;
                long so;
                string KetQua = "", tmp = "";
                int[] ViTri = new int[6];
                if (SoTien < 0) return "Số tiền âm !";
                if (SoTien == 0) return "Không đồng !";
                if (SoTien > 0)
                {
                    so = SoTien;
                }
                else
                {
                    so = -SoTien;
                }
                //Kiểm tra số quá lớn
                if (SoTien > 8999999999999999)
                {
                    SoTien = 0;
                    return "";
                }
                ViTri[5] = (int)(so / 1000000000000000);
                so = so - long.Parse(ViTri[5].ToString()) * 1000000000000000;
                ViTri[4] = (int)(so / 1000000000000);
                so = so - long.Parse(ViTri[4].ToString()) * +1000000000000;
                ViTri[3] = (int)(so / 1000000000);
                so = so - long.Parse(ViTri[3].ToString()) * 1000000000;
                ViTri[2] = (int)(so / 1000000);
                ViTri[1] = (int)((so % 1000000) / 1000);
                ViTri[0] = (int)(so % 1000);
                if (ViTri[5] > 0)
                {
                    lan = 5;
                }
                else if (ViTri[4] > 0)
                {
                    lan = 4;
                }
                else if (ViTri[3] > 0)
                {
                    lan = 3;
                }
                else if (ViTri[2] > 0)
                {
                    lan = 2;
                }
                else if (ViTri[1] > 0)
                {
                    lan = 1;
                }
                else
                {
                    lan = 0;
                }
                for (i = lan; i >= 0; i--)
                {
                    tmp = DocSo3ChuSo(ViTri[i]);
                    KetQua += tmp;
                    if (ViTri[i] != 0) KetQua += Tien[i];
                    if ((i > 0) && (!string.IsNullOrEmpty(tmp))) KetQua += ",";//&& (!string.IsNullOrEmpty(tmp))
                }
                if (KetQua.Substring(KetQua.Length - 1, 1) == ",") KetQua = KetQua.Substring(0, KetQua.Length - 1);
                KetQua = KetQua.Trim() + " đồng";
                return KetQua.Substring(0, 1).ToUpper() + KetQua.Substring(1);
            }

            public static string DocTienBangChu(decimal SoTien, string LoaiTien)
            {
                string chuoi = join_unit(SoTien);
                chuoi = chuoi.Replace("không mươi không ", "");
                chuoi = chuoi.Replace("không mươi", "linh");
                chuoi = chuoi.Replace("i không", "i");
                chuoi = chuoi.Replace("i năm", "i lăm");
                chuoi = chuoi.Replace("một mươi", "mười");
                chuoi = chuoi.Replace("mươi một", "mươi mốt");
                chuoi = chuoi.Replace(", không trăm " + LoaiTien, " " + LoaiTien);
                chuoi = chuoi.Substring(0, 1).ToUpper() + chuoi.Substring(1);
                return chuoi.Trim();

                //int lan, i;
                //long so = Convert.ToInt64(Math.Round(SoTien, 0));
                //string KetQua = "", tmp = "";
                //int[] ViTri = new int[6];
                //if (so < 0) return "Số tiền âm !";
                //if (so == 0) return "Không " + LoaiTien;
                ////Kiểm tra số quá lớn
                //if (so > 8999999999999999)
                //{
                //    return "";
                //}
                //ViTri[5] = (int)(so / 1000000000000000);
                //so = so - long.Parse(ViTri[5].ToString()) * 1000000000000000;
                //ViTri[4] = (int)(so / 1000000000000);
                //so = so - long.Parse(ViTri[4].ToString()) * +1000000000000;
                //ViTri[3] = (int)(so / 1000000000);
                //so = so - long.Parse(ViTri[3].ToString()) * 1000000000;
                //ViTri[2] = (int)(so / 1000000);
                //ViTri[1] = (int)((so % 1000000) / 1000);
                //ViTri[0] = (int)(so % 1000);
                //if (ViTri[5] > 0)
                //{
                //    lan = 5;
                //}
                //else if (ViTri[4] > 0)
                //{
                //    lan = 4;
                //}
                //else if (ViTri[3] > 0)
                //{
                //    lan = 3;
                //}
                //else if (ViTri[2] > 0)
                //{
                //    lan = 2;
                //}
                //else if (ViTri[1] > 0)
                //{
                //    lan = 1;
                //}
                //else
                //{
                //    lan = 0;
                //}
                //for (i = lan; i >= 0; i--)
                //{
                //    tmp = DocSo3ChuSo(ViTri[i]);
                //    KetQua += tmp;
                //    if (ViTri[i] != 0) KetQua += Tien[i];
                //    //if ((i > 0) && (!string.IsNullOrEmpty(tmp))) KetQua += ",";//&& (!string.IsNullOrEmpty(tmp))
                //}
                //if (KetQua.Substring(KetQua.Length - 1, 1) == ",") KetQua = KetQua.Substring(0, KetQua.Length - 1);
                //KetQua = KetQua.Trim() + " " + LoaiTien;
                //return KetQua.Substring(0, 1).ToUpper() + KetQua.Substring(1);
            }

            public static string Area(double number)
            {
                string str = "";
                string s = "";
                try
                {
                    s = number.ToString().Substring(0, number.ToString().LastIndexOf(","));
                }
                catch
                {
                    s = number.ToString("#");
                }

                str = ConvertNo(Convert.ToDouble(s == "" ? "0" : s));

                string temp = "";
                try
                {
                    temp = number.ToString().Substring(number.ToString().LastIndexOf(",") + 1);

                    if (double.Parse(temp) != number)
                    {
                        str += " phẩy ";
                        if (temp.Substring(0, 1) == "0")
                            str += " không ";
                        str += ConvertNo(double.Parse(temp));
                    }
                }
                catch { }

                string GT = "";
                GT = str.Substring(0, 1);
                str = GT.ToUpper() + str.Substring(1);
                while (str.IndexOf("  ") >= 0)
                    str = str.Replace("  ", " ");

                //if (str.LastIndexOf("mười một") >= 0)
                //    str = str.Substring(0, str.Length - 3) + "một";
                //else if (str.LastIndexOf("một") >= 0)
                //    str = str.Substring(0, str.Length - 3) + "mốt";

                return str;
            }

            public static string ConvertNo(double number)
            {
                if(number == 0)
                {
                    return "Không đồng";
                }
                if(number < 0)
                {
                    return "";
                }
                string s = number.ToString("#");
                string[] so = new string[] { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" };
                string[] hang = new string[] { "đồng", "nghìn", "triệu", "tỷ" };
                int i, j, donvi, chuc, tram;
                string str = " ";
                decimal decS = 0;
                try
                {
                    decS = Convert.ToDecimal(s.ToString());
                }
                catch(Exception ex)
                {
                    throw ex;
                }

                if (decS < 0)
                {
                    decS = -decS;
                    s = decS.ToString();
                }
                i = s.Length;
                if (i == 0)
                    str = so[0] + str;
                else
                {
                    j = 0;
                    while (i > 0)
                    {
                        donvi = Convert.ToInt32(s.Substring(i - 1, 1));
                        i--;
                        if (i > 0)
                            chuc = Convert.ToInt32(s.Substring(i - 1, 1));
                        else
                            chuc = -1;
                        i--;
                        if (i > 0)
                            tram = Convert.ToInt32(s.Substring(i - 1, 1));
                        else
                            tram = -1;
                        i--;
                        if ((donvi > 0) || (chuc > 0) || (tram > 0) || (j == 3))
                            str = hang[j] + str;
                        j++;
                        if (j > 3) j = 1;

                        if (chuc == 1 && donvi == 1)
                            str = "một " + str;
                        else if ((donvi == 1) && (chuc > 1))
                            str = "mốt " + str;
                        else
                        {
                            if ((donvi == 5) && (chuc > 0))
                                str = "lăm " + str;
                            else if (donvi > 0)
                                str = so[donvi] + " " + str;
                        }
                        if (chuc < 0)
                            break;
                        else
                        {
                            if ((chuc == 0) && (donvi > 0)) str = "lẻ " + str;
                            if (chuc == 1) str = "mười " + str;
                            if (chuc > 1) str = so[chuc] + " mươi " + str;
                        }
                        if (tram < 0) break;
                        else
                        {
                            if ((tram > 0) || (chuc > 0) || (donvi > 0)) str = so[tram] + " trăm " + str;
                        }
                        str = " " + str;
                    }
                }
                str = str.Trim();

                return str;
            }

            public static string join_unit(decimal number)
            {
                long soTien = Convert.ToInt64(number);
                string n = soTien.ToString();
                int sokytu = n.Length;
                int sodonvi = (sokytu % 3 > 0) ? (sokytu / 3 + 1) : (sokytu / 3);
                n = n.PadLeft(sodonvi * 3, '0');
                sokytu = n.Length;
                string chuoi = "";
                int i = 1;
                while (i <= sodonvi)
                {
                    if (i == sodonvi) chuoi = join_number((int.Parse(n.Substring(sokytu - (i * 3), 3))).ToString()) + unit(i) + chuoi;
                    else chuoi = join_number(n.Substring(sokytu - (i * 3), 3)) + unit(i) + chuoi;
                    i += 1;
                }
                return chuoi;
            }

            public static string unit(int n)
            {
                string chuoi = "";
                if (n == 1) chuoi = " đồng ";
                else if (n == 2) chuoi = " nghìn, ";
                else if (n == 3) chuoi = " triệu, ";
                else if (n == 4) chuoi = " tỷ, ";
                else if (n == 5) chuoi = " nghìn tỷ, ";
                else if (n == 6) chuoi = " triệu tỷ, ";
                else if (n == 7) chuoi = " tỷ tỷ, ";
                return chuoi;
            }

            public static string convert_number(string n)
            {
                string chuoi = "";
                if (n == "0") chuoi = "không";
                else if (n == "1") chuoi = "một";
                else if (n == "2") chuoi = "hai";
                else if (n == "3") chuoi = "ba";
                else if (n == "4") chuoi = "bốn";
                else if (n == "5") chuoi = "năm";
                else if (n == "6") chuoi = "sáu";
                else if (n == "7") chuoi = "bảy";
                else if (n == "8") chuoi = "tám";
                else if (n == "9") chuoi = "chín";
                return chuoi;
            }

            public static string join_number(string n)
            {
                string chuoi = "";
                int i = 1, j = n.Length;
                while (i <= j)
                {
                    if (i == 1) chuoi = convert_number(n.Substring(j - i, 1)) + chuoi;
                    else if (i == 2) chuoi = convert_number(n.Substring(j - i, 1)) + " mươi " + chuoi;
                    else if (i == 3) chuoi = convert_number(n.Substring(j - i, 1)) + " trăm " + chuoi;
                    i += 1;
                }
                return chuoi;
            }
        }
    }

