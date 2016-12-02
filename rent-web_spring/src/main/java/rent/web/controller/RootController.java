package rent.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import rent.web.dto.PropertiesDto;
import rent.web.service.PropertiesService;

@Controller
public class RootController {
    @Autowired
    private PropertiesService propertiesService;

    @RequestMapping("/")
    public String showRoot() {
        return "index.html";
    }

    @ResponseBody
    @RequestMapping(value = "/properties", produces = {MediaType.APPLICATION_JSON_VALUE}, method = RequestMethod.POST)
    public PropertiesDto getProperties() {
        return propertiesService.getProperties();
    }
}
