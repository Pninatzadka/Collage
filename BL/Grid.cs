using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApplication1
{
    
public  struct pictureMode
    {
        public Point pointStart;
        public Point pointEnd;
        public bool mode;//Width or Hight
    }
public   class  Grid
    {
        
        public static  Queue<pictureMode> GridResult(int hightKolaz, int widthKolaz, int numPicture, int space)
        {
            int ezerNumPicture =numPicture, numOfPicture, sizeWidth, sizeHight, j = 0, k = 0,  i=0;//j-לרוחב K-לאורך
            bool mode;//true- לאורך false- לרוחב
            pictureMode pMode = new pictureMode();
           widthKolaz = widthKolaz - space / 2;
            hightKolaz =hightKolaz - space / 2;
            pictureMode pModeDelet = new pictureMode();
            pModeDelet.pointStart.X = space / 2;// Width
            pModeDelet.pointStart.Y = space / 2; //Hight
            pModeDelet.pointEnd.Y = hightKolaz;
            pModeDelet.pointEnd.X = widthKolaz;
            Queue<pictureMode> pictureQueue = new Queue<pictureMode>();
            Random r1 = new Random();
            mode = Convert.ToBoolean(r1.Next(0, 2));
            do
            {
                Random r = new Random();
                numOfPicture = r.Next(1, ezerNumPicture + 1);
                sizeWidth = widthKolaz / numOfPicture;
                sizeHight = hightKolaz / numOfPicture; 
                j = 0;
                k = 0;
                for (i = 0; i < numOfPicture; i++)
                {
                    if (numOfPicture == 1)
                        mode = !mode;
                    if (mode)//לאורך
                    {
                        pMode.pointStart.X = pModeDelet.pointStart.X + j;
                        pMode.pointStart.Y = pModeDelet.pointStart.Y;
                        pMode.pointEnd.X = pModeDelet.pointStart.X + j + sizeWidth;
                        pMode.pointEnd.Y = pModeDelet.pointEnd.Y;
                        pMode.mode = mode;
                        j += sizeWidth;
                    }
                    else//לרוחב
                    {
                        pMode.pointStart.X = pModeDelet.pointStart.X;
                        pMode.pointStart.Y = pModeDelet.pointStart.Y + k;
                        pMode.pointEnd.X = pModeDelet.pointEnd.X;
                        pMode.pointEnd.Y = pModeDelet.pointStart.Y + sizeHight + k;
                        pMode.mode = mode;
                        k += sizeHight;
                    }
                    pictureQueue.Enqueue(pMode);

                }

                if (pictureQueue.Count < numPicture)
                {
                    Random r2 = new Random();
                    int a = r2.Next(pictureQueue.Count);
                    for (int h = 0; h < a; h++)
                    {
                        pModeDelet = pictureQueue.Dequeue();
                        pictureQueue.Enqueue(pModeDelet);
                    }
                    pModeDelet = pictureQueue.Dequeue();
                    widthKolaz = pModeDelet.pointEnd.X - pModeDelet.pointStart.X;
                    hightKolaz = pModeDelet.pointEnd.Y - pModeDelet.pointStart.Y;
                    ezerNumPicture =numPicture - pictureQueue.Count;
                    mode = !pModeDelet.mode;

                }
            }
            while (pictureQueue.Count < numPicture);
            return pictureQueue;
        }
        
        public static Bitmap CreatGrid(int hightKolaz, int widthKolaz, int numPicture, int space,Image [] imageArr)
        {
            int w, h;
            Bitmap imgResult = new Bitmap(widthKolaz, hightKolaz);
            Graphics graphImgResult = Graphics.FromImage(imgResult); 


            Queue<pictureMode> pictureQueue = GridResult(hightKolaz, widthKolaz, numPicture,space);
            while (numPicture>0)
            {
              for (int i = 0; i < imageArr.Length && numPicture>0; i++)
              {
                pictureMode pModeDelet = pictureQueue.Dequeue();
                w = pModeDelet.pointEnd.X - pModeDelet.pointStart.X - space / 2;//רוחב
                h = pModeDelet.pointEnd.Y - pModeDelet.pointStart.Y - space / 2;//אורך
                graphImgResult.DrawImage(imageArr[i], pModeDelet.pointStart.X, pModeDelet.pointStart.Y, w, h);
                    numPicture--;
              }
            
            }
           graphImgResult.Dispose();
            return imgResult;
        }  
    }
}
