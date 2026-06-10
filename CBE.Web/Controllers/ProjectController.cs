using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace CBE.Web.Controllers
{
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly IRequestSet _requestSet;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _config;


        public ProjectController(IRequestSet requestSet, IAppSession appSession, IConfiguration config, IWebHostEnvironment env)
        {
            _requestSet = requestSet;
            _appSession = appSession;
            _config = config;
            _requestSet.BaseUrl = _config.GetSection("ApiURL").Value;
        }

        public IActionResult CreateProject()
        {
            _appSession.GeneralProjectId = null;
            _appSession.CanEditProjects = "YES";

            return View("GeneralProject");
        }
        public IActionResult EditProject()
        {
            return View("GeneralProject");
        }

       
        public async Task<ActionResult> GetGeneralProject()
        {

            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/general/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);

            return Redirect<ReadGeneralProjectModel>(results);
        }

        private ActionResult Redirect<T>(ResponseViewModel results)
        {
            if (results.IsSuccessfull)
            {
                if (typeof(T).Equals(typeof(ReadGeneralProjectModel)))
                {
                    var model = JsonConvert.DeserializeObject<T>(results.Message);
                    if (model != null)
                    {
                        ReadGeneralProjectModel _model = (ReadGeneralProjectModel)Convert.ChangeType(model, typeof(ReadGeneralProjectModel));

                        _model.ProjectLogoBase64 = $"data:{_model.ProjectLogoExtension};base64,{Convert.ToBase64String(_model.ProjectLogo)}";
                        return Ok(_model);
                    }
                }

                return Ok(results.Message);
            }
            else
            {
                return BadRequest(results.Message);
            }
        }


        private ActionResult RedirectUpdate<T>(ResponseViewModel results)
        {
            if (results.IsSuccessfull)
            {
                if (typeof(T).Equals(typeof(CreateGeneralProjectModel)))
                    _appSession.GeneralProjectId = int.Parse(results.Message);

                return Ok(new { Message = "Updated successfully" });
            }
            else
            {
                return BadRequest(results.Message);
            }
        }

        public async Task<ActionResult> GetProjectContact()
        {

            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/contact/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);

            return Redirect<int>(results);
        }


        public async Task<ActionResult> GetPartnership()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/partnership/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);
            return Redirect<int>(results);
        }


        public async Task<ActionResult> Isflagshipexist(int facultyId)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");


            var results = await _requestSet.ExecuteAsJson("project/general/isflagshipexist/0/facultyId/" + facultyId, HttpVerb.Get, null, _appSession.Token);
            return Redirect<int>(results);
        }


        public async Task<ActionResult> GetProjectOverview()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/overview/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);

            return Redirect<int>(results);
        }


        public async Task<ActionResult> GetProjectImplementation()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/implementation/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);

            return Redirect<int>(results);
        }


        public async Task<ActionResult> GetProjectSustainability()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/sustainability/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);

            return Redirect<int>(results);
        }

        public async Task<ActionResult> GetGallery()
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId == null)
                return BadRequest("Project is required");

            var results = await _requestSet.ExecuteAsJson("project/gallery/" + _appSession.GeneralProjectId, HttpVerb.Get, null, _appSession.Token);

            return Redirect<int>(results);
        }


        [HttpPost()]
        [Route("project/GeneralProject")]
        public async Task<ActionResult> GeneralProject(CreateGeneralProjectModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            ResponseViewModel results;
            string isValid;

            model = GetFileInfo(model, out isValid);

            if (isValid != string.Empty)
                return BadRequest(isValid);

            if (_appSession.GeneralProjectId == null || _appSession.GeneralProjectId == 0)
                results = await _requestSet.ExecuteAsJson("project/general/create", HttpVerb.Post, model, _appSession.Token);

            else
            {
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;
                results = await _requestSet.ExecuteAsJson("project/general/update", HttpVerb.Post, model, _appSession.Token);
            }

            return RedirectUpdate<CreateGeneralProjectModel>(results);
        }


        [HttpPost()]
        [Route("project/createpartnership")]
        public async Task<ActionResult> CreatePartnership(CreatePartnershipModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId != null)
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;

            ResponseViewModel results;

            if (model.PartnershipId == 0)
                results = await _requestSet.ExecuteAsJson("project/partnership/create", HttpVerb.Post, model, _appSession.Token);
            else
                results = await _requestSet.ExecuteAsJson("project/partnership/update", HttpVerb.Post, model, _appSession.Token);

            return RedirectUpdate<int>(results);
        }


        [HttpPost()]
        [Route("project/createProjectContact")]
        public async Task<ActionResult> CreateProjectContact(CreateProjectContactInformationModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId != null)
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;

            ResponseViewModel results;

            if (model.ProjectContactInformationId == 0)
                results = await _requestSet.ExecuteAsJson("project/contact/create", HttpVerb.Post, model, _appSession.Token);
            else
                results = await _requestSet.ExecuteAsJson("project/contact/update", HttpVerb.Post, model, _appSession.Token);

            return RedirectUpdate<int>(results);
        }




        [HttpPost()]
        [Route("project/createoverview")]
        public async Task<ActionResult> CreateOverview(CreateProjectOverviewModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId != null)
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;

            model.TargetGroupId = model.TargetGroupId[0].Split(',').ToArray();

            string isValid;

            model = GetFileInfoProjectOverview(model, out isValid);

            if (isValid != string.Empty)
                return BadRequest(isValid);


            ResponseViewModel results;

            if (model.ProjectOverviewId == 0)
                results = await _requestSet.ExecuteAsJson("project/overview/create", HttpVerb.Post, model, _appSession.Token);
            else
                results = await _requestSet.ExecuteAsJson("project/overview/update", HttpVerb.Post, model, _appSession.Token);

            return RedirectUpdate<int>(results);
        }



        [HttpPost()]
        [Route("project/implementation")]
        public async Task<ActionResult> CreateProjectImplementation(CreateProjectImplementationModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId != null)
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;

            ResponseViewModel results;

            if (model.ProjectImplementationId == 0)
                results = await _requestSet.ExecuteAsJson("project/implementation/create", HttpVerb.Post, model, _appSession.Token);
            else
                results = await _requestSet.ExecuteAsJson("project/implementation/update", HttpVerb.Post, model, _appSession.Token);

            return RedirectUpdate<int>(results);
        }



        [HttpPost()]
        [Route("project/sustainability")]
        public async Task<ActionResult> CreateSustainability(CreateProjectSustainabilityModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId != null)
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;

            model.ProvincesIds = model.ProvincesList.Split(',')
                               .Select(int.Parse)
                               .ToList();

            model.BeneficiaryOrganizations = JsonConvert.DeserializeObject<List<BeneficiaryOrganization>>(model.BeneficiaryOrganizationsSerialized);

            ResponseViewModel results;

            if (model.ProjectSustainabilityId == 0)
                results = await _requestSet.ExecuteAsJson("project/sustainability/create", HttpVerb.Post, model, _appSession.Token);
            else
                results = await _requestSet.ExecuteAsJson("project/sustainability/update", HttpVerb.Post, model, _appSession.Token);


            return RedirectUpdate<int>(results);
        }

        private CreateGeneralProjectModel GetFileInfo(CreateGeneralProjectModel model, out string isValid)
        {
            isValid = string.Empty;
            if (model.files != null)
            {

                using (var memoryStreamThree = new MemoryStream())
                {
                    if (model.files[0].FileName != null)
                    {
                        model.ProjectLogoFileName = model.files[0].FileName;
                        model.files[0].CopyTo(memoryStreamThree);
                        // Upload the file if less than 2 MB
                        if (memoryStreamThree.Length < 5242880 && memoryStreamThree.Length != 0)
                        {
                            model.ProjectLogo = memoryStreamThree.ToArray();
                            model.ProjectLogoExtension = model.files[0].ContentType.ToString();
                        }
                        else
                        {
                            isValid = "File, The file is too large.";
                        }
                    }
                }
            }

            return model;

        }

        private CreateProjectOverviewModel GetFileInfoProjectOverview(CreateProjectOverviewModel model, out string isValid)
        {
            isValid = string.Empty;
            if (model.files != null)
            {

                using (var memoryStreamThree = new MemoryStream())
                {
                    if (model.files[0].FileName != null)
                    {
                        model.AdditionalFileName = model.files[0].FileName;
                        model.files[0].CopyTo(memoryStreamThree);
                        // Upload the file if less than 5 MB
                        if (memoryStreamThree.Length < 5242880 && memoryStreamThree.Length != 0)
                        {
                            model.AdditionalFile = memoryStreamThree.ToArray();
                            model.AdditionalFileExtension = model.files[0].ContentType.ToString();
                        }
                        else
                        {
                            isValid = "Additional Information: File too large, Maximum of 5MB file is allowed.";
                        }
                    }
                }
            }
            return model;
        }


        public IActionResult Privacy()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        [HttpPost]
        [Route("project/UploadGalleryImages")]
        public async Task<ActionResult> UploadGalleryImages(string GalleryImages)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (GalleryImages == null)
                return BadRequest("Select Images to upload.");

            List<GalleryImage> galleryImages = JsonConvert.DeserializeObject<List<GalleryImage>>(GalleryImages);
            if (galleryImages != null)
            {
                foreach (GalleryImage galleryImage in galleryImages)
                {
                    if (_appSession.GeneralProjectId != null)
                        galleryImage.GeneralProjectId = _appSession.GeneralProjectId.Value;
                }
            }
            UploadImagesModel model = new UploadImagesModel();

            if (galleryImages != null)
                model.GalleryImages = galleryImages;

            ResponseViewModel results = new ResponseViewModel();
            results = await _requestSet.ExecuteAsJson("project/gallery/upload", HttpVerb.Post, model, _appSession.Token);
            return RedirectUpdate<bool>(results);
        }


        [HttpPost]
        [Route("project/DeleteGalleryImage")]
        public async Task<ActionResult> DeleteGalleryImage(DeleteImageModel model)
        {
            if (string.IsNullOrEmpty(_appSession.Username))
                return RedirectToAction("Index", "Account");

            if (_appSession.GeneralProjectId != null)
                model.GeneralProjectId = _appSession.GeneralProjectId.Value;

            ResponseViewModel results = new ResponseViewModel();
            results = await _requestSet.ExecuteAsJson("project/gallery/delete", HttpVerb.Post, model, _appSession.Token);
            return RedirectUpdate<bool>(results);
        }
    }
}