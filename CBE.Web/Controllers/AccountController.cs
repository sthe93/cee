using CBE.Web.Helper;
using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UJStandardTemplateVersion1.Help;

namespace CBE.Web.Controllers
{
    public class AccountController : Controller
    {

        private readonly IRequestSet _requestSet;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _config;

        public AccountController(IRequestSet requestSet, IAppSession appSession, IConfiguration config)
        {
            _requestSet = requestSet;
            _appSession = appSession;
            _config = config;
            _requestSet.BaseUrl = _config.GetSection("ApiURL").Value;
        }
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "Account");
        }
        public IActionResult Login()
        {
            return View();
        }



        [HttpPost()]
        [ValidateAntiForgeryToken]
        public IActionResult Login(LoginModel model)
        {
            try
            {


                if (string.IsNullOrEmpty(model.Username))
                {
                    ViewBag.Error = "Please enter userrname";
                    return View(model);
                }


                if (string.IsNullOrEmpty(model.Password))
                {
                    ViewBag.Error = "Please enter password";
                    return View(model);
                }

                var res = _requestSet.ExecuteAsJson("users/login", HttpVerb.Post, model, "").Result;

                if (res.IsSuccessfull)
                    JwtSignIn(res.Message);
                else
                {
                    ViewBag.Error = "Invalid Credentials!";
                    return View(model);
                }

                return RedirectToAction("dashboard", "dashboard");
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void JwtSignIn(string token)
        {
            var jwtToken = new JwtSecurityToken(token);
            var claims = jwtToken.Claims;



            _appSession.RoleName = claims.FirstOrDefault(c => c.Type == "Roles")?.Value;
            _appSession.Username = claims.FirstOrDefault(c => c.Type == "Username")?.Value;
            var userId = claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

            _appSession.LastName = claims.FirstOrDefault(c => c.Type == "LastName")?.Value;
            _appSession.TelephoneNumber = claims.FirstOrDefault(c => c.Type == "TelephoneNumber")?.Value;
            _appSession.FirstName = claims.FirstOrDefault(c => c.Type == "FirstName")?.Value;

            var FacultyId = claims.FirstOrDefault(c => c.Type == "FacultyId")?.Value;
            var DepartmentId = claims.FirstOrDefault(c => c.Type == "DepartmentId")?.Value;
            _appSession.FacultyName = claims.FirstOrDefault(c => c.Type == "FacultyName")?.Value;
            _appSession.DepartmentName = claims.FirstOrDefault(c => c.Type == "DepartmentName")?.Value;

            if (!string.IsNullOrEmpty(FacultyId))
                _appSession.FacultyId = int.Parse(FacultyId);

            if (!string.IsNullOrEmpty(DepartmentId))
                _appSession.DepartmentId = int.Parse(DepartmentId);

            if (userId != null)
                _appSession.UserId = int.Parse(userId);

            _appSession.FullName = claims.FirstOrDefault(c => c.Type == "FullName")?.Value;


            switch (_appSession.RoleName)
            {
                case CbeRoles.SUPERADMINISTRATOR:
                case CbeRoles.PROJECTCOORDINATOR:
                    _appSession.CanCreateProjects = "YES";
                    _appSession.CanAddUser = "YES";
                    break;

                default:
                    _appSession.CanCreateProjects = "NO";
                    _appSession.CanAddUser = "NO";
                    break;
            }


            var Jwtoken = new[] { new Claim("JWToken", token) };
            var claimList = Jwtoken.ToList();
            claimList.AddRange(claims.ToList());

            var identity = new ClaimsIdentity(claimList, CookieAuthenticationDefaults.AuthenticationScheme);

            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

        }
    }
}
