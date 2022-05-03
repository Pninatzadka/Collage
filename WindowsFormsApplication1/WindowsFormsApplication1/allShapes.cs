using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web.Configuration;

namespace BL
{
    public class allShapes
    {
        
        static DirectoryInfo directorySelected;// = new DirectoryInfo("C:/Users/ptzadkax/OneDrive - Intel Corporation/Desktop/אנגולר23/angular-starter/angular-starter/src/shape");
        static string[] arrShapes;

        public static string[] drawShapes()
        {
            directorySelected = new DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory + "src/picture/");
            int i = 0;

            arrShapes = new string[directorySelected.GetFiles().Length];

            foreach (FileInfo shape in directorySelected.GetFiles())
            {
                arrShapes[i] = shape.Name;
                arrShapes[i] = arrShapes[i].Substring(0, arrShapes[i].Length - 4);
                i++;
            }
            return arrShapes;
        }


    }
}
