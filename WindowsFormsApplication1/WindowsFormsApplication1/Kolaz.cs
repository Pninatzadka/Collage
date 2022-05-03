﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BL
{
  public class Kolaz
    {

        public int Height { get; set; }
        public int Width { get; set; }
        public int Space { get; set; }
        public int NumPictures { get; set; }
        public bool IsGrid { get; set; }
        public string Shape { get; set; }
        public Image[] ImageArr { get; set; }
        public Bitmap Result { get; set; }

        public Kolaz()
        {
                
        }
        public Kolaz(int Height, int Width, int Space, int NumPictures, bool IsGrid, string Shape,Bitmap Result )
        {
            try
            {

            
            this.Height = Height;
            this.Width = Width;
            this.Space = Space;
            this.NumPictures = NumPictures;
            this.IsGrid = IsGrid;
            this.Shape = Shape;
            this.Result = Result;


            string[] filePicture = Directory.GetFiles(@"D:\אנגולר23\angular-starter\angular-starter\src\picture");
            ImageArr = new Image[filePicture.Length-1];
            for (int i = 0; i < filePicture.Length - 1 && i<NumPictures; i++)
            {
                ImageArr[i] = Image.FromFile(filePicture[i]);
            }
            }
            catch
            {

            }
        }     

        public  Queue<pictureMode> CreatKolaz()
        {
            if (IsGrid == true)
            {
                return Grid.CreatGrid(Height, Width, NumPictures, Space, ImageArr);
            }
            else
                return Shapes.CreatShape(Height, Width, NumPictures, Space, ImageArr, Shape);
           
        }

    }
}
