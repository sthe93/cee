using CBE.Web.Helper;
using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace CBE.Web.Controllers
{
    [Authorize]
    public class UserController : Controller
    {

        private readonly IRequestSet _requestSet;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _config;

        public UserController(IRequestSet requestSet, IAppSession appSession, IConfiguration config)
        {
            _requestSet = requestSet;
            _appSession = appSession;
            _config = config;
            _requestSet.BaseUrl = _config.GetSection("ApiURL").Value;
        }

        public IActionResult Index()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Login", "Account");

            var users = GetUsers();

            return View(users);
        }

        public List<UserModel?> GetUsers()
        {
            var users = new List<UserModel?>();
            var results = _requestSet.ExecuteAsJson("Users", HttpVerb.Get, null, _appSession.Token).Result;

            if (results.IsSuccessfull)
            {
                users = JsonConvert.DeserializeObject<List<UserModel?>>(results.Message);


                if (CbeRoles.PROJECTCOORDINATOR == _appSession.RoleName && users != null)
                {
                    return users.Where(o => o.Createdby == _appSession.Username || o.Modifiedby == _appSession.Username).ToList();
                }
                else
                {
                    if (users != null)
                        return users;

                    return new List<UserModel?>();
                }
            }
            else
            {
                return users;
            }
        }



        [HttpGet]
        [Route("User/getUserById/{userId}")]
        public ActionResult GetUserById(int userId)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            var results = _requestSet.ExecuteAsJson("user/" + userId, HttpVerb.Get, null, _appSession.Token).Result;

            return Redirect(results);
        }

        [Route("User/update")]
        [ValidateAntiForgeryToken]
        public ActionResult Update(UpdateUserModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            model.IsActive = true;

            var results = _requestSet.ExecuteAsJson("users/Update", HttpVerb.Post, model, _appSession.Token).Result;

            return RedirectUpdate(results);
        }


        [Route("User/activedeactivate")]
        [ValidateAntiForgeryToken]
        public ActionResult ActiveDeActivate(ActiveDeactivateViewModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            var results = _requestSet.ExecuteAsJson("users/activedeactivate", HttpVerb.Post, model, _appSession.Token).Result;

            return RedirectUpdate(results);
        }

        public ActionResult Add(CreateUserModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            var results = _requestSet.ExecuteAsJson("users/create", HttpVerb.Post, model, _appSession.Token).Result;

            return RedirectUpdate(results);
        }

        [HttpPost]
        public IActionResult GetUserDetails(string username)
        {
            try
            {

                if (string.IsNullOrEmpty(_appSession.Username))
                    return RedirectToAction("Login", "Account");

                var results = _requestSet.ExecuteAsJson("users/verify/" + username, HttpVerb.Get, null, _appSession.Token).Result;

                return Redirect(results);
            }
            catch (Exception msg)
            {
                ViewBag.Message = msg.Message.ToString();
                return View(ViewBag.Message);
            }

        }

        private ActionResult RedirectUpdate(ResponseViewModel results)
        {
            if (results.IsSuccessfull)
            {
                return Ok(new { Message = "Updated successfully" });
            }
            else
            {
                return BadRequest(results.Message);
            }
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

        [HttpGet]
        [Route("User/GetStudent/{studentNumber}")]
        public async Task<IActionResult> GetStudent(string studentNumber)
        {
            try
            {
                if (string.IsNullOrEmpty(_appSession.Username))
                    return Unauthorized();

                var results = await _requestSet.ExecuteAsJson($"users/student/{studentNumber}", HttpVerb.Get, null, _appSession.Token);

                if (results.IsSuccessfull)
                {
                    // Debug the raw message
                    Console.WriteLine($"Raw API response: {results.Message}");

                    // Handle empty array case
                    if (results.Message.Contains("\"name\":[]") || results.Message.Contains("\"cellNumber\":[]"))
                    {
                        return NotFound(new { error = "Student record exists but has no data" });
                    }

                    return Ok(results.Message);
                }
                else
                {
                    return NotFound(new { error = results.Message ?? "Student not found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }


        [HttpGet]
        [Route("User/GetStaffDetails/{username}")]
        public async Task<IActionResult> GetStaff(string username)
        {
            try
            {
                if (string.IsNullOrEmpty(_appSession.Username))
                    return Unauthorized();

                var results = await _requestSet.ExecuteAsJson($"users/staff/{username}", HttpVerb.Get, null, _appSession.Token);
                Log.Error("========= RETURNED RESPONSE FROM API CONTROLLER ON WEB: ==== {@Results} ===== || ==== {@Time} =========", results, DateTime.Now);


                if (results.IsSuccessfull)
                {
                    // Debug the raw message
                    Console.WriteLine($"Raw API response: {results.Message}");

                    // Handle empty array case
                    if (results.Message.Contains("\"fullName\":[]") || results.Message.Contains("\"cellPhoneNumber\":[]"))
                    {
                        return NotFound(new { error = "Staff record exists but has no data" });
                    }
                    Log.Error("========= RETURNED RESPONSE FROM API CONTROLLER ON WEB: ==== {@Results} ===== || ==== {@Time} =========", results, DateTime.Now);
                    return Ok(results.Message);
                }
                else
                {
                    return NotFound(new { error = results.Message ?? "Staff not found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

}
