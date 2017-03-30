package rent.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import rent.api.utils.Constants;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {
    private final String contentDir;

    @Autowired
    public WebConfig(@Value("${content.dir}") String contentDir) {
        this.contentDir = contentDir;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(Constants.Url.CONTENT + "/**")
                .addResourceLocations("file:" + contentDir + "/");
    }
}
