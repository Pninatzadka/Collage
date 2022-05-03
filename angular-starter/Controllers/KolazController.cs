using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using BL;
using System.Web.Http;
using System.Drawing;
using System.IO;

namespace angular_starter.Controllers
{
    public struct pictureStatus
    {
        public int xPointStart;
        public int yPointStart;
        public int xPointEnd;
        public int yPointEnd;
      //  public bool mode;//Width or Hight

    }

    public class KolazController : ApiController
    {
    
        [HttpPost]
        [Route("api/Kolaz")]
        public Queue<pictureStatus> createKolaz( Kolaz kk)
       {
            Queue<pictureMode> queuePicture;
            pictureMode p;
            Kolaz k;
            do
            {
              k = new Kolaz(kk.Height,kk.Width,kk.Space,kk.NumPictures, kk.IsGrid, kk.Shape,null);
                 queuePicture = k.CreatKolaz();
            } while (queuePicture == null);
                  
            Queue<pictureStatus> arrPictureStatus = new Queue<pictureStatus>();
            pictureStatus picturS;
            for (int i = 0; i < kk.NumPictures; i++)
            {
                p= queuePicture.Dequeue();
                picturS.xPointStart = p.pointStart.X;
                picturS.yPointStart = p.pointStart.Y;
                picturS.yPointEnd = p.pointEnd.Y;
                picturS.xPointEnd = p.pointEnd.X;

                arrPictureStatus.Enqueue(picturS);
            }           
            return arrPictureStatus;
        }      
    }
}
