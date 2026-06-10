using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CBE.Web.Controllers
{
    [Authorize]
    public class LookupController : Controller
    {
        private readonly IRequestSet _requestSet;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _config;

        public LookupController(IRequestSet requestSet, IAppSession appSession, IConfiguration config)
        {
            _requestSet = requestSet;
            _appSession = appSession;
            _config = config;
            _requestSet.BaseUrl = _config.GetSection("ApiURL").Value;
        }

        [Route("Lookup/beneficiariescontributions")]
        [HttpPost()]
        public ActionResult GetBeneficiariesContributions()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/BeneficiariesContributions/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/targetgroups")]
        [HttpPost()]
        public ActionResult GetTargetGroups()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/targetgroups/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/projectexistence")]
        [HttpPost()]
        public ActionResult ProjectExistence()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("lookup/projectexistence/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/getdepartments/{FacultyID}")]
        [HttpPost()]
        public ActionResult GetDepartments(int FacultyID)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/Department/facultyid/" + FacultyID, HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }



        [Route("Lookup/getdepartments/all")]
        [HttpPost()]
        public ActionResult GetAllDepartment(int FacultyID)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/department/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/sustainabledevelopmentgoals")]
        [HttpPost()]
        public ActionResult GetSustainableDevelopmentGoals()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/SustainableDevelopmentGoals/All", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/getfaculties")]
        [HttpPost()]
        public ActionResult GetFaculties()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/Faculty/All", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }


        [Route("Lookup/locationscope")]
        [HttpPost()]
        public ActionResult GetLocationScopes()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/LocationScope/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/projectEffort")]
        [HttpPost()]
        public ActionResult GetProjectEffort()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/projectEffort/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/projectpartner")]
        [HttpPost()]
        public ActionResult GetProjectPartner()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/projectpartner/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }


        [Route("Lookup/projecttype")]
        [HttpPost()]
        public ActionResult GetProjectType()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/projecttype/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/projectduration")]
        [HttpPost()]
        public ActionResult ProjectDuration()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/projectduration/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }


        [Route("Lookup/provinces")]
        [HttpPost()]
        public ActionResult GetProvinces()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/provinces/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }


        [Route("Lookup/communityEngagementUnit")]
        [HttpPost()]
        public ActionResult GetCommunityEngagementUnit()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/CommunityEngagementUnit/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("Lookup/campus")]
        [HttpPost()]
        public ActionResult GetCampus()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/campus/all", HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }
        
        [Route("Lookup/FilterFacultiesDivision")]
        [HttpPost()]
        public ActionResult FilterFacultiesDivision(string search)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");
            var results = _requestSet.ExecuteAsJson("Lookup/GetFacultiesDivison/" + search, HttpVerb.Post, null, _appSession.Token).Result;

            return Redirect(results);
        }
        private ActionResult Redirect(ResponseViewModel results)
        {
            if (results.IsSuccessfull)
            {

                return Ok(results.Message);
            }
            else
            {
                return BadRequest(results.Message);
            }
        }
    }
}