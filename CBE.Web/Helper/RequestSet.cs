using CBE.Web.Helper.Authentication;
using CBE.Web.Helper.Interfaces;
using CBE.Web.Models;

namespace CBE.Web.Helper
{
    public class RequestSet : IRequestSet
    {
        public string BaseUrl { get; set; } = null!;
        public string AuthUrl { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public bool IsFormUrlEncoded { get; set; }

        public string ExecuteAsFormData(string controller, string httpVerb, HttpContent payLoad, string token)
        {
            try
            {

                using var client = HttpHelperr.HttpClient(token);
                HttpResponseMessage? response = null;
                switch (httpVerb)
                {
                    case HttpVerb.Post:
                        response = client.PostAsync(BaseUrl + controller, payLoad).Result;
                        break;
                    case HttpVerb.Put:
                        response = client.PutAsync(BaseUrl + controller, payLoad).Result;
                        break;
                    case HttpVerb.Get:
                        response = client.GetAsync(BaseUrl + controller).Result;
                        break;
                    case HttpVerb.Delete:
                        response = client.DeleteAsync(BaseUrl + controller).Result;
                        break;
                }
                if (response != null)
                {
                    var resp = response?.Content.ReadAsStringAsync();
                    if (resp != null)
                        return resp.Result;
                }
                return string.Empty;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public async Task<ResponseViewModel> ExecuteAsJson(string controller, string httpVerb, object? payLoad, string? token)
        {
            try
            {

                using var client = HttpHelperr.HttpClient(token);
                HttpResponseMessage? response = null;

                switch (httpVerb)
                {
                    case HttpVerb.Post:
                        response = await client.PostAsJsonAsync(BaseUrl + controller, payLoad);
                        break;
                    case HttpVerb.Put:
                        response = await client.PutAsJsonAsync(BaseUrl + controller, payLoad);
                        break;
                    case HttpVerb.Get:
                        response = await client.GetAsync(BaseUrl + controller);
                        break;
                    case HttpVerb.Delete:
                        response = await client.DeleteAsync(BaseUrl + controller);
                        break;
                }

                if (response != null)
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var resp = response?.Content.ReadAsStringAsync();
                        if (resp != null)
                        {
                            return new ResponseViewModel { Message = resp.Result, IsSuccessfull = true };
                        }
                    }
                    else
                    {
                        var resp = response?.Content.ReadAsStringAsync();
                        if (resp != null)
                        {
                            return new ResponseViewModel { Message = resp.Result, IsSuccessfull = false };
                        }
                    }
                }


                return new ResponseViewModel { Message = string.Empty, IsSuccessfull = false };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
