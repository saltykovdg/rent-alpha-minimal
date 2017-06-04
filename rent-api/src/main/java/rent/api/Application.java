package rent.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.handler.MappedInterceptor;
import rent.api.interceptors.LoggingRequestInterceptor;
import rent.api.utils.Constants;
import rent.common.entity.*;
import rent.common.projection.*;

@Configuration
@ComponentScan(basePackages = {"rent.api", "rent.common"})
@EnableJpaRepositories(basePackages = "rent.common.repository")
@EntityScan(basePackages = "rent.common.entity")
@EnableAspectJAutoProxy
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer {
    private static Class<Application> applicationClass = Application.class;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addExposedHeader(Constants.HEADER_CONTENT_FILE_NAME);
        config.addExposedHeader(Constants.HEADER_CONTENT_DISPOSITION);
        config.addExposedHeader(Constants.HEADER_AUTHORIZATION);
        config.addAllowedMethod(HttpMethod.GET);
        config.addAllowedMethod(HttpMethod.POST);
        config.addAllowedMethod(HttpMethod.PATCH);
        config.addAllowedMethod(HttpMethod.PUT);
        config.addAllowedMethod(HttpMethod.DELETE);
        config.addAllowedMethod(HttpMethod.OPTIONS);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public MappedInterceptor loggingMappedInterceptor() {
        return new MappedInterceptor(new String[]{"/**"}, new LoggingRequestInterceptor());
    }

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {
        return new RepositoryRestConfigurerAdapter() {
            @Override
            public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
                config.exposeIdsFor(AccountEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(AccountMinimal.class);
                config.exposeIdsFor(CitizenEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(CitizenMinimal.class);
                config.exposeIdsFor(MeterEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(MeterMinimal.class)
                        .addProjection(MeterMinimalWithoutType.class);
                config.exposeIdsFor(StreetEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(StreetMinimal.class);
                config.exposeIdsFor(BuildingEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(BuildingMinimal.class);
                config.exposeIdsFor(ApartmentEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(ApartmentMinimal.class);
                config.exposeIdsFor(ServiceEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(ServiceMinimal.class);
                config.exposeIdsFor(TariffEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(TariffMinimal.class);
                config.exposeIdsFor(NormEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(NormMinimal.class);
                config.exposeIdsFor(WorkingPeriodEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(WorkingPeriodMinimal.class);
                config.exposeIdsFor(CalculationTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(CalculationTypeMinimal.class);
                config.exposeIdsFor(RecalculationTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(RecalculationTypeMinimal.class);
                config.exposeIdsFor(MeasurementUnitEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(MeasurementUnitMinimal.class);
                config.exposeIdsFor(DocumentTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(DocumentTypeMinimal.class);
                config.exposeIdsFor(GenderTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(GenderTypeMinimal.class);
                config.exposeIdsFor(MeterTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(MeterTypeMinimal.class);
                config.exposeIdsFor(ParameterTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(ParameterTypeMinimal.class);
                config.exposeIdsFor(RegistrationTypeEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(RegistrationTypeMinimal.class);
                config.exposeIdsFor(RoleEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(RoleMinimal.class);
                config.exposeIdsFor(UserEntity.class)
                        .getProjectionConfiguration()
                        .addProjection(UserMinimal.class);
            }
        };
    }
}
