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
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final String contentDir;

    @Autowired
    public FileUploadService(@Value("${app.content.dir}") String contentDir) {
        this.contentDir = contentDir;
        log.info("Content directory is: {}", contentDir);
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString();
        File contentDirFile = new File(contentDir);
        FileUtils.forceMkdir(contentDirFile);
        String originalFilename = file.getOriginalFilename();
        if (FilenameUtils.getExtension(fileName).isEmpty()) {
            fileName += "." + FilenameUtils.getExtension(originalFilename);
        }

        File destFile = new File(contentDir + "/" + fileName);
        if (destFile.createNewFile()) {
            FileOutputStream fileOutputStream = new FileOutputStream(destFile);
            fileOutputStream.write(file.getBytes());
            fileOutputStream.close();
        }

        log.info(fileName + " successfully uploaded.");
        return fileName;
    }
}
