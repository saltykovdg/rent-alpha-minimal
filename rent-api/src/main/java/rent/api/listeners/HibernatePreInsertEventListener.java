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
public class HibernatePreInsertEventListener implements PreInsertEventListener {
    private final EntityManagerFactory entityManagerFactory;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public HibernatePreInsertEventListener(EntityManagerFactory entityManagerFactory,
                                           PasswordEncoder passwordEncoder) {
        this.entityManagerFactory = entityManagerFactory;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    private void init() {
        HibernateEntityManagerFactory hibernateEntityManagerFactory = (HibernateEntityManagerFactory) entityManagerFactory;
        SessionFactoryImpl sessionFactoryImpl = (SessionFactoryImpl) hibernateEntityManagerFactory.getSessionFactory();
        EventListenerRegistry registry = sessionFactoryImpl.getServiceRegistry().getService(EventListenerRegistry.class);
        registry.appendListeners(EventType.PRE_INSERT, this);
    }

    @Override
    public boolean onPreInsert(PreInsertEvent event) {
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
            String password = (String) event.getState()[propertyPasswordIndex];
            event.getState()[propertyPasswordIndex] = passwordEncoder.encode(password);
        }
        return false;
    }
}
