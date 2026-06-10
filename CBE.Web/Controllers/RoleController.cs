using CBE.Web.Helper;
using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CBE.Web.Controllers
{
    [Authorize]
    public class RoleController : Controller
    {

        private readonly IRequestSet _requestSet;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _config;

        public RoleController(IRequestSet requestSet, IAppSession appSession, IConfiguration config)
        {
            _requestSet = requestSet;
            _appSession = appSession;
            _config = config;
            _requestSet.BaseUrl = _config.GetSection("ApiURL").Value;
        }

        public IActionResult GetRoles()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Login", "Account");


            var results = _requestSet.ExecuteAsJson("roles", HttpVerb.Get, null, _appSession.Token).Result;

            if (results.IsSuccessfull)
            {
               var roleList = JsonConvert.DeserializeObject<List<RoleModel?>>(results.Message);

                if (CbeRoles.PROJECTCOORDINATOR == _appSession.RoleName && roleList != null)
                {
                    roleList = roleList.Where(o => o.Name== CbeRoles.PROJECTDRIVER).ToList();
                }

                return Content(JsonConvert.SerializeObject(roleList), "application/json");
            }
            else
            {
                return BadRequest(results.Message);
            }

        }
    }

}
