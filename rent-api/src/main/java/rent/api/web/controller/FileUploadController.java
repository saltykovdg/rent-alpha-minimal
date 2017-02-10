package rent.api.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import rent.api.service.FileUploadService;
import rent.api.utils.Constants;

import java.io.IOException;

@Controller
public class FileUploadController {
    private final Logger log = LoggerFactory.getLogger(FileUploadController.class);

    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @RequestMapping(value = "/file/upload", method = RequestMethod.POST, produces = Constants.PRODUCES_TEXT_HTML_UTF8)
    @ResponseBody
    public HttpStatus uploadFile(@RequestParam(value = Constants.REQUEST_PARAM_FILE) MultipartFile file,
                                 @RequestParam(value = Constants.REQUEST_PARAM_FILENAME) String fileName) {
        if (file.isEmpty()) {
            return HttpStatus.NO_CONTENT;
        }
        try {
            fileUploadService.uploadFile(file, fileName);
            return HttpStatus.OK;
        } catch (IOException e) {
            log.error("Uploading file failed!", e);
            log.error(e.getMessage(), e);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
