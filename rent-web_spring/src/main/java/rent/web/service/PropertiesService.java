package rent.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import rent.web.dto.PropertiesDto;

@Service
public class PropertiesService {
    public static final class Properties {
        public static final String RENT_API_SERVER_URL = "rent.api.server.url";
    }

    @Autowired
    private Environment env;

    public PropertiesDto getProperties() {
        PropertiesDto propertiesDto = new PropertiesDto();
        propertiesDto.setRentApiServerUrl(env.getProperty(Properties.RENT_API_SERVER_URL));
        return propertiesDto;
    }
}
