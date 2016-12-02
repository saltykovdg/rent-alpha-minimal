package rent.api.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableJpaRepositories(
        basePackages = "rent.common.repository",
        entityManagerFactoryRef = "rentDBEntityManagerFactory",
        transactionManagerRef = "rentDBTransactionManager")
@EnableTransactionManagement
public class DBConfiguration {
    @Bean
    @ConfigurationProperties(prefix = "datasource.rent")
    @Primary
    public DataSource rentDBDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean rentDBEntityManagerFactory(final EntityManagerFactoryBuilder builder) {
        Map<String, String> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        return builder
                .dataSource(rentDBDataSource())
                .packages("rent.common.entity")
                .persistenceUnit("rentDBPersistenceUnit")
                .properties(properties)
                .build();
    }

    @Bean
    @Primary
    public JpaTransactionManager rentDBTransactionManager(
            @Qualifier("rentDBEntityManagerFactory") final EntityManagerFactory factory) {
        return new JpaTransactionManager(factory);
    }
}
