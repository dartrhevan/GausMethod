package com.numericanalysis.numericanalysisbackend.configs;

import com.numericanalysis.numericanalysisbackend.services.CommentService;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@ComponentScan("com.numericanalysis.numericanalysisbackend")
@EnableJpaRepositories("com.numericanalysis.numericanalysisbackend.repositories")
public class DataConfig {

    @Resource
    private Environment env;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://localhost:5432/db3");
        dataSource.setUsername("postgres");
        dataSource.setPassword("android");

        return dataSource;
    }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @Bean
    public CommentService getCommentService() {
        return CommentService.getInstance();
    }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource());
        entityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
        entityManagerFactoryBean.setPackagesToScan("com.numericanalysis.numericanalysisbackend.model");
        entityManagerFactoryBean.setJpaProperties(getHibernateProperties());

        //entityManagerFactoryBean.setPersistenceUnitName("ru.easyjava.spring.data.jpa");
        return entityManagerFactoryBean;
    }

    @Bean
    public JpaTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());

        return transactionManager;
    }

    private Properties getHibernateProperties() {
        Properties properties = new Properties();
        properties.put(PROP_HIBERNATE_DIALECT, "org.hibernate.dialect.PostgreSQLDialect");
        properties.put(PROP_HIBERNATE_SHOW_SQL, "true");
        //properties.put( "spring.jpa.show-sql", "true" );
        properties.put(PROP_HIBERNATE_HBM2DDL_AUTO, "update");
        //properties.put( "spring.jpa.hibernate.ddl-auto", "update" );
        return properties;
    }

    private static final String PROP_HIBERNATE_DIALECT = "hibernate.dialect";
    private static final String PROP_HIBERNATE_SHOW_SQL = "hibernate.show_sql";
    private static final String PROP_HIBERNATE_HBM2DDL_AUTO = "hibernate.hbm2ddl.auto";

}