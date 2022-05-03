using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Web;
using System.IO;
using System.Security.AccessControl;
using System.Web.Configuration;

namespace angular_starter.Controllers
{
    public class UploudController : ApiController
    {

       
            string fileRoute;
     
            [HttpPost]
            [Route("Upload/UploadJsonFile")]
            public bool UploadJsonFile()
            {

                HttpResponseMessage response = new HttpResponseMessage();

                var files = HttpContext.Current.Request.Files;
                HttpPostedFile file1 = files[0];
            //string path = @"C:/Users/ptzadkax/OneDrive - Intel Corporation/Desktop/אנגולר23/angular-starter/angular-starter/src/picture/";
            //string path = @"C:/Users/ptzadkax/OneDrive - Intel Corporation/Desktop/אנגולר23/angular-starter/angular-starter/src/picture/";
            var path = AppDomain.CurrentDomain.BaseDirectory + "src/picture/"; //WebConfigurationManager.AppSettings["BasePath"];
            if (files.Count > 0)
                {
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];
                        string fileName = UploadFile(file, path);
                    }
                }
                if (response.IsSuccessStatusCode == true)
                {
                    return true;
                }

                else
                    return false;
            }

           


       
        [Route("Upload/UploadImage")]
        public bool uploadBackGroundPicture()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var files = HttpContext.Current.Request.Files;
            HttpPostedFile file = files[0];
            string path = @"C:/Users/ptzadkax/OneDrive - Intel Corporation/Desktop/אנגולר23/angular-starter/angular-starter/src/backGroundPicture/";

            string fileName = UploadFile(file, path);
            
            if (response.IsSuccessStatusCode == true)
            {
                return true;
            }

            else
                return false;

        }


        private string UploadFile(HttpPostedFile file, string mapPath)
        {
            string fileName = new FileInfo(file.FileName).Name;

            if (file.ContentLength > 0)
            {
                Guid id = Guid.NewGuid();

                var filePath = Path.GetFileName(fileName);

                if (!File.Exists(mapPath + filePath))
                {

                    file.SaveAs(mapPath + filePath);
                    fileRoute = mapPath + filePath;
                    return filePath;
                }
                return null;
            }
            return null;

        }

    }
    }


