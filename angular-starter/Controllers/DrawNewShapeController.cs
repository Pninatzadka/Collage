using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;

namespace angular_starter.Controllers
{
    public class DrawNewShapeController : ApiController
    {

        [HttpGet]
        [Route("api/newShape/")]
        public string[] updateNewShape()
        {
            return allShapes.drawShapes();
        }

    }
}
