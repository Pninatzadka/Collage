using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace WindowsFormsApplication1
{

    public class Shapes
    {
        const double constMin = 100000;
        const int sizeOfMat = 100;
        public class minAndMax
        {
            public int xMin;
            public int xMax;
            public int yMin;
            public int yMax;
            public minAndMax()
            {
                this.xMin = (int)constMin;
                this.xMax = 0;
                this.yMin = (int)constMin;
                this.yMax = 0;

            }

        }


        static bool start = true;
        public static Point[] arrPoint;

        public static void rand(int picture, int[,] mat, int height, int width)//rand num picture points center
        {
            Point p = new Point();
            arrPoint = new Point[picture];
            Random r = new Random();
            for (int i = 0; i < picture; i++)
            {
                p.Y = r.Next(0, width - 1);
                p.X = r.Next(0, height - 1);
                arrPoint[i] = p;
                mat[p.X, p.Y] = i + 2;
            }
        }

        public static double destinatoin(Point p1, Point p2)//pitagoras
        {
            double des;
            return des = Math.Sqrt(((Math.Max(p1.X, p2.X) - Math.Min(p1.X, p2.X)) * (Math.Max(p1.X, p2.X) - Math.Min(p1.X, p2.X)) + (Math.Max(p1.Y, p2.Y) - Math.Min(p1.Y, p2.Y)) * (Math.Max(p1.Y, p2.Y) - Math.Min(p1.Y, p2.Y))));

        }
        public static bool sivugToCenter(int[,] mat, int height, int width)//find center  nearest the point
        {
            bool degel = false;

            double min = constMin;
            int group = 0;

            for (int i = 0; i < height; i++)
            {
                for (int j = 0; j < width; j++)
                {
                    if (mat[i, j] != 0)
                    {
                        for (int k = 0; k < arrPoint.Length; k++)
                        {
                            double des = destinatoin(arrPoint[k], new Point(i, j));
                            if (des < min)
                            {
                                min = des;
                                group = k + 2;
                            }
                        }
                        if (mat[i, j] != group)
                        {

                            if (mat[i, j] != -1)
                                degel = true;
                            mat[i, j] = group;
                        }
                        min = constMin;
                    }
                }
            }

            return degel;

        }


        public static minAndMax[] arrCenter(int[,] mat, int height, int width)//find and change the center for all
        {
            minAndMax[] arrMinAndMax = new minAndMax[arrPoint.Length];
            Point p = new Point();
            for (int i = 0; i < arrPoint.Length; i++)
            {
                arrMinAndMax[i] = new minAndMax();
            }
            for (int i = 0; i < height; i++)
            {
                for (int j = 0; j < width; j++)
                {
                    if (mat[i, j] != 0 && (new Point(i, j) != arrPoint[mat[i, j] - 2]))
                    {
                        if (arrMinAndMax[mat[i, j] - 2].xMin > i)
                            arrMinAndMax[mat[i, j] - 2].xMin = i;
                        if (arrMinAndMax[mat[i, j] - 2].xMax < i)
                            arrMinAndMax[mat[i, j] - 2].xMax = i;
                        if (arrMinAndMax[mat[i, j] - 2].yMin > j)
                            arrMinAndMax[mat[i, j] - 2].yMin = j;
                        if (arrMinAndMax[mat[i, j] - 2].yMax < j)
                            arrMinAndMax[mat[i, j] - 2].yMax = j;
                    }
                }
            }
            if (start == true)
            {

                for (int i = 0; i < arrPoint.Length; i++)//check if every center exist in shape
                {
                    if (arrMinAndMax[i].xMin == constMin)
                    {
                        mat[arrPoint[i].X, arrPoint[i].Y] = 0;
                        Random r = new Random();
                        p.Y = r.Next(0, width - 1);
                        p.X = r.Next(0, height - 1);
                        arrPoint[i] = p;
                        mat[p.X, p.Y] = i + 2;
                        sivugToCenter(mat, height, width);

                        return arrCenter(mat, height, width);
                    }
                }
            }
            start = false;
            return arrMinAndMax;
        }

        public static void changeCenters(int[,] mat, int[,] mat2, minAndMax[] arrMinAndMax)//change the centers
        {
            for (int i = 0; i < arrPoint.Length; i++)
            {
                if (mat2[arrPoint[i].X, arrPoint[i].Y] == 0)
                    mat[arrPoint[i].X, arrPoint[i].Y] = 0;
                else
                    mat[arrPoint[i].X, arrPoint[i].Y] = 1;
                arrPoint[i].X = (arrMinAndMax[i].xMax - arrMinAndMax[i].xMin) / 2 + arrMinAndMax[i].xMin;
                arrPoint[i].Y = (arrMinAndMax[i].yMax - arrMinAndMax[i].yMin) / 2 + arrMinAndMax[i].yMin;
                mat[arrPoint[i].X, arrPoint[i].Y] = -1;
            }
        }


        public static minAndMax[] divToGroup(int pictur, int[,] mat, int[,] ezer, int height, int width)//the main function
        {
            start = true;
            minAndMax[] arrMinAndMax = new minAndMax[pictur];
            rand(pictur, mat, height, width);
            while (sivugToCenter(mat, height, width) == true)
            {
                arrMinAndMax = arrCenter(mat, height, width);
                changeCenters(mat, ezer, arrMinAndMax);
            }
            return arrMinAndMax;
        }

        public static int[,] getFixelToMat(Bitmap shape)//change image to mat
        {
            int[,] mat = new int[shape.Height, shape.Width];

            for (int i = 0; i < shape.Height; i++)
            {
                for (int j = 0; j < shape.Width; j++)
                {
                    if (shape.GetPixel(j, i).ToArgb() == Color.Black.ToArgb())
                    {
                        mat[j, i] = 1;

                    }
                    else
                        mat[j, i] = 0;
                }
            }
            return mat;
        }



        public static  Bitmap CreatShape(int hightKolaz, int widthKolaz, int numPicture, int space, Image[] imageArr, string shapeName)
        {

            string filePicture = @"M:\זוגות\רותי ופניני\סידור הקוד\shape\" + shapeName + ".jpg";
            Bitmap imgShape = new Bitmap(filePicture);
            int widthOfPixel = widthKolaz / sizeOfMat;
            int heightOfPixel = hightKolaz/ sizeOfMat;
            int[,] mat = new int[sizeOfMat, sizeOfMat];
            int[,] ezer = new int[sizeOfMat, sizeOfMat];
            Bitmap img = new Bitmap(sizeOfMat, sizeOfMat);

            Graphics graph = Graphics.FromImage(img);
            graph.DrawImage(imgShape, 0, 0, sizeOfMat, sizeOfMat);
            graph.Dispose();
            mat = getFixelToMat(imgShape);
            ezer = mat;

            minAndMax[] arrMinAndMax = divToGroup(numPicture, mat, ezer, sizeOfMat, sizeOfMat);
            Bitmap imgResult = new Bitmap(widthKolaz, hightKolaz);
            Graphics graphImgResult = Graphics.FromImage(imgResult);
            Point p = new Point();
            while (numPicture > 0)
            {
                for (int i = 0; i < imageArr.Length && numPicture > 0; i++)
                {
                    p.X = (arrMinAndMax[i].xMax - arrMinAndMax[i].xMin) / 2;
                    p.Y = (arrMinAndMax[i].yMax - arrMinAndMax[i].yMin) / 2;
                    numPicture--;
                    graphImgResult.DrawImage(imageArr[i], (arrPoint[i].X - p.X) * widthOfPixel, (arrPoint[i].Y - p.Y) * heightOfPixel, (arrMinAndMax[i].xMax - arrMinAndMax[i].xMin) * widthOfPixel, (arrMinAndMax[i].yMax - arrMinAndMax[i].yMin) * heightOfPixel);
                }
            }
            graphImgResult.Dispose();
            return imgResult;
        }
    }

    
            
}
