namespace CBE.Web.Helper
{
    public static class DateFormater
    {
        public static string ToShortDateString(this DateTime date)
        {
            return date.ToString("MM/dd/yyyy");
        }
        //nullable datetime
        public static string ToShortDateString(this DateTime? date)
        {
            if (date == null)
            {
                return null;
            }
            return date.Value.ToShortDateString();
        }
    }
}
