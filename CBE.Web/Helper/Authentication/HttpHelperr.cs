using System.Net.Http.Headers;

namespace CBE.Web.Helper.Authentication
{
    public static class HttpHelperr
    {
        public static HttpClient HttpClient(string? token)
        {
            var authValue = new AuthenticationHeaderValue("Bearer", token);

            var client = new HttpClient()
            {
                DefaultRequestHeaders = { Authorization = authValue }
            };
            return client;
        }
    }

    public static class HttpVerb
    {
        public const string Get = "Get";
        public const string Post = "Post";
        public const string Delete = "Delete";
        public const string Put = "Put";
    }
}
