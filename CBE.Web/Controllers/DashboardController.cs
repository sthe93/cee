using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UJStandardTemplateVersion1.Help;

namespace CBE.Web.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IRequestSet _requestSet;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _config;

        public DashboardController(IRequestSet requestSet, IAppSession appSession, IConfiguration config, IWebHostEnvironment env)
        {
            _requestSet = requestSet;
            _appSession = appSession;
            _config = config;
            _requestSet.BaseUrl = _config.GetSection("ApiURL").Value;
        }

        public IActionResult SetGeneralProject(int GeneralProjectId, string CanEditProjects)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            _appSession.GeneralProjectId = GeneralProjectId;
            _appSession.CanEditProjects = CanEditProjects;

            return Ok();
        }

        public ActionResult Dashboard()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> Dashboard(DashboardFilterModel modelFilter)
        {

            var results = await _requestSet.ExecuteAsJson("project/general/all", HttpVerb.Get, modelFilter, _appSession.Token);

            if (results.IsSuccessfull)
            {
                var model = JsonConvert.DeserializeObject<List<GeneralProjectDashboard>>(results.Message);

                if (model != null)
                {
                    if (modelFilter.CallingDashboard == 1)
                        model = model.Where(o => o.UserId == _appSession.UserId).ToList();
                    else if (modelFilter.CallingDashboard == 2)
                    {
                        if (_appSession.DepartmentId != null && _appSession.FacultyId != null)
                            model = model.Where(o => o.DepartmentId == _appSession.DepartmentId && o.FacultyId == _appSession.FacultyId).ToList();
                        else
                            model = new List<GeneralProjectDashboard>();
                    }

                    if (modelFilter.SDG != 0)
                        model = model.Where(o => o.SustainableDevelopmentGoalId == modelFilter.SDG).ToList();

                    if (!string.IsNullOrEmpty(modelFilter.ProjectOwner))
                        model = model.Where(o => o.Username.Contains(modelFilter.ProjectOwner)).ToList();

                    if (!string.IsNullOrEmpty(modelFilter.ReferenceNumber))
                        model = model.Where(o => o.ProjectReference.Contains(modelFilter.ReferenceNumber)).ToList();

                    if (!string.IsNullOrEmpty(modelFilter.ProjectName))
                        model = model.Where(o => o.Title.Contains(modelFilter.ProjectName)).ToList();

                    if (!string.IsNullOrEmpty(modelFilter.FacultyDivision))
                        model = model.Where( o => o.FacultyId == int.Parse(modelFilter.FacultyDivision)).ToList();
                }
                return Ok(JsonConvert.SerializeObject(model));
            }
            return BadRequest(results.Message);
        }
    }
}