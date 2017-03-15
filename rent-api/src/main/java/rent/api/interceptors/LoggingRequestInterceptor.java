package rent.api.interceptors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoggingRequestInterceptor implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(LoggingRequestInterceptor.class);
    private static final String BROWSER_URL_PART = "/browser/";
    private static final String ERROR_URL_PART = "/error";

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        String queryString = httpServletRequest.getQueryString();
        String url = httpServletRequest.getRequestURL().toString();
        if (!url.contains(BROWSER_URL_PART) && !url.contains(ERROR_URL_PART)) {
            log.info("Request [{}]: {}", getIpAddress(httpServletRequest), url + (queryString != null && !queryString.isEmpty() ? "?" + queryString : ""));
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        String url = httpServletRequest.getRequestURL().toString();
        if (!url.contains(BROWSER_URL_PART) && !url.contains(ERROR_URL_PART)) {
            log.info("Response status [{}]: {}", getIpAddress(httpServletRequest), httpServletResponse.getStatus());
        }
    }

    private String getIpAddress(HttpServletRequest httpServletRequest) {
        String ipAddress = httpServletRequest.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = httpServletRequest.getRemoteAddr();
        }
        return ipAddress;
    }
}
