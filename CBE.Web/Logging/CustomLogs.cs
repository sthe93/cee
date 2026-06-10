using CBE.Web.Helper;

namespace CBE.Web.Logging
{
    public class CustomLogs
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<CustomLogs> _logger;
        private readonly TraceItLogger _traceItLogger;

        public CustomLogs(RequestDelegate next, ILogger<CustomLogs> logger, TraceItLogger traceItLogger)
        {
            _next = next;
            _logger = logger;
            _traceItLogger = traceItLogger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled Exception");

                await _traceItLogger.LogAsync
                (
                    level: (int)AuditLogLevel.Information,
                    message: "Unhandled Exception On CBE WEB",
                    exception: ex.ToString(),
                    source: "UJCBE WEB",
                    method: context.Request.Path,
                    username: context.User?.Identity?.Name ?? "UJCBE WEB"
                );

                context.Response.StatusCode = 500;
            }
        }
    }
}





