using CBE.Web.Logging;

namespace CBE.Web.Helper
{
    public class TraceItLogger
    {
        private static readonly HttpClient _client = new HttpClient();
        private readonly IConfiguration _config;
        private string _token;

        public TraceItLogger(IConfiguration config)
        {
            _config = config;
        }

        public async Task LogAsync(string message, AuditLogLevel level, string exception, string source, string method, string username)
        {

            var url = _config["TraceIt:BaseUrl"];

            if (string.IsNullOrWhiteSpace(_token))
            {
                _token = await GetTokenAsync();
            }

            var payload = new
            {
                Level = (int)level,
                Message = message ?? "No message",
                Exception = exception ?? "No exception",
                Source = source ?? "UJCE WEB",
                Method = method ?? "Unknown",
                UserName = username ?? "UJCE WEB"
            };


            try
            {
                var request = new HttpRequestMessage(HttpMethod.Post, url);
                request.Content = JsonContent.Create(payload);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);

                var response = await _client.SendAsync(request);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                throw new System.Exception("Failed to log error on Traceit " + ex.Message);
            }
        }


        private async Task<string> GetTokenAsync()
        {
            var loginUrl = _config["TraceIt:AuthUrl"];

            var username = Environment.GetEnvironmentVariable(_config["TraceIt:Username"], EnvironmentVariableTarget.Machine);
            var password = Environment.GetEnvironmentVariable(_config["TraceIt:Password"], EnvironmentVariableTarget.Machine);

            if (string.IsNullOrWhiteSpace(username))
                throw new InvalidOperationException($"Environment variable '{username}' is not set properly.");

            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidOperationException($"Environment variable '{password}' is not set properly");

            var loginPayload = new
            {
                Username = username,
                Password = password
            };

            var response = await _client.PostAsJsonAsync(loginUrl, loginPayload);
            if (!response.IsSuccessStatusCode)
                throw new Exception("Failed to authenticate to TraceIt API");

            var result = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();
            return result?["token"] ?? throw new Exception("Token not found in response");
        }
    }
}