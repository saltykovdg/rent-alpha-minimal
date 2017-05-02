package rent.api.listeners;

import org.hibernate.event.service.spi.EventListenerRegistry;
import org.hibernate.event.spi.EventType;
import org.hibernate.event.spi.PreDeleteEvent;
import org.hibernate.event.spi.PreDeleteEventListener;
import org.hibernate.internal.SessionFactoryImpl;
import org.hibernate.jpa.HibernateEntityManagerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import rent.api.service.CalculationService;
import rent.common.entity.AccountServiceEntity;
import rent.common.entity.CitizenDocumentAttachmentEntity;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManagerFactory;
import java.io.File;

@Component
public class HibernatePreDeleteEventListener implements PreDeleteEventListener {
    private final Logger log = LoggerFactory.getLogger(HibernatePreDeleteEventListener.class);

    private final String appContentDir;
    private final EntityManagerFactory entityManagerFactory;
    private final CalculationService calculationService;

    @Autowired
    public HibernatePreDeleteEventListener(@Value("${app.content.dir}") String appContentDir,
                                           EntityManagerFactory entityManagerFactory,
                                           CalculationService calculationService) {
        this.appContentDir = appContentDir;
        this.entityManagerFactory = entityManagerFactory;
        this.calculationService = calculationService;
    }

    @PostConstruct
    private void init() {
        HibernateEntityManagerFactory hibernateEntityManagerFactory = (HibernateEntityManagerFactory) entityManagerFactory;
        SessionFactoryImpl sessionFactoryImpl = (SessionFactoryImpl) hibernateEntityManagerFactory.getSessionFactory();
        EventListenerRegistry registry = sessionFactoryImpl.getServiceRegistry().getService(EventListenerRegistry.class);
        registry.appendListeners(EventType.PRE_DELETE, this);
    }

    @Override
    public boolean onPreDelete(PreDeleteEvent preDeleteEvent) {
        Object entity = preDeleteEvent.getEntity();
        if (entity instanceof CitizenDocumentAttachmentEntity) {
            CitizenDocumentAttachmentEntity attachment = (CitizenDocumentAttachmentEntity) entity;
            File file = new File(appContentDir + "/" + attachment.getUrlLink());
            if (file.delete()) {
                log.info(attachment.getUrlLink() + " successfully removed.");
            }
        } else if (entity instanceof AccountServiceEntity) {
            AccountServiceEntity accountService = (AccountServiceEntity) entity;
            calculationService.deleteCalculationsByAccountServiceId(accountService.getId());
        }
        return false;
    }
}
