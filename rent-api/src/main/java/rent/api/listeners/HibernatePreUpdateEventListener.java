package rent.api.listeners;

import org.hibernate.event.service.spi.EventListenerRegistry;
import org.hibernate.event.spi.*;
import org.hibernate.internal.SessionFactoryImpl;
import org.hibernate.jpa.HibernateEntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import rent.common.entity.UserEntity;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManagerFactory;

@Component
public class HibernatePreUpdateEventListener implements PreUpdateEventListener {
    private final EntityManagerFactory entityManagerFactory;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public HibernatePreUpdateEventListener(EntityManagerFactory entityManagerFactory,
                                           PasswordEncoder passwordEncoder) {
        this.entityManagerFactory = entityManagerFactory;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    private void init() {
        HibernateEntityManagerFactory hibernateEntityManagerFactory = (HibernateEntityManagerFactory) entityManagerFactory;
        SessionFactoryImpl sessionFactoryImpl = (SessionFactoryImpl) hibernateEntityManagerFactory.getSessionFactory();
        EventListenerRegistry registry = sessionFactoryImpl.getServiceRegistry().getService(EventListenerRegistry.class);
        registry.appendListeners(EventType.PRE_UPDATE, this);
    }

    @Override
    public boolean onPreUpdate(PreUpdateEvent event) {
        Object entity = event.getEntity();
        if (entity instanceof UserEntity) {
            String[] propertyNames = event.getPersister().getEntityMetamodel().getPropertyNames();
            Integer propertyPasswordIndex = 0;
            for (String property : propertyNames) {
                if (property.equals("password")) {
                    break;
                }
                propertyPasswordIndex++;
            }
            String newPassword = (String) event.getState()[propertyPasswordIndex];
            String oldPassword = (String) event.getOldState()[propertyPasswordIndex];
            if (!oldPassword.equals(newPassword)) {
                event.getState()[propertyPasswordIndex] = passwordEncoder.encode(newPassword);
            }
        }
        return false;
    }
}
