package rent.common.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {
    public static Date setMinTime(Date date) {
        return org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.DAY_OF_MONTH);
    }

    public static Date setMaxTime(Date date) {
        if (date != null) {
            date = org.apache.commons.lang3.time.DateUtils.truncate(date, Calendar.DAY_OF_MONTH);
            date = org.apache.commons.lang3.time.DateUtils.addDays(date, 1);
            date = org.apache.commons.lang3.time.DateUtils.addMilliseconds(date, -1);
        }
        return date;
    }
}
