using CBE.Web.Helper.Interfaces;

namespace UJStandardTemplateVersion1.Help
{
    public class AppSession : IAppSession
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AppSession(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }


        public string? Token
        {
            get {


             if (_httpContextAccessor?.HttpContext != null)
                {
                    var token = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "JWToken");
                    if (token != null)
                    {
                        return token.Value;
                    }
                    else
                    {
                        return string.Empty;
                    }
                }
                else
                    return string.Empty;
            }
        }

        public int? UserId
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetInt32("UserId");
                }
                else
                  return 0;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetInt32("UserId", value ?? 0);
                }
            }
        }

     
        public int? GeneralProjectId
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetInt32("GeneralProjectId");
                }
                else
                    return 0;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetInt32("GeneralProjectId", value ?? 0);
                }
            }
        }
        public string? RoleName
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("RoleName");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("RoleName", value?? string.Empty);
                }
            }
        }


        public string? LastName
    {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("LastName");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("LastName", value ?? string.Empty);
                }
            }
        }

        public string? FirstName
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("FirstName");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("FirstName", value ?? string.Empty);
                }
            }
        }

        public string? TelephoneNumber
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("TelephoneNumber");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("TelephoneNumber", value ?? string.Empty);
                }
            }
        }

        public string? Username
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("Username");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("Username", value ?? string.Empty);
                }
            }
        }
        public string? FullName
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("FullName");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("FullName", value ?? string.Empty);
                }
            }
        }

        public string? CanCreateProjects
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("CanCreateProjects");
                }
                else
                    return "NO";
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("CanCreateProjects", value ?? "NO");
                }
            }
        }

        public string? CanEditProjects
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("CanEditProjects");
                }
                else
                    return "NO";
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("CanEditProjects", value ?? "NO");
                }
            }
        }

        public string? CanAddUser
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("CanAddUser");
                }
                else
                    return "NO";
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("CanAddUser", value ?? "NO");
                }
            }
        }

        public int? DepartmentId
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetInt32("DepartmentId");
                }
                else
                    return 0;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetInt32("DepartmentId", value ?? 0);
                }
            }
        }

        public int? FacultyId
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetInt32("FacultyId");
                }
                else
                    return 0;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetInt32("FacultyId", value ?? 0);
                }
            }
        }

        public string? DepartmentName
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("DepartmentName");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("DepartmentName", value ?? string.Empty);
                }
            }
        }
        public string? FacultyName
        {
            get
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    return _httpContextAccessor.HttpContext.Session.GetString("FacultyName");
                }
                else
                    return string.Empty;
            }
            set
            {
                if (_httpContextAccessor?.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Session.SetString("FacultyName", value ?? string.Empty);
                }
            }
        }
    }
}
