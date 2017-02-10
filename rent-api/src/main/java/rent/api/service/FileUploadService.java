package rent.api.service;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileUploadService {
    private final Logger log = LoggerFactory.getLogger(FileUploadService.class);
    private final String contentDir;

    @Autowired
    public FileUploadService(@Value("${content.dir}") String contentDir) {
        this.contentDir = contentDir;
        log.info("Content directory is: {}", contentDir);
    }

    public void uploadFile(MultipartFile file, String fileName) throws IOException {
        File contentDirFile = new File(contentDir);
        FileUtils.forceMkdir(contentDirFile);
        String originalFilename = file.getOriginalFilename();
        if (FilenameUtils.getExtension(fileName).isEmpty()) {
            fileName += "." + FilenameUtils.getExtension(originalFilename);
        }
        file.transferTo(contentDirFile);
        log.info(fileName + " successfully uploaded.");
    }
}
