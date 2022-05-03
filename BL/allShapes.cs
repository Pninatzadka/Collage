using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace WindowsFormsApplication1
{
    class allShapes
    {
        static DirectoryInfo directorySelected = new DirectoryInfo("M:/זוגות/רותי ופניני/סידור הקוד/shape/");
        static string[] arrShapes;

        public static string[] drawShapes()
        {
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
