window.SPRING_BOOT_STUDY_DATA = {
  "sections": [
    {
      "id": "foundations",
      "title": "Foundations",
      "description": "Spring Boot project structure, auto-configuration, starters, properties, Actuator, and core IoC ideas.",
      "topics": [
        {
          "id": "boot-overview",
          "title": "Spring Boot Overview",
          "description": "Understand why Spring Boot exists and how it reduces setup for Java backend applications.",
          "source": "Spring Boot overview notes",
          "summary": [
            "Spring Boot helps you build Java applications quickly by combining opinionated defaults, embedded servers, dependency starters, and auto-configuration.",
            "A typical Spring Boot backend starts from a main class annotated with @SpringBootApplication and grows around controllers, services, repositories, configuration, and resources.",
            "The goal is to spend less time wiring infrastructure and more time implementing business behavior."
          ],
          "keyPoints": [
            "@SpringBootApplication combines component scanning, auto-configuration, and extra Spring Boot configuration.",
            "Spring Initializr gives a clean starting project with Maven/Gradle coordinates and selected dependencies.",
            "Boot applications can run from an IDE, command line, executable jar, or container runtime."
          ],
          "flow": [
            "Create project with dependencies.",
            "Add application code under the root package.",
            "Run the main method or packaged jar.",
            "Expose behavior through controllers, scheduled jobs, or messaging consumers."
          ],
          "code": [
            {
              "label": "DemoApplication.java",
              "content": "package com.example.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class DemoApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}"
            }
          ],
          "articleTitle": "Lecture-backed overview",
          "article": [
            "The lecture slides frame Spring Boot as the practical way to start Spring development without manually assembling every dependency, server, and configuration file. Spring itself provides the container, annotations, helper APIs, and ecosystem; Spring Boot adds a fast project bootstrap, auto-configuration, dependency conflict management, and an embedded HTTP server.",
            "Your notes already capture the operational pieces: standard directory structure, application.properties, Actuator endpoints, server configuration, and running apps from the command line. The merged mental model is simple: Boot creates a self-contained backend unit where the application code, framework configuration, and embedded server travel together.",
            "When revising this topic, connect three things: Spring Initializr creates the skeleton, starters bring compatible dependency bundles, and @SpringBootApplication starts component scanning plus auto-configuration. That is the core Boot loop."
          ],
          "slideConcepts": [
            "Spring in a Nutshell",
            "Spring Boot Solution",
            "Spring Initializr",
            "Embedded Server",
            "REST Controller"
          ],
          "visuals": [
            {
              "title": "Boot startup shape",
              "caption": "Spring Initializr creates a project; starters bring compatible dependencies; the jar runs with embedded Tomcat.",
              "image": "assets/study/spring/slides/boot-embedded-server.png"
            }
          ]
        },
        {
          "id": "project-anatomy",
          "title": "Project Anatomy, Starters, and Properties",
          "description": "Read the standard folder structure and understand how starters and properties shape the app.",
          "source": "Spring Boot overview notes",
          "summary": [
            "A Boot project keeps production code under src/main/java, resources under src/main/resources, and tests under src/test/java.",
            "Starters are dependency bundles. For example, spring-boot-starter-web brings Spring MVC, validation basics, JSON support, and an embedded server.",
            "application.properties or application.yml is the normal place for server ports, app metadata, datasource settings, actuator exposure, and feature flags."
          ],
          "keyPoints": [
            "Project coordinates identify the artifact: group, artifact, version, and Java version.",
            "Parent or dependency management controls compatible dependency versions.",
            "Properties are external configuration, so behavior can change across environments without code edits."
          ],
          "flow": [
            "Choose a starter based on the app type.",
            "Keep code under the main application package or configure scanBasePackages.",
            "Use application properties for ports, profiles, datasource, Actuator, and security settings."
          ],
          "code": [
            {
              "label": "build.gradle",
              "content": "plugins {\n    id 'org.springframework.boot' version '2.7.5'\n    id 'io.spring.dependency-management' version '1.0.14.RELEASE'\n    id 'java'\n}\n\ndependencies {\n    implementation 'org.springframework.boot:spring-boot-starter-web'\n    testImplementation 'org.springframework.boot:spring-boot-starter-test'\n}"
            }
          ],
          "articleTitle": "Project structure from slides and notes",
          "article": [
            "The slides spend time on the generated Maven project because Spring Boot development becomes easier once you can read the folder structure. Production Java code lives under src/main/java, configuration and templates/assets live under src/main/resources, and tests live under src/test/java.",
            "The Spring Initializr-generated build file is not just metadata. It declares project coordinates and pulls in starters such as spring-boot-starter-web. That one starter includes Spring Web, Spring MVC, JSON support, validation-related pieces, and embedded Tomcat, so the developer does not manually chase compatible versions.",
            "Your notes about application.properties complete the picture. Use it for server.port, Actuator info, datasource details, custom values such as coach.name, and environment-specific behavior. Keep the code clean and move deploy-time values out to configuration."
          ],
          "slideConcepts": [
            "Maven POM file",
            "Java Source Code",
            "Application Properties",
            "Spring Boot Starters",
            "Starter Web contents"
          ],
          "visuals": [
            {
              "title": "Generated project anatomy",
              "caption": "Read a Boot project as build metadata, application code, resources, and tests.",
              "image": "assets/study/spring/slides/starter-web-bundle.png"
            }
          ]
        },
        {
          "id": "actuator-config",
          "title": "Actuator and Runtime Configuration",
          "description": "Expose health, info, and operational endpoints while keeping sensitive endpoints controlled.",
          "source": "Spring Boot overview notes",
          "summary": [
            "Actuator adds production-ready endpoints for health, info, metrics, mappings, beans, and other runtime visibility.",
            "By default, only a small set of endpoints is exposed. You explicitly choose what should be visible over HTTP.",
            "Operational endpoints should be treated as privileged surfaces and secured in real systems."
          ],
          "keyPoints": [
            "Health and info are the first endpoints to know.",
            "Expose only what you need with management.endpoints.web.exposure.include.",
            "Use Actuator with logs, metrics, and alerts to understand production behavior."
          ],
          "flow": [
            "Add Actuator starter.",
            "Configure exposed endpoints.",
            "Add app metadata under info.*.",
            "Secure sensitive endpoints before exposing them outside local development."
          ],
          "articleTitle": "Operational endpoints",
          "article": [
            "The overview slides introduce Actuator after the basic app structure because observability should be part of the backend from the beginning. Actuator exposes operational views such as health and info by default, with more endpoints available when explicitly configured.",
            "Your notes correctly call out that /actuator/health and /actuator/info are the common starting points. Add application info under info.* and expose only the endpoints that are safe for the current environment.",
            "For a real service, treat Actuator as production infrastructure: it is useful for load balancers, dashboards, and debugging, but sensitive endpoints should be restricted through configuration and Spring Security."
          ],
          "slideConcepts": [
            "Spring Boot Actuator",
            "Accessing endpoints",
            "Info endpoint",
            "Securing endpoints",
            "Server configuration"
          ],
          "visuals": [
            {
              "title": "Actuator path",
              "caption": "Operational endpoints sit beside app APIs and expose runtime health and metadata.",
              "image": "assets/study/spring/slides/actuator-endpoints.png"
            }
          ]
        },
        {
          "id": "ioc-di",
          "title": "IoC, Dependency Injection, and Beans",
          "description": "Use the Spring container to create objects, wire dependencies, and keep code configurable.",
          "source": "Spring Core notes",
          "summary": [
            "Inversion of Control means the framework creates and manages objects instead of the application manually constructing everything.",
            "Dependency Injection means dependencies are supplied to a class from the container, usually through constructor injection.",
            "Spring discovers beans through annotations like @Component, @Service, @Repository, @Controller, @RestController, and @Configuration."
          ],
          "keyPoints": [
            "Constructor injection is preferred because required dependencies are explicit and test-friendly.",
            "@Qualifier resolves ambiguity when multiple beans implement the same interface.",
            "@Primary gives a default bean, but explicit qualifiers usually make intent clearer.",
            "Singleton is the default bean scope; prototype creates a new instance each time it is requested."
          ],
          "flow": [
            "Define an interface for behavior.",
            "Mark implementation as a component or expose it through @Bean.",
            "Inject the abstraction into the consumer through constructor injection.",
            "Use qualifiers only when there are multiple valid implementations."
          ],
          "code": [
            {
              "label": "HelloService.java",
              "content": "package com.example.demo.service;\n\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class HelloService {\n\n    public String getHelloMessage() {\n        return \"Hello, World!\";\n    }\n}"
            }
          ],
          "articleTitle": "Container, beans, and injection",
          "article": [
            "The Spring Core slides define IoC as outsourcing object construction and management. Instead of new-ing every dependency manually, your app asks the Spring container for the object graph it needs.",
            "Dependency Injection is the practical mechanism. Constructor injection is recommended for required dependencies because the class cannot be created without what it needs. Setter injection fits optional dependencies where a sensible default can exist.",
            "Your notes add the important interview details: autowiring matches by type, @Component marks beans for scanning, @Qualifier resolves multiple implementations, @Primary supplies a default, @Lazy delays bean creation, and scope decides lifecycle. In a real codebase, prefer constructor injection plus explicit qualifiers where ambiguity exists."
          ],
          "slideConcepts": [
            "Inversion of Control",
            "Spring Container",
            "Dependency Injection",
            "Autowiring",
            "@Qualifier vs @Primary",
            "Lazy Initialization",
            "Bean Scopes"
          ],
          "visuals": [
            {
              "title": "IoC wiring",
              "caption": "The controller depends on an abstraction; the container selects and injects the concrete bean.",
              "image": "assets/study/spring/slides/spring-container.png"
            }
          ]
        }
      ]
    },
    {
      "id": "rest-persistence",
      "title": "REST + Persistence",
      "description": "REST controllers, CRUD layering, Hibernate/JPA, database access, and REST API security.",
      "topics": [
        {
          "id": "hibernate-jpa",
          "title": "Hibernate, JPA, and ORM",
          "description": "Map Java objects to database rows while keeping persistence code clean.",
          "source": "Hibernate and JPA notes",
          "summary": [
            "Hibernate is an ORM framework that persists Java objects into relational databases.",
            "JPA is the standard specification; Hibernate is a popular implementation of it.",
            "ORM removes repetitive JDBC boilerplate but still requires careful entity modeling, transactions, and query design."
          ],
          "keyPoints": [
            "@Entity maps a Java class to a table.",
            "@Id identifies the primary key.",
            "EntityManager and Spring Data repositories are common persistence entry points.",
            "Transactions define the boundary where persistence changes should commit or roll back."
          ],
          "flow": [
            "Create entity class.",
            "Map fields and primary key.",
            "Use repository or DAO to persist/query.",
            "Call persistence layer from a service transaction boundary."
          ],
          "articleTitle": "ORM and DAO flow",
          "article": [
            "The Hibernate/JPA slides start with the core idea: Hibernate persists Java objects, while JPA defines the standard API for ORM. Hibernate is an implementation; JPA is the contract. This distinction matters when reading imports, annotations, and EntityManager code.",
            "The slide flow then moves from Java object to database table. You define the entity mapping, and Hibernate handles much of the low-level SQL. Your notes align with this: ORM reduces JDBC boilerplate, but the developer still owns entity design, queries, transactions, and database performance.",
            "The CRUD section introduces the DAO pattern around EntityManager. Spring Boot auto-configures DataSource and EntityManager from application properties, then the DAO injects EntityManager to save, query, update, and delete entities."
          ],
          "slideConcepts": [
            "Hibernate overview",
            "JPA specification",
            "ORM mapping",
            "Saving with EntityManager",
            "DAO methods",
            "DataSource auto-configuration"
          ],
          "visuals": [
            {
              "title": "JPA persistence path",
              "caption": "Entity code flows through DAO/EntityManager into the database connection configured by Boot.",
              "image": "assets/study/spring/slides/jpa-entitymanager-datasource.png"
            }
          ]
        },
        {
          "id": "rest-basics",
          "title": "REST Controllers and HTTP Flow",
          "description": "Design HTTP endpoints with @RestController, JSON payloads, status codes, and path variables.",
          "source": "REST API notes and demo app",
          "summary": [
            "A REST API exposes resources through HTTP methods such as GET, POST, PUT, PATCH, and DELETE.",
            "@RestController returns response bodies directly, typically as JSON.",
            "Controllers should stay thin: parse requests, validate input, call services, and shape responses."
          ],
          "keyPoints": [
            "@GetMapping, @PostMapping, @PutMapping, and @DeleteMapping map endpoints.",
            "@PathVariable reads data from the URL.",
            "@RequestBody maps JSON request bodies to Java objects.",
            "Use meaningful HTTP status codes and consistent error payloads."
          ],
          "flow": [
            "Client sends HTTP request.",
            "Controller maps the route and extracts inputs.",
            "Service performs business logic.",
            "Repository/DAO handles persistence.",
            "Controller returns response body and status."
          ],
          "code": [
            {
              "label": "HelloController.java",
              "content": "package com.example.demo.controller;\n\nimport com.example.demo.service.HelloService;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class HelloController {\n\n    @Autowired\n    private HelloService helloService;\n\n    @GetMapping(\"/hello\")\n    public String sayHello() {\n        return helloService.getHelloMessage();\n    }\n}"
            }
          ],
          "articleTitle": "REST, JSON, and controller flow",
          "article": [
            "The REST slides build the concept from first principles: clients need a stable way to exchange data with a server, JSON is the lightweight text format, and HTTP methods map naturally to CRUD operations.",
            "@RestController is the Spring entry point for returning response bodies. The slides show simple @GetMapping methods, then move to POJOs, lists, path variables, and Jackson converting Java objects into JSON.",
            "Merged with your demo project, the clean rule is: controller receives HTTP, delegates business behavior to a service, and returns a response. Even a simple /hello endpoint is better when the controller calls HelloService instead of hardcoding behavior in the web layer."
          ],
          "slideConcepts": [
            "JSON values and arrays",
            "REST over HTTP",
            "HTTP request/response",
            "@RestController",
            "@PathVariable",
            "Jackson conversion"
          ],
          "visuals": [
            {
              "title": "REST request lifecycle",
              "caption": "HTTP request enters the controller, service handles behavior, and the response returns JSON/text to the client.",
              "image": "assets/study/spring/slides/http-request-response.png"
            }
          ]
        },
        {
          "id": "crud-layering",
          "title": "CRUD Layering and API Design",
          "description": "Build CRUD features with controller, service, repository, exceptions, and clean API shape.",
          "source": "REST CRUD notes",
          "summary": [
            "A clean CRUD app separates web concerns from business logic and persistence.",
            "The service layer is the right place for rules, validations that need domain knowledge, transaction boundaries, and orchestration.",
            "Global exception handling keeps controller methods readable and response errors consistent."
          ],
          "keyPoints": [
            "Controller should not directly own database logic.",
            "Service methods should express use cases like findEmployee, saveEmployee, and deleteEmployee.",
            "@ControllerAdvice centralizes exception-to-response mapping.",
            "Spring Data REST can expose repository endpoints quickly, but hand-written APIs give more control."
          ],
          "flow": [
            "Define resource model and endpoint contract.",
            "Implement controller methods.",
            "Route behavior through service.",
            "Use repository/DAO for persistence.",
            "Handle not-found and validation failures globally."
          ],
          "articleTitle": "CRUD architecture and error handling",
          "article": [
            "The REST CRUD slides move beyond a toy controller into a layered Employee API. They introduce DAO, service, Spring Data JPA, Spring Data REST, and API design decisions for add, update, delete, and single-record retrieval.",
            "Exception handling is a major slide topic. The local exception-handler approach works, but global exception handling with @ControllerAdvice is cleaner because it keeps response mapping separate from endpoint logic.",
            "Your article should remember the architecture, not just annotations: controller handles HTTP, service owns use cases and transactions, repository/DAO owns persistence, and exception handlers translate failures into consistent response payloads."
          ],
          "slideConcepts": [
            "REST exception handling",
            "Global exception handling",
            "Service layer",
            "DAO add/update/delete",
            "Spring Data JPA",
            "Spring Data REST"
          ],
          "visuals": [
            {
              "title": "CRUD layers",
              "caption": "Each layer has one job; that keeps APIs maintainable as business rules grow.",
              "image": "assets/study/spring/slides/service-layer.png"
            }
          ]
        },
        {
          "id": "rest-security",
          "title": "REST API Security",
          "description": "Secure APIs with users, roles, URL authorization, JDBC users, and password encoding.",
          "source": "REST Security notes",
          "summary": [
            "Spring Security protects requests through a filter chain before they reach controllers.",
            "REST API security usually starts with authentication, role-based authorization, and password encoding.",
            "User and role data can begin in memory for demos and move to JDBC/custom tables for real systems."
          ],
          "keyPoints": [
            "Prefer BCrypt or another strong adaptive password encoder over plain-text passwords.",
            "Restrict URLs based on role and method, not only broad application access.",
            "Custom tables are common when user data needs to fit an existing domain model."
          ],
          "flow": [
            "Add security dependency.",
            "Define users, roles, and password encoder.",
            "Configure URL authorization rules.",
            "Move users to database tables when persistence is required."
          ],
          "articleTitle": "REST security from filters to roles",
          "article": [
            "The REST Security slides explain that Spring Security is implemented through servlet filters. Requests pass through the security filter chain before reaching the controller, which makes authentication and authorization a front-door concern.",
            "The course then moves through users, roles, URL restrictions, JDBC authentication, password storage, BCrypt, and custom tables. Your notes already mention plain-text to encrypted storage; the important upgrade is that password columns need enough length for encoded BCrypt values and production systems should never use plain text.",
            "Think of REST security in layers: identify the user, load authorities, match the request path/method, check required roles, and only then allow controller execution."
          ],
          "slideConcepts": [
            "Servlet filters",
            "Authentication vs authorization",
            "Password storage format",
            "URL role restrictions",
            "JDBC authentication",
            "Custom tables"
          ],
          "visuals": [
            {
              "title": "Security filter flow",
              "caption": "The controller sees only requests that pass authentication and authorization checks.",
              "image": "assets/study/spring/slides/security-filters.png"
            }
          ]
        }
      ]
    },
    {
      "id": "mvc",
      "title": "MVC + Thymeleaf",
      "description": "Server-rendered web applications with Thymeleaf templates, validation, CRUD screens, and MVC security.",
      "topics": [
        {
          "id": "thymeleaf-mvc",
          "title": "Thymeleaf and Spring MVC",
          "description": "Render server-side HTML views with model data from Spring controllers.",
          "source": "Spring MVC notes",
          "summary": [
            "Thymeleaf is a Java template engine commonly used to generate HTML views in Spring MVC apps.",
            "The controller returns a view name and adds data to a model; Thymeleaf renders the final HTML on the server.",
            "This approach works well for admin panels, internal tools, CRUD screens, and apps where server-rendered pages are enough."
          ],
          "keyPoints": [
            "Templates live under src/main/resources/templates.",
            "Static assets usually live under src/main/resources/static.",
            "Model attributes connect Java objects to template expressions."
          ],
          "flow": [
            "Browser requests a page.",
            "Controller prepares model data.",
            "Thymeleaf template renders HTML.",
            "Browser receives complete markup."
          ],
          "articleTitle": "Server-rendered MVC",
          "article": [
            "The MVC slides introduce Thymeleaf as a Java template engine for server-rendered HTML. A browser requests a route, a Spring MVC controller prepares model data, and Thymeleaf renders the final HTML page on the server.",
            "This section connects directly to your notes about templates and resources: templates belong under resources/templates, CSS/static files under resources/static, and model attributes are the bridge between Java objects and page expressions.",
            "Use MVC when server-rendered pages are the right fit: admin panels, internal tools, simple CRUD screens, dashboards, and apps where a full frontend SPA is unnecessary."
          ],
          "slideConcepts": [
            "Thymeleaf template",
            "Template processing on server",
            "Controller model",
            "CSS/static resources",
            "Bootstrap usage"
          ],
          "visuals": [
            {
              "title": "MVC render flow",
              "caption": "The server prepares model data and returns complete HTML to the browser.",
              "image": "assets/study/spring/slides/thymeleaf-server-render.png"
            }
          ]
        },
        {
          "id": "mvc-validation",
          "title": "MVC Validation",
          "description": "Validate form inputs using annotations, binding results, custom messages, and custom validators.",
          "source": "Spring MVC notes",
          "summary": [
            "MVC validation keeps bad data from entering the application through forms.",
            "Bean Validation annotations express common rules such as required fields, number ranges, and regular expressions.",
            "Custom validators are useful when the rule is domain-specific and cannot be expressed with built-in annotations."
          ],
          "keyPoints": [
            "@Valid triggers validation on form objects.",
            "BindingResult must be checked immediately after the validated argument.",
            "@InitBinder can preprocess fields before validation.",
            "Error messages should be user-readable and field-specific."
          ],
          "flow": [
            "Bind request fields to form object.",
            "Validate annotations and custom rules.",
            "Return form with errors when invalid.",
            "Process the use case when valid."
          ],
          "articleTitle": "Validation and form safety",
          "article": [
            "The validation slides show why MVC forms need more than happy-path binding. Users can submit empty strings, invalid ranges, bad patterns, or domain-invalid values, so validation belongs at the boundary before business logic runs.",
            "Bean Validation handles common rules: required fields, length, number ranges, regular expressions, and standard messages. @InitBinder is introduced as a pre-processor; the course uses it to trim strings and convert blank input into null so required-field validation behaves correctly.",
            "Custom validation is the advanced piece. The slide example creates a custom annotation and validator when the business rule cannot be represented by built-in annotations."
          ],
          "slideConcepts": [
            "Bean Validation API",
            "Validation annotations",
            "@Valid and BindingResult",
            "@InitBinder",
            "Custom annotation",
            "ConstraintValidator"
          ],
          "visuals": [
            {
              "title": "Form validation flow",
              "caption": "Validate inputs before running the use case; return the form with errors when invalid.",
              "image": "assets/study/spring/slides/bean-validation-features.png"
            }
          ]
        },
        {
          "id": "mvc-crud",
          "title": "Thymeleaf CRUD Project",
          "description": "Build an employee directory UI with list, add, update, and delete flows.",
          "source": "Thymeleaf CRUD notes",
          "summary": [
            "A typical MVC CRUD app combines controller routes, service methods, repository persistence, and Thymeleaf templates.",
            "The Employee Directory project is a good pattern for admin-style apps: list records, open a form, save changes, and delete safely.",
            "Reuse the service/repository layers from REST projects when the business behavior is the same."
          ],
          "keyPoints": [
            "Use GET routes for screens and POST routes for state-changing form submissions.",
            "Keep templates focused on presentation logic.",
            "Redirect after POST to avoid duplicate submissions."
          ],
          "flow": [
            "List employees.",
            "Open add/update form.",
            "Submit form to controller.",
            "Service saves through repository.",
            "Redirect back to list."
          ],
          "articleTitle": "Employee directory project",
          "article": [
            "The MVC CRUD slides are project-oriented: build an Employee Directory where users list, add, update, and delete employees. The big picture diagram places browser, Thymeleaf templates, controller, service, and repository in one loop.",
            "The add/update flows emphasize Spring MVC data binding. The controller places an Employee object in the model, Thymeleaf binds form fields to that object, and the POST handler saves through the service layer.",
            "The best revision pattern is to remember the route flow: GET list, GET form, POST save, redirect, GET update form with existing data, POST save again, and delete by id with a confirmation-friendly UI."
          ],
          "slideConcepts": [
            "Employee Directory requirements",
            "Big Picture architecture",
            "Data binding",
            "Add Employee",
            "Update Employee",
            "Delete Employee"
          ],
          "visuals": [
            {
              "title": "MVC CRUD loop",
              "caption": "The same service/repository behavior can support REST APIs and server-rendered screens.",
              "image": "assets/study/spring/slides/mvc-crud-big-picture.png"
            }
          ]
        },
        {
          "id": "mvc-security",
          "title": "Spring MVC Security",
          "description": "Secure server-rendered pages with login forms, roles, access-denied pages, and database users.",
          "source": "MVC Security notes",
          "summary": [
            "MVC security adds login/logout flows and protects views based on role.",
            "Thymeleaf can show or hide content based on the logged-in user and granted authorities.",
            "Custom login pages and access-denied pages make security feel like part of the application instead of a framework default."
          ],
          "keyPoints": [
            "Default login is useful for quick checks; custom login is better for real UX.",
            "Use role checks for both routes and visible actions.",
            "JDBC authentication and BCrypt are a realistic progression from in-memory users."
          ],
          "flow": [
            "Configure protected routes.",
            "Create custom login view.",
            "Show role-aware content.",
            "Store users and roles in database when needed."
          ],
          "articleTitle": "Security for server-rendered pages",
          "article": [
            "The MVC Security slides reuse the same Spring Security foundation as REST, but the user experience is different. Instead of HTTP Basic or API-style clients, the app needs login pages, logout behavior, access-denied pages, and role-aware page content.",
            "The course sequence moves from default login to custom login, then to role-restricted URLs, showing/hiding content based on roles, JDBC authentication, BCrypt, and custom tables.",
            "For study, separate route protection from presentation protection. Route rules prevent unauthorized access; Thymeleaf role checks hide actions the user should not see. You usually need both."
          ],
          "slideConcepts": [
            "Default login form",
            "Custom login form",
            "URL role restrictions",
            "Role-based content",
            "JDBC users",
            "BCrypt"
          ],
          "visuals": [
            {
              "title": "MVC security path",
              "caption": "Security controls both page access and what actions are visible inside the page.",
              "image": "assets/study/spring/slides/mvc-custom-login-security.png"
            }
          ]
        }
      ]
    },
    {
      "id": "advanced",
      "title": "Advanced Spring",
      "description": "JPA mappings, AOP, microservice notes, REST clients, service discovery, and tests.",
      "topics": [
        {
          "id": "advanced-jpa",
          "title": "JPA Advanced Mappings",
          "description": "Model one-to-one, one-to-many, many-to-one, and many-to-many relationships.",
          "source": "JPA advanced mapping notes",
          "summary": [
            "Real databases usually have multiple tables with relationships, and JPA mappings represent those relationships in the Java model.",
            "The right mapping depends on ownership, lifecycle, cardinality, and query patterns.",
            "Bidirectional mappings are powerful but should be used only when both navigation directions are actually needed."
          ],
          "keyPoints": [
            "@OneToOne works for profile/detail style relationships.",
            "@OneToMany and @ManyToOne model parent-child or aggregate relationships.",
            "@ManyToMany often needs a join table and may become an explicit entity when relationship metadata exists.",
            "Cascade and fetch type decisions affect correctness and performance."
          ],
          "flow": [
            "Identify tables and relationship cardinality.",
            "Choose owning side.",
            "Map join column or join table.",
            "Decide cascade and fetch strategy."
          ],
          "articleTitle": "Relationships and fetch strategy",
          "article": [
            "The advanced JPA slides focus on real databases: multiple tables, relationships, primary keys, foreign keys, cascade rules, and fetch strategies. This is where entity modeling starts to look like actual application data.",
            "The relationship slides cover one-to-one, one-to-many/many-to-one, and many-to-many. Cascade is not automatic wisdom; it depends on lifecycle ownership. Deleting an InstructorDetail with an Instructor may make sense, but cascade deleting students when a course is removed usually does not.",
            "Fetch type is the performance trap. Eager loading retrieves related data immediately; lazy loading retrieves on demand. Use lazy by default for large relationships, then fetch explicitly for use cases that need the data."
          ],
          "slideConcepts": [
            "Primary key and foreign key",
            "One-to-one",
            "One-to-many",
            "Many-to-many",
            "Cascade types",
            "Eager vs lazy loading"
          ],
          "visuals": [
            {
              "title": "JPA relationship map",
              "caption": "Choose mapping and cascade based on ownership and lifecycle, not just table shape.",
              "image": "assets/study/spring/slides/jpa-many-to-many.png"
            }
          ]
        },
        {
          "id": "aop",
          "title": "Aspect-Oriented Programming",
          "description": "Move cross-cutting behavior such as logging and timing out of business methods.",
          "source": "AOP notes",
          "summary": [
            "AOP helps apply cross-cutting behavior such as logging, security checks, metrics, or transaction-like concerns without scattering code everywhere.",
            "An aspect defines advice that runs at selected join points matched by pointcut expressions.",
            "Use AOP when behavior is repeated across layers and should stay separate from domain logic."
          ],
          "keyPoints": [
            "Aspect: class containing cross-cutting logic.",
            "Advice: code that runs before, after, or around a method.",
            "Pointcut: expression that selects where advice applies.",
            "Do not hide essential business behavior inside aspects."
          ],
          "flow": [
            "Identify repeated cross-cutting behavior.",
            "Write aspect and advice.",
            "Define pointcut expression.",
            "Keep behavior observable and easy to debug."
          ],
          "articleTitle": "Cross-cutting concerns and proxies",
          "article": [
            "The AOP slides start with a pain point: logging and security code scattered across controllers, services, and DAOs. AOP packages that cross-cutting concern into an aspect so business methods stay focused.",
            "Spring AOP applies the proxy design pattern. The main app calls a proxy, the proxy runs advice, and then the target object method executes. Advice can run before, after returning, after throwing, after finally, or around the method.",
            "Use AOP for repeatable technical concerns such as logging, audit, metrics, security checks, and transaction-like boundaries. Avoid hiding essential domain rules inside aspects, because that makes behavior harder to reason about."
          ],
          "slideConcepts": [
            "Cross-cutting concerns",
            "AOP solution",
            "Proxy pattern",
            "Aspect",
            "Advice types",
            "Pointcut expressions"
          ],
          "visuals": [
            {
              "title": "AOP proxy flow",
              "caption": "The proxy applies logging/security advice around the target method call.",
              "image": "assets/study/spring/slides/aop-proxy-solution.png"
            }
          ]
        },
        {
          "id": "microservices-resttemplate",
          "title": "Microservices, RestTemplate, and Eureka Notes",
          "description": "Use your extra notes for service-to-service communication, API gateway, load balancing, and discovery.",
          "source": "Extra Spring notes",
          "summary": [
            "RestTemplate is a Spring REST client used to call external or internal HTTP APIs.",
            "A simple microservice setup can split domain services, introduce an API gateway, and use Eureka for service discovery.",
            "In a production design, pay attention to timeouts, retries, circuit breakers, API contracts, and observability."
          ],
          "keyPoints": [
            "Use @LoadBalanced when RestTemplate should resolve service names through discovery.",
            "API Gateway can route requests to multiple backend services through one entry point.",
            "Eureka Server tracks live services; clients register and discover each other.",
            "Modern Spring projects may prefer WebClient for new reactive or non-blocking clients."
          ],
          "flow": [
            "Create domain services.",
            "Create gateway service.",
            "Create Eureka discovery server.",
            "Register services and call by service name.",
            "Add resilience and monitoring before production use."
          ],
          "articleTitle": "Extra notes: service communication",
          "article": [
            "Your extra Spring notes extend beyond the core luv2code slides into microservice communication. RestTemplate is the classic Spring client for calling REST APIs, normally prepared as a shared bean during startup instead of being repeatedly reconfigured at runtime.",
            "The microservice flow in your notes is Movie Service, Genre Service, API Gateway, and Eureka Server. The gateway gives clients one entry point, Eureka tracks live services, and @LoadBalanced lets the client resolve service names instead of hardcoded host URLs.",
            "For modern production thinking, add resilience around this flow: timeouts, retries, circuit breakers, tracing, and clear API contracts. The notes are a strong starting architecture, but reliability is what makes it production-grade."
          ],
          "slideConcepts": [
            "RestTemplate",
            "@LoadBalanced",
            "API Gateway",
            "Eureka Server",
            "Service discovery",
            "Service-to-service call"
          ]
        },
        {
          "id": "testing-demo",
          "title": "Testing Spring Controllers",
          "description": "Test web endpoints with MockMvc and mocked service dependencies.",
          "source": "Extra Spring notes and demo app",
          "summary": [
            "Controller tests should verify request mapping, status codes, response bodies, validation, and error behavior without starting the whole application stack.",
            "@WebMvcTest loads the MVC slice for a controller, while @MockBean supplies mocked collaborators.",
            "MockMvc performs requests against the Spring MVC layer and asserts the response."
          ],
          "keyPoints": [
            "@WebMvcTest is focused and faster than a full application test.",
            "@MockBean replaces service dependencies in the Spring test context.",
            "Assert status and body at minimum; add error cases as the API grows."
          ],
          "flow": [
            "Load controller slice.",
            "Mock service behavior.",
            "Perform HTTP request with MockMvc.",
            "Assert status and response content."
          ],
          "code": [
            {
              "label": "HelloControllerTest.java",
              "content": "package com.example.demo.controller;\n\nimport com.example.demo.service.HelloService;\nimport org.junit.jupiter.api.Test;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;\nimport org.springframework.boot.test.mock.mockito.MockBean;\nimport org.springframework.test.web.servlet.MockMvc;\n\nimport static org.mockito.Mockito.when;\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;\n\n@WebMvcTest(HelloController.class)\npublic class HelloControllerTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @MockBean\n    private HelloService helloService;\n\n    @Test\n    public void sayHello_ShouldReturnHelloMessage() throws Exception {\n        when(helloService.getHelloMessage()).thenReturn(\"Hello, World!\");\n\n        mockMvc.perform(get(\"/hello\"))\n                .andExpect(status().isOk())\n                .andExpect(content().string(\"Hello, World!\"));\n    }\n}"
            }
          ],
          "articleTitle": "Extra notes: web slice testing",
          "article": [
            "Your demo project adds the testing piece that the main slides do not emphasize heavily. @WebMvcTest loads a focused MVC test slice for the controller rather than starting the entire app, which makes endpoint tests fast and targeted.",
            "@MockBean replaces the service dependency in the Spring test context. That keeps the test focused on route mapping, HTTP status, response body, validation, and error handling instead of service implementation details.",
            "The pattern is practical: mock service behavior, perform a request with MockMvc, and assert the response. As controllers grow, add tests for invalid input, missing data, authorization, and exception responses."
          ],
          "slideConcepts": [
            "JUnit assertions",
            "@WebMvcTest",
            "MockMvc",
            "@MockBean",
            "Controller slice",
            "HTTP response assertions"
          ]
        }
      ]
    }
  ]
};
