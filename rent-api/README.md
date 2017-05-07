# Usage

```
mvn clean package
mvn spring-boot:run
```

### Tomcat enable compression

Add attributes to connector in server.xml:
- compression="on"
- compressableMimeType="application/json"

Example:
```
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           compression="on"
           compressableMimeType="application/json"/>
```

### Tomcat set default location for error page

Add error page location in web.xml.

Example:
```
<web-app>
    <error-page>
        <location>/</location>
    </error-page>
</web-app>
```
