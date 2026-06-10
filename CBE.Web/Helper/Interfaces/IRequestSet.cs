using CBE.Web.Models;

namespace CBE.Web.Helper.Interfaces
{
    public interface IRequestSet
    {
        string BaseUrl { get; set; }
        string AuthUrl { get; set; }
        string Username { get; set; }
        string Password { get; set; }
        bool IsFormUrlEncoded { get; set; }
        string ExecuteAsFormData(string controller, string httpVerb, HttpContent payLoad, string token);
        Task<ResponseViewModel> ExecuteAsJson(string controller, string httpVerb, object? payLoad, string? token);
    }
}
