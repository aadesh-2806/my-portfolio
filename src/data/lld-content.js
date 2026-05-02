window.LLD_STUDY_DATA = {
  "sections": [
    {
      "id": "oops",
      "title": "Basics",
      "description": "Object-oriented foundations, UML basics, SOLID, DRY, and YAGNI for clean class design.",
      "topics": [
        {
          "id": "oops-basics",
          "title": "OOP Basics",
          "description": "Classes, objects, inheritance, abstraction, encapsulation, and polymorphism as building blocks for LLD.",
          "notes": [
            "The PDF notes start from why procedural programming becomes hard for large systems: data and behavior drift apart, access control is weak, and real-world concepts are difficult to model.",
            "OOP fixes this by modeling the system as interacting objects with state, behavior, and clear boundaries.",
            "Encapsulation keeps invariants local; abstraction exposes only the operations a caller needs.",
            "Inheritance should express a true is-a relationship; polymorphism lets clients depend on contracts while implementations vary."
          ],
          "images": [],
          "code": [
            {
              "label": "Encapsulation.java",
              "content": "/*\nEncapsulation says 2 things:\n1. An Object's Characteristics and its behaviour are encapsulated together\nwithin that Object.\n2. All the characteristics or behaviours are not for everyone to access.\nObject should provide data security.\n\nWe follow above 2 pointers about Object of real world in programming by:\n1. Creating a class that act as a blueprint for Object creation. Class contain\nall the characteristics (class variable) and behaviour (class methods) in one block,\nencapsulating it together.\n2. We introduce access modifiers (public, private, protected, default) etc to provide data\nsecurity to the class members.\n*/\nclass SportsCar {\n    private String brand;\n    private String model;\n    private boolean isEngineOn = false;\n    private int currentSpeed = 0;\n    private int currentGear = 0;\n        \n    //Introduce new variable to exaplain setters\n    private String tyreCompany;\n\n    public SportsCar(String brand, String model) {\n        this.brand = brand;\n        this.model = model;\n    }\n\n    public int getSpeed() {\n        return currentSpeed;\n    }\n\n    public String getTyreCompany() {\n        return tyreCompany;\n    }\n\n    public void setTyreCompany(String tyreCompany) {\n        this.tyreCompany = tyreCompany;\n    }\n\n    public void startEngine() {\n        isEngineOn = true;\n        System.out.println(brand + \" \" + model + \" : Engine starts with a roar!\");\n    }\n\n    public void shiftGear(int gear) {\n        this.currentGear = gear;\n        System.out.println(brand + \" \" + model + \" : Shifted to gear \" + currentGear);\n    }\n\n    public void accelerate() {\n        if (!isEngineOn) {\n            System.out.println(brand + \" \" + model + \" : Engine is off! Cannot accelerate.\");\n            return;\n        }\n        currentSpeed += 20;\n        System.out.println(brand + \" \" + model + \" : Accelerating to \" + currentSpeed + \" km/h\");\n    }\n    \n    public void brake() {\n        currentSpeed -= 20;\n        if (currentSpeed < 0) currentSpeed = 0;\n        System.out.println(brand + \" \" + model + \" : Braking! Speed is now \" + currentSpeed + \" km/h\");\n    }\n\n    public void stopEngine() {\n        isEngineOn = false;\n        currentGear = 0;\n        currentSpeed = 0;\n        System.out.println(brand + \" \" + model + \" : Engine turned off.\");\n    }\n}\n\n//Main Method\npublic class Encapsulation {\n    public static void main(String[] args) {\n\n        SportsCar mySportsCar = new SportsCar(\"Ford\", \"Mustang\");\n\n        mySportsCar.startEngine();\n        mySportsCar.shiftGear(1);\n        mySportsCar.accelerate();\n        mySportsCar.shiftGear(2);\n        mySportsCar.accelerate();\n        mySportsCar.brake();\n        mySportsCar.stopEngine();\n\n        //Setting arbitrary value to speed.\n        //mySportsCar.currentSpeed = 500;\n\n       // System.out.println(\"Current Speed of My Sports Car is set to \" + mySportsCar.currentSpeed);\n\n       System.out.println(\"Current Speed of My Sports Car is \" + mySportsCar.getSpeed());\n    }\n}"
            },
            {
              "label": "Abstraction.java",
              "content": "/*\nCar Interface --> Act as an interface for Outsiude world to operate the car. \nThis interface tells 'WHAT' all it can do rather then 'HOW' it does that.\nSince this is an interface we cannot directly create Objects of this. We\nneed to implement it first and then that child class will have the responsibility to \nprovide implementation details of all the methods in the interface.\n\nIn our real world example of Car, imagine you sitting in the car and able to operate\nthe car (startEngine, accelerate, brake, turn) just by pressing or moving some\npedals/buttons/stearing wheel etc. You dont need to know how these things work, and\nalso they are hidden under thre hood.\nThis Interface 'Car' denotes that (pedals/buttons/stearing wheel etc). \n*/\ninterface Car {\n    void startEngine(); \n    void shiftGear(int gear);\n    void accelerate();\n    void brake();\n    void stopEngine();\n}\n\n/*\nThis is a Concrete class (A class that provide implementation details of an interface/abstract class).\nNow anyone can make an Object of 'SportsCar' and can assign it to 'Car' reference. \n(See main method for this)\n\nIn our real world example of Car, as you cannot have a real car by just having its body only\n(all these buttons or pedals). You need to have the actual implementation of 'What' happens\nwhen we press these buttons. 'SportsCar' class denotes that actual implementation. \n\nHence we can concude, to denote a real world car in programming we created 2 classes.\nOne to deonte all the user-interface like pedals, buttons, stearing wheels etc ('Car' interface).\nAnd another one to denote the actual car with all the implementations of these buttons (SportsCar' class).\n */\nclass SportsCar implements Car {\n    String brand;\n    String model;\n    boolean isEngineOn = false;\n    int currentSpeed = 0;\n    int currentGear = 0;\n\n    public SportsCar(String brand, String model) {\n        this.brand = brand;\n        this.model = model;\n    }\n\n    @Override\n    public void startEngine() {\n        isEngineOn = true;\n        System.out.println(brand + \" \" + model + \" : Engine starts with a roar!\");\n    }\n\n    @Override\n    public void shiftGear(int gear) {\n        if (!isEngineOn) {\n            System.out.println(brand + \" \" + model + \" : Engine is off! Cannot Cannot Shift Gear.\");\n            return;\n        }\n        this.currentGear = gear;\n        System.out.println(brand + \" \" + model + \" : Shifted to gear \" + currentGear);\n    }\n\n    @Override\n    public void accelerate() {\n        if (!isEngineOn) {\n            System.out.println(brand + \" \" + model + \" : Engine is off! Cannot accelerate.\");\n            return;\n        }\n        currentSpeed += 20;\n        System.out.println(brand + \" \" + model + \" : Accelerating to \" + currentSpeed + \" km/h\");\n    }\n    \n    @Override\n    public void brake() {\n        currentSpeed -= 20;\n        if (currentSpeed < 0) currentSpeed = 0;\n        System.out.println(brand + \" \" + model + \" : Braking! Speed is now \" + currentSpeed + \" km/h\");\n    }\n\n    @Override\n    public void stopEngine() {\n        isEngineOn = false;\n        currentGear = 0;\n        currentSpeed = 0;\n        System.out.println(brand + \" \" + model + \" : Engine turned off.\");\n    }\n}\n\n//Main Method\npublic class Abstraction {\n    public static void main(String[] args) {\n\n        Car myCar = new SportsCar(\"Ford\", \"Mustang\");\n\n        myCar.startEngine();\n        myCar.shiftGear(1);\n        myCar.accelerate();\n        myCar.shiftGear(2);\n        myCar.accelerate();\n        myCar.brake();\n        myCar.stopEngine();\n\n    }\n}"
            },
            {
              "label": "Inheritance.java",
              "content": "/*\nWe know that real world Objects show inheritance relationship where we\nhave parent object and child object. child object have all the characters\nor behaviours that parent have plus some additional characters/behaviours.\nLike all cars in real world have a brand, model etc and can start, stop, \naccelerate etc. But some specific cars like manual car have gear System\nwhile other specific cars like Electric cars have battery system.\n\nWe represent this scenario of real world in programming by creating a parent class and\ndefining all the characters(variables) or behaviours(methods) that all cars \nhave in parent class. Then we create different child classes that inherits \nfrom this parent class and define only those characters and behaviours\nthat are specific to them. Although objects of these child classes can \naccess or call parent class characters(variables) and behaviours(methods).\nHence providing code reusability.\n*/\nclass Car {\n    protected String brand;\n    protected String model;\n    protected boolean isEngineOn;\n    protected int currentSpeed;\n\n    public Car(String brand, String model) {\n        this.brand = brand;\n        this.model = model;\n        this.isEngineOn = false;\n        this.currentSpeed = 0;\n    }\n\n    // Common methods for all cars\n    public void startEngine() {\n        isEngineOn = true;\n        System.out.println(brand + \" \" + model + \" : Engine started.\");\n    }\n\n    public void stopEngine() {\n        isEngineOn = false;\n        currentSpeed = 0;\n        System.out.println(brand + \" \" + model + \" : Engine turned off.\");\n    }\n\n    public void accelerate() {\n        if (!isEngineOn) {\n            System.out.println(brand + \" \" + model + \" : Cannot accelerate! Engine is off.\");\n            return;\n        }\n        currentSpeed += 20;\n        System.out.println(brand + \" \" + model + \" : Accelerating to \" + currentSpeed + \" km/h\");\n    }\n\n    public void brake() {\n        currentSpeed -= 20;\n        if (currentSpeed < 0) currentSpeed = 0;\n        System.out.println(brand + \" \" + model + \" : Braking! Speed is now \" + currentSpeed + \" km/h\");\n    }\n}\n\nclass ManualCar extends Car {  // Inherits from Car\n    \n    private int currentGear; //spcific to Manual Car.\n\n    public ManualCar(String brand, String model) {\n        super(brand, model);\n        this.currentGear = 0;\n    }\n\n    // Specialized method for Manual Car\n    public void shiftGear(int gear) {\n        this.currentGear = gear;\n        System.out.println(brand + \" \" + model + \" : Shifted to gear \" + currentGear);\n    }\n}\n\n\nclass ElectricCar extends Car {  // Inherits from Car\n    \n    private int batteryLevel; //spcific to Electric Car.\n\n    public ElectricCar(String brand, String model) {\n        super(brand, model);\n        this.batteryLevel = 100;\n    }\n\n    // Specialized method for Electric Car\n    public void chargeBattery() {\n        batteryLevel = 100;\n        System.out.println(brand + \" \" + model + \" : Battery fully charged!\");\n    }\n}\n\n// Main Class\npublic class Inheritance {\n    public static void main(String[] args) {\n        ManualCar myManualCar = new ManualCar(\"Suzuki\", \"WagonR\");\n        myManualCar.startEngine();\n        myManualCar.shiftGear(1); // Specific to Manual Car\n        myManualCar.accelerate();\n        myManualCar.brake();\n        myManualCar.stopEngine();\n\n        System.out.println(\"----------------------\");\n\n        ElectricCar myElectricCar = new ElectricCar(\"Tesla\", \"Model S\");\n        myElectricCar.chargeBattery(); // Specific to Electric Car\n        myElectricCar.startEngine();\n        myElectricCar.accelerate();\n        myElectricCar.brake();\n        myElectricCar.stopEngine();\n    }\n}"
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "OOPS introduction",
              "url": "https://www.youtube.com/watch?v=N0InhdsOZ8g&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "uml-basics",
          "title": "UML Basics",
          "description": "Class diagrams, associations, interfaces, inheritance, and object relationships used in LLD discussions.",
          "notes": [
            "Use UML as a thinking tool: identify classes, relationships, visibility, and lifecycle ownership.",
            "Inheritance represents an is-a relationship; composition represents strong has-a ownership; aggregation is weaker ownership.",
            "Sequence diagrams are useful when the important part is message flow between objects over time.",
            "For interviews, keep diagrams focused on core classes and extension points instead of every getter/setter."
          ],
          "images": [],
          "code": [],
          "videos": [
            {
              "source": "Coder Army",
              "title": "UML diagrams",
              "url": "https://www.youtube.com/watch?v=nPJyyO9pb5s&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "solid",
          "title": "SOLID Principles",
          "description": "The five core design principles that keep object models extensible and maintainable.",
          "notes": [
            "SRP: one class should have one reason to change.",
            "OCP: keep behavior open for extension and closed for repeated modification.",
            "LSP: subclasses must preserve the parent contract, including valid arguments, returns, exceptions, invariants, and expected behavior.",
            "ISP: split large interfaces so clients do not depend on methods they never use.",
            "DIP: high-level modules should depend on stable abstractions instead of low-level details."
          ],
          "images": [],
          "code": [
            {
              "label": "SRPFollowed.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\n\n// Product class representing any item in eCommerce.\nclass Product {\n    public String name;\n    public double price;\n\n    public Product(String name, double price) {\n        this.name = name;\n        this.price = price;\n    }\n}\n\n// 1. ShoppingCart: Only responsible for Cart related business logic.\nclass ShoppingCart {\n    private List<Product> products = new ArrayList<>();\n\n    public void addProduct(Product p) {\n        products.add(p);\n    }\n\n    public List<Product> getProducts() {\n        return products;\n    }\n\n    // Calculates total price in cart.\n    public double calculateTotal() {\n        double total = 0;\n        for (Product p : products) {\n            total += p.price;\n        }\n        return total;\n    }\n}\n\n// 2. ShoppingCartPrinter: Only responsible for printing invoices\nclass ShoppingCartPrinter {\n    private ShoppingCart cart;\n\n    public ShoppingCartPrinter(ShoppingCart cart) {\n        this.cart = cart;\n    }\n\n    public void printInvoice() {\n        System.out.println(\"Shopping Cart Invoice:\");\n        for (Product p : cart.getProducts()) {\n            System.out.println(p.name + \" - Rs \" + p.price);\n        }\n        System.out.println(\"Total: Rs \" + cart.calculateTotal());\n    }\n}\n\n// 3. ShoppingCartStorage: Only responsible for saving cart to DB\nclass ShoppingCartStorage {\n    private ShoppingCart cart;\n\n    public ShoppingCartStorage(ShoppingCart cart) {\n        this.cart = cart;\n    }\n\n    public void saveToDatabase() {\n        System.out.println(\"Saving shopping cart to database...\");\n    }\n}\n\npublic class SRPFollowed {\n    public static void main(String[] args) {\n        ShoppingCart cart = new ShoppingCart();\n\n        cart.addProduct(new Product(\"Laptop\", 50000));\n        cart.addProduct(new Product(\"Mouse\", 2000));\n\n        ShoppingCartPrinter printer = new ShoppingCartPrinter(cart);\n        printer.printInvoice();\n\n        ShoppingCartStorage db = new ShoppingCartStorage(cart);\n        db.saveToDatabase();\n    }\n}"
            },
            {
              "label": "OCPFollowed.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\n\n// Product class representing any item in eCommerce.\nclass Product {\n    public String name;\n    public double price;\n\n    public Product(String name, double price) {\n        this.name = name;\n        this.price = price;\n    }\n}\n\n// 1. ShoppingCart: Only responsible for Cart related business logic.\nclass ShoppingCart {\n    private List<Product> products = new ArrayList<>();\n\n    public void addProduct(Product p) {\n        products.add(p);\n    }\n\n    public List<Product> getProducts() {\n        return products;\n    }\n\n    // Calculates total price in cart.\n    public double calculateTotal() {\n        double total = 0;\n        for (Product p : products) {\n            total += p.price;\n        }\n        return total;\n    }\n}\n\n// 2. ShoppingCartPrinter: Only responsible for printing invoices\nclass ShoppingCartPrinter {\n    private ShoppingCart cart;\n\n    public ShoppingCartPrinter(ShoppingCart cart) {\n        this.cart = cart;\n    }\n\n    public void printInvoice() {\n        System.out.println(\"Shopping Cart Invoice:\");\n        for (Product p : cart.getProducts()) {\n            System.out.println(p.name + \" - Rs \" + p.price);\n        }\n        System.out.println(\"Total: Rs \" + cart.calculateTotal());\n    }\n}\n\ninterface Persistence {\n    void save(ShoppingCart cart);\n}\n\nclass SQLPersistence implements Persistence {\n    @Override\n    public void save(ShoppingCart cart) {\n        System.out.println(\"Saving shopping cart to SQL DB...\");\n    }\n}\n\nclass MongoPersistence implements Persistence {\n    @Override\n    public void save(ShoppingCart cart) {\n        System.out.println(\"Saving shopping cart to MongoDB...\");\n    }\n}\n\nclass FilePersistence implements Persistence {\n    @Override\n    public void save(ShoppingCart cart) {\n        System.out.println(\"Saving shopping cart to a file...\");\n    }\n}\n\npublic class OCPFollowed {\n    public static void main(String[] args) {\n        ShoppingCart cart = new ShoppingCart();\n        cart.addProduct(new Product(\"Laptop\", 50000));\n        cart.addProduct(new Product(\"Mouse\", 2000));\n\n        ShoppingCartPrinter printer = new ShoppingCartPrinter(cart);\n        printer.printInvoice();\n\n        Persistence db    = new SQLPersistence();\n        Persistence mongo = new MongoPersistence();\n        Persistence file  = new FilePersistence();\n\n        db.save(cart);    // Save to SQL database\n        mongo.save(cart); // Save to MongoDB\n        file.save(cart);  // Save to File\n    }\n}"
            },
            {
              "label": "DIPFollowed.java",
              "content": "// Abstraction (Interface)\ninterface Database {\n    void save(String data);\n}\n\n// MySQL implementation (Low-level module)\nclass MySQLDatabase implements Database {\n    @Override\n    public void save(String data) {\n        System.out.println(\n            \"Executing SQL Query: INSERT INTO users VALUES('\" \n            + data + \"');\"\n        );\n    }\n}\n\n// MongoDB implementation (Low-level module)\nclass MongoDBDatabase implements Database {\n    @Override\n    public void save(String data) {\n        System.out.println(\n            \"Executing MongoDB Function: db.users.insert({name: '\" \n            + data + \"'})\"\n        );\n    }\n}\n\n// High-level module (Now loosely coupled via Dependency Injection)\nclass UserService {\n    private final Database db;\n\n    public UserService(Database database) {\n        this.db = database;\n    }\n\n    public void storeUser(String user) {\n        db.save(user);\n    }\n}\n\npublic class DIPFollowed {\n    public static void main(String[] args) {\n        MySQLDatabase mysql = new MySQLDatabase();\n        MongoDBDatabase mongodb = new MongoDBDatabase();\n\n        UserService service1 = new UserService(mysql);\n        service1.storeUser(\"Aditya\");\n\n        UserService service2 = new UserService(mongodb);\n        service2.storeUser(\"Rohit\");\n    }\n}"
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "SOLID design principles",
              "url": "https://www.youtube.com/watch?v=UsNl8kcU4UA&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "dry-yagni",
          "title": "DRY and YAGNI",
          "description": "Small engineering principles that control duplication and unnecessary design complexity.",
          "notes": [
            "DRY keeps repeated knowledge in one place so fixes stay consistent.",
            "YAGNI reminds you to design for current requirements and clear extension points, not imaginary future systems.",
            "Together, they help you avoid both copy-paste bugs and over-engineered class hierarchies."
          ],
          "images": [],
          "code": []
        }
      ]
    },
    {
      "id": "patterns",
      "title": "Design Patterns",
      "description": "Reusable object-design patterns with definitions, standard UML, example UML, and Java implementations.",
      "topics": [
        {
          "id": "strategy",
          "title": "Strategy Design",
          "description": "Encapsulate interchangeable behavior behind a common strategy interface.",
          "notes": [
            "1. Encapsulate what Varies & Keep it separate from what remains same.",
            "2. Solution to inheritance is is not more inheritance.",
            "3. Composition should be Focused over inheritance.",
            "4. Code to interface & not to concrete class.",
            "5. Do NOT Repeat Yourself"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/8. StrategyDesign/Standard UML.png"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/8. StrategyDesign/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "StrategyDesignPattern.java",
              "content": "// --- Strategy Interface for Walk ---\ninterface WalkableRobot {\n    void walk();\n}\n\n// --- Concrete Strategies for walk ---\nclass NormalWalk implements WalkableRobot {\n    public void walk() {\n        System.out.println(\"Walking normally...\");\n    }\n}\n\nclass NoWalk implements WalkableRobot {\n    public void walk() {\n        System.out.println(\"Cannot walk.\");\n    }\n}\n\n// --- Strategy Interface for Talk ---\ninterface TalkableRobot {\n    void talk();\n}\n\n// --- Concrete Strategies for Talk ---\nclass NormalTalk implements TalkableRobot {\n    public void talk() {\n        System.out.println(\"Talking normally...\");\n    }\n}\n\nclass NoTalk implements TalkableRobot {\n    public void talk() {\n        System.out.println(\"Cannot talk.\");\n    }\n}\n\n// --- Strategy Interface for Fly ---\ninterface FlyableRobot {\n    void fly();\n}\n\nclass NormalFly implements FlyableRobot {\n    public void fly() {\n        System.out.println(\"Flying normally...\");\n    }\n}\n\nclass NoFly implements FlyableRobot {\n    public void fly() {\n        System.out.println(\"Cannot fly.\");\n    }\n}\n\n// --- Robot Base Class ---\nabstract class Robot {\n    protected WalkableRobot walkBehavior;\n    protected TalkableRobot talkBehavior;\n    protected FlyableRobot flyBehavior;\n\n    public Robot(WalkableRobot w, TalkableRobot t, FlyableRobot f) {\n        this.walkBehavior = w;\n        this.talkBehavior = t;\n        this.flyBehavior = f;\n    }\n\n    public void walk() {\n        walkBehavior.walk();\n    }\n\n    public void talk() {\n        talkBehavior.talk();\n    }\n\n    public void fly() {\n        flyBehavior.fly();\n    }\n\n    public abstract void projection(); // Abstract method for subclasses\n}\n\n// --- Concrete Robot Types ---\nclass CompanionRobot extends Robot {\n    public CompanionRobot(WalkableRobot w, TalkableRobot t, FlyableRobot f) {\n        super(w, t, f);\n    }\n\n    public void projection() {\n        System.out.println(\"Displaying friendly companion features...\");\n    }\n}\n\nclass WorkerRobot extends Robot {\n    public WorkerRobot(WalkableRobot w, TalkableRobot t, FlyableRobot f) {\n        super(w, t, f);\n    }\n\n    public void projection() {\n        System.out.println(\"Displaying worker efficiency stats...\");\n    }\n}\n\n// --- Main Function ---\npublic class StrategyDesignPattern {\n    public static void main(String[] args) {\n        Robot robot1 = new CompanionRobot(new NormalWalk(), new NormalTalk(), new NoFly());\n        robot1.walk();\n        robot1.talk();\n        robot1.fly();\n        robot1.projection();\n\n        System.out.println(\"--------------------\");\n\n        Robot robot2 = new WorkerRobot(new NoWalk(), new NoTalk(), new NormalFly());\n        robot2.walk();\n        robot2.talk();\n        robot2.fly();\n        robot2.projection();\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Encapsulate what varies and keep it separate from what remains the same.",
                "More inheritance is not the solution to inheritance problems.",
                "Prefer composition over inheritance when behavior needs to vary.",
                "Code to an interface, not a concrete class.",
                "Do not repeat yourself."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Strategy design pattern",
              "url": "https://www.youtube.com/watch?v=PpKvPrl_gRg&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "simple-factory",
          "title": "Simple Factory",
          "description": "Move object creation decisions into a focused factory class.",
          "notes": [
            "Move object creation decisions into a focused factory class."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/9. FactoryDesign/SimpleFactory/Standard UML.png"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/9. FactoryDesign/SimpleFactory/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "SimpleFactory.java",
              "content": "// --- Burger Interface ---\ninterface Burger {\n    void prepare();\n}\n\n// --- Concrete Burger Implementations ---\nclass BasicBurger implements Burger {\n    @Override\n    public void prepare() {\n        System.out.println(\"Preparing Basic Burger with bun, patty, and ketchup!\");\n    }\n}\n\nclass StandardBurger implements Burger {\n    @Override\n    public void prepare() {\n        System.out.println(\"Preparing Standard Burger with bun, patty, cheese, and lettuce!\");\n    }\n}\n\nclass PremiumBurger implements Burger {\n    @Override\n    public void prepare() {\n        System.out.println(\"Preparing Premium Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!\");\n    }\n}\n\n// --- Burger Factory ---\nclass BurgerFactory {\n    public Burger createBurger(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicBurger();\n        } else if (type.equalsIgnoreCase(\"standard\")) {\n            return new StandardBurger();\n        } else if (type.equalsIgnoreCase(\"premium\")) {\n            return new PremiumBurger();\n        } else {\n            System.out.println(\"Invalid burger type!\");\n            return null;\n        }\n    }\n}\n\n// --- Main Class ---\npublic class SimpleFactory {\n    public static void main(String[] args) {\n        String type = \"standard\";\n\n        BurgerFactory myBurgerFactory = new BurgerFactory();\n\n        Burger burger = myBurgerFactory.createBurger(type);\n\n        if (burger != null) {\n            burger.prepare();\n        }\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "A factory class decides which concrete class to instantiate."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Factory design pattern",
              "url": "https://www.youtube.com/watch?v=dMK4TbG29fk&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "factory-method",
          "title": "Factory Method",
          "description": "Let subclasses or factory methods decide which concrete product to create.",
          "notes": [
            "Let subclasses or factory methods decide which concrete product to create."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/9. FactoryDesign/FactoryMethod/Standard UML.png"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/9. FactoryDesign/FactoryMethod/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "FactoryMethod.java",
              "content": "// Product Interface and subclasses\ninterface Burger {\n    void prepare();\n}\n\nclass BasicBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Basic Burger with bun, patty, and ketchup!\");\n    }\n}\n\nclass StandardBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Standard Burger with bun, patty, cheese, and lettuce!\");\n    }\n}\n\nclass PremiumBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Premium Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!\");\n    }\n}\n\nclass BasicWheatBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Basic Wheat Burger with bun, patty, and ketchup!\");\n    }\n}\n\nclass StandardWheatBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Standard Wheat Burger with bun, patty, cheese, and lettuce!\");\n    }\n}\n\nclass PremiumWheatBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Premium Wheat Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!\");\n    }\n}\n\n// Factory Interface and Concrete Factories\ninterface BurgerFactory {\n    Burger createBurger(String type);\n}\n\nclass SinghBurger implements BurgerFactory {\n    public Burger createBurger(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicBurger();\n        } else if (type.equalsIgnoreCase(\"standard\")) {\n            return new StandardBurger();\n        } else if (type.equalsIgnoreCase(\"premium\")) {\n            return new PremiumBurger();\n        } else {\n            System.out.println(\"Invalid burger type!\");\n            return null;\n        }\n    }\n}\n\nclass KingBurger implements BurgerFactory {\n    public Burger createBurger(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicWheatBurger();\n        } else if (type.equalsIgnoreCase(\"standard\")) {\n            return new StandardWheatBurger();\n        } else if (type.equalsIgnoreCase(\"premium\")) {\n            return new PremiumWheatBurger();\n        } else {\n            System.out.println(\"Invalid burger type!\");\n            return null;\n        }\n    }\n}\n\n// Main Class\npublic class FactoryMethod {\n    public static void main(String[] args) {\n        String type = \"basic\";\n\n        BurgerFactory myFactory = new SinghBurger();\n        Burger burger = myFactory.createBurger(type);\n\n        if (burger != null) {\n            burger.prepare();\n        }\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Defines an interface for creating objects, but lets subclasses or factory implementations decide which concrete class to instantiate."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Factory design pattern",
              "url": "https://www.youtube.com/watch?v=dMK4TbG29fk&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "abstract-factory",
          "title": "Abstract Factory",
          "description": "Create families of related objects without binding clients to concrete classes.",
          "notes": [
            "Create families of related objects without binding clients to concrete classes."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/9. FactoryDesign/AbstractFactory/Standard UML.png"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/9. FactoryDesign/AbstractFactory/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "AbstractFactory.java",
              "content": "// --- Product 1 --> Burger ---\ninterface Burger {\n    void prepare();\n}\n\nclass BasicBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Basic Burger with bun, patty, and ketchup!\");\n    }\n}\n\nclass StandardBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Standard Burger with bun, patty, cheese, and lettuce!\");\n    }\n}\n\nclass PremiumBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Premium Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!\");\n    }\n}\n\nclass BasicWheatBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Basic Wheat Burger with bun, patty, and ketchup!\");\n    }\n}\n\nclass StandardWheatBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Standard Wheat Burger with bun, patty, cheese, and lettuce!\");\n    }\n}\n\nclass PremiumWheatBurger implements Burger {\n    public void prepare() {\n        System.out.println(\"Preparing Premium Wheat Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!\");\n    }\n}\n\n// --- Product 2 --> GarlicBread ---\ninterface GarlicBread {\n    void prepare();\n}\n\nclass BasicGarlicBread implements GarlicBread {\n    public void prepare() {\n        System.out.println(\"Preparing Basic Garlic Bread with butter and garlic!\");\n    }\n}\n\nclass CheeseGarlicBread implements GarlicBread {\n    public void prepare() {\n        System.out.println(\"Preparing Cheese Garlic Bread with extra cheese and butter!\");\n    }\n}\n\nclass BasicWheatGarlicBread implements GarlicBread {\n    public void prepare() {\n        System.out.println(\"Preparing Basic Wheat Garlic Bread with butter and garlic!\");\n    }\n}\n\nclass CheeseWheatGarlicBread implements GarlicBread {\n    public void prepare() {\n        System.out.println(\"Preparing Cheese Wheat Garlic Bread with extra cheese and butter!\");\n    }\n}\n\n// --- Abstract Factory ---\ninterface MealFactory {\n    Burger createBurger(String type);\n    GarlicBread createGarlicBread(String type);\n}\n\n// --- Concrete Factory 1 ---\nclass SinghBurger implements MealFactory {\n    public Burger createBurger(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicBurger();\n        } else if (type.equalsIgnoreCase(\"standard\")) {\n            return new StandardBurger();\n        } else if (type.equalsIgnoreCase(\"premium\")) {\n            return new PremiumBurger();\n        } else {\n            System.out.println(\"Invalid burger type!\");\n            return null;\n        }\n    }\n\n    public GarlicBread createGarlicBread(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicGarlicBread();\n        } else if (type.equalsIgnoreCase(\"cheese\")) {\n            return new CheeseGarlicBread();\n        } else {\n            System.out.println(\"Invalid Garlic bread type!\");\n            return null;\n        }\n    }\n}\n\n// --- Concrete Factory 2 ---\nclass KingBurger implements MealFactory {\n    public Burger createBurger(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicWheatBurger();\n        } else if (type.equalsIgnoreCase(\"standard\")) {\n            return new StandardWheatBurger();\n        } else if (type.equalsIgnoreCase(\"premium\")) {\n            return new PremiumWheatBurger();\n        } else {\n            System.out.println(\"Invalid burger type!\");\n            return null;\n        }\n    }\n\n    public GarlicBread createGarlicBread(String type) {\n        if (type.equalsIgnoreCase(\"basic\")) {\n            return new BasicWheatGarlicBread();\n        } else if (type.equalsIgnoreCase(\"cheese\")) {\n            return new CheeseWheatGarlicBread();\n        } else {\n            System.out.println(\"Invalid Garlic bread type!\");\n            return null;\n        }\n    }\n}\n\n// --- Main Class ---\npublic class AbstractFactory {\n    public static void main(String[] args) {\n        String burgerType = \"basic\";\n        String garlicBreadType = \"cheese\";\n\n        MealFactory mealFactory = new SinghBurger();\n\n        Burger burger = mealFactory.createBurger(burgerType);\n        GarlicBread garlicBread = mealFactory.createGarlicBread(garlicBreadType);\n\n        if (burger != null) burger.prepare();\n        if (garlicBread != null) garlicBread.prepare();\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Provides an interface for creating families of related objects without specifying their concrete classes."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Factory design pattern",
              "url": "https://www.youtube.com/watch?v=dMK4TbG29fk&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "singleton",
          "title": "Singleton Design",
          "description": "Restrict a class to one shared instance when a single coordinator is genuinely required.",
          "notes": [
            "Singleton classes are made to keep one instance of class/ map/ any object during run to protext from duplicacy and be thread safe.",
            "ThreadSafeDoubleLockingSingleton:",
            "public static ThreadSafeDoubleLockingSingleton getInstance() {",
            "if (instance == null) { // First check (no locking)",
            "synchronized (ThreadSafeDoubleLockingSingleton.class) { // Lock only if needed"
          ],
          "images": [],
          "code": [
            {
              "label": "ThreadSafeDoubleLockingSingleton.java",
              "content": "public class ThreadSafeDoubleLockingSingleton {\n    private static ThreadSafeDoubleLockingSingleton instance = null;\n\n    private ThreadSafeDoubleLockingSingleton() {\n        System.out.println(\"Singleton Constructor Called!\");\n    }\n\n    // Double check locking..\n    public static ThreadSafeDoubleLockingSingleton getInstance() {\n        if (instance == null) { // First check (no locking)\n            synchronized (ThreadSafeDoubleLockingSingleton.class) { // Lock only if needed\n                if (instance == null) { // Second check (after acquiring lock)\n                    instance = new ThreadSafeDoubleLockingSingleton();\n                }\n            }\n        }\n        return instance;\n    }\n\n    public static void main(String[] args) {\n        ThreadSafeDoubleLockingSingleton s1 = ThreadSafeDoubleLockingSingleton.getInstance();\n        ThreadSafeDoubleLockingSingleton s2 = ThreadSafeDoubleLockingSingleton.getInstance();\n\n        System.out.println(s1 == s2);\n    }\n}"
            },
            {
              "label": "ThreadSafeEagerSingleton.java",
              "content": "public class ThreadSafeEagerSingleton {\n    private static ThreadSafeEagerSingleton instance = new ThreadSafeEagerSingleton();\n\n    private ThreadSafeEagerSingleton() {\n        System.out.println(\"Singleton Constructor Called!\");\n    }\n\n    public static ThreadSafeEagerSingleton getInstance() {\n        return instance;\n    }\n\n    public static void main(String[] args) {\n        ThreadSafeEagerSingleton s1 = ThreadSafeEagerSingleton.getInstance();\n        ThreadSafeEagerSingleton s2 = ThreadSafeEagerSingleton.getInstance();\n\n        System.out.println(s1 == s2);\n    }\n}"
            },
            {
              "label": "NoSingleton.java",
              "content": "public class NoSingleton {\n    public NoSingleton() {\n        System.out.println(\"Singleton Constructor called. New Object created.\");\n    }\n\n    public static void main(String[] args) {\n        NoSingleton s1 = new NoSingleton();\n        NoSingleton s2 = new NoSingleton();\n\n        System.out.println(s1 == s2);\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Real-world usage",
              "items": [
                "Logging system",
                "Database connection",
                "Configuration manager"
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Singleton design pattern",
              "url": "https://www.youtube.com/watch?v=CD3meit-WDc&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "observer",
          "title": "Observer Design",
          "description": "Notify many subscribers automatically when an observable object changes.",
          "notes": [
            "Defines a one-to-many relationship between objects so that when one object changes state, all of its dependents are notified, and up dated automatically.",
            "A observer and observable so contain list of observers and observable changed than call method of observer",
            "interface ISubscriber {",
            "void update();",
            "}"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/12. ObserverDesign/Standard UML.jpg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/12. ObserverDesign/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "ObserverDesignPattern.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\n\ninterface ISubscriber {\n    void update();\n}\n\n// Observable interface: a YouTube channel interface\ninterface IChannel {\n    void subscribe(ISubscriber subscriber);\n    void unsubscribe(ISubscriber subscriber);\n    void notifySubscribers();\n}\n\n// Concrete Subject: a YouTube channel that observers can subscribe to\nclass Channel implements IChannel {\n    private List<ISubscriber> subscribers;\n    private String name;\n    private String latestVideo;\n\n    public Channel(String name) {\n        this.name = name;\n        this.subscribers = new ArrayList<>();\n    }\n\n    @Override\n    public void subscribe(ISubscriber subscriber) {\n        if (!subscribers.contains(subscriber)) {\n            subscribers.add(subscriber);\n        }\n    }\n\n    @Override\n    public void unsubscribe(ISubscriber subscriber) {\n        subscribers.remove(subscriber);\n    }\n\n    @Override\n    public void notifySubscribers() {\n        for (ISubscriber sub : subscribers) {\n            sub.update();\n        }\n    }\n\n    public void uploadVideo(String title) {\n        latestVideo = title;\n        System.out.println(\"\\n[\" + name + \" uploaded \\\"\" + title + \"\\\"]\");\n        notifySubscribers();\n    }\n\n    public String getVideoData() {\n        return \"\\nCheckout our new Video : \" + latestVideo + \"\\n\";\n    }\n}\n\n// Concrete Observer: represents a subscriber to the channel\nclass Subscriber implements ISubscriber {\n    private String name;\n    private Channel channel;\n\n    public Subscriber(String name, Channel channel) {\n        this.name = name;\n        this.channel = channel;\n    }\n\n    @Override\n    public void update() {\n        System.out.println(\"Hey \" + name + \",\" + channel.getVideoData());\n    }\n}\n\npublic class ObserverDesignPattern {\n    public static void main(String[] args) {\n        // Create a channel and subscribers\n        Channel channel = new Channel(\"CoderArmy\");\n\n        Subscriber subs1 = new Subscriber(\"Varun\", channel);\n        Subscriber subs2 = new Subscriber(\"Tarun\", channel);\n\n        // Varun and Tarun subscribe to CoderArmy\n        channel.subscribe(subs1);\n        channel.subscribe(subs2);\n\n        // Upload a video: both Varun and Tarun are notified\n        channel.uploadVideo(\"Observer Pattern Tutorial\");\n\n        // Varun unsubscribes; Tarun remains subscribed\n        channel.unsubscribe(subs1);\n\n        // Upload another video: only Tarun is notified\n        channel.uploadVideo(\"Decorator Pattern Tutorial\");\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Defines a one-to-many relationship between objects so that when one object changes state, all of its dependents are notified and updated automatically."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Observer design pattern",
              "url": "https://www.youtube.com/watch?v=Jpmp4GY8r3Q&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "decorator",
          "title": "Decorator Design",
          "description": "Add responsibilities around an object without changing the original class.",
          "notes": [
            "Decorator pattern attaches additional responsibilities to an object dynamically. Decorator provides a flexible alternative to subclassing for extending functionality.",
            "Kind of method over a method where each time we are wrapping a class over another subclass",
            "interface Character {",
            "String getAbilities();",
            "}"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/13. DecoratorDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/13. DecoratorDesign/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "DecoratorPattern.java",
              "content": "// Component Interface: defines a common interface for Mario and all power-up decorators.\ninterface Character {\n    String getAbilities();\n}\n\n// Concrete Component: Basic Mario character with no power-ups.\nclass Mario implements Character {\n    public String getAbilities() {\n        return \"Mario\";\n    }\n}\n\n// Abstract Decorator: CharacterDecorator \"is-a\" Character and \"has-a\" Character.\nabstract class CharacterDecorator implements Character {\n    protected Character character;  // Wrapped component\n\n    public CharacterDecorator(Character c) {\n        this.character = c;\n    }\n}\n\n// Concrete Decorator: Height-Increasing Power-Up.\nclass HeightUp extends CharacterDecorator {\n    public HeightUp(Character c) {\n        super(c);\n    }\n\n    public String getAbilities() {\n        return character.getAbilities() + \" with HeightUp\";\n    }\n}\n\n// Concrete Decorator: Gun Shooting Power-Up.\nclass GunPowerUp extends CharacterDecorator {\n    public GunPowerUp(Character c) {\n        super(c);\n    }\n\n    public String getAbilities() {\n        return character.getAbilities() + \" with Gun\";\n    }\n}\n\n// Concrete Decorator: Star Power-Up (temporary ability).\nclass StarPowerUp extends CharacterDecorator {\n    public StarPowerUp(Character c) {\n        super(c);\n    }\n\n    public String getAbilities() {\n        return character.getAbilities() + \" with Star Power (Limited Time)\";\n    }\n}\n\npublic class DecoratorPattern {\n    public static void main(String[] args) {\n        // Create a basic Mario character.\n        Character mario = new Mario();\n        System.out.println(\"Basic Character: \" + mario.getAbilities());\n\n        // Decorate Mario with a HeightUp power-up.\n        mario = new HeightUp(mario);\n        System.out.println(\"After HeightUp: \" + mario.getAbilities());\n\n        // Decorate Mario further with a GunPowerUp.\n        mario = new GunPowerUp(mario);\n        System.out.println(\"After GunPowerUp: \" + mario.getAbilities());\n\n        // Finally, add a StarPowerUp decoration.\n        mario = new StarPowerUp(mario);\n        System.out.println(\"After StarPowerUp: \" + mario.getAbilities());\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Attaches additional responsibilities to an object dynamically.",
                "Provides a flexible alternative to subclassing for extending functionality."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Decorator design pattern",
              "url": "https://www.youtube.com/watch?v=Z9rFlZClYNI&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "command",
          "title": "Command Design",
          "description": "Represent actions as objects so they can be queued, logged, retried, or undone.",
          "notes": [
            "Encapsulate a Request as an Object, thereby letting you parameterize clients With different request, queue or log request and support undoable operations.",
            "You can control an external device using Command design where each command subclass can control external device",
            "interface Command {",
            "void execute();",
            "void undo();"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/15. CommandDesign/Standard UML.jpg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/15. CommandDesign/Example UML.jpg"
            }
          ],
          "code": [
            {
              "label": "CommandPattern.java",
              "content": "// ----------------------------\n// Command Interface\n// ----------------------------\ninterface Command {\n    void execute();\n    void undo();\n}\n\n// ----------------------------\n// Receivers\n// ----------------------------\nclass Light {\n    public void on()  {\n        System.out.println(\"Light is ON\");\n    }\n    public void off() {\n        System.out.println(\"Light is OFF\");\n    }\n}\n\nclass Fan {\n    public void on()  {\n        System.out.println(\"Fan is ON\");\n    }\n    public void off() {\n        System.out.println(\"Fan is OFF\");\n    }\n}\n\n// ----------------------------\n// Concrete Command for Light\n// ----------------------------\nclass LightCommand implements Command {\n    private Light light;\n\n    public LightCommand(Light l) {\n        this.light = l;\n    }\n\n    public void execute() {\n        light.on();\n    }\n\n    public void undo() {\n        light.off();\n    }\n}\n\n// ----------------------------\n// Concrete Command for Fan\n// ----------------------------\nclass FanCommand implements Command {\n    private Fan fan;\n\n    public FanCommand(Fan f) {\n        this.fan = f;\n    }\n\n    public void execute() {\n        fan.on();\n    }\n\n    public void undo() {\n        fan.off();\n    }\n}\n\n// ----------------------------\n// Invoker: Remote Controller with static array of 4 buttons\n// ----------------------------\nclass RemoteController {\n    private static final int numButtons = 4;\n    private Command[] buttons;\n    private boolean[] buttonPressed;\n\n    public RemoteController() {\n        buttons = new Command[numButtons];\n        buttonPressed = new boolean[numButtons];\n        for (int i = 0; i < numButtons; i++) {\n            buttons[i] = null;\n            buttonPressed[i] = false;  // false = off, true = on\n        }\n    }\n\n    public void setCommand(int idx, Command cmd) {\n        if (idx >= 0 && idx < numButtons) {\n            buttons[idx] = cmd;\n            buttonPressed[idx] = false;\n        }\n    }\n\n    public void pressButton(int idx) {\n        if (idx >= 0 && idx < numButtons && buttons[idx] != null) {\n            if (!buttonPressed[idx]) {\n                buttons[idx].execute();\n            } else {\n                buttons[idx].undo();\n            }\n            buttonPressed[idx] = !buttonPressed[idx];\n        } else {\n            System.out.println(\"No command assigned at button \" + idx);\n        }\n    }\n}\n\n// ----------------------------\n// Main Application\n// ----------------------------\npublic class CommandPattern {\n    public static void main(String[] args) {\n        Light livingRoomLight = new Light();\n        Fan ceilingFan = new Fan();\n\n        RemoteController remote = new RemoteController();\n\n        remote.setCommand(0, new LightCommand(livingRoomLight));\n        remote.setCommand(1, new FanCommand(ceilingFan));\n\n        // Simulate button presses (toggle behavior)\n        System.out.println(\"--- Toggling Light Button 0 ---\");\n        remote.pressButton(0);  // ON\n        remote.pressButton(0);  // OFF\n\n        System.out.println(\"--- Toggling Fan Button 1 ---\");\n        remote.pressButton(1);  // ON\n        remote.pressButton(1);  // OFF\n\n        // Press unassigned button to show default message\n        System.out.println(\"--- Pressing Unassigned Button 2 ---\");\n        remote.pressButton(2);\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Encapsulates a request as an object.",
                "This lets clients parameterize requests, queue or log requests, and support undo behavior."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Command design pattern",
              "url": "https://www.youtube.com/watch?v=cnQZsN0jxEY&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "adapter",
          "title": "Adapter Design",
          "description": "Wrap incompatible APIs behind the interface your system expects.",
          "notes": [
            "Adapter converts the interface of a class into another interface that client expects. Adapter lets classes work together that couldn't otherwise because of incompatible interface.",
            "A pattern to join MS , ES. and changes acc to ES leading to no code change in MS service. MS - Main Service/App, ES- Ext Service",
            "interface IReports {",
            "String getJsonData(String data);",
            "}"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/16. AdapterDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/16. AdapterDesign/Example UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "AdapterPattern.java",
              "content": "// 1. Target interface expected by the client\ninterface IReports {\n    // now takes the raw data string and returns JSON\n    String getJsonData(String data);\n}\n\n// 2. Adaptee: provides XML data from a raw input\nclass XmlDataProvider {\n    // Expect data in \"name:id\" format (e.g. \"Alice:42\")\n    String getXmlData(String data) {\n        int sep = data.indexOf(':');\n        String name = data.substring(0, sep);\n        String id   = data.substring(sep + 1);\n        // Build an XML representation\n        return \"<user>\"\n                + \"<name>\" + name + \"</name>\"\n                + \"<id>\"   + id   + \"</id>\"\n                + \"</user>\";\n    }\n}\n\n// 3. Adapter: implements IReports by converting XML → JSON\nclass XmlDataProviderAdapter implements IReports {\n    private XmlDataProvider xmlProvider;\n    public XmlDataProviderAdapter(XmlDataProvider provider) {\n        this.xmlProvider = provider;\n    }\n\n    public String getJsonData(String data) {\n        // 1. Get XML from the adaptee\n        String xml = xmlProvider.getXmlData(data);\n\n        // 2. Naïvely parse out <name> and <id> values\n        int startName = xml.indexOf(\"<name>\") + 6;\n        int endName   = xml.indexOf(\"</name>\");\n        String name   = xml.substring(startName, endName);\n\n        int startId = xml.indexOf(\"<id>\") + 4;\n        int endId   = xml.indexOf(\"</id>\");\n        String id    = xml.substring(startId, endId);\n\n        // 3. Build and return JSON\n        return \"{\\\"name\\\":\\\"\" + name + \"\\\", \\\"id\\\":\" + id + \"}\";\n    }\n}\n\n// 4. Client code works only with IReports\nclass Client {\n    public void getReport(IReports report, String rawData) {\n        System.out.println(\"Processed JSON: \"\n            + report.getJsonData(rawData));\n    }\n}\n\npublic class AdapterPattern {\n    public static void main(String[] args) {\n        // 1. Create the adaptee\n        XmlDataProvider xmlProv = new XmlDataProvider();\n\n        // 2. Make our adapter\n        IReports adapter = new XmlDataProviderAdapter(xmlProv);\n\n        // 3. Give it some raw data\n        String rawData = \"Alice:42\";\n\n        // 4. Client prints the JSON\n        Client client = new Client();\n\n        client.getReport(adapter, rawData);\n        // → Processed JSON: {\"name\":\"Alice\", \"id\":42}\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Converts the interface of a class into another interface that the client expects.",
                "Lets classes work together even when their existing interfaces are incompatible."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Adapter design pattern",
              "url": "https://www.youtube.com/watch?v=FV3x69rpwm0&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "facade",
          "title": "Facade Design",
          "description": "Expose a simple entry point over a complex subsystem.",
          "notes": [
            "1. Facade pattern provides a simplified, unified interface to a set of Complex subsystem. It hides the complexity of the system and exposes only what is necessary.",
            "2. Facade -> Hides Complexity, Adapter -> Make interaction between 2 complete diff systems",
            "3. **Principle of least Knowledge** (RULES):",
            "Take any object, now from any method in that object, principle tells you to invoke only methods that belong to:",
            "The object itself."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/17. FacadeDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/17. FacadeDesign/Example UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "FacadePattern.java",
              "content": "// Subsystems\nclass PowerSupply {\n    public void providePower() {\n        System.out.println(\"Power Supply: Providing power...\");\n    }\n}\n\nclass CoolingSystem {\n    public void startFans() {\n        System.out.println(\"Cooling System: Fans started...\");\n    }\n}\n\nclass CPU {\n    public void initialize() {\n        System.out.println(\"CPU: Initialization started...\");\n    }\n}\n\nclass Memory {\n    public void selfTest() {\n        System.out.println(\"Memory: Self-test passed...\");\n    }\n}\n\nclass HardDrive {\n    public void spinUp() {\n        System.out.println(\"Hard Drive: Spinning up...\");\n    }\n}\n\nclass BIOS {\n    public void boot(CPU cpu, Memory memory) {\n        System.out.println(\"BIOS: Booting CPU and Memory checks...\");\n        cpu.initialize();\n        memory.selfTest();\n    }\n}\n\nclass OperatingSystem {\n    public void load() {\n        System.out.println(\"Operating System: Loading into memory...\");\n    }\n}\n\n// Facade\nclass ComputerFacade {\n    private PowerSupply powerSupply = new PowerSupply();\n    private CoolingSystem coolingSystem = new CoolingSystem();\n    private CPU cpu = new CPU();\n    private Memory memory = new Memory();\n    private HardDrive hardDrive = new HardDrive();\n    private BIOS bios = new BIOS();\n    private OperatingSystem os = new OperatingSystem();\n\n    public void startComputer() {\n        System.out.println(\"----- Starting Computer -----\");\n        powerSupply.providePower();\n        coolingSystem.startFans();\n        bios.boot(cpu, memory);\n        hardDrive.spinUp();\n        os.load();\n        System.out.println(\"Computer Booted Successfully!\");\n    }\n}\n\n// Client\npublic class FacadePattern {\n    public static void main(String[] args) {\n        ComputerFacade computer = new ComputerFacade();\n        computer.startComputer();\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Provides a simplified, unified interface to a set of complex subsystems.",
                "Hides subsystem complexity and exposes only the operations the client needs."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Facade design pattern",
              "url": "https://www.youtube.com/watch?v=0KlnSdvsojc&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "composite",
          "title": "Composite Design",
          "description": "Treat individual objects and groups through the same interface.",
          "notes": [
            "Composite pattern composes object into tree like structure representing a part-whole hierarchy. It let Client treats individual Object and composition of object uniformly.",
            "All sub classes make a tree like structure where one class has one to one acting as child node and other as one to many acting as nodes.",
            "interface FileSystemItem {",
            "void ls(int indent);",
            "void openAll(int indent);"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/19. CompositeDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/19. CompositeDesign/Example UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "CompositePattern.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\n\n// Base interface for files and folders\ninterface FileSystemItem {\n    void ls(int indent);            \n    void openAll(int indent);      \n    int getSize();                  \n    FileSystemItem cd(String name); \n    String getName();\n    boolean isFolder();\n}\n\n// Leaf: File\nclass File implements FileSystemItem {\n    private String name;\n    private int size;\n\n    public File(String n, int s) {\n        name = n;\n        size = s;\n    }\n\n    @Override\n    public void ls(int indent) {\n        String indentSpaces = \" \".repeat(indent);\n        System.out.println(indentSpaces + name);\n    }\n\n    @Override\n    public void openAll(int indent) {\n        String indentSpaces = \" \".repeat(indent);\n        System.out.println(indentSpaces + name);\n    }\n\n    @Override\n    public int getSize() {\n        return size;\n    }\n\n    @Override\n    public FileSystemItem cd(String name) {\n        return null;\n    }\n\n    @Override\n    public String getName() {\n        return name;\n    }\n\n    @Override\n    public boolean isFolder() {\n        return false;\n    }\n}\n\nclass Folder implements FileSystemItem {\n    private String name;\n    private List<FileSystemItem> children;\n\n    public Folder(String n) {\n        name = n;\n        children = new ArrayList<>();\n    }\n\n    public void add(FileSystemItem item) {\n        children.add(item);\n    }\n\n    @Override\n    public void ls(int indent) {\n        String indentSpaces = \" \".repeat(indent);\n        for (FileSystemItem child : children) {\n            if (child.isFolder()) {\n                System.out.println(indentSpaces + \"+ \" + child.getName());\n            } else {\n                System.out.println(indentSpaces + child.getName());\n            }\n        }\n    }\n\n    @Override\n    public void openAll(int indent) {\n        String indentSpaces = \" \".repeat(indent);\n        System.out.println(indentSpaces + \"+ \" + name);\n        for (FileSystemItem child : children) {\n            child.openAll(indent + 4);\n        }\n    }\n\n    @Override\n    public int getSize() {\n        int total = 0;\n        for (FileSystemItem child : children) {\n            total += child.getSize();\n        }\n        return total;\n    }\n\n    @Override\n    public FileSystemItem cd(String target) {\n        for (FileSystemItem child : children) {\n            if (child.isFolder() && child.getName().equals(target)) {\n                return child;\n            }\n        }\n        // not found or not a folder\n        return null;\n    }\n\n    @Override\n    public String getName() {\n        return name;\n    }\n\n    @Override\n    public boolean isFolder() {\n        return true;\n    }\n}\n\npublic class CompositePattern {\n    public static void main(String[] args) {\n        // Build file system\n        Folder root = new Folder(\"root\");\n        root.add(new File(\"file1.txt\", 1));\n        root.add(new File(\"file2.txt\", 1));\n\n        Folder docs = new Folder(\"docs\");\n        docs.add(new File(\"resume.pdf\", 1));\n        docs.add(new File(\"notes.txt\", 1));\n        root.add(docs);\n\n        Folder images = new Folder(\"images\");\n        images.add(new File(\"photo.jpg\", 1));\n        root.add(images);\n\n        root.ls(0);\n\n        docs.ls(0);\n\n        root.openAll(0);\n\n        FileSystemItem cwd = root.cd(\"docs\");\n        if (cwd != null) {\n            cwd.ls(0);\n        } else {\n            System.out.println(\"\\nCould not cd into docs\\n\");\n        }\n\n        System.out.println(root.getSize());\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Composes objects into tree-like structures to represent part-whole hierarchies.",
                "Lets clients treat individual objects and object compositions uniformly."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Composite design pattern",
              "url": "https://www.youtube.com/watch?v=xaaiMGmyDJk&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "template",
          "title": "Template Method Design",
          "description": "Fix an algorithm skeleton while letting subclasses fill selected steps.",
          "notes": [
            "Fix an algorithm skeleton while letting subclasses fill selected steps."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/20. TemplateDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/20. TemplateDesign/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "TemplateMethodPattern.java",
              "content": "// ───────────────────────────────────────────────────────────\n// 1. Base class defining the template method\n// ───────────────────────────────────────────────────────────\nabstract class ModelTrainer {\n    // The template method — final so subclasses can’t change the sequence\n    public final void trainPipeline(String dataPath) {\n        loadData(dataPath);\n        preprocessData();\n        trainModel();      // subclass-specific\n        evaluateModel();   // subclass-specific\n        saveModel();       // subclass-specific or default\n    }\n\n    protected void loadData(String path) {\n        System.out.println(\"[Common] Loading dataset from \" + path);\n        // e.g., read CSV, images, etc.\n    }\n\n    protected void preprocessData() {\n        System.out.println(\"[Common] Splitting into train/test and normalizing\");\n    }\n\n    protected abstract void trainModel();\n    protected abstract void evaluateModel();\n\n    // Provide a default save, but subclasses can override if needed\n    protected void saveModel() {\n        System.out.println(\"[Common] Saving model to disk as default format\");\n    }\n}\n\n// ───────────────────────────────────────────────────────────\n// 2. Concrete subclass: Neural Network\n// ───────────────────────────────────────────────────────────\nclass NeuralNetworkTrainer extends ModelTrainer {\n    @Override\n    protected void trainModel() {\n        System.out.println(\"[NeuralNet] Training Neural Network for 100 epochs\");\n        // pseudo-code: forward/backward passes, gradient descent...\n    }\n\n    @Override\n    protected void evaluateModel() {\n        System.out.println(\"[NeuralNet] Evaluating accuracy and loss on validation set\");\n    }\n\n    @Override\n    protected void saveModel() {\n        System.out.println(\"[NeuralNet] Serializing network weights to .h5 file\");\n    }\n}\n\n// ───────────────────────────────────────────────────────────\n// 3. Concrete subclass: Decision Tree\n// ───────────────────────────────────────────────────────────\nclass DecisionTreeTrainer extends ModelTrainer {\n    // Use the default preprocessData() (train/test split + normalize)\n\n    @Override\n    protected void trainModel() {\n        System.out.println(\"[DecisionTree] Building decision tree with max_depth=5\");\n        // pseudo-code: recursive splitting on features...\n    }\n\n    @Override\n    protected void evaluateModel() {\n        System.out.println(\"[DecisionTree] Computing classification report (precision/recall)\");\n    }\n    // use the default saveModel()\n}\n\n// ───────────────────────────────────────────────────────────\n// 4. Usage\n// ───────────────────────────────────────────────────────────\npublic class TemplateMethodPattern {\n    public static void main(String[] args) {\n        System.out.println(\"=== Neural Network Training ===\");\n        ModelTrainer nnTrainer = new NeuralNetworkTrainer();\n        nnTrainer.trainPipeline(\"data/images/\");\n\n        System.out.println(\"\\n=== Decision Tree Training ===\");\n        ModelTrainer dtTrainer = new DecisionTreeTrainer();\n        dtTrainer.trainPipeline(\"data/iris.csv\");\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Defines the skeleton of an algorithm in a base operation.",
                "Lets subclasses redefine selected steps without changing the overall algorithm structure."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Template method pattern",
              "url": "https://www.youtube.com/watch?v=8-vE_bmEt18&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "chain-of-responsibility",
          "title": "Chain of Responsibility",
          "description": "Pass a request through handlers until one handles it.",
          "notes": [
            "Pass a request through handlers until one handles it."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/22. ChainOfResponsiblityDesign/Standard UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "COR.java",
              "content": "abstract class MoneyHandler {\n    protected MoneyHandler nextHandler;\n\n    public MoneyHandler() {\n        this.nextHandler = null;\n    }\n\n    public void setNextHandler(MoneyHandler next) {\n        this.nextHandler = next;\n    }\n\n    public abstract void dispense(int amount);\n}\n\nclass ThousandHandler extends MoneyHandler {\n    private int numNotes;\n\n    public ThousandHandler(int numNotes) {\n        this.numNotes = numNotes;\n    }\n\n    @Override\n    public void dispense(int amount) {\n        int notesNeeded = amount / 1000;\n\n        if (notesNeeded > numNotes) {\n            notesNeeded = numNotes;\n            numNotes = 0;\n        } else {\n            numNotes -= notesNeeded;\n        }\n\n        if (notesNeeded > 0)\n            System.out.println(\"Dispensing \" + notesNeeded + \" x ₹1000 notes.\");\n\n        int remainingAmount = amount - (notesNeeded * 1000);\n        if (remainingAmount > 0) {\n            if (nextHandler != null) nextHandler.dispense(remainingAmount);\n            else {\n                System.out.println(\"Remaining amount of \" + remainingAmount + \" cannot be fulfilled (Insufficinet fund in ATM)\");\n            }\n        }\n    }\n}\n\nclass FiveHundredHandler extends MoneyHandler {\n    private int numNotes;\n\n    public FiveHundredHandler(int numNotes) {\n        this.numNotes = numNotes;\n    }\n\n    @Override\n    public void dispense(int amount) {\n        int notesNeeded = amount / 500;\n\n        if (notesNeeded > numNotes) {\n            notesNeeded = numNotes;\n            numNotes = 0;\n        } else {\n            numNotes -= notesNeeded;\n        }\n\n        if (notesNeeded > 0)\n            System.out.println(\"Dispensing \" + notesNeeded + \" x ₹500 notes.\");\n\n        int remainingAmount = amount - (notesNeeded * 500);\n        if (remainingAmount > 0) {\n            if (nextHandler != null) nextHandler.dispense(remainingAmount);\n            else {\n                System.out.println(\"Remaining amount of \" + remainingAmount + \" cannot be fulfilled (Insufficinet fund in ATM)\");\n            }\n        }\n    }\n}\n\nclass TwoHundredHandler extends MoneyHandler {\n    private int numNotes;\n\n    public TwoHundredHandler(int numNotes) {\n        this.numNotes = numNotes;\n    }\n\n    @Override\n    public void dispense(int amount) {\n        int notesNeeded = amount / 200;\n\n        if (notesNeeded > numNotes) {\n            notesNeeded = numNotes;\n            numNotes = 0;\n        } else {\n            numNotes -= notesNeeded;\n        }\n\n        if (notesNeeded > 0)\n            System.out.println(\"Dispensing \" + notesNeeded + \" x ₹200 notes.\");\n\n        int remainingAmount = amount - (notesNeeded * 200);\n        if (remainingAmount > 0) {\n            if (nextHandler != null) nextHandler.dispense(remainingAmount);\n            else {\n                System.out.println(\"Remaining amount of \" + remainingAmount + \" cannot be fulfilled (Insufficinet fund in ATM)\");\n            }\n        }\n    }\n}\n\nclass HundredHandler extends MoneyHandler {\n    private int numNotes;\n\n    public HundredHandler(int numNotes) {\n        this.numNotes = numNotes;\n    }\n\n    @Override\n    public void dispense(int amount) {\n        int notesNeeded = amount / 100;\n\n        if (notesNeeded > numNotes) {\n            notesNeeded = numNotes;\n            numNotes = 0;\n        } else {\n            numNotes -= notesNeeded;\n        }\n\n        if (notesNeeded > 0)\n            System.out.println(\"Dispensing \" + notesNeeded + \" x ₹100 notes.\");\n\n        int remainingAmount = amount - (notesNeeded * 100);\n        if (remainingAmount > 0) {\n            if (nextHandler != null) nextHandler.dispense(remainingAmount);\n            else {\n                System.out.println(\"Remaining amount of \" + remainingAmount + \" cannot be fulfilled (Insufficinet fund in ATM)\");\n            }\n        }\n    }\n}\n\npublic class COR {\n    public static void main(String[] args) {\n        MoneyHandler thousandHandler = new ThousandHandler(3);\n        MoneyHandler fiveHundredHandler = new FiveHundredHandler(5);\n        MoneyHandler twoHundredHandler = new TwoHundredHandler(10);\n        MoneyHandler hundredHandler = new HundredHandler(20);\n\n        thousandHandler.setNextHandler(fiveHundredHandler);\n        fiveHundredHandler.setNextHandler(twoHundredHandler);\n        twoHundredHandler.setNextHandler(hundredHandler);\n\n        int amountToWithdraw = 4000;\n\n        System.out.println(\"\\nDispensing amount: ₹\" + amountToWithdraw);\n        thousandHandler.dispense(amountToWithdraw);\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Allows an object to pass a request along a chain of potential handlers.",
                "Each handler decides whether to process the request or pass it to the next handler."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Chain of responsibility pattern",
              "url": "https://www.youtube.com/watch?v=LXVKB6deQMo&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "bridge",
          "title": "Bridge Design",
          "description": "Separate abstraction from implementation so both can evolve independently.",
          "notes": [
            "Bridge decouples an abstractions from its implementations, so that both Can vary independently.",
            "1. Abstractions -> High level layer. (Car)",
            "2. Implementations: low level layers (Engine)",
            "2 parallel interface where car has multiple cars and engine has multiple engines. than between both interface many to many mapping leading a bridge.",
            "for ex 3 cars, 3 engines"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/25. BridgeDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/25. BridgeDesign/Example UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "BridgePattern.java",
              "content": "// Implementation Hierarchy: Engine interface (LLL)\ninterface Engine {\n    void start();\n}\n\n// Concrete Implementors (LLL)\nclass PetrolEngine implements Engine {\n    @Override\n    public void start() {\n        System.out.println(\"Petrol engine starting with ignition!\");\n    }\n}\n\nclass DieselEngine implements Engine {\n    @Override\n    public void start() {\n        System.out.println(\"Diesel engine roaring to life!\");\n    }\n}\n\nclass ElectricEngine implements Engine {\n    @Override\n    public void start() {\n        System.out.println(\"Electric engine powering up silently!\");\n    }\n}\n\n// Abstraction Hierarchy: Car (HLL)\nabstract class Car {\n    protected Engine engine;\n    public Car(Engine e) {\n        this.engine = e;\n    }\n    public abstract void drive();\n}\n\n// Refined Abstraction: Sedan\nclass Sedan extends Car {\n    public Sedan(Engine e) {\n        super(e);\n    }\n\n    @Override\n    public void drive() {\n        engine.start();\n        System.out.println(\"Driving a Sedan on the highway.\");\n    }\n}\n\n// Refined Abstraction: SUV\nclass SUV extends Car {\n    public SUV(Engine e) {\n        super(e);\n    }\n\n    @Override\n    public void drive() {\n        engine.start();\n        System.out.println(\"Driving an SUV off-road.\");\n    }\n}\n\npublic class BridgePattern {\n    public static void main(String[] args) {\n        // Create Engine implementations\n        Engine petrolEng = new PetrolEngine();\n        Engine dieselEng = new DieselEngine();\n        Engine electricEng = new ElectricEngine();\n\n        // Create Car abstractions, injecting Engine implementations\n        Car mySedan = new Sedan(petrolEng);\n        Car mySUV = new SUV(electricEng);\n        Car yourSUV = new SUV(dieselEng);\n\n        // Use the cars\n        mySedan.drive();   // Petrol engine + Sedan\n        mySUV.drive();     // Electric engine + SUV\n        yourSUV.drive();   // Diesel engine + SUV\n\n        // No explicit cleanup needed in Java\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Decouples an abstraction from its implementation so both can vary independently.",
                "The abstraction represents the high-level control layer, while the implementation represents the low-level work."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Bridge design pattern",
              "url": "https://www.youtube.com/watch?v=KVf8dwgTbiM&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "builder",
          "title": "Builder Design",
          "description": "Construct complex objects step by step without exposing messy constructors.",
          "notes": [
            "Builder separates the construction of a complex Object from its Representation.",
            "Simple builder return everytime whole builder by return this and completes at build method.",
            "Director just helps in creating predefined builds",
            "but in step builder we restrict user to have method by method call by returning next sub class by making all as concrete class of main.",
            "1. Simple Builder:"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/28. BuilderDesign/Standard UML1.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/28. BuilderDesign/Standard UML2.jpeg"
            }
          ],
          "code": [
            {
              "label": "HttpRequest.java",
              "content": "package simpleBuilder;\n\nimport java.util.*;\n\npublic class HttpRequest {\n    private String url;\n    private String method;\n    private Map<String, String> headers;\n    private Map<String,String> queryParams;\n    private String body;\n    private int timeout; // in seconds\n\n    // Private constructor - can only be accessed by the Builder\n    HttpRequest() {\n        headers = new HashMap<>();\n        queryParams = new HashMap<>();\n        body = \"\";\n    }\n\n    // Method to execute the HTTP request\n    public void execute() {\n        System.out.println(\"Executing \" + method + \" request to \" + url);\n\n        if (!queryParams.isEmpty()) {\n            System.out.println(\"Query Parameters:\");\n            for (Map.Entry<String, String> param : queryParams.entrySet()) {\n                System.out.println(\"  \" + param.getKey() + \"=\" + param.getValue());\n            }\n        }\n\n        System.out.println(\"Headers:\");\n        for (Map.Entry<String, String> header : headers.entrySet()) {\n            System.out.println(\"  \" + header.getKey() + \": \" + header.getValue());\n        }\n\n        if (body != null && !body.isEmpty()) {\n            System.out.println(\"Body: \" + body);\n        }\n\n        System.out.println(\"Timeout: \" + timeout + \" seconds\");\n        System.out.println(\"Request executed successfully!\");\n    }\n\n    // Builder class as a nested class to access private members\n    public static class HttpRequestBuilder {\n        private HttpRequest req;\n\n        public HttpRequestBuilder() {\n            req = new HttpRequest();\n        }\n\n        // Method chaining\n        public HttpRequestBuilder withUrl(String u) {\n            req.url = u;\n            return this;\n        }\n\n        public HttpRequestBuilder withMethod(String method) {\n            req.method = method;\n            return this;\n        }\n\n        public HttpRequestBuilder withHeader(String key, String value) {\n            req.headers.put(key, value);\n            return this;\n        }\n\n        public HttpRequestBuilder withQueryParams(String key, String value) {\n            req.queryParams.put(key, value);\n            return this;\n        }\n\n        public HttpRequestBuilder withBody(String body) {\n            req.body = body;\n            return this;\n        }\n\n        public HttpRequestBuilder withTimeout(int timeout) {\n            req.timeout = timeout;\n            return this;\n        }\n\n        // Build method to create the immutable HttpRequest object\n        public HttpRequest build() {\n            // Validation logic can be added here\n            if (req.url == null || req.url.isEmpty()) {\n                throw new RuntimeException(\"URL cannot be empty\");\n            }\n            return req;\n        }\n    }\n}"
            },
            {
              "label": "HttpRequest.java",
              "content": "package stepBuilder;\n\nimport java.util.*;\n\npublic class HttpRequest {\n    private String url;\n    private String method;\n    private Map<String, String> headers;\n    private Map<String, String> queryParams;\n    private String body;\n    private int timeout; // in seconds\n\n    // Private constructor - can only be accessed by the Builder\n    private HttpRequest() {\n        headers = new HashMap<>();\n        queryParams = new HashMap<>();\n        body = \"\";\n    }\n\n    // Method to execute the HTTP request\n    public void execute() {\n        System.out.println(\"Executing \" + method + \" request to \" + url);\n\n        if (!queryParams.isEmpty()) {\n            System.out.println(\"Query Parameters:\");\n            for (Map.Entry<String, String> param : queryParams.entrySet()) {\n                System.out.println(\"  \" + param.getKey() + \"=\" + param.getValue());\n            }\n        }\n\n        System.out.println(\"Headers:\");\n        for (Map.Entry<String, String> header : headers.entrySet()) {\n            System.out.println(\"  \" + header.getKey() + \": \" + header.getValue());\n        }\n\n        if (!body.isEmpty()) {\n            System.out.println(\"Body: \" + body);\n        }\n\n        System.out.println(\"Timeout: \" + timeout + \" seconds\");\n        System.out.println(\"Request executed successfully!\");\n    }\n\n    // Nested Step interfaces\n    interface UrlStep {\n        MethodStep withUrl(String url);\n    }\n\n    interface MethodStep {\n        HeaderStep withMethod(String method);\n    }\n\n    interface HeaderStep {\n        OptionalStep withHeader(String key, String value);\n    }\n\n    interface OptionalStep {\n        OptionalStep withBody(String body);\n        OptionalStep withTimeout(int timeout);\n        HttpRequest build();\n    }\n\n    // Concrete step builder as static nested class\n    static class HttpRequestStepBuilder implements UrlStep, MethodStep, HeaderStep, OptionalStep {\n        private HttpRequest req;\n\n        private HttpRequestStepBuilder() {\n            req = new HttpRequest();\n        }\n\n        // UrlStep implementation\n        public MethodStep withUrl(String url) {\n            req.url = url;\n            return this;\n        }\n\n        // MethodStep implementation\n        public HeaderStep withMethod(String method) {\n            req.method = method;\n            return this;\n        }\n\n        // HeaderStep implementation\n        public OptionalStep withHeader(String key, String value) {\n            req.headers.put(key, value);\n            return this;\n        }\n\n        // OptionalStep implementation\n        public OptionalStep withBody(String body) {\n            req.body = body;\n            return this;\n        }\n\n        public OptionalStep withTimeout(int timeout) {\n            req.timeout = timeout;\n            return this;\n        }\n\n        public HttpRequest build() {\n            if (req.url == null || req.url.isEmpty()) {\n                throw new RuntimeException(\"URL cannot be empty\");\n            }\n            return req;\n        }\n\n        // Static method to start the building process\n        public static UrlStep getBuilder() {\n            return new HttpRequestStepBuilder();\n        }\n    }\n}"
            },
            {
              "label": "HttpRequest.java",
              "content": "package builderWithDirector;\n\nimport java.util.*;\n\npublic class HttpRequest {\n    private String url;\n    private String method;\n    private Map<String, String> headers;\n    private Map<String,String> queryParams;\n    private String body;\n    private int timeout; // in seconds\n\n    // Private constructor - can only be accessed by the Builder\n    HttpRequest() {\n        headers = new HashMap<>();\n        queryParams = new HashMap<>();\n        body = \"\";\n    }\n\n    // Method to execute the HTTP request\n    public void execute() {\n        System.out.println(\"Executing \" + method + \" request to \" + url);\n\n        if (!queryParams.isEmpty()) {\n            System.out.println(\"Query Parameters:\");\n            for (Map.Entry<String,String> param : queryParams.entrySet()) {\n                System.out.println(\"  \" + param.getKey() + \"=\" + param.getValue());\n            }\n        }\n\n        System.out.println(\"Headers:\");\n        for (Map.Entry<String,String> header : headers.entrySet()) {\n            System.out.println(\"  \" + header.getKey() + \": \" + header.getValue());\n        }\n\n        if (body != null && !body.isEmpty()) {\n            System.out.println(\"Body: \" + body);\n        }\n\n        System.out.println(\"Timeout: \" + timeout + \" seconds\");\n        System.out.println(\"Request executed successfully!\");\n    }\n\n    // Builder class as a nested class\n    public static class HttpRequestBuilder {\n        private HttpRequest req;\n\n        public HttpRequestBuilder() {\n            req = new HttpRequest();\n        }\n\n        // Method chaining\n        public HttpRequestBuilder withUrl(String u) {\n            req.url = u; return this;\n        }\n\n        public HttpRequestBuilder withMethod(String method) {\n            req.method = method;\n            return this;\n        }\n\n        public HttpRequestBuilder withHeader(String key, String value) {\n            req.headers.put(key, value);\n            return this;\n        }\n\n        public HttpRequestBuilder withQueryParams(String key, String value) {\n            req.queryParams.put(key, value);\n            return this;\n        }\n\n        public HttpRequestBuilder withBody(String body) {\n            req.body = body;\n            return this;\n        }\n\n        public HttpRequestBuilder withTimeout(int timeout) {\n            req.timeout = timeout;\n            return this;\n        }\n\n        // Build method to create the immutable HttpRequest object\n        public HttpRequest build() {\n            // Validation logic can be added here\n            if (req.url == null || req.url.isEmpty()) {\n                throw new RuntimeException(\"URL cannot be empty\");\n            }\n            return req;\n        }\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Separates the construction of a complex object from its representation."
              ]
            }
          ]
        },
        {
          "id": "iterator",
          "title": "Iterator Design",
          "description": "Traverse a collection without exposing its internal representation.",
          "notes": [
            "Iterator provides a way to access the elements of an aggregate objects sequentially without exposing its underlying representation.",
            "kind of next iterator defined like tree ll or playlist next songs",
            "interface Iterator<T> {",
            "boolean hasNext();",
            "T next();"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/29. IteratorDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/29. IteratorDesign/Example UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "IteratorPattern.java",
              "content": "import java.util.*;\n\ninterface Iterator<T> {\n    boolean hasNext();\n    T next();\n}\n\ninterface Iterable<T> {\n    Iterator<T> getIterator();\n}\n\n// Linked List\nclass LinkedList implements Iterable<Integer> {\n    public int data;\n    public LinkedList next;\n\n    public LinkedList(int value) {\n        data = value;\n        next = null;\n    }\n\n    public Iterator<Integer> getIterator() {\n        return new LinkedListIterator(this);\n    }\n}\n\n// Binary Tree\nclass BinaryTree implements Iterable<Integer> {\n    public int data;\n    public BinaryTree left;\n    public BinaryTree right;\n\n    public BinaryTree(int value) {\n        data = value;\n        left = null;\n        right = null;\n    }\n\n    public Iterator<Integer> getIterator() {\n        return new BinaryTreeInorderIterator(this);\n    }\n}\n\n// Song and Playlist\nclass Song {\n    public String title;\n    public String artist;\n\n    public Song(String t, String a) {\n        title = t;\n        artist = a;\n    }\n}\n\nclass Playlist implements Iterable<Song> {\n    public List<Song> songs = new ArrayList<>();\n\n    public void addSong(Song s) {\n        songs.add(s);\n    }\n\n    public Iterator<Song> getIterator() {\n        return new PlaylistIterator(songs);\n    }\n}\n\n// Concrete Iterators\n\nclass LinkedListIterator implements Iterator<Integer> {\n    private LinkedList current;\n\n    public LinkedListIterator(LinkedList head) {\n        current = head;\n    }\n\n    public boolean hasNext() {\n        return current != null;\n    }\n\n    public Integer next() {\n        int val = current.data;\n        current = current.next;\n        return val;\n    }\n}\n\nclass BinaryTreeInorderIterator implements Iterator<Integer> {\n    private Deque<BinaryTree> stk = new ArrayDeque<>();\n\n    private void pushLefts(BinaryTree node) {\n        while (node != null) {\n            stk.push(node);\n            node = node.left;\n        }\n    }\n\n    public BinaryTreeInorderIterator(BinaryTree root) {\n        pushLefts(root);\n    }\n\n    public boolean hasNext() {\n        return !stk.isEmpty();\n    }\n\n    public Integer next() {\n        BinaryTree node = stk.pop();\n        int val = node.data;\n        if (node.right != null) {\n            pushLefts(node.right);\n        }\n        return val;\n    }\n}\n\nclass PlaylistIterator implements Iterator<Song> {\n    private List<Song> vec;\n    private int index = 0;\n\n    public PlaylistIterator(List<Song> v) {\n        vec = v;\n    }\n\n    public boolean hasNext() {\n        return index < vec.size();\n    }\n\n    public Song next() {\n        return vec.get(index++);\n    }\n}\n\n// Main\npublic class IteratorPattern {\n    public static void main(String[] args) {\n        //------------------------------------------------\n        // LinkedList: 1 → 2 → 3\n        LinkedList list = new LinkedList(1);\n        list.next = new LinkedList(2);\n        list.next.next = new LinkedList(3);\n\n        Iterator<Integer> iterator1 = list.getIterator();\n\n        System.out.print(\"LinkedList contents: \");\n        while (iterator1.hasNext()) {\n            System.out.print(iterator1.next() + \" \");\n        }\n        System.out.println();\n\n        //------------------------------------------------\n\n        // BinaryTree:\n        //    2\n        //   / \\\n        //  1   3\n        BinaryTree root = new BinaryTree(2);\n        root.left  = new BinaryTree(1);\n        root.right = new BinaryTree(3);\n\n        Iterator<Integer> iterator2 = root.getIterator();\n\n        System.out.print(\"BinaryTree inorder: \");\n        while (iterator2.hasNext()) {\n            System.out.print(iterator2.next() + \" \");\n        }\n        System.out.println();\n\n        //------------------------------------------------\n\n        // Playlist\n        Playlist playlist = new Playlist();\n        playlist.addSong(new Song(\"Admirin You\", \"Karan Aujla\"));\n        playlist.addSong(new Song(\"Husn\", \"Anuv Jain\"));\n\n        Iterator<Song> iterator3 = playlist.getIterator();\n\n        System.out.println(\"Playlist songs:\");\n        while (iterator3.hasNext()) {\n            Song s = iterator3.next();\n            System.out.println(\"  \" + s.title + \" by \" + s.artist);\n        }\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Provides a way to access elements of an aggregate object sequentially without exposing its underlying representation."
              ]
            }
          ]
        },
        {
          "id": "flyweight",
          "title": "Flyweight Design",
          "description": "Share intrinsic state to reduce memory for many similar objects.",
          "notes": [
            "Flyweight uses sharing to support large number of fine gained objects efficiently.",
            "1. Intrinsic State: (Shared among Objects)",
            "2. Extrinsic state : (Supplied by client externally)",
            "To reuse created objects by making a set of object categories in 2 sets. one which can be same after some sets and one which is unique.",
            "leads to stop unnecessary object creation along with space optimization"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/30. FlyweightDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/30. FlyweightDesign/Example UML.png"
            }
          ],
          "code": [
            {
              "label": "WithFlyWeight.java",
              "content": "import java.util.*;\n\n// Flyweight - Stores INTRINSIC state only\nclass AsteroidFlyweight {\n    // Intrinsic properties (shared among asteroids of same type)\n    private int length;          \n    private int width;           \n    private int weight;          \n    private String color;       \n    private String texture;      \n    private String material;    \n\n    public AsteroidFlyweight(int l, int w, int wt, String col, String tex, String mat) {\n        this.length = l;\n        this.width = w;\n        this.weight = wt;\n        this.color = col;\n        this.texture = tex;\n        this.material = mat;\n    }\n\n    public void render(int posX, int posY, int velocityX, int velocityY) {\n        System.out.println(\"Rendering \" + color + \", \" + texture + \", \" + material \n            + \" asteroid at (\" + posX + \",\" + posY \n            + \") Size: \" + length + \"x\" + width\n            + \" Velocity: (\" + velocityX + \", \" \n            + velocityY + \")\");\n    }\n\n    public static long getMemoryUsage() {\n        return Integer.BYTES * 3 +            // length, width, weight\n                40 * 3;                       // Approximate string data\n    }\n}\n\n// Flyweight Factory\nclass AsteroidFactory {\n    private static Map<String, AsteroidFlyweight> flyweights = new HashMap<>();\n\n    public static AsteroidFlyweight getAsteroid(int length, int width, int weight, \n                                                String color, String texture, String material) {\n\n        String key = length + \"_\" + width + \"_\" + weight + \"_\" + color + \"_\" + texture + \"_\" + material;\n\n        if (!flyweights.containsKey(key)) {\n            flyweights.put(key, new AsteroidFlyweight(length, width, weight, color, texture, material));\n        }\n\n        return flyweights.get(key);\n    }\n\n    public static int getFlyweightCount() {\n        return flyweights.size();\n    }\n\n    public static long getTotalFlyweightMemory() {\n        return flyweights.size() * AsteroidFlyweight.getMemoryUsage();\n    }\n\n    public static void cleanup() {\n        flyweights.clear();\n    }\n}\n\n// Context - Stores EXTRINSIC state only\nclass AsteroidContext {\n    private AsteroidFlyweight flyweight;\n    private int posX, posY; // 8 bytes (position)\n    private int velocityX, velocityY; // 8 bytes (velocity)\n\n    public AsteroidContext(AsteroidFlyweight fw, int posX, int posY, int velX, int velY) {\n        this.flyweight = fw;\n        this.posX = posX;\n        this.posY = posY;\n        this.velocityX = velX;\n        this.velocityY = velY;\n    }\n\n    public void render() {\n        flyweight.render(posX, posY, velocityX, velocityY);\n    }\n\n    public static long getMemoryUsage() {\n        return 8 + Integer.BYTES * 4; // approximate pointer + ints\n    }\n}\n\nclass SpaceGameWithFlyweight {\n    private List<AsteroidContext> asteroids = new ArrayList<>();\n\n    public void spawnAsteroids(int count) {\n        System.out.println(\"\\n=== Spawning \" + count + \" asteroids ===\");\n\n        String[] colors = {\"Red\", \"Blue\", \"Gray\"};\n        String[] textures = {\"Rocky\", \"Metallic\", \"Icy\"};\n        String[] materials = {\"Iron\", \"Stone\", \"Ice\"};\n        int[] sizes = {25, 35, 45};\n\n        for (int i = 0; i < count; i++) {\n            int type = i % 3;\n\n            AsteroidFlyweight flyweight = AsteroidFactory.getAsteroid(\n                sizes[type], sizes[type], sizes[type] * 10,\n                colors[type], textures[type], materials[type]\n            );\n\n            asteroids.add(new AsteroidContext(\n                flyweight,\n                100 + i * 50, // Simple x: 100, 150, 200, 250...\n                200 + i * 30, // Simple y: 200, 230, 260, 290...\n                1, // All move right with velocity 1\n                2  // All move down with velocity 2\n            ));\n        }\n\n        System.out.println(\"Created \" + asteroids.size() + \" asteroid contexts\");\n        System.out.println(\"Total flyweight objects: \" + AsteroidFactory.getFlyweightCount());\n    }\n\n    public void renderAll() {\n        System.out.println(\"\\n--- Rendering first 5 asteroids ---\");\n        for (int i = 0; i < Math.min(5, asteroids.size()); i++) {\n            asteroids.get(i).render();\n        }\n    }\n\n    public long calculateMemoryUsage() {\n        long contextMemory = asteroids.size() * AsteroidContext.getMemoryUsage();\n        long flyweightMemory = AsteroidFactory.getTotalFlyweightMemory();\n        return contextMemory + flyweightMemory;\n    }\n\n    public int getAsteroidCount() {\n        return asteroids.size();\n    }\n}\n\npublic class WithFlyWeight {\n    public static void main(String[] args) {\n        final int ASTEROID_COUNT = 1_000_000;\n\n        System.out.println(\"\\nTESTING WITH FLYWEIGHT PATTERN\");\n        SpaceGameWithFlyweight game = new SpaceGameWithFlyweight();\n\n        game.spawnAsteroids(ASTEROID_COUNT);\n\n        // Show first 5 asteroids to see the pattern\n        game.renderAll();\n\n        // Calculate and display memory usage\n        long totalMemory = game.calculateMemoryUsage();\n\n        System.out.println(\"\\n=== MEMORY USAGE ===\");\n        System.out.println(\"Total asteroids: \" + ASTEROID_COUNT);\n        System.out.println(\"Memory per asteroid: \" + AsteroidContext.getMemoryUsage() + \" bytes\");\n        System.out.println(\"Total memory used: \" + totalMemory + \" bytes\");\n        System.out.println(\"Memory in MB: \" + (totalMemory / (1024.0 * 1024.0)) + \" MB\");\n    }\n}"
            },
            {
              "label": "WithoutFlyWeight.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Asteroid {\n    // Intrinsic properties (same for many asteroids) - DUPLICATED FOR EACH OBJECT\n    private int length;                          \n    private int width;                          \n    private int weight;                          \n    private String color;                      \n    private String texture;                    \n    private String material;                    \n\n    // Extrinsic properties (unique for each asteroid)\n    private int posX, posY;                \n    private int velocityX, velocityY;            \n\n    public Asteroid(int l, int w, int wt, String col, String tex, \n        String mat, int posX, int posY, int velX, int velY) {\n        this.length = l;\n        this.width = w;\n        this.weight = wt;\n        this.color = col;\n        this.texture = tex;\n        this.material = mat;\n        this.posX = posX;\n        this.posY = posY;\n        this.velocityX = velX;\n        this.velocityY = velY;\n    }\n\n    public void render() {\n        System.out.println(\"Rendering \" + color + \", \" + texture + \", \" + material \n            + \" asteroid at (\" + posX + \",\" + posY \n            + \") Size: \" + length + \"x\" + width\n            + \" Velocity: (\" + velocityX + \", \" \n            + velocityY + \")\");\n    }\n\n    // Calculate approximate memory usage per object\n    public static long getMemoryUsage() {\n        return Integer.BYTES * 7 +                // length, width, weight, x, y, velocityX, velocityY \n               40 * 3;                            // Approximate string data (assuming average 10 chars each)\n    }\n}\n\nclass SpaceGame {\n    private List<Asteroid> asteroids = new ArrayList<>();\n\n    public void spawnAsteroids(int count) {\n        System.out.println(\"\\n=== Spawning \" + count + \" asteroids ===\");\n\n        String[] colors = {\"Red\", \"Blue\", \"Gray\"};\n        String[] textures = {\"Rocky\", \"Metallic\", \"Icy\"};\n        String[] materials = {\"Iron\", \"Stone\", \"Ice\"};\n        int[] sizes = {25, 35, 45};\n\n        for (int i = 0; i < count; i++) {\n            int type = i % 3;\n\n            asteroids.add(new Asteroid(\n                sizes[type], sizes[type], sizes[type] * 10,\n                colors[type], textures[type], materials[type],\n                100 + i * 50,         // Simple x: 100, 150, 200, 250...\n                200 + i * 30,         // Simple y: 200, 230, 260, 290...\n                1,                    // All move right with velocity 1\n                2                     // All move down with velocity 2\n            ));\n        }\n\n        System.out.println(\"Created \" + asteroids.size() + \" asteroid objects\");\n    }\n\n    public void renderAll() {\n        System.out.println(\"\\n--- Rendering first 5 asteroids ---\");\n        for (int i = 0; i < Math.min(5, asteroids.size()); i++) {\n            asteroids.get(i).render();\n        }\n    }\n\n    public long calculateMemoryUsage() {\n        return asteroids.size() * Asteroid.getMemoryUsage();\n    }\n\n    public int getAsteroidCount() {\n        return asteroids.size();\n    }\n}\n\npublic class WithoutFlyWeight {\n    public static void main(String[] args) {\n        final int ASTEROID_COUNT = 1_000_000;\n\n        System.out.println(\"\\n TESTING WITHOUT FLYWEIGHT PATTERN\");\n        SpaceGame game = new SpaceGame();\n\n        game.spawnAsteroids(ASTEROID_COUNT);\n\n        // Show first 5 asteroids to see the pattern\n        game.renderAll();\n\n        // Calculate and display memory usage\n        long totalMemory = game.calculateMemoryUsage();\n\n        System.out.println(\"\\n=== MEMORY USAGE ===\");\n        System.out.println(\"Total asteroids: \" + ASTEROID_COUNT);\n        System.out.println(\"Memory per asteroid: \" + Asteroid.getMemoryUsage() + \" bytes\");\n        System.out.println(\"Total memory used: \" + totalMemory + \" bytes\");\n        System.out.println(\"Memory in MB: \" + totalMemory / (1024.0 * 1024.0) + \" MB\");\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Uses sharing to support a large number of fine-grained objects efficiently.",
                "Intrinsic state is shared.",
                "Extrinsic state is supplied by the caller/context."
              ]
            }
          ]
        },
        {
          "id": "state-machine",
          "title": "State Machine Design",
          "description": "Move state-specific behavior into state objects to avoid conditional-heavy workflows.",
          "notes": [
            "Move state-specific behavior into state objects to avoid conditional-heavy workflows."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/32. StateMachineDesign_VendingMachine/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/32. StateMachineDesign_VendingMachine/Example UML.jpeg"
            },
            {
              "label": "State Machine Diagram",
              "src": "assets/study/lld/Light/LLD-main/32. StateMachineDesign_VendingMachine/StateMachineDiagram.jpeg"
            }
          ],
          "code": [
            {
              "label": "VendingMachineMain.java",
              "content": "// Abstract State Interface\ninterface VendingState {\n    VendingState insertCoin(VendingMachine machine, int coin);\n    VendingState selectItem(VendingMachine machine);\n    VendingState dispense(VendingMachine machine);\n    VendingState returnCoin(VendingMachine machine);\n    VendingState refill(VendingMachine machine, int quantity);\n    String getStateName();\n}\n\n// Context Class - Vending Machine\nclass VendingMachine {\n    private VendingState currentState;\n    private int itemCount;\n    private int itemPrice;\n    private int insertedCoins;\n    \n    // State objects (we'll initialize these)\n    private VendingState noCoinState;\n    private VendingState hasCoinState;\n    private VendingState dispenseState;\n    private VendingState soldOutState;\n    \n    public VendingMachine(int itemCount, int itemPrice) {\n        this.itemCount = itemCount;\n        this.itemPrice = itemPrice;\n        this.insertedCoins = 0; \n        \n        // Create state objects\n        noCoinState = new NoCoinState();\n        hasCoinState = new HasCoinState();\n        dispenseState = new DispenseState();\n        soldOutState = new SoldOutState();\n        \n        // Set initial state\n        if (itemCount > 0) {\n            currentState = noCoinState;\n        } else {\n            currentState = soldOutState;\n        }\n    }\n    \n    // Delegate to current state and update state based on return value\n    public void insertCoin(int coin) {\n        currentState = currentState.insertCoin(this, coin);\n    }\n    \n    public void selectItem() {\n        currentState = currentState.selectItem(this);\n    }\n    \n    public void dispense() {\n        currentState = currentState.dispense(this);\n    }\n    \n    public void returnCoin() {\n        currentState = currentState.returnCoin(this);\n    }\n    \n    public void refill(int quantity) {\n        currentState = currentState.refill(this, quantity);\n    }\n        \n    // Print the status of Vending Machine\n    public void printStatus() {\n        System.out.println(\"\\n--- Vending Machine Status ---\");\n        System.out.println(\"Items remaining: \" + itemCount);\n        System.out.println(\"Inserted coin: Rs \" + insertedCoins);\n        System.out.println(\"Current state: \" + currentState.getStateName() + \"\\n\");\n    }\n    \n    // Getters for states\n    public VendingState getNoCoinState() { \n        return noCoinState;\n    }\n    public VendingState getHasCoinState() { \n        return hasCoinState;\n    }\n    public VendingState getDispenseState() { \n        return dispenseState; \n    }\n    public VendingState getSoldOutState() { \n        return soldOutState;\n    }\n    \n    // Data access methods\n    public int getItemCount() { \n        return itemCount; \n    }\n    public void decrementItemCount() { \n        itemCount--; \n    }\n    public void incrementItemCount(int count) {\n        itemCount += count;\n    }\n    public void incrementItemCount() {\n        itemCount += 1;\n    }\n    public int getInsertedCoin() { \n        return insertedCoins;\n    }\n    public void setInsertedCoin(int coin) { \n        insertedCoins = coin;\n    }\n    public void addCoin(int coin) { \n        insertedCoins += coin;\n    }\n    public int getPrice() {\n        return this.itemPrice;\n    }\n    public void setPrice(int itemPrice) {\n        this.itemPrice = itemPrice;\n    }\n}\n\n// Concrete State: No Coin Inserted\nclass NoCoinState implements VendingState {\n    public VendingState insertCoin(VendingMachine machine, int coin) {\n        machine.setInsertedCoin(coin); // Rs 10\n        System.out.println(\"Coin inserted. Current balance: Rs \" + coin);\n        return machine.getHasCoinState(); // Transition to HasCoinState\n    }\n    \n    public VendingState selectItem(VendingMachine machine) {\n        System.out.println(\"Please insert coin first!\");\n        return machine.getNoCoinState(); // Stay in same state\n    }\n    \n    public VendingState dispense(VendingMachine machine) {\n        System.out.println(\"Please insert coin and select item first!\");\n        return machine.getNoCoinState(); // Stay in same state\n    }\n    \n    public VendingState returnCoin(VendingMachine machine) {\n        System.out.println(\"No coin to return!\");\n        return machine.getNoCoinState(); // Stay in same state\n    }\n\n    public VendingState refill(VendingMachine machine, int quantity) {\n        System.out.println(\"Items refilling\");\n        machine.incrementItemCount(quantity);\n        return machine.getNoCoinState(); // Stay in same state\n    }\n    \n    public String getStateName() {\n        return \"NO_COIN\";\n    }\n}\n\n// Concrete State: Coin Inserted\nclass HasCoinState implements VendingState {\n    public VendingState insertCoin(VendingMachine machine, int coin) {\n        machine.addCoin(coin);\n        System.out.println(\"Additional coin inserted. Current balance: Rs \" + machine.getInsertedCoin());\n        return machine.getHasCoinState(); // Stay in same state\n    }\n    \n    public VendingState selectItem(VendingMachine machine) {\n        if (machine.getInsertedCoin() >= machine.getPrice()) {\n            System.out.println(\"Item selected. Dispensing...\");\n            \n            int change = machine.getInsertedCoin() - machine.getPrice();\n            if (change > 0) {\n                System.out.println(\"Change returned: Rs \" + change);\n            }\n            machine.setInsertedCoin(0);\n            \n            return machine.getDispenseState(); // Transition to DispenseState\n        } \n        else {\n            int needed = machine.getPrice() - machine.getInsertedCoin();\n            System.out.println(\"Insufficient funds. Need Rs \" + needed + \" more.\");\n            return machine.getHasCoinState(); // Stay in same state\n        }\n    }\n    \n    public VendingState dispense(VendingMachine machine) {\n        System.out.println(\"Please select an item first!\");\n        return machine.getHasCoinState(); // Stay in same state\n    }\n    \n    public VendingState returnCoin(VendingMachine machine) {\n        System.out.println(\"Coin returned: Rs \" + machine.getInsertedCoin());\n        machine.setInsertedCoin(0);\n        return machine.getNoCoinState(); // Transition to NoCoinState\n    }\n\n    public VendingState refill(VendingMachine machine, int quantity) {\n        System.out.println(\"Can't refil in this state\");\n        return machine.getHasCoinState(); // Stay in same state\n    }\n    \n    public String getStateName() {\n        return \"HAS_COIN\";\n    }\n}\n\n// Concrete State: Item Sold\nclass DispenseState implements VendingState {\n    public VendingState insertCoin(VendingMachine machine, int coin) {\n        System.out.println(\"Please wait, already dispensing item. Coin returned: Rs \" + coin);\n        return machine.getDispenseState();  // Stay in same state\n    }\n    \n    public VendingState selectItem(VendingMachine machine) {\n        System.out.println(\"Already dispensing item. Please wait.\");\n        return machine.getDispenseState(); // Stay in same state\n    }\n    \n    public VendingState dispense(VendingMachine machine) {\n        System.out.println(\"Item dispensed!\");\n        machine.decrementItemCount();\n        \n        if (machine.getItemCount() > 0) {\n            return machine.getNoCoinState(); // Transition to NoCoinState\n        } \n        else {\n            System.out.println(\"Machine is now sold out!\");\n            return machine.getSoldOutState(); // Transition to SoldOutState\n        }\n    }\n    \n    public VendingState returnCoin(VendingMachine machine) {\n        System.out.println(\"Cannot return coin while dispensing item!\");\n        return machine.getDispenseState(); // Stay in same state\n    }\n\n    public VendingState refill(VendingMachine machine, int quantity) {\n        System.out.println(\"Can't refil in this state\");\n        return machine.getDispenseState(); // Stay in same state\n    }\n\n    public String getStateName() {\n        return \"DISPENSING\";\n    }\n}\n\n// Concrete State: Sold Out\nclass SoldOutState implements VendingState {\n    public VendingState insertCoin(VendingMachine machine, int coin) {\n        System.out.println(\"Machine is sold out. Coin returned: Rs \" + coin);\n        return machine.getSoldOutState(); // Stay in same state\n    }\n    \n    public VendingState selectItem(VendingMachine machine) {\n        System.out.println(\"Machine is sold out!\");\n        return machine.getSoldOutState(); // Stay in same state\n    }\n    \n    public VendingState dispense(VendingMachine machine) {\n        System.out.println(\"Machine is sold out!\");\n        return machine.getSoldOutState(); // Stay in same state\n    }\n    \n    public VendingState returnCoin(VendingMachine machine) {\n        System.out.println(\"Machine is sold out. No coin inserted.\");\n        return machine.getSoldOutState(); // Stay in same state\n    }\n\n    public VendingState refill(VendingMachine machine, int quantity) {\n        System.out.println(\"Items refilling\");\n        machine.incrementItemCount(quantity);\n        return machine.getNoCoinState();\n    }\n    \n    public String getStateName() {\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Allows an object to alter its behavior when its internal state changes.",
                "The object appears to change its class as the state changes.",
                "Real-world examples include vending machines, documents, and ATMs."
              ]
            }
          ]
        },
        {
          "id": "mediator",
          "title": "Mediator Design",
          "description": "Centralize collaboration between objects that should not know each other directly.",
          "notes": [
            "Defines an object that encapsulates how a set of objects interact, and promote loose coupling by preventing them from referring to each other.",
            "This allows users to chat with each other. here list of users are not appended for each user. instead each user talks to mediator and that mediator returns the list of users.",
            "Different from obserable as observable is for just notifying observers. not chat between observers.",
            "interface IMediator {",
            "void registerColleague(Colleague c);"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/35. MediatorDesign/Standard UML.jpg"
            }
          ],
          "code": [
            {
              "label": "MediatorPattern.java",
              "content": "import java.util.*;\n\n// ─────────────── Mediator Interface ───────────────\ninterface IMediator {\n    void registerColleague(Colleague c);\n    void send(String from, String msg);\n    void sendPrivate(String from, String to, String msg);\n}\n\n// ─────────────── Colleague Interface ───────────────\nabstract class Colleague {\n    protected IMediator mediator;  \n    \n    public Colleague(IMediator m) {\n        mediator = m;\n        mediator.registerColleague(this);\n    }\n    \n    public abstract String getName();\n    public abstract void send(String msg);\n    public abstract void sendPrivate(String to, String msg);\n    public abstract void receive(String from, String msg);\n}\n\n// Simple Pair class\nclass Pair<T, U> {\n    public final T first;\n    public final U second;\n    \n    public Pair(T first, U second) {\n        this.first = first;\n        this.second = second;\n    }\n}\n\n// ─────────────── Concrete Mediator ───────────────\nclass ChatMediator implements IMediator {\n    private List<Colleague> colleagues;\n    private List<Pair<String, String>> mutes; // (muter, muted)\n    \n    public ChatMediator() {\n        colleagues = new ArrayList<>();\n        mutes = new ArrayList<>();\n    }\n    \n    public void registerColleague(Colleague c) {\n        colleagues.add(c);\n    }\n    \n    public void mute(String who, String whom) {\n        mutes.add(new Pair<>(who, whom));\n    }\n    \n    public void send(String from, String msg) {\n        System.out.println(\"[\" + from + \" broadcasts]: \" + msg);\n        for (Colleague c : colleagues) {\n            // Don't send msg to itself.\n            if (c.getName().equals(from)) {\n                continue;\n            }\n\n            boolean isMuted = false;\n            // Ignore if person is muted\n            for (Pair<String, String> p : mutes) {\n                if (from.equals(p.second) && c.getName().equals(p.first)) {\n                    isMuted = true;\n                    break;\n                }\n            }\n            if (!isMuted) {\n                c.receive(from, msg);\n            }\n        }\n    }\n    \n    public void sendPrivate(String from, String to, String msg) {\n        System.out.println(\"[\" + from + \"→\" + to + \"]: \" + msg);\n        for (Colleague c : colleagues) {\n            if (c.getName().equals(to)) {\n                for (Pair<String, String> p : mutes) {\n                    //Dont send if muted\n                    if (from.equals(p.second) && to.equals(p.first)) {\n                        System.out.println(\"\\n[Message is muted]\\n\");\n                        return;\n                    }\n                }\n                c.receive(from, msg);\n                return;\n            }\n        }\n        System.out.println(\"[Mediator] User \\\"\" + to + \"\\\" not found]\");\n    }\n}\n\n// ─────────────── Concrete Colleague ───────────────\nclass User extends Colleague {\n    private String name;\n    \n    public User(String n, IMediator m) {\n        super(m);\n        name = n;\n    }\n    \n    @Override\n    public String getName() {\n        return name;\n    }\n    \n    @Override\n    public void send(String msg) {\n        mediator.send(name, msg);\n    }\n    \n    @Override\n    public void sendPrivate(String to, String msg) {\n        mediator.sendPrivate(name, to, msg);\n    }\n    \n    @Override\n    public void receive(String from, String msg) {\n        System.out.println(\"    \" + name + \" got from \" + from + \": \" + msg);\n    }\n}\n\n// ─────────────── Demo ───────────────\npublic class MediatorPattern {\n    public static void main(String[] args) {\n        ChatMediator chatRoom = new ChatMediator();\n        \n        User user1 = new User(\"Rohan\", chatRoom);\n        User user2 = new User(\"Neha\", chatRoom);\n        User user3 = new User(\"Mohan\", chatRoom);\n        \n        // Rohan mutes Mohan\n        chatRoom.mute(\"Rohan\", \"Mohan\");\n        \n        // broadcast from Rohan\n        user1.send(\"Hello Everyone!\");\n        \n        // private from Mohan to Neha\n        user3.sendPrivate(\"Neha\", \"Hey Neha!\");\n    }\n}"
            },
            {
              "label": "WithoutMediator.java",
              "content": "import java.util.*;\n\n// Each User knows *all* the others directly.\n// If you have N users, you wind up wiring N*(N–1)/2 connections,\n// and every new feature (mute, private send, logging...) lives in User too.\nclass User {\n    private String name;\n    private List<User> peers;\n    private List<String> mutedUsers;\n    \n    public User(String n) {\n        name = n;\n        peers = new ArrayList<>();\n        mutedUsers = new ArrayList<>();\n    }\n    \n    // must manually connect every pair → N^2 wiring\n    public void addPeer(User u) {\n        peers.add(u);\n    }\n    \n    // duplication: everyone has its own mute list\n    public void mute(String userToMute) {\n        mutedUsers.add(userToMute);\n    }\n    \n    // broadcast to all peers\n    public void send(String msg) {\n        System.out.println(\"[\" + name + \" broadcasts]: \" + msg);\n        for (User peer : peers) {\n            \n            // if they have muted me dont send.\n            if(!peer.isMuted(name)) {\n                peer.receive(name, msg);\n            }\n        }\n    }\n    \n    public boolean isMuted(String userName) {\n        for(String name : mutedUsers) {\n            if(name.equals(userName)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    \n    // private send - duplicated in every class\n    public void sendTo(User target, String msg) {\n        System.out.println(\"[\" + name + \"→\" + target.name + \"]: \" + msg);\n        if(!target.isMuted(name)) {\n            target.receive(name, msg);\n        }\n    }\n    \n    public void receive(String from, String msg) {\n        System.out.println(\"    \" + name + \" got from \" + from + \": \" + msg);\n    }\n}\n\npublic class WithoutMediator {\n    public static void main(String[] args) {\n        // create users\n        User user1 = new User(\"Rohan\");\n        User user2 = new User(\"Neha\");\n        User user3 = new User(\"Mohan\");\n        \n        // wire up peers (each knows each other) → n*(n-1)/2 connections\n        user1.addPeer(user2);   \n        user2.addPeer(user1);\n\n        user1.addPeer(user3);   \n        user3.addPeer(user1);\n        \n        user2.addPeer(user3); \n        user3.addPeer(user2);\n        \n        // mute example: Mohan mutes Rohan (Hence Rohan add Mohan to its muted list).\n        user1.mute(\"Mohan\");\n        \n        // broadcast\n        user1.send(\"Hello everyone!\");\n        \n        // private\n        user3.sendTo(user2, \"Hey Neha!\");\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Defines an object that encapsulates how a set of objects interact.",
                "Promotes loose coupling by preventing objects from referring to each other directly."
              ]
            }
          ]
        },
        {
          "id": "prototype",
          "title": "Prototype Design",
          "description": "Clone configured objects instead of building every instance from scratch.",
          "notes": [
            "It let you create new Object by copying (cloning) another instance.",
            "Suppose some features are to be cloned of some object and each time if we create new it becomes expensive operqation. so to reduce that complexity.",
            "We create object once. And than later clone it. Just to identify the classes are cloneable we make these as concrete of Clone class.",
            "Usually a deep copy is done by clone. But in case of objects like Student * s1 than it will create shallow.",
            "So for a deep copy just make this.s1 = new Student(s.s1) like this."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/36. PrototypeDesign/Standard UML.jpeg"
            },
            {
              "label": "Shallow vs Deep Copy",
              "src": "assets/study/lld/Light/LLD-main/36. PrototypeDesign/ShallowDeepCopy.png"
            }
          ],
          "code": [
            {
              "label": "PrototypePattern.java",
              "content": "// Cloneable (aka Prototype) interface\ninterface Cloneable {\n   Cloneable clone();\n}\n\nclass NPC implements Cloneable {\n   public String name;\n   public int health;\n   public int attack;\n   public int defense;\n   \n   public NPC(String name, int health, int attack, int defense) {\n       // call database\n       // complex calc\n       this.name = name; \n       this.health = health; \n       this.attack = attack; \n       this.defense = defense;\n       System.out.println(\"Setting up template NPC '\" + name + \"'\");\n   }\n   \n   // copy‐ctor used by clone()\n   public NPC(NPC other) {\n       name = other.name;\n       health = other.health;\n       attack = other.attack;\n       defense = other.defense;\n       System.out.println(\"Cloning NPC '\" + name + \"'\");\n   }\n   \n   // the clone method required by Prototype\n   public Cloneable clone() {\n       return new NPC(this);\n   }\n   \n   public void describe() {\n       System.out.println(\"NPC \" + name + \" [HP=\" + health + \" ATK=\" + attack \n            + \" DEF=\" + defense + \"]\");\n   }\n   \n   // setters to tweak the clone…\n   public void setName(String n) { \n       name = n;\n   }\n   public void setHealth(int h) { \n       health = h;\n   }\n   public void setAttack(int a) {\n        attack = a; \n   }\n   public void setDefense(int d){ \n       defense = d;\n   }\n}\n\npublic class PrototypePattern {\n   public static void main(String[] args) {\n       // 1) build one \"heavy\" template\n       NPC alien = new NPC(\"Alien\", 30, 5, 2);\n       \n       // 2) quickly clone + tweak as many variants as you like:\n       NPC alienCopied1 = (NPC)alien.clone();\n       alienCopied1.describe();\n       \n       NPC alienCopied2 = (NPC)alien.clone();\n       alienCopied2.setName(\"Powerful Alien\");\n       alienCopied2.setHealth(50);\n       alienCopied2.describe();\n       \n       // cleanup\n       alien = null;\n       alienCopied1 = null;\n       alienCopied2 = null;\n   }\n}"
            },
            {
              "label": "WithoutPrototype.java",
              "content": "// Simple NPC class — no Prototype\nclass NPC {\n   public String name;\n   public int health;\n   public int attack;\n   public int defense;\n   \n   // \"Heavy\" constructor: every field must be provided\n   public NPC(String name, int health, int attack, int defense) {\n       // call database\n       // complex calc\n       this.name = name;\n       this.health = health;\n       this.attack = attack;\n       this.defense = defense;\n       System.out.println(\"Creating NPC '\" + name + \"' [HP:\" + health + \", ATK:\" \n            + attack + \", DEF:\" + defense + \"]\");\n   }\n   \n   public void describe() {\n       System.out.println(\"  NPC: \" + name + \" | HP=\" + health + \" ATK=\" + attack\n            + \" DEF=\" + defense);\n   }\n}\n\npublic class WithoutPrototype {\n   public static void main(String[] args) {\n       // Base Alien\n       NPC alien = new NPC(\"Alien\", 30, 5, 2);\n       alien.describe();\n       \n       // Powerful Alien — must re-pass all stats, easy to make mistakes\n       NPC alien2 = new NPC(\"Powerful Alien\", 30, 5, 5);\n       alien2.describe();\n       \n       // If you want 100 aliens, you'd repeat this 100 times…\n   }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Lets you create new objects by copying or cloning an existing object."
              ]
            }
          ]
        },
        {
          "id": "visitor",
          "title": "Visitor Design",
          "description": "Add operations over object structures without modifying each element class.",
          "notes": [
            "Allows to add new operation to existing classes Without changing there structure. separates operation from the Object it operates.",
            "Suppose some classes (Image File, Video File) are there which are finite but their methods are scalable. so we just extend those methods into seperate Visitor classes. and call their methods from Parent (Image File .. ) Classes.",
            "abstract class FileSystemItem {",
            "protected String name;",
            "public FileSystemItem(String itemName) {"
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/38. VisitorDesign/Standard UML.jpeg"
            },
            {
              "label": "Example UML",
              "src": "assets/study/lld/Light/LLD-main/38. VisitorDesign/Example UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "VisitorPattern.java",
              "content": "class TextFile extends FileSystemItem {\n    private String content;\n    \n    public TextFile(String fileName, String fileContent) {\n        super(fileName);\n        this.content = fileContent;\n    }\n    \n    public String getContent() {\n        return content;\n    }\n    \n    @Override\n    public void accept(FileSystemVisitor visitor) {\n        visitor.visit(this);\n    }\n}\n\nclass ImageFile extends FileSystemItem {\n    \n    public ImageFile(String fileName) {\n        super(fileName);\n    }\n    \n    @Override\n    public void accept(FileSystemVisitor visitor) {\n        visitor.visit(this);\n    }\n}\n\nclass VideoFile extends FileSystemItem {\n    public VideoFile(String fileName) {\n        super(fileName);\n    }\n    \n    @Override\n    public void accept(FileSystemVisitor visitor) {\n        visitor.visit(this);\n    }\n}\n\n// Visitor Interface\ninterface FileSystemVisitor {\n    void visit(TextFile file);\n    void visit(ImageFile file);\n    void visit(VideoFile file);\n}\n\nabstract class FileSystemItem {\n    protected String name;\n    \n    public FileSystemItem(String itemName) {\n        this.name = itemName;\n    }\n    \n    public String getName() {\n        return name;\n    }\n    \n    public abstract void accept(FileSystemVisitor visitor);\n}\n\n// 1. Size calculation visitor\nclass SizeCalculationVisitor implements FileSystemVisitor {\n    @Override\n    public void visit(TextFile file) {\n        System.out.println(\"Calculating size for TEXT file: \" + file.getName());\n    }\n    \n    @Override\n    public void visit(ImageFile file) {\n        System.out.println(\"Calculating size for IMAGE file: \" + file.getName());\n    }\n    \n    @Override\n    public void visit(VideoFile file) {\n        System.out.println(\"Calculating size for VIDEO file: \" + file.getName());\n    }\n}\n\n// 2. Compression Visitor\nclass CompressionVisitor implements FileSystemVisitor {\n    @Override\n    public void visit(TextFile file) {\n        System.out.println(\"Compressing TEXT file: \" + file.getName());\n    }\n    \n    @Override\n    public void visit(ImageFile file) {\n        System.out.println(\"Compressing IMAGE file: \" + file.getName());\n    }\n    \n    @Override\n    public void visit(VideoFile file) {\n        System.out.println(\"Compressing VIDEO file: \" + file.getName());\n    }\n}\n\n// 3. Virus Scanning Visitor\nclass VirusScanningVisitor implements FileSystemVisitor {\n    @Override\n    public void visit(TextFile file) {\n        System.out.println(\"Scanning TEXT file: \" + file.getName());\n    }\n    \n    @Override\n    public void visit(ImageFile file) {\n        System.out.println(\"Scanning IMAGE file: \" + file.getName());\n    }\n    \n    @Override\n    public void visit(VideoFile file) {\n        System.out.println(\"Scanning VIDEO file: \" + file.getName());\n    }\n}\n\npublic class VisitorPattern {\n    public static void main(String[] args) {\n\n        FileSystemItem img1 = new ImageFile(\"sample.jpg\");\n\n        img1.accept(new SizeCalculationVisitor());\n        img1.accept(new CompressionVisitor());\n        img1.accept(new VirusScanningVisitor());\n\n        FileSystemItem vid1 = new VideoFile(\"test.mp4\");\n        vid1.accept(new CompressionVisitor());\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Allows new operations to be added to existing classes without changing their structure.",
                "Separates an operation from the object structure it operates on."
              ]
            }
          ]
        },
        {
          "id": "memento",
          "title": "Memento Design",
          "description": "Capture and restore object state without exposing internals.",
          "notes": [
            "Provides an ability to take snapshot of an object at various point in time and provide undo capabilities to a previous state.",
            "Here 3 things are required:",
            "1. Originator -> For which record is to be taken care. Ex DB",
            "2. Memento -> By which prev state is recorded",
            "3. Caretaker -> The one who co-ordinates when to commit latest and when to rollback by fetching last success stage from Memento."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/39. MementoDesign/Standard UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "MementoPattern.java",
              "content": "import java.util.*;\n\n// Memento - Stores database state snapshot\nclass DatabaseMemento {\n   private Map<String, String> data;\n   \n   public DatabaseMemento(Map<String, String> dbData) {\n       this.data = new HashMap<>(dbData);\n   }\n   \n   public Map<String, String> getState() {\n       return data;\n   }\n}\n\n// Originator - The database whose state we want to save/restore\nclass Database {\n   private Map<String, String> records;\n   \n   public Database() {\n       records = new HashMap<>();\n   }\n   \n   // Insert a record\n   public void insert(String key, String value) {\n       records.put(key, value);\n       System.out.println(\"Inserted: \" + key + \" = \" + value);\n   }\n   \n   // Update a record\n   public void update(String key, String value) {\n       if (records.containsKey(key)) {\n           records.put(key, value);\n           System.out.println(\"Updated: \" + key + \" = \" + value);\n       } else {\n           System.out.println(\"Key not found for update: \" + key);\n       }\n   }\n   \n   // Delete a record\n   public void remove(String key) {\n       if (records.containsKey(key)) {\n           records.remove(key);\n           System.out.println(\"Deleted: \" + key);\n       } else {\n           System.out.println(\"Key not found for deletion: \" + key);\n       }\n   }\n   \n   // Create memento - Save current state\n   public DatabaseMemento createMemento() {\n       System.out.println(\"Creating database backup...\");\n       return new DatabaseMemento(records);\n   }\n   \n   // Restore from memento - Rollback to saved state\n   public void restoreFromMemento(DatabaseMemento memento) {\n       records = new HashMap<>(memento.getState());\n       System.out.println(\"Database restored from backup!\");\n   }\n   \n   // Display current database state\n   public void displayRecords() {\n       System.out.println(\"\\n--- Current Database State ---\");\n       if (records.isEmpty()) {\n           System.out.println(\"Database is empty\");\n       } else {\n           for (Map.Entry<String, String> record : records.entrySet()) {\n               System.out.println(record.getKey() + \" = \" + record.getValue());\n           }\n       }\n       System.out.println(\"-----------------------------\\n\");\n   }\n}\n\n// Caretaker - Manages the memento (transaction manager)\nclass TransactionManager {\n   private DatabaseMemento backup;\n   \n   public TransactionManager() {\n       backup = null;\n   }\n   \n   // Begin transaction - create backup\n   public void beginTransaction(Database db) {\n       System.out.println(\"=== BEGIN TRANSACTION ===\");\n       backup = db.createMemento();\n   }\n   \n   // Commit transaction - discard backup\n   public void commitTransaction() {\n       System.out.println(\"=== COMMIT TRANSACTION ===\");\n       if (backup != null) {\n           backup = null;\n       }\n       System.out.println(\"Transaction committed successfully!\");\n   }\n   \n   // Rollback transaction - restore from backup\n   public void rollbackTransaction(Database db) {\n       System.out.println(\"=== ROLLBACK TRANSACTION ===\");\n       if (backup != null) {\n           db.restoreFromMemento(backup);\n           backup = null;\n           System.out.println(\"Transaction rolled back!\");\n       } else {\n           System.out.println(\"No backup available for rollback!\");\n       }\n   }\n}\n\npublic class MementoPattern {\n   public static void main(String[] args) {\n       Database db = new Database();\n       TransactionManager txManager = new TransactionManager();\n      \n       //success scenario\n       txManager.beginTransaction(db);\n       db.insert(\"user1\", \"Aditya\");\n       db.insert(\"user2\", \"Rohit\");\n       txManager.commitTransaction();\n\n       db.displayRecords();\n\n       // Failed scenario\n       txManager.beginTransaction(db);\n       db.insert(\"user3\", \"Saurav\");\n       db.insert(\"user4\", \"Manish\");\n\n       db.displayRecords();\n       \n       // Some error -> Rollback\n       System.out.println(\"ERROR: Something went wrong during transaction!\");\n       txManager.rollbackTransaction(db);\n       \n       db.displayRecords();\n   }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Definition",
              "items": [
                "Provides the ability to take snapshots of an object at different points in time and restore it later."
              ]
            }
          ]
        },
        {
          "id": "null-object",
          "title": "Null Object / Anti Design",
          "description": "Use safe default objects carefully, and recognize designs that hide real domain errors.",
          "notes": [
            "Use safe default objects carefully, and recognize designs that hide real domain errors."
          ],
          "images": [
            {
              "label": "Standard UML",
              "src": "assets/study/lld/Light/LLD-main/40. NullDesign, AntiDesign/Standard UML.png"
            }
          ],
          "code": []
        }
      ]
    },
    {
      "id": "problems",
      "title": "Problems",
      "description": "Interview-style LLD case studies with requirements, UML, implementation notes, and Java code.",
      "topics": [
        {
          "id": "google-docs",
          "title": "Google Docs",
          "description": "Document elements, persistence strategy, and editor services.",
          "notes": [
            "Persistence Strategy->DB, File",
            "Doc Element Strategy -> Text, Image, Video",
            "Document Manager",
            "Doc Editor",
            "main"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/7. Google Docs/standardUml.png"
            }
          ],
          "code": [
            {
              "label": "DocumentEditorClient.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\nimport java.io.FileWriter;\nimport java.io.IOException;\n\n// Interface for document elements\ninterface DocumentElement {\n    public abstract String render();\n}\n\n// Concrete implementation for text elements\nclass TextElement implements DocumentElement {\n    private String text;\n\n    public TextElement(String text) {\n        this.text = text;\n    }\n\n    @Override\n    public String render() {\n        return text;\n    }\n}\n\n// Concrete implementation for image elements\nclass ImageElement implements DocumentElement {\n    private String imagePath;\n\n    public ImageElement(String imagePath) {\n        this.imagePath = imagePath;\n    }\n\n    @Override\n    public String render() {\n        return \"[Image: \" + imagePath + \"]\";\n    }\n}\n\n// NewLineElement represents a line break in the document.\nclass NewLineElement implements DocumentElement {\n    @Override\n    public String render() {\n        return \"\\n\";\n    }\n}\n\n// TabSpaceElement represents a tab space in the document.\nclass TabSpaceElement implements DocumentElement {\n    @Override\n    public String render() {\n        return \"\\t\";\n    }\n}\n\n// Document class responsible for holding a collection of elements\nclass Document {\n    private List<DocumentElement> documentElements = new ArrayList<>();\n\n    public void addElement(DocumentElement element) {\n        documentElements.add(element);\n    }\n\n    // Renders the document by concatenating the render output of all elements.\n    public String render() {\n        StringBuilder result = new StringBuilder();\n        for (DocumentElement element : documentElements) {\n            result.append(element.render());\n        }\n        return result.toString();\n    }\n}\n\n// Persistence Interface\ninterface Persistence {\n    void save(String data);\n}\n\n// FileStorage implementation of Persistence\nclass FileStorage implements Persistence {\n    @Override\n    public void save(String data) {\n        try {\n            FileWriter outFile = new FileWriter(\"document.txt\");\n            outFile.write(data);\n            outFile.close();\n            System.out.println(\"Document saved to document.txt\");\n        } catch (IOException e) {\n            System.out.println(\"Error: Unable to open file for writing.\");\n        }\n    }\n}\n\n// Placeholder DBStorage implementation\nclass DBStorage implements Persistence {\n    @Override\n    public void save(String data) {\n        // Save to DB\n    }\n}\n\n// DocumentEditor class managing client interactions\nclass DocumentEditor {\n    private Document document;\n    private Persistence storage;\n    private String renderedDocument = \"\";\n\n    public DocumentEditor(Document document, Persistence storage) {\n        this.document = document;\n        this.storage = storage;\n    }\n\n    public void addText(String text) {\n        document.addElement(new TextElement(text));\n    }\n\n    public void addImage(String imagePath) {\n        document.addElement(new ImageElement(imagePath));\n    }\n\n    // Adds a new line to the document.\n    public void addNewLine() {\n        document.addElement(new NewLineElement());\n    }\n\n    // Adds a tab space to the document.\n    public void addTabSpace() {\n        document.addElement(new TabSpaceElement());\n    }\n\n    public String renderDocument() {\n        if (renderedDocument.isEmpty()) {\n            renderedDocument = document.render();\n        }\n        return renderedDocument;\n    }\n\n    public void saveDocument() {\n        storage.save(renderDocument());\n    }\n}\n\n// Client usage example\npublic class DocumentEditorClient {\n    public static void main(String[] args) {\n        Document document = new Document();\n        Persistence persistence = new FileStorage();\n\n        DocumentEditor editor = new DocumentEditor(document, persistence);\n\n        // Simulate a client using the editor with common text formatting features.\n        editor.addText(\"Hello, world!\");\n        editor.addNewLine();\n        editor.addText(\"This is a real-world document editor example.\");\n        editor.addNewLine();\n        editor.addTabSpace();\n        editor.addText(\"Indented text after a tab space.\");\n        editor.addNewLine();\n        editor.addImage(\"picture.jpg\");\n\n        // Render and display the final document.\n        System.out.println(editor.renderDocument());\n\n        editor.saveDocument();\n    }\n}"
            },
            {
              "label": "DocumentEditorClient.java",
              "content": "import java.util.ArrayList;\nimport java.util.List;\nimport java.io.FileWriter;\nimport java.io.IOException;\n\nclass DocumentEditor {\n    private List<String> documentElements;\n    private String renderedDocument;\n\n    public DocumentEditor() {\n        documentElements = new ArrayList<>();\n        renderedDocument = \"\";\n    }\n\n    // Adds text as a plain string\n    public void addText(String text) {\n        documentElements.add(text);\n    }\n\n    // Adds an image represented by its file path\n    public void addImage(String imagePath) {\n        documentElements.add(imagePath);\n    }\n\n    // Renders the document by checking the type of each element at runtime\n    public String renderDocument() {\n        if (renderedDocument.isEmpty()) {\n            StringBuilder result = new StringBuilder();\n            for (String element : documentElements) {\n                if (element.length() > 4 && \n                   (element.endsWith(\".jpg\") || element.endsWith(\".png\"))) {\n                    result.append(\"[Image: \").append(element).append(\"]\\n\");\n                } else {\n                    result.append(element).append(\"\\n\");\n                }\n            }\n            renderedDocument = result.toString();\n        }\n        return renderedDocument;\n    }\n\n    public void saveToFile() {\n        try {\n            FileWriter writer = new FileWriter(\"document.txt\");\n            writer.write(renderDocument());\n            writer.close();\n            System.out.println(\"Document saved to document.txt\");\n        } catch (IOException e) {\n            System.out.println(\"Error: Unable to open file for writing.\");\n        }\n    }\n}\n\npublic class DocumentEditorClient {\n    public static void main(String[] args) {\n        DocumentEditor editor = new DocumentEditor();\n        editor.addText(\"Hello, world!\");\n        editor.addImage(\"picture.jpg\");\n        editor.addText(\"This is a document editor.\");\n\n        System.out.println(editor.renderDocument());\n\n        editor.saveToFile();\n    }\n}"
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Build Google Docs",
              "url": "https://www.youtube.com/watch?v=MT9qZFGQXOU&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "zomato",
          "title": "Zomato",
          "description": "Restaurant ordering with menus, carts, orders, factories, and payment strategies.",
          "notes": [
            "Restraunt -> Manager",
            "Menu",
            "Users",
            "Cart",
            "Orders -> Manager",
            "Deliver Now Factory",
            "Schedule Factoy",
            "has"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/11. Zomato/UML.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "import models.*;\nimport strategies.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Simulating a happy flow\n        // Create TomatoApp Object\n        TomatoApp tomato = new TomatoApp();\n\n        // Simulate a user coming in (Happy Flow)\n        User user = new User(101, \"Aditya\", \"Delhi\");\n        System.out.println(\"User: \" + user.getName() + \" is active.\");\n\n        // User searches for restaurants by location\n        java.util.List<Restaurant> restaurantList = tomato.searchRestaurants(\"Delhi\");\n\n        if (restaurantList.isEmpty()) {\n            System.out.println(\"No restaurants found!\");\n            return;\n        }\n\n        System.out.println(\"Found Restaurants:\");\n        for (Restaurant restaurant : restaurantList) {\n            System.out.println(\" - \" + restaurant.getName());\n        }\n\n        // User selects a restaurant\n        tomato.selectRestaurant(user, restaurantList.get(0));\n        System.out.println(\"Selected restaurant: \" + restaurantList.get(0).getName());\n\n        // User adds items to the cart\n        tomato.addToCart(user, \"P1\");\n        tomato.addToCart(user, \"P2\");\n\n        tomato.printUserCart(user);\n\n        // User checkout the cart\n        Order order = tomato.checkoutNow(user, \"Delivery\", new UpiPaymentStrategy(\"1234567890\"));\n\n        // User pays for the cart. If payment is successful, notification is sent.\n        tomato.payForOrder(user, order);\n    }\n}"
            },
            {
              "label": "TomatoApp.java",
              "content": "import java.util.List;\nimport models.*;\nimport managers.*;\nimport strategies.*;\nimport factories.*;\nimport services.NotificationService;\n\npublic class TomatoApp {\n\n    public TomatoApp() {\n        initializeRestaurants();\n    }\n\n    public void initializeRestaurants() {\n        Restaurant restaurant1 = new Restaurant(\"Bikaner\", \"Delhi\");\n        restaurant1.addMenuItem(new MenuItem(\"P1\", \"Chole Bhature\", 120));\n        restaurant1.addMenuItem(new MenuItem(\"P2\", \"Samosa\", 15));\n\n        Restaurant restaurant2 = new Restaurant(\"Haldiram\", \"Kolkata\");\n        restaurant2.addMenuItem(new MenuItem(\"P1\", \"Raj Kachori\", 80));\n        restaurant2.addMenuItem(new MenuItem(\"P2\", \"Pav Bhaji\", 100));\n        restaurant2.addMenuItem(new MenuItem(\"P3\", \"Dhokla\", 50));\n\n        Restaurant restaurant3 = new Restaurant(\"Saravana Bhavan\", \"Chennai\");\n        restaurant3.addMenuItem(new MenuItem(\"P1\", \"Masala Dosa\", 90));\n        restaurant3.addMenuItem(new MenuItem(\"P2\", \"Idli Vada\", 60));\n        restaurant3.addMenuItem(new MenuItem(\"P3\", \"Filter Coffee\", 30));\n\n        RestaurantManager restaurantManager = RestaurantManager.getInstance();\n        restaurantManager.addRestaurant(restaurant1);\n        restaurantManager.addRestaurant(restaurant2);\n        restaurantManager.addRestaurant(restaurant3);\n    }\n\n    public List<Restaurant> searchRestaurants(String location) {\n        return RestaurantManager.getInstance().searchByLocation(location);\n    }\n\n    public void selectRestaurant(User user, Restaurant restaurant) {\n        Cart cart = user.getCart();\n        cart.setRestaurant(restaurant);\n    }\n\n    public void addToCart(User user, String itemCode) {\n        Restaurant restaurant = user.getCart().getRestaurant();\n        if (restaurant == null) {\n            System.out.println(\"Please select a restaurant first.\");\n            return;\n        }\n        for (MenuItem item : restaurant.getMenu()) {\n            if (item.getCode().equals(itemCode)) {\n                user.getCart().addItem(item);\n                break;\n            }\n        }\n    }\n\n    public Order checkoutNow(User user, String orderType, PaymentStrategy paymentStrategy) {\n        return checkout(user, orderType, paymentStrategy, new NowOrderFactory());\n    }\n\n    public Order checkoutScheduled(User user, String orderType, PaymentStrategy paymentStrategy, String scheduleTime) {\n        return checkout(user, orderType, paymentStrategy, new ScheduledOrderFactory(scheduleTime));\n    }\n\n    public Order checkout(User user, String orderType, PaymentStrategy paymentStrategy, OrderFactory orderFactory) {\n        if (user.getCart().isEmpty()) return null;\n\n        Cart userCart = user.getCart();\n        Restaurant orderedRestaurant = userCart.getRestaurant();\n        List<MenuItem> itemsOrdered = userCart.getItems();\n        double totalCost = userCart.getTotalCost();\n\n        Order order = orderFactory.createOrder(user, userCart, orderedRestaurant, itemsOrdered, paymentStrategy, totalCost, orderType);\n        OrderManager.getInstance().addOrder(order);\n        return order;\n    }\n\n    public void payForOrder(User user, Order order) {\n        boolean isPaymentSuccess = order.processPayment();\n\n        if (isPaymentSuccess) {\n            NotificationService.notify(order);\n            user.getCart().clear();\n        }\n    }\n\n    public void printUserCart(User user) {\n        System.out.println(\"Items in cart:\");\n        System.out.println(\"------------------------------------\");\n        for (MenuItem item : user.getCart().getItems()) {\n            System.out.println(item.getCode() + \" : \" + item.getName() + \" : ₹\" + item.getPrice());\n        }\n        System.out.println(\"------------------------------------\");\n        System.out.println(\"Grand total : ₹\" + user.getCart().getTotalCost());\n    }\n}"
            },
            {
              "label": "NowOrderFactory.java",
              "content": "package factories;\n\nimport java.util.List;\nimport models.*;\nimport strategies.*;\nimport utils.*;\n\npublic class NowOrderFactory implements OrderFactory {\n    @Override\n    public Order createOrder(User user, Cart cart, Restaurant restaurant, List<MenuItem> menuItems,\n                             PaymentStrategy paymentStrategy, double totalCost, String orderType) {\n        Order order = null;\n\n        if (orderType.equals(\"Delivery\")) {\n            DeliveryOrder deliveryOrder = new DeliveryOrder();\n            deliveryOrder.setUserAddress(user.getAddress());\n            order = deliveryOrder;\n        } else {\n            PickupOrder pickupOrder = new PickupOrder();\n            pickupOrder.setRestaurantAddress(restaurant.getLocation());\n            order = pickupOrder;\n        }\n\n        order.setUser(user);\n        order.setRestaurant(restaurant);\n        order.setItems(menuItems);\n        order.setPaymentStrategy(paymentStrategy);\n        order.setScheduled(TimeUtils.getCurrentTime());\n        order.setTotal(totalCost);\n        return order;\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Users can search for restaurants based on location.",
                "Users can add menu items to the cart.",
                "Users can check out by making a payment.",
                "Users should be notified once an order is placed successfully.",
                "Each part of the design should be easy to modify and extend."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Build Zomato food delivery",
              "url": "https://www.youtube.com/watch?v=2SAUqTn3TrU&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "notification-system",
          "title": "Notification System",
          "description": "Composable notifications with decorators, observers, and delivery strategies.",
          "notes": [
            "Notification Prepare -> Text",
            "Decorator -> + Image, Timestamp, Sig etc",
            "Observer pattern Iobserver, Iobservable",
            "extend both",
            "Notify observable -> get,set not msg, notify()",
            "Logger -> update",
            "ExtEnv -> vector<NotStr>",
            "has Notification strategy"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/14. NotificationSystem/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "NotificationSystemUpdated.java",
              "content": "// Java version of the given C++ Notification System code\nimport java.util.*;\n\n/*============================\n      Notification & Decorators\n=============================*/\n\ninterface INotification {\n    String getContent();\n}\n\n// Concrete Notification: simple text notification.\nclass SimpleNotification implements INotification {\n    private String text;\n\n    public SimpleNotification(String msg) {\n        this.text = msg;\n    }\n\n    public String getContent() {\n        return text;\n    }\n}\n\n// Abstract Decorator: wraps a Notification object.\nabstract class INotificationDecorator implements INotification {\n    protected INotification notification;\n\n    public INotificationDecorator(INotification n) {\n        this.notification = n;\n    }\n}\n\n// Decorator to add a timestamp to the content.\nclass TimestampDecorator extends INotificationDecorator {\n    public TimestampDecorator(INotification n) {\n        super(n);\n    }\n\n    public String getContent() {\n        return \"[2025-04-13 14:22:00] \" + notification.getContent();\n    }\n}\n\n// Decorator to append a signature to the content.\nclass SignatureDecorator extends INotificationDecorator {\n    private String signature;\n\n    public SignatureDecorator(INotification n, String sig) {\n        super(n);\n        this.signature = sig;\n    }\n\n    public String getContent() {\n        return notification.getContent() + \"\\n-- \" + signature + \"\\n\\n\";\n    }\n}\n\n/*============================\n  Observer Pattern Components\n=============================*/\n\n// Observer interface: each observer gets an update with a Notification pointer.\ninterface IObserver {\n    void update();\n}\n\ninterface IObservable {\n    void addObserver(IObserver observer);\n    void removeObserver(IObserver observer);\n    void notifyObservers();\n}\n\n// Concrete Observable\nclass NotificationObservable implements IObservable {\n    private List<IObserver> observers = new ArrayList<>();\n    private INotification currentNotification = null;\n\n    public void addObserver(IObserver obs) {\n        observers.add(obs);\n    }\n\n    public void removeObserver(IObserver obs) {\n        observers.remove(obs);\n    }\n\n    public void notifyObservers() {\n        for (IObserver obs : observers) {\n            obs.update();\n        }\n    }\n\n    public void setNotification(INotification notification) {\n        this.currentNotification = notification;\n        notifyObservers();\n    }\n\n    public INotification getNotification() {\n        return currentNotification;\n    }\n\n    public String getNotificationContent() {\n        return currentNotification.getContent();\n    }\n}\n\n/*============================\n       NotificationService\n=============================*/\n\n// The NotificationService manages notifications. It keeps track of notifications. \n// Any client code will interact with this service.\n\n// Singleton class\nclass NotificationService {\n    private NotificationObservable observable;\n    private static NotificationService instance = null;\n    private List<INotification> notifications = new ArrayList<>();\n\n    private NotificationService() {\n        observable = new NotificationObservable();\n    }\n\n    public static NotificationService getInstance() {\n        if (instance == null) {\n            instance = new NotificationService();\n        }\n        return instance;\n    }\n\n    // Expose the observable so observers can attach.\n    public NotificationObservable getObservable() {\n        return observable;\n    }\n\n    // Creates a new Notification and notifies observers.\n    public void sendNotification(INotification notification) {\n        notifications.add(notification);\n        observable.setNotification(notification);\n    }\n}\n\n/*============================\n       ConcreteObservers\n=============================*/\nclass Logger implements IObserver {\n    private NotificationObservable notificationObservable;\n\n    public Logger() {\n        this.notificationObservable = NotificationService.getInstance().getObservable();\n        notificationObservable.addObserver(this);\n    }\n\n    public Logger(NotificationObservable observable) {\n        notificationObservable.addObserver(this);\n        this.notificationObservable = observable;\n    }\n\n    public void update() {\n        System.out.println(\"Logging New Notification : \\n\" + notificationObservable.getNotificationContent());\n    }\n}\n\n/*============================\n  Strategy Pattern Components (Concrete Observer 2)\n=============================*/\n\ninterface INotificationStrategy {\n    void sendNotification(String content);\n}\n\nclass EmailStrategy implements INotificationStrategy {\n    private String emailId;\n\n    public EmailStrategy(String emailId) {\n        this.emailId = emailId;\n    }\n\n    public void sendNotification(String content) {\n        // Simulate the process of sending an email notification, \n        // representing the dispatch of messages to users via email.​\n        System.out.println(\"Sending email Notification to: \" + emailId + \"\\n\" + content);\n    }\n}\n\nclass SMSStrategy implements INotificationStrategy {\n    private String mobileNumber;\n\n    public SMSStrategy(String mobileNumber) {\n        this.mobileNumber = mobileNumber;\n    }\n\n    public void sendNotification(String content) {\n        // Simulate the process of sending an SMS notification, \n        // representing the dispatch of messages to users via SMS.​\n        System.out.println(\"Sending SMS Notification to: \" + mobileNumber + \"\\n\" + content);\n    }\n}\n\nclass PopUpStrategy implements INotificationStrategy {\n    public void sendNotification(String content) {\n        // Simulate the process of sending popup notification.\n        System.out.println(\"Sending Popup Notification: \\n\" + content);\n    }\n}\n\nclass NotificationEngine implements IObserver {\n    private NotificationObservable notificationObservable;\n    private List<INotificationStrategy> notificationStrategies = new ArrayList<>();\n\n    public NotificationEngine() {\n        this.notificationObservable = NotificationService.getInstance().getObservable();\n        notificationObservable.addObserver(this);\n    }\n\n    public NotificationEngine(NotificationObservable observable) {\n        this.notificationObservable = observable;\n    }\n\n    public void addNotificationStrategy(INotificationStrategy ns) {\n        this.notificationStrategies.add(ns);\n    }\n\n    // Can have RemoveNotificationStrategy as well.\n\n    public void update() {\n        String notificationContent = notificationObservable.getNotificationContent();\n        for (INotificationStrategy strategy : notificationStrategies) {\n            strategy.sendNotification(notificationContent);\n        }\n    }\n}\n\npublic class NotificationSystemUpdated {\n    public static void main(String[] args) {\n\n        // Create NotificationService.\n        NotificationService notificationService = NotificationService.getInstance();\n\n        // Create Logger Observer\n        Logger logger = new Logger();\n\n        // Create NotificationEngine observers.\n        NotificationEngine notificationEngine = new NotificationEngine();\n\n        notificationEngine.addNotificationStrategy(new EmailStrategy(\"random.person@gmail.com\"));\n        notificationEngine.addNotificationStrategy(new SMSStrategy(\"+91 9876543210\"));\n        notificationEngine.addNotificationStrategy(new PopUpStrategy());\n\n        INotification notification = new SimpleNotification(\"Your order has been shipped!\");\n        notification = new TimestampDecorator(notification);\n        notification = new SignatureDecorator(notification, \"Customer Care\");\n\n        notificationService.sendNotification(notification);\n    }\n}"
            },
            {
              "label": "NotificationSystem.java",
              "content": "// Java version of the C++ Notification System using Decorator, Observer, Strategy, and Singleton Patterns\nimport java.util.*;\n\n/*============================\n      Notification & Decorators\n=============================*/\n\ninterface INotification {\n    String getContent();\n}\n\n// Concrete Notification: simple text notification.\nclass SimpleNotification implements INotification {\n    private String text;\n\n    public SimpleNotification(String msg) {\n        this.text = msg;\n    }\n\n    public String getContent() {\n        return text;\n    }\n}\n\n// Abstract Decorator: wraps a Notification object.\nabstract class INotificationDecorator implements INotification {\n    protected INotification notification;\n\n    public INotificationDecorator(INotification n) {\n        this.notification = n;\n    }\n}\n\n// Decorator to add a timestamp to the content.\nclass TimestampDecorator extends INotificationDecorator {\n    public TimestampDecorator(INotification n) {\n        super(n);\n    }\n\n    public String getContent() {\n        return \"[2025-04-13 14:22:00] \" + notification.getContent();\n    }\n}\n\n// Decorator to append a signature to the content.\nclass SignatureDecorator extends INotificationDecorator {\n    private String signature;\n\n    public SignatureDecorator(INotification n, String sig) {\n        super(n);\n        this.signature = sig;\n    }\n\n    public String getContent() {\n        return notification.getContent() + \"\\n-- \" + signature + \"\\n\\n\";\n    }\n}\n\n/*============================\n  Observer Pattern Components\n=============================*/\n\ninterface IObserver {\n    void update();\n}\n\ninterface IObservable {\n    void addObserver(IObserver observer);\n    void removeObserver(IObserver observer);\n    void notifyObservers();\n}\n\n// Concrete Observable\nclass NotificationObservable implements IObservable {\n    private List<IObserver> observers = new ArrayList<>();\n    private INotification currentNotification;\n\n    public void addObserver(IObserver obs) {\n        observers.add(obs);\n    }\n\n    public void removeObserver(IObserver obs) {\n        observers.remove(obs);\n    }\n\n    public void notifyObservers() {\n        for (IObserver observer : observers) {\n            observer.update();\n        }\n    }\n\n    public void setNotification(INotification notification) {\n        this.currentNotification = notification;\n        notifyObservers();\n    }\n\n    public INotification getNotification() {\n        return currentNotification;\n    }\n\n    public String getNotificationContent() {\n        return currentNotification.getContent();\n    }\n}\n\n// Concrete Observer 1\nclass Logger implements IObserver {\n    private NotificationObservable notificationObservable;\n\n    public Logger(NotificationObservable observable) {\n        this.notificationObservable = observable;\n    }\n\n    public void update() {\n        System.out.println(\"Logging New Notification : \\n\" + notificationObservable.getNotificationContent());\n    }\n}\n\n/*============================\n  Strategy Pattern Components (Concrete Observer 2)\n=============================*/\n\ninterface INotificationStrategy {\n    void sendNotification(String content);\n}\n\nclass EmailStrategy implements INotificationStrategy {\n    private String emailId;\n\n    public EmailStrategy(String emailId) {\n        this.emailId = emailId;\n    }\n\n    public void sendNotification(String content) {\n        System.out.println(\"Sending email Notification to: \" + emailId + \"\\n\" + content);\n    }\n}\n\nclass SMSStrategy implements INotificationStrategy {\n    private String mobileNumber;\n\n    public SMSStrategy(String mobileNumber) {\n        this.mobileNumber = mobileNumber;\n    }\n\n    public void sendNotification(String content) {\n        System.out.println(\"Sending SMS Notification to: \" + mobileNumber + \"\\n\" + content);\n    }\n}\n\nclass PopUpStrategy implements INotificationStrategy {\n    public void sendNotification(String content) {\n        System.out.println(\"Sending Popup Notification: \\n\" + content);\n    }\n}\n\nclass NotificationEngine implements IObserver {\n    private NotificationObservable notificationObservable;\n    private List<INotificationStrategy> notificationStrategies = new ArrayList<>();\n\n    public NotificationEngine(NotificationObservable observable) {\n        this.notificationObservable = observable;\n    }\n\n    public void addNotificationStrategy(INotificationStrategy ns) {\n        this.notificationStrategies.add(ns);\n    }\n\n    public void update() {\n        String notificationContent = notificationObservable.getNotificationContent();\n        for (INotificationStrategy strategy : notificationStrategies) {\n            strategy.sendNotification(notificationContent);\n        }\n    }\n}\n\n/*============================\n       NotificationService\n=============================*/\n\n// The NotificationService manages notifications. It keeps track of notifications. \n// Any client code will interact with this service.\n\n// Singleton class\nclass NotificationService {\n    private NotificationObservable observable;\n    private static NotificationService instance;\n    private List<INotification> notifications = new ArrayList<>();\n\n    private NotificationService() {\n        observable = new NotificationObservable();\n    }\n\n    public static NotificationService getInstance() {\n        if (instance == null) {\n            instance = new NotificationService();\n        }\n        return instance;\n    }\n\n    public NotificationObservable getObservable() {\n        return observable;\n    }\n\n    public void sendNotification(INotification notification) {\n        notifications.add(notification);\n        observable.setNotification(notification);\n    }\n}\n\npublic class NotificationSystem {\n    public static void main(String[] args) {\n\n        // Create NotificationService.\n        NotificationService notificationService = NotificationService.getInstance();\n\n        // Get Observable\n        NotificationObservable notificationObservable = notificationService.getObservable();\n\n        // Create Logger Observer\n        Logger logger = new Logger(notificationObservable);\n\n        // Create NotificationEngine observers.\n        NotificationEngine notificationEngine = new NotificationEngine(notificationObservable);\n\n        notificationEngine.addNotificationStrategy(new EmailStrategy(\"random.person@gmail.com\"));\n        notificationEngine.addNotificationStrategy(new SMSStrategy(\"+91 9876543210\"));\n        notificationEngine.addNotificationStrategy(new PopUpStrategy());\n\n        // Attach these observers.\n        notificationObservable.addObserver(logger);\n        notificationObservable.addObserver(notificationEngine);\n\n        // Create a notification with decorators.\n        INotification notification = new SimpleNotification(\"Your order has been shipped!\");\n        notification = new TimestampDecorator(notification);\n        notification = new SignatureDecorator(notification, \"Customer Care\");\n\n        notificationService.sendNotification(notification);\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Use a plug-and-play model for notification behavior.",
                "Support multiple notification channels such as SMS, email, and pop-up.",
                "Notification content should be extendable dynamically, for example with images, timestamps, or signatures.",
                "Support notification delivery and logging as replaceable integrations."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Build notification engine",
              "url": "https://www.youtube.com/watch?v=t-4r2AsJz_Q&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "spotify",
          "title": "Spotify",
          "description": "Music playback using adapters, factories, facade, playlist strategies, and managers.",
          "notes": [
            "External Devices API",
            "Adapter to connect these",
            "Startegy -> parent of all",
            "Factory -> which one to play",
            "Manager",
            "Audio Engine -> will take type of device and play",
            "Facade to play, create, next all",
            "Playlist"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/18. Spotify/UML.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "import MusicPlayerApplication.enums.DeviceType;\nimport MusicPlayerApplication.enums.PlayStrategyType;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            MusicPlayerApplication application = MusicPlayerApplication.getInstance();\n\n            // Populate library\n            application.createSongInLibrary(\"Kesariya\", \"Arijit Singh\", \"/music/kesariya.mp3\");\n            application.createSongInLibrary(\"Chaiyya Chaiyya\", \"Sukhwinder Singh\", \"/music/chaiyya_chaiyya.mp3\");\n            application.createSongInLibrary(\"Tum Hi Ho\", \"Arijit Singh\", \"/music/tum_hi_ho.mp3\");\n            application.createSongInLibrary(\"Jai Ho\", \"A. R. Rahman\", \"/music/jai_ho.mp3\");\n            application.createSongInLibrary(\"Zinda\", \"Siddharth Mahadevan\", \"/music/zinda.mp3\");\n\n            // Create playlist and add songs\n            application.createPlaylist(\"Bollywood Vibes\");\n            application.addSongToPlaylist(\"Bollywood Vibes\", \"Kesariya\");\n            application.addSongToPlaylist(\"Bollywood Vibes\", \"Chaiyya Chaiyya\");\n            application.addSongToPlaylist(\"Bollywood Vibes\", \"Tum Hi Ho\");\n            application.addSongToPlaylist(\"Bollywood Vibes\", \"Jai Ho\");\n\n            // Connect device\n            application.connectAudioDevice(DeviceType.BLUETOOTH);\n\n            //Play/pause a single song\n            application.playSingleSong(\"Zinda\");\n            application.pauseCurrentSong(\"Zinda\");\n            application.playSingleSong(\"Zinda\");  // resume\n\n            System.out.println(\"\\n-- Sequential Playback --\\n\");\n            application.selectPlayStrategy(PlayStrategyType.SEQUENTIAL);\n            application.loadPlaylist(\"Bollywood Vibes\");\n            application.playAllTracksInPlaylist();\n\n            System.out.println(\"\\n-- Random Playback --\\n\");\n            application.selectPlayStrategy(PlayStrategyType.RANDOM);\n            application.loadPlaylist(\"Bollywood Vibes\");\n            application.playAllTracksInPlaylist();\n\n            System.out.println(\"\\n-- Custom Queue Playback --\\n\");\n            application.selectPlayStrategy(PlayStrategyType.CUSTOM_QUEUE);\n            application.loadPlaylist(\"Bollywood Vibes\");\n            application.queueSongNext(\"Kesariya\");\n            application.queueSongNext(\"Tum Hi Ho\");\n            application.playAllTracksInPlaylist();\n\n            System.out.println(\"\\n-- Play Previous in Sequential --\\n\");\n            application.selectPlayStrategy(PlayStrategyType.SEQUENTIAL);\n            application.loadPlaylist(\"Bollywood Vibes\");\n            application.playAllTracksInPlaylist();\n\n            application.playPreviousTrackInPlaylist();\n            application.playPreviousTrackInPlaylist();\n\n        } catch (Exception error) {\n            System.err.println(\"Error: \" + error.getMessage());\n        }\n    }\n}"
            },
            {
              "label": "MusicPlayerFacade.java",
              "content": "import MusicPlayerApplication.core.AudioEngine;\nimport MusicPlayerApplication.models.Playlist;\nimport MusicPlayerApplication.models.Song;\nimport MusicPlayerApplication.strategies.PlayStrategy;\nimport MusicPlayerApplication.enums.DeviceType;\nimport MusicPlayerApplication.enums.PlayStrategyType;\nimport MusicPlayerApplication.managers.DeviceManager;\nimport MusicPlayerApplication.managers.PlaylistManager;\nimport MusicPlayerApplication.managers.StrategyManager;\nimport MusicPlayerApplication.device.IAudioOutputDevice;\n\npublic class MusicPlayerFacade {\n    private static MusicPlayerFacade instance = null;\n    private AudioEngine audioEngine;\n    private Playlist loadedPlaylist;\n    private PlayStrategy playStrategy;\n\n    private MusicPlayerFacade() {\n        loadedPlaylist = null;\n        playStrategy = null;\n        audioEngine = new AudioEngine();\n    }\n\n    public static synchronized MusicPlayerFacade getInstance() {\n        if (instance == null) {\n            instance = new MusicPlayerFacade();\n        }\n        return instance;\n    }\n\n    public void connectDevice(DeviceType deviceType) {\n        DeviceManager.getInstance().connect(deviceType);\n    }\n\n    public void setPlayStrategy(PlayStrategyType strategyType) {\n        playStrategy = StrategyManager.getInstance().getStrategy(strategyType);\n    }\n\n    public void loadPlaylist(String name) {\n        loadedPlaylist = PlaylistManager.getInstance().getPlaylist(name);\n        if (playStrategy == null) {\n            throw new RuntimeException(\"Play strategy not set before loading.\");\n        }\n        playStrategy.setPlaylist(loadedPlaylist);\n    }\n\n    public void playSong(Song song) {\n        if (!DeviceManager.getInstance().hasOutputDevice()) {\n            throw new RuntimeException(\"No audio device connected.\");\n        }\n        IAudioOutputDevice device = DeviceManager.getInstance().getOutputDevice();\n        audioEngine.play(device, song);\n    }\n\n    public void pauseSong(Song song) {\n        if (!audioEngine.getCurrentSongTitle().equals(song.getTitle())) {\n            throw new RuntimeException(\"Cannot pause \\\"\" + song.getTitle() + \"\\\"; not currently playing.\");\n        }\n        audioEngine.pause();\n    }\n\n    public void playAllTracks() {\n        if (loadedPlaylist == null) {\n            throw new RuntimeException(\"No playlist loaded.\");\n        }\n        while (playStrategy.hasNext()) {\n            Song nextSong = playStrategy.next();\n            IAudioOutputDevice device = DeviceManager.getInstance().getOutputDevice();\n            audioEngine.play(device, nextSong);\n        }\n        System.out.println(\"Completed playlist: \" + loadedPlaylist.getPlaylistName());\n    }\n\n    public void playNextTrack() {\n        if (loadedPlaylist == null) {\n            throw new RuntimeException(\"No playlist loaded.\");\n        }\n        if (playStrategy.hasNext()) {\n            Song nextSong = playStrategy.next();\n            IAudioOutputDevice device = DeviceManager.getInstance().getOutputDevice();\n            audioEngine.play(device, nextSong);\n        } else {\n            System.out.println(\"Completed playlist: \" + loadedPlaylist.getPlaylistName());\n        }\n    }\n\n    public void playPreviousTrack() {\n        if (loadedPlaylist == null) {\n            throw new RuntimeException(\"No playlist loaded.\");\n        }\n        if (playStrategy.hasPrevious()) {\n            Song prevSong = playStrategy.previous();\n            IAudioOutputDevice device = DeviceManager.getInstance().getOutputDevice();\n            audioEngine.play(device, prevSong);\n        } else {\n            System.out.println(\"Completed playlist: \" + loadedPlaylist.getPlaylistName());\n        }\n    }\n\n    public void enqueueNext(Song song) {\n        playStrategy.addToNext(song);\n    }\n}"
            },
            {
              "label": "MusicPlayerApplication.java",
              "content": "import MusicPlayerApplication.models.Song;\nimport MusicPlayerApplication.managers.PlaylistManager;\nimport MusicPlayerApplication.enums.DeviceType;\nimport MusicPlayerApplication.enums.PlayStrategyType;\n\npublic class MusicPlayerApplication {\n    private static MusicPlayerApplication instance = null;\n    private java.util.List<Song> songLibrary;\n\n    private MusicPlayerApplication() {\n        songLibrary = new java.util.ArrayList<>();\n    }\n\n    public static synchronized MusicPlayerApplication getInstance() {\n        if (instance == null) {\n            instance = new MusicPlayerApplication();\n        }\n        return instance;\n    }\n\n    public void createSongInLibrary(String title, String artist, String path) {\n        Song newSong = new Song(title, artist, path);\n        songLibrary.add(newSong);\n    }\n\n    public Song findSongByTitle(String title) {\n        for (Song s : songLibrary) {\n            if (s.getTitle().equals(title)) {\n                return s;\n            }\n        }\n        return null;\n    }\n\n    public void createPlaylist(String playlistName) {\n        PlaylistManager.getInstance().createPlaylist(playlistName);\n    }\n\n    public void addSongToPlaylist(String playlistName, String songTitle) {\n        Song song = findSongByTitle(songTitle);\n        if (song == null) {\n            throw new RuntimeException(\"Song \\\"\" + songTitle + \"\\\" not found in library.\");\n        }\n        PlaylistManager.getInstance().addSongToPlaylist(playlistName, song);\n    }\n\n    public void connectAudioDevice(DeviceType deviceType) {\n        MusicPlayerFacade.getInstance().connectDevice(deviceType);\n    }\n\n    public void selectPlayStrategy(PlayStrategyType strategyType) {\n        MusicPlayerFacade.getInstance().setPlayStrategy(strategyType);\n    }\n\n    public void loadPlaylist(String playlistName) {\n        MusicPlayerFacade.getInstance().loadPlaylist(playlistName);\n    }\n\n    public void playSingleSong(String songTitle) {\n        Song song = findSongByTitle(songTitle);\n        if (song == null) {\n            throw new RuntimeException(\"Song \\\"\" + songTitle + \"\\\" not found.\");\n        }\n        MusicPlayerFacade.getInstance().playSong(song);\n    }\n\n    public void pauseCurrentSong(String songTitle) {\n        Song song = findSongByTitle(songTitle);\n        if (song == null) {\n            throw new RuntimeException(\"Song \\\"\" + songTitle + \"\\\" not found.\");\n        }\n        MusicPlayerFacade.getInstance().pauseSong(song);\n    }\n\n    public void playAllTracksInPlaylist() {\n        MusicPlayerFacade.getInstance().playAllTracks();\n    }\n\n    public void playPreviousTrackInPlaylist() {\n        MusicPlayerFacade.getInstance().playPreviousTrack();\n    }\n\n    public void queueSongNext(String songTitle) {\n        Song song = findSongByTitle(songTitle);\n        if (song == null) {\n            throw new RuntimeException(\"Song \\\"\" + songTitle + \"\\\" not found.\");\n        }\n        MusicPlayerFacade.getInstance().enqueueNext(song);\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Users can play and pause songs.",
                "Users can create playlists and add songs to playlists.",
                "Users can play an entire playlist in sequential, random, or custom order.",
                "The app should support multiple output devices such as Bluetooth speakers, wired speakers, and headphones.",
                "The design should be scalable for new output devices and new playlist playback features."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Build Spotify music player",
              "url": "https://www.youtube.com/watch?v=DkLwFqbCsu8&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "payment-gateway",
          "title": "Payment Gateway",
          "description": "Gateway adapters, payment template flow, retries, proxy, and factory selection.",
          "notes": [
            "External Banking system",
            "Connect with Payment Gateway Adapters -> Paytm/ Razorpay",
            "(Interface + sub classes) -> template design as all 3 validate + initatie + complete in order",
            "Proxy for retry mechanism",
            "Gateway factory for which payment type but returns proxy as internally proxy will call ind gateway",
            "controler",
            "mainapp"
          ],
          "images": [
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_3.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/23. PaymentGateway/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "PaymentGatewayApplication.java",
              "content": "import java.util.*;\n\n// ----------------------------\n// Data structure for payment details\n// ----------------------------\nclass PaymentRequest {\n    public String sender;\n    public String reciever;\n    public double amount;\n    public String currency;\n\n    public PaymentRequest(String sender, String reciever, double amt, String curr) {\n        this.sender   = sender;\n        this.reciever = reciever;\n        this.amount   = amt;\n        this.currency = curr;\n    }\n}\n\n// ----------------------------\n// Banking System interface and implementations (Strategy for actual payment logic)\n// ----------------------------\ninterface BankingSystem {\n    boolean processPayment(double amount);\n}\n\nclass PaytmBankingSystem implements BankingSystem {\n    private Random rand = new Random();\n\n    public PaytmBankingSystem() {}\n\n    @Override\n    public boolean processPayment(double amount) {\n        // Simulate 20% success\n        int r = rand.nextInt(100);\n        return r < 80;\n    }\n}\n\nclass RazorpayBankingSystem implements BankingSystem {\n    private Random rand = new Random();\n\n    public RazorpayBankingSystem() {}\n\n    @Override\n    public boolean processPayment(double amount) {\n        System.out.println(\"[BankingSystem-Razorpay] Processing payment of \" + amount + \"...\");\n        // Simulate 90% success\n        int r = rand.nextInt(100);\n        return r < 90;\n    }\n}\n\n// ----------------------------\n// Abstract base class for Payment Gateway (Template Method Pattern)\n// ----------------------------\nabstract class PaymentGateway {\n    protected BankingSystem bankingSystem;\n\n    public PaymentGateway() {\n        this.bankingSystem = null;\n    }\n\n    // Template method defining the standard payment flow\n    public boolean processPayment(PaymentRequest request) {\n        if (!validatePayment(request)) {\n            System.out.println(\"[PaymentGateway] Validation failed for \" + request.sender + \".\");\n            return false;\n        }\n        if (!initiatePayment(request)) {\n            System.out.println(\"[PaymentGateway] Initiation failed for \" + request.sender + \".\");\n            return false;\n        }\n        if (!confirmPayment(request)) {\n            System.out.println(\"[PaymentGateway] Confirmation failed for \" + request.sender + \".\");\n            return false;\n        }\n        return true;\n    }\n\n    // Steps to be implemented by concrete gateways\n    protected abstract boolean validatePayment(PaymentRequest request);\n    protected abstract boolean initiatePayment(PaymentRequest request);\n    protected abstract boolean confirmPayment(PaymentRequest request);\n}\n\n// ----------------------------\n// Concrete Payment Gateway for Paytm\n// ----------------------------\nclass PaytmGateway extends PaymentGateway {\n    public PaytmGateway() {\n        this.bankingSystem = new PaytmBankingSystem();\n    }\n\n    @Override\n    protected boolean validatePayment(PaymentRequest request) {\n        System.out.println(\"[Paytm] Validating payment for \" + request.sender + \".\");\n        if (request.amount <= 0 || !\"INR\".equals(request.currency)) {\n            return false;\n        }\n        return true;\n    }\n\n    @Override\n    protected boolean initiatePayment(PaymentRequest request) {\n        System.out.println(\"[Paytm] Initiating payment of \" + request.amount\n                + \" \" + request.currency + \" for \" + request.sender + \".\");\n        return bankingSystem.processPayment(request.amount);\n    }\n\n    @Override\n    protected boolean confirmPayment(PaymentRequest request) {\n        System.out.println(\"[Paytm] Confirming payment for \" + request.sender + \".\");\n        // Confirmation always succeeds in this simulation\n        return true;\n    }\n}\n\n// ----------------------------\n// Concrete Payment Gateway for Razorpay\n// ----------------------------\nclass RazorpayGateway extends PaymentGateway {\n    public RazorpayGateway() {\n        this.bankingSystem = new RazorpayBankingSystem();\n    }\n\n    @Override\n    protected boolean validatePayment(PaymentRequest request) {\n        System.out.println(\"[Razorpay] Validating payment for \" + request.sender + \".\");\n        if (request.amount <= 0) {\n            return false;\n        }\n        return true;\n    }\n\n    @Override\n    protected boolean initiatePayment(PaymentRequest request) {\n        System.out.println(\"[Razorpay] Initiating payment of \" + request.amount\n                + \" \" + request.currency + \" for \" + request.sender + \".\");\n        return bankingSystem.processPayment(request.amount);\n    }\n\n    @Override\n    protected boolean confirmPayment(PaymentRequest request) {\n        System.out.println(\"[Razorpay] Confirming payment for \" + request.sender + \".\");\n        // Confirmation always succeeds in this simulation\n        return true;\n    }\n}\n\n// ----------------------------\n// Proxy class that wraps a PaymentGateway to add retries (Proxy Pattern)\n// ----------------------------\nclass PaymentGatewayProxy extends PaymentGateway {\n    private PaymentGateway realGateway;\n    private int retries;\n\n    public PaymentGatewayProxy(PaymentGateway gateway, int maxRetries) {\n        this.realGateway = gateway;\n        this.retries     = maxRetries;\n    }\n\n    @Override\n    public boolean processPayment(PaymentRequest request) {\n        boolean result = false;\n        for (int attempt = 0; attempt < retries; ++attempt) {\n            if (attempt > 0) {\n                System.out.println(\"[Proxy] Retrying payment (attempt \" + (attempt+1)\n                        + \") for \" + request.sender + \".\");\n            }\n            result = realGateway.processPayment(request);\n            if (result) break;\n        }\n        if (!result) {\n            System.out.println(\"[Proxy] Payment failed after \" + retries\n                    + \" attempts for \" + request.sender + \".\");\n        }\n        return result;\n    }\n\n    @Override\n    protected boolean validatePayment(PaymentRequest request) {\n        return realGateway.validatePayment(request);\n    }\n\n    @Override\n    protected boolean initiatePayment(PaymentRequest request) {\n        return realGateway.initiatePayment(request);\n    }\n\n    @Override\n    protected boolean confirmPayment(PaymentRequest request) {\n        return realGateway.confirmPayment(request);\n    }\n}\n\n// ----------------------------\n// Gateway Factory for creating gateway (Singleton)\n// ----------------------------\nenum GatewayType {\n    PAYTM,\n    RAZORPAY\n}\n\nclass GatewayFactory {\n    private static final GatewayFactory instance = new GatewayFactory();\n\n    private GatewayFactory() {}\n\n    public static GatewayFactory getInstance() {\n        return instance;\n    }\n\n    public PaymentGateway getGateway(GatewayType type) {\n        if (type == GatewayType.PAYTM) {\n            PaymentGateway paymentGateway = new PaytmGateway();\n            return new PaymentGatewayProxy(paymentGateway, 3);\n        } else {\n            PaymentGateway paymentGateway = new RazorpayGateway();\n            return new PaymentGatewayProxy(paymentGateway, 1);\n        }\n    }\n}\n\n// ----------------------------\n// Unified API service (Singleton)\n// ----------------------------\nclass PaymentService {\n    private static final PaymentService instance = new PaymentService();\n    private PaymentGateway gateway;\n\n    private PaymentService() {\n        this.gateway = null;\n    }\n\n    public static PaymentService getInstance() {\n        return instance;\n    }\n\n    public void setGateway(PaymentGateway g) {\n        this.gateway = g;\n    }\n\n    public boolean processPayment(PaymentRequest request) {\n        if (gateway == null) {\n            System.out.println(\"[PaymentService] No payment gateway selected.\");\n            return false;\n        }\n        return gateway.processPayment(request);\n    }\n}\n\n// ----------------------------\n// Controller class for all client requests (Singleton)\n// ----------------------------\nclass PaymentController {\n    private static final PaymentController instance = new PaymentController();\n\n    private PaymentController() {}\n\n    public static PaymentController getInstance() {\n        return instance;\n    }\n\n    public boolean handlePayment(GatewayType type, PaymentRequest req) {\n        PaymentGateway paymentGateway = GatewayFactory.getInstance().getGateway(type);\n        PaymentService.getInstance().setGateway(paymentGateway);\n        return PaymentService.getInstance().processPayment(req);\n    }\n}\n\n// ----------------------------\n// Main: Client code now goes through controller\n// ----------------------------\npublic class PaymentGatewayApplication {\n    public static void main(String[] args) {\n        PaymentRequest req1 = new PaymentRequest(\"Aditya\", \"Shubham\", 1000.0, \"INR\");\n\n        System.out.println(\"Processing via Paytm\");\n        System.out.println(\"------------------------------\");\n        boolean res1 = PaymentController.getInstance().handlePayment(GatewayType.PAYTM, req1);\n        System.out.println(\"Result: \" + (res1 ? \"SUCCESS\" : \"FAIL\"));\n        System.out.println(\"------------------------------\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Support multiple payment providers such as Paytm and Razorpay.",
                "Allow new gateways to be added easily in the future.",
                "Define a standard payment flow with required validations.",
                "Support error handling and retry mechanisms.",
                "Allow different retry strategies such as linear retry and exponential backoff.",
                "Support additional features such as recurring payments and subscriptions."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Build payment gateway",
              "url": "https://www.youtube.com/watch?v=36FDqIRBGRg&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "discount-coupon",
          "title": "Discount Coupon",
          "description": "Cart pricing, discount strategies, coupon chain, and template application flow.",
          "notes": [
            "Create Product, Cart, Cart service to maintain price",
            "Discount strategy and its implementations by",
            "Flat, Pct, CapPct",
            "Discount Manager -> Factory kind of",
            "Coupon -> COR",
            "+ apply -> Template",
            "applicable",
            "apply"
          ],
          "images": [
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_4.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/24. DiscountCoupon/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "DiscountCoupon.java",
              "content": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\n// ----------------------------\n// Discount Strategy (Strategy Pattern)\n// ----------------------------\ninterface DiscountStrategy {\n    double calculate(double baseAmount);\n}\n\nclass FlatDiscountStrategy implements DiscountStrategy {\n    private double amount;\n\n    public FlatDiscountStrategy(double amt) {\n        this.amount = amt;\n    }\n\n    @Override\n    public double calculate(double baseAmount) {\n        return Math.min(amount, baseAmount);\n    }\n}\n\nclass PercentageDiscountStrategy implements DiscountStrategy {\n    private double percent;\n\n    public PercentageDiscountStrategy(double pct) {\n        this.percent = pct;\n    }\n\n    @Override\n    public double calculate(double baseAmount) {\n        return (percent / 100.0) * baseAmount;\n    }\n}\n\nclass PercentageWithCapStrategy implements DiscountStrategy {\n    private double percent;\n    private double cap;\n\n    public PercentageWithCapStrategy(double pct, double capVal) {\n        this.percent = pct;\n        this.cap     = capVal;\n    }\n\n    @Override\n    public double calculate(double baseAmount) {\n        double disc = (percent / 100.0) * baseAmount;\n        return disc > cap ? cap : disc;\n    }\n}\n\nenum StrategyType {\n    FLAT,\n    PERCENT,\n    PERCENT_WITH_CAP\n}\n\n// ----------------------------\n// DiscountStrategyManager (Singleton)\n// ----------------------------\nclass DiscountStrategyManager {\n    private static DiscountStrategyManager instance;\n\n    private DiscountStrategyManager() {}\n\n    public static synchronized DiscountStrategyManager getInstance() {\n        if (instance == null) {\n            instance = new DiscountStrategyManager();\n        }\n        return instance;\n    }\n\n    public DiscountStrategy getStrategy(StrategyType type, double param1, double param2) {\n        switch(type) {\n            case FLAT:\n                return new FlatDiscountStrategy(param1);\n            case PERCENT:\n                return new PercentageDiscountStrategy(param1);\n            case PERCENT_WITH_CAP:\n                return new PercentageWithCapStrategy(param1, param2);\n            default:\n                return null;\n        }\n    }\n}\n\n// ----------------------------\n// Assume existing Cart and Product classes\n// ----------------------------\nclass Product {\n    private String name;\n    private String category;\n    private double price;\n\n    public Product(String name, String category, double price) {\n        this.name     = name;\n        this.category = category;\n        this.price    = price;\n    }\n\n    public String getName() {\n        return name;\n    }\n    public String getCategory() {\n        return category;\n    }\n    public double getPrice() {\n        return price;\n    }\n}\n\nclass CartItem {\n    private Product product;\n    private int quantity;\n\n    public CartItem(Product prod, int qty) {\n        this.product  = prod;\n        this.quantity = qty;\n    }\n\n    public double itemTotal() {\n        return product.getPrice() * quantity;\n    }\n\n    public Product getProduct() {\n        return product;\n    }\n}\n\nclass Cart {\n    private List<CartItem> items = new ArrayList<>();\n    private double originalTotal = 0.0;\n    private double currentTotal  = 0.0;\n    private boolean loyaltyMember;\n    private String paymentBank;\n\n    public Cart() {\n        this.loyaltyMember = false;\n        this.paymentBank   = \"\";\n    }\n\n    public void addProduct(Product prod, int qty) {\n        CartItem item = new CartItem(prod, qty);\n        items.add(item);\n        originalTotal += item.itemTotal();\n        currentTotal  += item.itemTotal();\n    }\n\n    public double getOriginalTotal() {\n        return originalTotal;\n    }\n\n    public double getCurrentTotal() {\n        return currentTotal;\n    }\n\n    public void applyDiscount(double d) {\n        currentTotal -= d;\n        if (currentTotal < 0) {\n            currentTotal = 0;\n        }\n    }\n\n    public void setLoyaltyMember(boolean member) {\n        this.loyaltyMember = member;\n    }\n\n    public boolean isLoyaltyMember() {\n        return loyaltyMember;\n    }\n\n    public void setPaymentBank(String bank) {\n        this.paymentBank = bank;\n    }\n\n    public String getPaymentBank() {\n        return paymentBank;\n    }\n\n    public List<CartItem> getItems() {\n        return items;\n    }\n}\n\n// ----------------------------\n// Coupon base class (Chain of Responsibility)\n// ----------------------------\nabstract class Coupon {\n    private Coupon next;\n\n    public Coupon() {\n        this.next = null;\n    }\n\n    public void setNext(Coupon nxt) {\n        this.next = nxt;\n    }\n\n    public Coupon getNext() {\n        return next;\n    }\n\n    public void applyDiscount(Cart cart) {\n        if (isApplicable(cart)) {\n            double discount = getDiscount(cart);\n            cart.applyDiscount(discount);\n            System.out.println(name() + \" applied: \" + discount);\n            if (!isCombinable()) {\n                return;\n            }\n        }\n        if (next != null) {\n            next.applyDiscount(cart);\n        }\n    }\n\n    public abstract boolean isApplicable(Cart cart);\n    public abstract double getDiscount(Cart cart);\n    public boolean isCombinable() {\n        return true;\n    }\n    public abstract String name();\n}\n\n// ----------------------------\n// Concrete Coupons\n// ----------------------------\nclass SeasonalOffer extends Coupon {\n    private double percent;\n    private String category;\n    private DiscountStrategy strat;\n\n    public SeasonalOffer(double pct, String cat) {\n        this.percent  = pct;\n        this.category = cat;\n        this.strat    = DiscountStrategyManager.getInstance()\n                            .getStrategy(StrategyType.PERCENT, percent, 0.0);\n    }\n\n    @Override\n    public boolean isApplicable(Cart cart) {\n        for (CartItem item : cart.getItems()) {\n            if (item.getProduct().getCategory().equals(category)) {\n                return true;\n            }\n        }\n        return false;\n    }\n\n    @Override\n    public double getDiscount(Cart cart) {\n        double subtotal = 0.0;\n        for (CartItem item : cart.getItems()) {\n            if (item.getProduct().getCategory().equals(category)) {\n                subtotal += item.itemTotal();\n            }\n        }\n        return strat.calculate(subtotal);\n    }\n\n    @Override\n    public String name() {\n        return \"Seasonal Offer \" + (int)percent + \"% off \" + category;\n    }\n}\n\nclass LoyaltyDiscount extends Coupon {\n    private double percent;\n    private DiscountStrategy strat;\n\n    public LoyaltyDiscount(double pct) {\n        this.percent = pct;\n        this.strat   = DiscountStrategyManager.getInstance()\n                            .getStrategy(StrategyType.PERCENT, percent, 0.0);\n    }\n\n    @Override\n    public boolean isApplicable(Cart cart) {\n        return cart.isLoyaltyMember();\n    }\n\n    @Override\n    public double getDiscount(Cart cart) {\n        return strat.calculate(cart.getCurrentTotal());\n    }\n\n    @Override\n    public String name() {\n        return \"Loyalty Discount \" + (int)percent + \"% off\";\n    }\n}\n\nclass BulkPurchaseDiscount extends Coupon {\n    private double threshold;\n    private double flatOff;\n    private DiscountStrategy strat;\n\n    public BulkPurchaseDiscount(double thr, double off) {\n        this.threshold = thr;\n        this.flatOff   = off;\n        this.strat     = DiscountStrategyManager.getInstance()\n                             .getStrategy(StrategyType.FLAT, flatOff, 0.0);\n    }\n\n    @Override\n    public boolean isApplicable(Cart cart) {\n        return cart.getOriginalTotal() >= threshold;\n    }\n\n    @Override\n    public double getDiscount(Cart cart) {\n        return strat.calculate(cart.getCurrentTotal());\n    }\n\n    @Override\n    public String name() {\n        return \"Bulk Purchase Rs \" + (int)flatOff + \" off over \" + (int)threshold;\n    }\n}\n\nclass BankingCoupon extends Coupon {\n    private String bank;\n    private double minSpend;\n    private double percent;\n    private double offCap;\n    private DiscountStrategy strat;\n\n    public BankingCoupon(String b, double ms, double percent, double offCap) {\n        this.bank    = b;\n        this.minSpend= ms;\n        this.percent = percent;\n        this.offCap  = offCap;\n        this.strat   = DiscountStrategyManager.getInstance()\n                            .getStrategy(StrategyType.PERCENT_WITH_CAP, percent, offCap);\n    }\n\n    @Override\n    public boolean isApplicable(Cart cart) {\n        return cart.getPaymentBank().equals(bank)\n            && cart.getOriginalTotal() >= minSpend;\n    }\n\n    @Override\n    public double getDiscount(Cart cart) {\n        return strat.calculate(cart.getCurrentTotal());\n    }\n\n    @Override\n    public String name() {\n        return bank + \" Bank Rs \" + (int)percent + \" off upto \" + (int)offCap;\n    }\n}\n\n// ----------------------------\n// CouponManager (Singleton)\n// ----------------------------\nclass CouponManager {\n    private static CouponManager instance;\n    private Coupon head;\n    private\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Allow new coupons to be added at runtime.",
                "Support both cart-level and product-level discounts.",
                "Support multiple coupon types such as seasonal offers, loyalty discounts, and banking discounts.",
                "Support both flat and percentage discounts.",
                "Decide whether one coupon can be applied on top of another coupon.",
                "Design coupons to be thread-safe."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Build discount coupon engine",
              "url": "https://www.youtube.com/watch?v=jbVevoGN_pM&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            }
          ]
        },
        {
          "id": "zepto",
          "title": "Zepto",
          "description": "Dark-store ordering with inventory, replenishment, cart, and order services.",
          "notes": [
            "User -> Cart -> Order -> Dark Store -> Inventory -> Product",
            "Product",
            "Product Manager -> add, remove, list, check",
            "Replenish Strategy + Other replenishes",
            "Inventory -> Startegy + other types",
            "Inventory manager -> add, remove, list, check (Product, Replenish)",
            "DarkStore",
            "DarkStore manager -> have both product, Inventory"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/26. Zepto/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "ZeptoClone.java",
              "content": "import java.util.*;\nimport java.lang.Math;\n\n/////////////////////////////////////////////\n// Product & Factory\n/////////////////////////////////////////////\n\nclass Product {\n    private int sku;\n    private String name;\n    private double price;\n\n    public Product(int id, String nm, double pr) {\n        sku   = id;\n        name  = nm;\n        price = pr;\n    }\n\n    // Getters & Setters\n    public int getSku() {\n        return this.sku;\n    }\n\n    public String getName() {\n        return this.name;\n    }\n\n    public double getPrice() {\n        return this.price;\n    }\n}\n\nclass ProductFactory {\n    public static Product createProduct(int sku) {\n        // In reality product comes from DB\n        String name;\n        double price;\n\n        if (sku == 101) {\n            name  = \"Apple\";\n            price = 20;\n        }\n        else if (sku == 102) {\n            name  = \"Banana\";\n            price = 10;\n        }\n        else if (sku == 103) {\n            name  = \"Chocolate\";\n            price = 50;\n        }\n        else if (sku == 201) {\n            name  = \"T-Shirt\";\n            price = 500;\n        }\n        else if (sku == 202) {\n            name  = \"Jeans\";\n            price = 1000;\n        }\n        else {\n            name  = \"Item\" + sku;\n            price = 100;\n        }\n        return new Product(sku, name, price);\n    }\n}\n\n/////////////////////////////////////////////\n// InventoryStore (Interface) & DbInventoryStore\n/////////////////////////////////////////////\n\ninterface InventoryStore {\n    void addProduct(Product prod, int qty);\n    void removeProduct(int sku, int qty);\n    int checkStock(int sku);\n    List<Product> listAvailableProducts();\n}\n\nclass DbInventoryStore implements InventoryStore {\n    private Map<Integer,Integer> stock;         // SKU -> quantity\n    private Map<Integer,Product> products;      // SKU -> Product\n\n    public DbInventoryStore() {\n        stock    = new HashMap<>();\n        products = new HashMap<>();\n    }\n\n    @Override\n    public void addProduct(Product prod, int qty) {\n        int sku = prod.getSku();\n        if (!products.containsKey(sku)) {\n            products.put(sku, prod);\n        }\n        // else drop the extra prod instance\n        stock.put(sku, stock.getOrDefault(sku, 0) + qty);\n    }\n\n    @Override\n    public void removeProduct(int sku, int qty) {\n        if (!stock.containsKey(sku)) \n            return;\n\n        int currentQuantity   = stock.get(sku);\n        int remainingQuantity = currentQuantity - qty;\n        if (remainingQuantity > 0) {\n            stock.put(sku, remainingQuantity);\n        } else {\n            stock.remove(sku);\n            products.remove(sku);\n        }\n    }\n\n    @Override\n    public int checkStock(int sku) {\n        return stock.getOrDefault(sku, 0);\n    }\n\n    @Override\n    public List<Product> listAvailableProducts() {\n        List<Product> available = new ArrayList<>();\n        for (Map.Entry<Integer,Integer> it : stock.entrySet()) {\n            int sku = it.getKey();\n            int qty = it.getValue();\n            if (qty > 0 && products.containsKey(sku)) {\n                available.add(products.get(sku));\n            }\n        }\n        return available;\n    }\n}\n\n/////////////////////////////////////////////\n// InventoryManager \n/////////////////////////////////////////////\n\nclass InventoryManager {\n    private InventoryStore store;\n\n    public InventoryManager(InventoryStore store) {\n        this.store = store;\n    }\n\n    public void addStock(int sku, int qty) {\n        Product prod = ProductFactory.createProduct(sku);\n        store.addProduct(prod, qty);\n        System.out.println(\"[InventoryManager] Added SKU \" + sku + \" Qty \" + qty);\n    }\n\n    public void removeStock(int sku, int qty) {\n        store.removeProduct(sku, qty);\n    }\n\n    public int checkStock(int sku) {\n        return store.checkStock(sku);\n    }\n\n    public List<Product> getAvailableProducts() {\n        return store.listAvailableProducts();\n    }\n}\n\n/////////////////////////////////////////////\n// Replenishment Strategy (Strategy Pattern)\n/////////////////////////////////////////////\n\ninterface ReplenishStrategy {\n    void replenish(InventoryManager manager, Map<Integer,Integer> itemsToReplenish);\n}\n\nclass ThresholdReplenishStrategy implements ReplenishStrategy {\n    private int threshold;\n\n    public ThresholdReplenishStrategy(int threshold) {\n        this.threshold = threshold;\n    }\n\n    @Override\n    public void replenish(InventoryManager manager, Map<Integer,Integer> itemsToReplenish) {\n        System.out.println(\"[ThresholdReplenish] Checking threshold...\");\n        for (Map.Entry<Integer,Integer> it : itemsToReplenish.entrySet()) {\n            int sku       = it.getKey();\n            int qtyToAdd  = it.getValue();\n            int current   = manager.checkStock(sku);\n            if (current < threshold) {\n                manager.addStock(sku, qtyToAdd);\n                System.out.println(\"  -> SKU \" + sku + \" was \" + current \n                                 + \", replenished by \" + qtyToAdd);\n            }\n        }\n    }\n}\n\nclass WeeklyReplenishStrategy implements ReplenishStrategy {\n    public WeeklyReplenishStrategy() {}\n\n    @Override\n    public void replenish(InventoryManager manager, Map<Integer,Integer> itemsToReplenish) {\n        System.out.println(\"[WeeklyReplenish] Weekly replenishment triggered for inventory.\");\n    }\n}\n\n/////////////////////////////////////////////\n// DarkStore (formerly Warehouse)\n/////////////////////////////////////////////\n\nclass DarkStore {\n    private String name;\n    private double x, y;                       // location coordinates\n    private InventoryManager inventoryManager;\n    private ReplenishStrategy replenishStrategy;\n\n    public DarkStore(String n, double x_coord, double y_coord) {\n        name = n;\n        x    = x_coord;\n        y    = y_coord;\n\n        // We could have made another factory called InventoryStoreFactory to get\n        // DbInventoryStore by enum and hence make it loosely coupled.\n        inventoryManager = new InventoryManager(new DbInventoryStore());\n    }\n\n    public double distanceTo(double ux, double uy) {\n        return Math.sqrt((x - ux)*(x - ux) + (y - uy)*(y - uy));\n    }\n\n    public void runReplenishment(Map<Integer,Integer> itemsToReplenish) {\n        if (replenishStrategy != null) {\n            replenishStrategy.replenish(inventoryManager, itemsToReplenish);\n        }\n    }\n\n    // Delegation Methods\n    public List<Product> getAllProducts() {\n        return inventoryManager.getAvailableProducts();\n    }\n\n    public int checkStock(int sku) {\n        return inventoryManager.checkStock(sku);\n    }\n\n    public void removeStock(int sku, int qty) {\n        inventoryManager.removeStock(sku, qty);\n    }\n\n    public void addStock(int sku, int qty) {\n        inventoryManager.addStock(sku, qty);\n    }\n\n    // Getters & Setters\n    public void setReplenishStrategy(ReplenishStrategy strategy) {\n        this.replenishStrategy = strategy;\n    }\n\n    public String getName() {\n        return this.name;\n    }\n\n    public double getXCoordinate() {\n        return this.x;\n    }\n\n    public double getYCoordinate() {\n        return this.y;\n    }\n\n    public InventoryManager getInventoryManager() {\n        return this.inventoryManager;\n    }\n}\n\n/////////////////////////////////////////////\n// DarkStoreManager (Singleton)\n/////////////////////////////////////////////\n\nclass DarkStoreManager {\n    private static DarkStoreManager instance;\n    private List<DarkStore> darkStores;\n\n    private DarkStoreManager() {\n        darkStores = new ArrayList<>();\n    }\n\n    public static DarkStoreManager getInstance() {\n        if (instance == null) {\n            instance = new DarkStoreManager();\n        }\n        return instance;\n    }\n\n    public void registerDarkStore(DarkStore ds) {\n        darkStores.add(ds);\n    }\n\n    public List<DarkStore> getNearbyDarkStores(double ux, double uy, double maxDistance) {\n        List<Pair<Double,DarkStore>> distList = new ArrayList<>();\n        for (DarkStore ds : darkStores) {\n            double d = ds.distanceTo(ux, uy);\n            if (d <= maxDistance) {\n                distList.add(new Pair<>(d, ds));\n            }\n        }\n        distList.sort(Comparator.comparing(Pair::getKey));\n        List<DarkStore> result = new ArrayList<>();\n        for (Pair<Double,DarkStore> p : distList) {\n            result.add(p.getValue());\n        }\n        return result;\n    }\n}\n\n// Simple helper Pair class (since JavaFX/Android Pair might not be available)\nclass Pair<K,V> {\n    private K key; private V value;\n    public Pair(K k, V v) { key = k; value = v; }\n    public K getKey()   { return key; }\n    public V getValue() { return value; }\n}\n\n/////////////////////////////////////////////\n// User & Cart\n/////////////////////////////////////////////\n\nclass Cart {\n    public List<Pair<Product,Integer>> items = new ArrayList<>();\n\n    public void addItem(int sku, int qty) {\n        Product prod = ProductF\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Manage inventory by adding and removing items.",
                "Support replenishment strategies such as threshold-based and weekly replenishment.",
                "Keep replenishment logic scalable and replaceable.",
                "Support multiple inventory stores or dark stores.",
                "Users should be able to see items from stores closer to their location.",
                "Orders can be fulfilled by one or multiple nearby stores depending on availability."
              ]
            }
          ]
        },
        {
          "id": "tinder",
          "title": "Tinder",
          "description": "Profiles, preferences, location strategy, swipe actions, matching, and notifications.",
          "notes": [
            "Notification Service (Observable + Observer[Notification Service])",
            "Messages",
            "ChatRoom (Sender, mesg, time)",
            "Gender, Interest, Preference, Location",
            "UserProfile",
            "Location Strategy -> all sub type",
            "Location Manager/Service",
            "Swipe Actions"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/27. Tinder/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "TinderClone.java",
              "content": "import java.util.*;\nimport java.lang.Math;\nimport java.text.SimpleDateFormat;\n\n// -------------------- Observer Pattern -------------------- //\n\n// Observer Pattern: Interface for notification observers\ninterface NotificationObserver {\n    void update(String message);\n}\n\n// Concrete observer\nclass UserNotificationObserver implements NotificationObserver {\n    private String userId;\n    public UserNotificationObserver(String id) {\n        userId = id;\n    }\n    public void update(String message) {\n        System.out.println(\"Notification for user \" + userId + \": \" + message);\n    }\n}\n\n// Observable for Observer Pattern\nclass NotificationService {\n    private Map<String, NotificationObserver> observers;\n\n    // Singleton Pattern\n    private static NotificationService instance;\n    private NotificationService() {\n        observers = new HashMap<>();\n    }\n    public static NotificationService getInstance() {\n        if (instance == null) {\n            instance = new NotificationService();\n        }\n        return instance;\n    }\n    public void registerObserver(String userId, NotificationObserver observer) {\n        observers.put(userId, observer);\n    }\n    public void removeObserver(String userId) {\n        observers.remove(userId);\n    }\n    public void notifyUser(String userId, String message) {\n        if (observers.containsKey(userId)) {\n            observers.get(userId).update(message);\n        }\n    }\n    public void notifyAll(String message) {\n        for (Map.Entry<String, NotificationObserver> pair : observers.entrySet()) {\n            pair.getValue().update(message);\n        }\n    }\n}\n\n// -------------------- Basic Models -------------------- //\n\n// Gender enum\nenum Gender {\n    MALE,\n    FEMALE,\n    NON_BINARY,\n    OTHER\n}\n\n// Location class\nclass Location {\n    private double latitude;\n    private double longitude;\n\n    public Location() {\n        latitude = 0.0;\n        longitude = 0.0;\n    }\n\n    public Location(double lat, double lon) {\n        latitude = lat;\n        longitude = lon;\n    }\n\n    public double getLatitude() {\n        return latitude;\n    }\n\n    public double getLongitude() {\n        return longitude;\n    }\n\n    public void setLatitude(double lat) {\n        latitude = lat;\n    }\n\n    public void setLongitude(double lon) {\n        longitude = lon;\n    }\n\n    // Calculate distance in kilometers between two locations using Haversine formula\n    public double distanceInKm(Location other) {\n        final double earthRadiusKm = 6371.0;\n        double dLat = (other.latitude - latitude) * Math.PI / 180.0;\n        double dLon = (other.longitude - longitude) * Math.PI / 180.0;\n\n        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +\n                Math.cos(latitude * Math.PI / 180.0) * Math.cos(other.latitude * Math.PI / 180.0) *\n                        Math.sin(dLon/2) * Math.sin(dLon/2);\n        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));\n        return earthRadiusKm * c;\n    }\n}\n\n// Interest class\nclass Interest {\n    private String name;\n    private String category;\n\n    public Interest() {\n        name = \"\";\n        category = \"\";\n    }\n\n    public Interest(String n, String c) {\n        name = n;\n        category = c;\n    }\n\n    public String getName() {\n        return name;\n    }\n\n    public String getCategory() {\n        return category;\n    }\n}\n\n// Preference class\nclass Preference {\n    private List<Gender> interestedIn;\n    private int minAge;\n    private int maxAge;\n    private double maxDistance; // in kilometers\n    private List<String> interests;\n\n    public Preference() {\n        interestedIn = new ArrayList<>();\n        interests = new ArrayList<>();\n        minAge = 18;\n        maxAge = 100;\n        maxDistance = 100.0;\n    }\n\n    public void addGenderPreference(Gender gender) {\n        interestedIn.add(gender);\n    }\n\n    public void removeGenderPreference(Gender gender) {\n        interestedIn.remove(gender);\n    }\n\n    public void setAgeRange(int min, int max) {\n        minAge = min;\n        maxAge = max;\n    }\n\n    public void setMaxDistance(double distance) {\n        maxDistance = distance;\n    }\n\n    public void addInterest(String interest) {\n        interests.add(interest);\n    }\n\n    public void removeInterest(String interest) {\n        interests.remove(interest);\n    }\n\n    public boolean isInterestedInGender(Gender gender) {\n        return interestedIn.contains(gender);\n    }\n\n    public boolean isAgeInRange(int age) {\n        return age >= minAge && age <= maxAge;\n    }\n\n    public boolean isDistanceAcceptable(double distance) {\n        return distance <= maxDistance;\n    }\n\n    public List<String> getInterests() {\n        return interests;\n    }\n\n    public List<Gender> getInterestedGenders() {\n        return interestedIn;\n    }\n\n    public int getMinAge() {\n        return minAge;\n    }\n\n    public int getMaxAge() {\n        return maxAge;\n    }\n\n    public double getMaxDistance() {\n        return maxDistance;\n    }\n}\n\n// -------------------- Message System -------------------- //\n\n// Message class\nclass Message {\n    private String senderId;\n    private String content;\n    private long timestamp;\n\n    public Message(String sender, String msg) {\n        senderId = sender;\n        content = msg;\n        timestamp = System.currentTimeMillis();\n    }\n\n    public String getSenderId() {\n        return senderId;\n    }\n\n    public String getContent() {\n        return content;\n    }\n\n    public long getTimestamp() {\n        return timestamp;\n    }\n\n    public String getFormattedTime() {\n        SimpleDateFormat sdf = new SimpleDateFormat(\"yyyy-MM-dd HH:mm:ss\");\n        return sdf.format(new Date(timestamp));\n    }\n}\n\n// Chat room class\nclass ChatRoom {\n    private String id;\n    private List<String> participantIds;\n    private List<Message> messages;\n\n    public ChatRoom(String roomId, String user1Id, String user2Id) {\n        id = roomId;\n        participantIds = new ArrayList<>();\n        participantIds.add(user1Id);\n        participantIds.add(user2Id);\n        messages = new ArrayList<>();\n    }\n\n    public String getId() {\n        return id;\n    }\n\n    public void addMessage(String senderId, String content) {\n        Message msg = new Message(senderId, content);\n        messages.add(msg);\n    }\n\n    public boolean hasParticipant(String userId) {\n        return participantIds.contains(userId);\n    }\n\n    public List<Message> getMessages() {\n        return messages;\n    }\n\n    public List<String> getParticipants() {\n        return participantIds;\n    }\n\n    public void displayChat() {\n        System.out.println(\"===== Chat Room: \" + id + \" =====\");\n        for (Message msg : messages) {\n            System.out.println(\"[\" + msg.getFormattedTime() + \"] \" + msg.getSenderId() + \": \" + msg.getContent());\n        }\n        System.out.println(\"=========================\");\n    }\n}\n\n// -------------------- Profile System -------------------- //\n\n// Profile class\nclass UserProfile {\n    private String name;\n    private int age;\n    private Gender gender;\n    private String bio;\n    private List<String> photos;\n    private List<Interest> interests;\n    private Location location;\n\n    public UserProfile() {\n        name = \"\";\n        age = 0;\n        gender = Gender.OTHER;\n        photos = new ArrayList<>();\n        interests = new ArrayList<>();\n        location = new Location();\n    }\n\n    public void setName(String n) {\n        name = n;\n    }\n\n    public void setAge(int a) {\n        age = a;\n    }\n\n    public void setGender(Gender g) {\n        gender = g;\n    }\n\n    public void setBio(String b) {\n        bio = b;\n    }\n\n    public void addPhoto(String photoUrl) {\n        photos.add(photoUrl);\n    }\n\n    public void removePhoto(String photoUrl) {\n        photos.remove(photoUrl);\n    }\n\n    public void addInterest(String name, String category) {\n        Interest interest = new Interest(name, category);\n        interests.add(interest);\n    }\n\n    public void removeInterest(String name) {\n        interests.removeIf(i -> i.getName().equals(name));\n    }\n\n    public void setLocation(Location loc) {\n        location = loc;\n    }\n\n    public String getName() {\n        return name;\n    }\n\n    public int getAge() {\n        return age;\n    }\n\n    public Gender getGender() {\n        return gender;\n    }\n\n    public String getBio() {\n        return bio;\n    }\n\n    public List<String> getPhotos() {\n        return photos;\n    }\n\n    public List<Interest> getInterests() {\n        return interests;\n    }\n\n    public Location getLocation() {\n        return location;\n    }\n\n    public void display() {\n        System.out.println(\"===== Profile =====\");\n        System.out.println(\"Name: \" + name);\n        System.out.println(\"Age: \" + age);\n        System.out.print(\"Gender: \");\n        switch (gender) {\n            case MALE:\n                System.out.print(\"Male\");\n                break;\n            case FEMALE:\n                System.out.print(\"Female\");\n                break;\n            case NON_BIN\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Users can swipe left or right on a profile.",
                "Users can set up their own profiles.",
                "Users can set their preferences.",
                "Once there is a match, users can chat in a chat room.",
                "Users can see profiles near them, with nearby logic based on replaceable strategies.",
                "Users should be notified when they match or receive a new message.",
                "User matching should be based on several scores, such as interest match and location."
              ]
            }
          ]
        },
        {
          "id": "splitwise",
          "title": "Splitwise",
          "description": "Expense splitting, balance tracking, groups, split strategies, and debt simplification.",
          "notes": [
            "Notification -> observer User (update)",
            "User (List of Groups/ Individuals)",
            "Split",
            "SplitStrategy + Factory",
            "Expense",
            "Group (also observer to notify) will keep map of group balances, userids",
            "Debt Simplifier ->",
            "(First simplify all txn to single list per user)"
          ],
          "images": [
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_10.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_11.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/31. Splitwise/UML.jpeg"
            },
            {
              "label": "Simplify Transactions",
              "src": "assets/study/lld/Light/LLD-main/31. Splitwise/Simplify Transactions.jpeg"
            }
          ],
          "code": [
            {
              "label": "SplitwiseApp.java",
              "content": "import java.util.*;\nimport java.text.DecimalFormat;\n\n// Forward declarations equivalent - not needed in Java due to automatic resolution\n\nenum SplitType {\n    EQUAL,\n    EXACT,\n    PERCENTAGE\n}\n\nclass Split {\n    public String userId;\n    public double amount;\n    \n    public Split(String userId, double amount) {\n        this.userId = userId;\n        this.amount = amount;\n    }\n}\n\n// Observer Pattern - Notification interface\ninterface Observer {\n    void update(String message);\n}\n\n// Strategy Pattern - Split strategies\ninterface SplitStrategy {\n    List<Split> calculateSplit(double totalAmount, List<String> userIds, List<Double> values);\n}\n\nclass EqualSplit implements SplitStrategy {\n    @Override\n    public List<Split> calculateSplit(double totalAmount, List<String> userIds, List<Double> values) {\n        List<Split> splits = new ArrayList<>();\n        double amountPerUser = totalAmount / userIds.size();\n        \n        for (String userId : userIds) {\n            splits.add(new Split(userId, amountPerUser));\n        }\n        return splits;\n    }\n}\n\nclass ExactSplit implements SplitStrategy {\n    @Override\n    public List<Split> calculateSplit(double totalAmount, List<String> userIds, List<Double> values) {\n        List<Split> splits = new ArrayList<>();\n\n        //validations\n        \n        for (int i = 0; i < userIds.size(); i++) {\n            splits.add(new Split(userIds.get(i), values.get(i)));\n        }\n        return splits;\n    }\n}\n\nclass PercentageSplit implements SplitStrategy {\n    @Override\n    public List<Split> calculateSplit(double totalAmount, List<String> userIds, List<Double> values) {\n        List<Split> splits = new ArrayList<>();\n\n        //validations\n        \n        for (int i = 0; i < userIds.size(); i++) {\n            double amount = (totalAmount * values.get(i)) / 100.0;\n            splits.add(new Split(userIds.get(i), amount));\n        }\n        return splits;\n    }\n}\n\n// Factory for split strategies\nclass SplitFactory {\n    public static SplitStrategy getSplitStrategy(SplitType type) {\n        switch (type) {\n            case EQUAL:\n                return new EqualSplit();\n            case EXACT:\n                return new ExactSplit();\n            case PERCENTAGE:\n                return new PercentageSplit();\n            default:\n                return new EqualSplit();\n        }\n    }\n}\n\n// User class --> Concrete Observer\nclass User implements Observer {\n    public static int nextUserId = 0;\n    public String userId;\n    public String name;\n    public String email;\n    public Map<String, Double> balances; // userId -> amount (positive = they owe you, negative = you owe them)\n    \n    public User(String name, String email) {\n        this.userId = \"user\" + (++nextUserId);\n        this.name = name;\n        this.email = email;\n        this.balances = new HashMap<>();\n    }\n    \n    @Override\n    public void update(String message) {\n        System.out.println(\"[NOTIFICATION to \" + name + \"]: \" + message);\n    }\n    \n    public void updateBalance(String otherUserId, double amount) {\n        balances.put(otherUserId, balances.getOrDefault(otherUserId, 0.0) + amount);\n        \n        // Remove if balance becomes zero\n        if (Math.abs(balances.get(otherUserId)) < 0.01) {\n            balances.remove(otherUserId);\n        }\n    }\n    \n    public double getTotalOwed() {\n        double total = 0;\n        for (Map.Entry<String, Double> balance : balances.entrySet()) {\n            if (balance.getValue() < 0) {\n                total += Math.abs(balance.getValue());\n            }\n        }\n        return total;\n    }\n    \n    public double getTotalOwing() {\n        double total = 0;\n        for (Map.Entry<String, Double> balance : balances.entrySet()) {\n            if (balance.getValue() > 0) {\n                total += balance.getValue();\n            }\n        }\n        return total;\n    }\n}\n\n// Expense Model class\nclass Expense {\n    public static int nextExpenseId = 0;\n    public String expenseId;\n    public String description;\n    public double totalAmount;\n    public String paidByUserId;\n    public List<Split> splits;\n    public String groupId;\n    \n    public Expense(String desc, double amount, String paidBy,\n            List<Split> splits, String group) {\n        this.expenseId = \"expense\" + (++nextExpenseId);\n        this.description = desc;\n        this.totalAmount = amount;\n        this.paidByUserId = paidBy;\n        this.splits = splits;\n        this.groupId = group;\n    }\n    \n    public Expense(String desc, double amount, String paidBy, List<Split> splits) {\n        this(desc, amount, paidBy, splits, \"\");\n    }\n}\n\nclass DebtSimplifier {\n    public static Map<String, Map<String, Double>> simplifyDebts(\n        Map<String, Map<String, Double>> groupBalances) {\n        \n        // Calculate net amount for each person\n        Map<String, Double> netAmounts = new HashMap<>();\n        \n        // Initialize all users with 0\n        for (Map.Entry<String, Map<String, Double>> userBalance : groupBalances.entrySet()) {\n            netAmounts.put(userBalance.getKey(), 0.0);\n        }\n        \n        // Calculate net amounts\n        // We only need to process each balance once (not twice)\n        // If groupBalances[A][B] = 200, it means B owes A 200\n        // So A should receive 200 (positive) and B should pay 200 (negative)\n        for (Map.Entry<String, Map<String, Double>> userBalance : groupBalances.entrySet()) {\n            String creditorId = userBalance.getKey();\n            for (Map.Entry<String, Double> balance : userBalance.getValue().entrySet()) {\n                String debtorId = balance.getKey();\n                double amount = balance.getValue();\n                \n                // Only process positive amounts to avoid double counting\n                if (amount > 0) {\n                    netAmounts.put(creditorId, netAmounts.get(creditorId) + amount);  // creditor receives\n                    netAmounts.put(debtorId, netAmounts.get(debtorId) - amount);    // debtor pays\n                }\n            }\n        }\n        \n        // Divide users into creditors and debtors\n        List<AbstractMap.SimpleEntry<String, Double>> creditors = new ArrayList<>(); // those who should receive money\n        List<AbstractMap.SimpleEntry<String, Double>> debtors = new ArrayList<>();   // those who should pay money\n        \n        for (Map.Entry<String, Double> net : netAmounts.entrySet()) {\n            if (net.getValue() > 0.01) { // creditor\n                creditors.add(new AbstractMap.SimpleEntry<>(net.getKey(), net.getValue()));\n            } else if (net.getValue() < -0.01) { // debtor\n                debtors.add(new AbstractMap.SimpleEntry<>(net.getKey(), -net.getValue())); // store positive amount\n            }\n        }\n        \n        // Sort for better optimization (largest amounts first)\n        creditors.sort((a, b) -> Double.compare(b.getValue(), a.getValue()));\n        debtors.sort((a, b) -> Double.compare(b.getValue(), a.getValue()));\n        \n        // Create new simplified balance map\n        Map<String, Map<String, Double>> simplifiedBalances = new HashMap<>();\n        \n        // Initialize empty maps for all users\n        for (Map.Entry<String, Map<String, Double>> userBalance : groupBalances.entrySet()) {\n            simplifiedBalances.put(userBalance.getKey(), new HashMap<>());\n        }\n        \n        // Use greedy algorithm to minimize transactions\n        int i = 0, j = 0;\n        while (i < creditors.size() && j < debtors.size()) {\n            String creditorId = creditors.get(i).getKey();\n            String debtorId = debtors.get(j).getKey();\n            double creditorAmount = creditors.get(i).getValue();\n            double debtorAmount = debtors.get(j).getValue();\n            \n            // Find the minimum amount to settle\n            double settleAmount = Math.min(creditorAmount, debtorAmount);\n            \n            // Update simplified balances\n            // debtorId owes creditorId the settleAmount\n            simplifiedBalances.get(creditorId).put(debtorId, settleAmount);\n            simplifiedBalances.get(debtorId).put(creditorId, -settleAmount);\n            \n            // Update remaining amounts\n            creditors.get(i).setValue(creditors.get(i).getValue() - settleAmount);\n            debtors.get(j).setValue(debtors.get(j).getValue() - settleAmount);\n            \n            // Move to next creditor or debtor if current one is settled\n            if (creditors.get(i).getValue() < 0.01) {\n                i++;\n            }\n            if (debtors.get(j).getValue() < 0.01) {\n                j++;\n            }\n        }\n        \n        return simplifiedBalances;\n    }\n}\n\n// Group class --> Concrete Observable\nclass Group {\n    private User getUserByuserId(String userId) {\n        User user = null;\n\n        for(User member : members) {\n            if(member.userId.equals(userId)) {\n                user = member;\n            }\n        }\n        return use\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Users can join or leave a group.",
                "Users can add expenses in a group.",
                "Users can settle expenses in a group.",
                "Adding expenses should support multiple strategies such as equal split, percentage split, and exact split.",
                "Users should not be allowed to leave a group without settling expenses.",
                "Users can also add individual one-on-one expenses outside a group.",
                "Notifications should be sent when an expense is added or settled."
              ]
            }
          ],
          "videos": [
            {
              "source": "Coder Army",
              "title": "Splitwise LLD reference",
              "url": "https://www.youtube.com/playlist?list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
            },
            {
              "source": "Shubh Patel",
              "title": "Splitwise LLD reference",
              "url": "https://www.youtube.com/playlist?list=PLYPO3T7Sl63u7uLLpiKCMXnRjeFIhUAvk"
            }
          ]
        },
        {
          "id": "tic-tac-toe",
          "title": "TicTacToe",
          "description": "Board, players, symbols, rules strategy, game factory, and gameplay orchestration.",
          "notes": [
            "Notification -> Observer - Console, Observable -> Game",
            "Player",
            "Symbol",
            "Board",
            "RulesStrategy -> Standard Rule etc...",
            "GameFactory -> Enum - GAME, -> SimpleGameClass (Game)",
            "Game",
            "Main"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/33. TicTacToe/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "TicTacToeMain.java",
              "content": "import java.util.*;\n\n// Observer Pattern - for future notification service\ninterface IObserver {\n    void update(String msg);\n}\n\n// Sample observer implementation\nclass ConsoleNotifier implements IObserver {\n    public void update(String msg) {\n        System.out.println(\"[Notification] \" + msg);\n    }\n}\n\n// Symbol/Mark class\nclass Symbol {\n    private char mark;\n    \n    public Symbol(char m) {\n        mark = m;\n    }\n    \n    public char getMark() {\n        return mark;\n    }\n}\n\n// Board class - Dumb object that only manages the grid\nclass Board {\n    private Symbol[][] grid;\n    private int size;\n    private Symbol emptyCell;\n    \n    public Board(int s) {\n        size = s;\n        emptyCell = new Symbol('-');\n        grid = new Symbol[size][size];\n        for(int i = 0; i < size; i++) {\n            for(int j = 0; j < size; j++) {\n                grid[i][j] = emptyCell;\n            }\n        }\n    }\n    \n    public boolean isCellEmpty(int row, int col) {\n        if(row < 0 || row >= size || col < 0 || col >= size) {\n            return false;\n        }\n        return grid[row][col] == emptyCell;\n    }\n    \n    public boolean placeMark(int row, int col, Symbol mark) {\n        if(row < 0 || row >= size || col < 0 || col >= size) {\n            return false;\n        }\n        if(!isCellEmpty(row, col)) {\n            return false;\n        }\n        grid[row][col] = mark;\n        return true;\n    }\n    \n    public Symbol getCell(int row, int col) {\n        if(row < 0 || row >= size || col < 0 || col >= size) {\n            return emptyCell;\n        }\n        return grid[row][col];\n    }\n    \n    public int getSize() {\n        return size;\n    }\n    \n    public Symbol getEmptyCell() {\n        return emptyCell;\n    }\n    \n    public void display() {\n        System.out.print(\"\\n  \");\n        for(int i = 0; i < size; i++) {\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n        \n        for(int i = 0; i < size; i++) {\n            System.out.print(i + \" \");\n            for(int j = 0; j < size; j++) {\n                System.out.print(grid[i][j].getMark() + \" \");\n            }\n            System.out.println();\n        }\n        System.out.println();\n    }\n}\n\n// Player class --> \nclass TicTacToePlayer {\n    private int playerId;\n    private String name;\n    private Symbol symbol;\n    private int score;\n    \n    public TicTacToePlayer(int playerId, String n, Symbol s) {\n        this.playerId = playerId;\n        name = n;\n        symbol = s;\n        score = 0;\n    }\n    \n    // Getters and setters\n    public String getName() { \n        return name; \n    }\n\n    public Symbol getSymbol() { \n        return symbol; \n    }\n\n    public int getScore() { \n        return score; \n    }\n\n    public void incrementScore() { \n        score++;\n    }\n}\n\n// Strategy Pattern for game rules\ninterface TicTacToeRules {\n    boolean isValidMove(Board board, int row, int col);\n    boolean checkWinCondition(Board board, Symbol symbol);\n    boolean checkDrawCondition(Board board);\n}\n\n// Standard Tic Tac Toe rules\nclass StandardTicTacToeRules implements TicTacToeRules {\n    public boolean isValidMove(Board board, int row, int col) {\n        return board.isCellEmpty(row, col);\n    }\n    \n    public boolean checkWinCondition(Board board, Symbol symbol) {\n        int size = board.getSize();\n        \n        // Check rows\n        for(int i = 0; i < size; i++) {\n            boolean win = true;\n            for(int j = 0; j < size; j++) {\n                if(board.getCell(i, j) != symbol) {\n                    win = false;\n                    break;\n                }\n            }\n            if(win) return true;\n        }\n        \n        // Check columns\n        for(int j = 0; j < size; j++) {\n            boolean win = true;\n            for(int i = 0; i < size; i++) {\n                if(board.getCell(i, j) != symbol) {\n                    win = false;\n                    break;\n                }\n            }\n            if(win) return true;\n        }\n        \n        // Check main diagonal\n        boolean win = true;\n        for(int i = 0; i < size; i++) {\n            if(board.getCell(i, i) != symbol) {\n                win = false;\n                break;\n            }\n        }\n        if(win) return true;\n        \n        // Check anti-diagonal\n        win = true;\n        for(int i = 0; i < size; i++) {\n            if(board.getCell(i, size-1-i) != symbol) {\n                win = false;\n                break;\n            }\n        }\n        return win;\n    }\n    \n    // If all cells are filled and no winner\n    public boolean checkDrawCondition(Board board) {\n        int size = board.getSize();\n        for(int i = 0; i < size; i++) {\n            for(int j = 0; j < size; j++) {\n                if(board.getCell(i, j) == board.getEmptyCell()) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n}\n\n// Game class --> Observable\nclass TicTacToeGame {\n    private Board board;\n    private Deque<TicTacToePlayer> players;\n    private TicTacToeRules rules;\n    private List<IObserver> observers;\n    private boolean gameOver;\n    \n    public TicTacToeGame(int boardSize) {\n        board = new Board(boardSize);\n        players = new ArrayDeque<>();\n        rules = new StandardTicTacToeRules();\n        observers = new ArrayList<>();\n        gameOver = false;\n    }\n    \n    public void addPlayer(TicTacToePlayer player) {\n        players.addLast(player);\n    }\n    \n    public void addObserver(IObserver observer) {\n        observers.add(observer);\n    }\n\n    public void notify(String msg) {\n        for(IObserver observer : observers) {\n            observer.update(msg);\n        }\n    }\n    \n    public void play() {\n        if(players.size() < 2) {\n            System.out.println(\"Need at least 2 players!\");\n            return;\n        }\n        \n        notify(\"Tic Tac Toe Game Started!\");\n        \n        Scanner scanner = new Scanner(System.in);\n        \n        while(!gameOver) {\n            board.display();\n            \n            // Take out the current player from dequeue\n            TicTacToePlayer currentPlayer = players.peekFirst();\n            System.out.print(currentPlayer.getName() + \" (\" + currentPlayer.getSymbol().getMark() + \") - Enter row and column: \");\n            \n            int row = scanner.nextInt();\n            int col = scanner.nextInt();\n            \n            // check if move is valid\n            if(rules.isValidMove(board, row, col)) {\n                board.placeMark(row, col, currentPlayer.getSymbol());\n                notify(currentPlayer.getName() + \" played (\" + row + \",\" + col + \")\");\n                \n                if(rules.checkWinCondition(board, currentPlayer.getSymbol())) {\n                    board.display();\n                    System.out.println(currentPlayer.getName() + \" wins!\");\n                    currentPlayer.incrementScore();\n\n                    notify(currentPlayer.getName() + \" wins!\");\n\n                    gameOver = true;\n                }\n                else if(rules.checkDrawCondition(board)) {\n                    board.display();\n                    \n                    System.out.println(\"It's a draw!\");\n                    notify(\"Game is Draw!\");\n\n                    gameOver = true;\n                }\n                else {\n                    // Move player to back of queue\n                    players.removeFirst();\n                    players.addLast(currentPlayer);\n                }\n            }\n            else {\n                System.out.println(\"Invalid move! Try again.\");\n            }\n        }\n    }\n}\n\n// Enum & Factory Pattern for game creation\nenum GameType {\n    STANDARD\n}\n\nclass TicTacToeGameFactory {\n    public static TicTacToeGame createGame(GameType gt, int boardSize) {\n        if(GameType.STANDARD == gt) {\n            return new TicTacToeGame(boardSize);\n        }\n        return null;\n    }\n}\n\n// Main class for Tic Tac Toe\npublic class TicTacToeMain {\n    public static void main(String[] args) {\n        System.out.println(\"=== TIC TAC TOE GAME ===\");\n        \n        // Create game with custom board size\n        Scanner scanner = new Scanner(System.in);\n        System.out.print(\"Enter board size (e.g., 3 for 3x3): \");\n        int boardSize = scanner.nextInt();\n        \n        TicTacToeGame game = TicTacToeGameFactory.createGame(GameType.STANDARD, boardSize);\n        \n        // Add observer\n        IObserver notifier = new ConsoleNotifier();\n        game.addObserver(notifier);\n        \n        // Create players with custom symbols\n        TicTacToePlayer player1 = new TicTacToePlayer(1, \"Aditya\", new Symbol('X'));\n        TicTacToePlayer player2 = new TicTacToePlayer(2, \"Harshita\", new Symbol('O'));\n        \n        game.addPlayer(player1);\n        game.addPlayer(player2);\n        \n        // Play the game\n        game.play();\n        \n        scanner.close();\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Board size should be scalable.",
                "Standard game rules should be supported and further extendable.",
                "Allow app notifications for moves, wins, draws, and similar game events."
              ]
            }
          ]
        },
        {
          "id": "snake-and-ladder",
          "title": "Snake and Ladder",
          "description": "Board entities, dice, setup strategy, rules strategy, and game orchestration.",
          "notes": [
            "Board entities, dice, setup strategy, rules strategy, and game orchestration."
          ],
          "images": [
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_14.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_15.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/34. SnakeAndLadder/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "SnakeAndLadder.java",
              "content": "import java.util.*;\nimport java.util.Scanner;\n\n// Observer Pattern\ninterface IObserver {\n    void update(String msg);\n}\n\n// Sample observer implementation\nclass SnakeAndLadderConsoleNotifier implements IObserver {\n    public void update(String msg) {\n        System.out.println(\"[NOTIFICATION] \" + msg);\n    }\n}\n\n// Dice class\nclass Dice {\n    private int faces;\n    \n    public Dice(int f) {\n        faces = f;\n    }\n    \n    public int roll() {\n        return (int)(Math.random() * faces) + 1;\n    }\n}\n\n// Base class for Snake and Ladder (both have start and end positions)\nabstract class BoardEntity {\n    protected int startPosition;\n    protected int endPosition;\n    \n    public BoardEntity(int start, int end) {\n        startPosition = start;\n        endPosition = end;\n    }\n    \n    public int getStart() { \n        return startPosition; \n    }\n\n    public int getEnd() { \n        return endPosition;\n    }\n    \n    public abstract void display();\n    public abstract String name();\n}\n\n// Snake class\nclass Snake extends BoardEntity {\n    public Snake(int start, int end) {\n        super(start, end);\n        if(end >= start) {\n            System.out.println(\"Invalid snake! End must be less than start.\");\n        }\n    }\n    \n    @Override\n    public void display() {\n        System.out.println(\"Snake: \" + startPosition + \" -> \" + endPosition);\n    }\n\n    @Override\n    public String name() {\n        return \"SNAKE\";\n    }\n}\n\n// Ladder class\nclass Ladder extends BoardEntity {\n    public Ladder(int start, int end) {\n        super(start, end);\n        if(end <= start) {\n            System.out.println(\"Invalid ladder! End must be greater than start.\");\n        }\n    }\n    \n    @Override\n    public void display() {\n        System.out.println(\"Ladder: \" + startPosition + \" -> \" + endPosition);\n    }\n\n    @Override\n    public String name() {\n        return \"LADDER\";\n    }\n}\n\n// Board class\nclass Board {\n    private int size;\n    private List<BoardEntity> snakesAndLadders;\n    private Map<Integer, BoardEntity> boardEntities;\n    \n    public Board(int s) {\n        size = s * s;  // m*m board\n        snakesAndLadders = new ArrayList<>();\n        boardEntities = new HashMap<>();\n    }\n    \n    public boolean canAddEntity(int position) {\n        return !boardEntities.containsKey(position);\n    }\n    \n    public void addBoardEntity(BoardEntity boardEntity) {\n        if(canAddEntity(boardEntity.getStart())) {\n            snakesAndLadders.add(boardEntity);\n            boardEntities.put(boardEntity.getStart(), boardEntity);\n        }\n    }\n    \n    public void setupBoard(BoardSetupStrategy strategy) {\n        strategy.setupBoard(this);\n    }\n    \n    public BoardEntity getEntity(int position) {\n        return boardEntities.get(position);\n    }\n    \n    public int getBoardSize() { \n        return size;\n    }\n    \n    public void display() {\n        System.out.println(\"\\n=== Board Configuration ===\");\n        System.out.println(\"Board Size: \" + size + \" cells\");\n\n        int snakeCount = 0;\n        int ladderCount = 0;\n        for(BoardEntity entity : snakesAndLadders) {\n            if(entity.name().equals(\"SNAKE\")) snakeCount++;\n            else ladderCount++;\n        }\n        \n        System.out.println(\"\\nSnakes: \" + snakeCount);\n        for(BoardEntity entity : snakesAndLadders) {\n            if(entity.name().equals(\"SNAKE\")) {\n                entity.display();\n            }\n        }\n        \n        System.out.println(\"\\nLadders: \" + ladderCount);\n        for(BoardEntity entity : snakesAndLadders) {\n            if(entity.name().equals(\"LADDER\")) {\n                entity.display();\n            }\n        }\n        System.out.println(\"=========================\");\n    }\n}\n\n// Strategy Pattern for Board Setup\ninterface BoardSetupStrategy {\n    void setupBoard(Board board);\n}\n\n// Random Strategy with difficulty levels\nclass RandomBoardSetupStrategy implements BoardSetupStrategy {\n    public enum Difficulty {\n        EASY,    // More ladders, fewer snakes\n        MEDIUM,  // Equal snakes and ladders\n        HARD     // More snakes, fewer ladders\n    }\n    \n    private Difficulty difficulty;\n    \n    private void setupWithProbability(Board board, double snakeProbability) {\n        int boardSize = board.getBoardSize();\n        int totalEntities = boardSize / 10; // Roughly 10% of board has entities\n        \n        for(int i = 0; i < totalEntities; i++) {\n            double prob = Math.random();\n            \n            if(prob < snakeProbability) {\n                // Add snake\n                int attempts = 0;\n                while(attempts < 50) {\n                    int start = (int)(Math.random() * (boardSize - 10)) + 10;\n                    int end = (int)(Math.random() * (start - 1)) + 1;\n                    \n                    if(board.canAddEntity(start)) {\n                        board.addBoardEntity(new Snake(start, end));\n                        break;\n                    }\n                    attempts++;\n                }\n            } else {\n                // Add ladder\n                int attempts = 0;\n                while(attempts < 50) {\n                    int start = (int)(Math.random() * (boardSize - 10)) + 1;\n                    int end = (int)(Math.random() * (boardSize - start)) + start + 1;\n                    \n                    if(board.canAddEntity(start) && end < boardSize) {\n                        board.addBoardEntity(new Ladder(start, end));\n                        break;\n                    }\n                    attempts++;\n                }\n            }\n        }\n    }\n    \n    public RandomBoardSetupStrategy(Difficulty d) {\n        difficulty = d;\n    }\n    \n    @Override\n    public void setupBoard(Board board) {\n        switch(difficulty) {\n            case EASY:\n                setupWithProbability(board, 0.3);  // 30% snakes, 70% ladders\n                break;\n            case MEDIUM:\n                setupWithProbability(board, 0.5);  // 50% snakes, 50% ladders\n                break;\n            case HARD:\n                setupWithProbability(board, 0.7);  // 70% snakes, 30% ladders\n                break;\n        }\n    }\n}\n\n// Custom Strategy - User provides count\nclass CustomCountBoardSetupStrategy implements BoardSetupStrategy {\n    private int numSnakes;\n    private int numLadders;\n    private boolean randomPositions;\n    private List<Pair<Integer, Integer>> snakePositions;\n    private List<Pair<Integer, Integer>> ladderPositions;\n    \n    // Simple Pair class for Java\n    private static class Pair<T, U> {\n        public final T first;\n        public final U second;\n        \n        public Pair(T first, U second) {\n            this.first = first;\n            this.second = second;\n        }\n    }\n    \n    public CustomCountBoardSetupStrategy(int snakes, int ladders, boolean random) {\n        numSnakes = snakes;\n        numLadders = ladders;\n        randomPositions = random;\n        snakePositions = new ArrayList<>();\n        ladderPositions = new ArrayList<>();\n    }\n    \n    public void addSnakePosition(int start, int end) {\n        snakePositions.add(new Pair<>(start, end));\n    }\n    \n    public void addLadderPosition(int start, int end) {\n        ladderPositions.add(new Pair<>(start, end));\n    }\n    \n    @Override\n    public void setupBoard(Board board) {\n        if(randomPositions) {\n            // Random placement with user-defined counts\n            int boardSize = board.getBoardSize();\n            \n            // Add snakes\n            int snakesAdded = 0;\n            while(snakesAdded < numSnakes) {\n                int start = (int)(Math.random() * (boardSize - 10)) + 10;\n                int end = (int)(Math.random() * (start - 1)) + 1;\n                \n                if(board.canAddEntity(start)) {\n                    board.addBoardEntity(new Snake(start, end));\n                    snakesAdded++;\n                }\n            }\n            \n            // Add ladders\n            int laddersAdded = 0;\n            while(laddersAdded < numLadders) {\n                int start = (int)(Math.random() * (boardSize - 10)) + 1;\n                int end = (int)(Math.random() * (boardSize - start)) + start + 1;\n                \n                if(board.canAddEntity(start) && end < boardSize) {\n                    board.addBoardEntity(new Ladder(start, end));\n                    laddersAdded++;\n                }\n            }\n        } \n        else {\n            // User-defined positions\n            for(Pair<Integer, Integer> pos : snakePositions) {\n                if(board.canAddEntity(pos.first)) {\n                    board.addBoardEntity(new Snake(pos.first, pos.second));\n                }\n            }\n            \n            for(Pair<Integer, Integer> pos : ladderPositions) {\n                if(board.canAddEntity(pos.first)) {\n                    board.addBoardEntity(new Ladder(pos.first, pos.second));\n                }\n            }\n        }\n    }\n}\n\n// Standard Board Strategy - Traditional Snake & Ladder posi\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Board size should be scalable.",
                "Standard game rules should be supported and further extendable.",
                "Game setup should support different strategies such as random setup, custom setup, and standard setup."
              ]
            }
          ]
        },
        {
          "id": "chess",
          "title": "Chess",
          "description": "Pieces, movement strategy, board, moves, chat mediator, matchmaking, and game state.",
          "notes": [
            "(King 8 direction, 1 step)",
            "(Queen 8 direction, multi step)",
            "(Rook 4 direction, multi step) 90",
            "(Bishop 4 direction, multi step) 45",
            "(knight {-2,-1}, {-2,1}, {-1,-2}, {-1,2}, {1,-2}, {1,2}, {2,-1}, {2,1})",
            "(Pawn first 2, other 1, capture diagonal 1 step)",
            "Piece Strategy -> all pieces",
            "Piece Factory"
          ],
          "images": [
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_12.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_13.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/LLD-main/37. Chess/UML.jpeg"
            }
          ],
          "code": [
            {
              "label": "Chess.java",
              "content": "import java.util.*;\n\n// Enums for better type safety\nenum Color {\n    WHITE, BLACK\n}\n\nenum PieceType {\n    KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN\n}\n\nenum GameStatus {\n    WAITING, IN_PROGRESS, COMPLETED, ABORTED\n}\n\n// Position class to represent coordinates\nclass Position {\n    private int row;\n    private int col;\n\n    public Position() {\n        row = 0;\n        col = 0;\n    }\n    \n    public Position(int r, int c) {\n        row = r;\n        col = c;\n    }\n    \n    public int getRow() { \n        return row; \n    }\n    public int getCol() { \n        return col; \n    }\n    \n    public boolean isValid() {\n        return row >= 0 && row < 8 && col >= 0 && col < 8;\n    }\n    \n    @Override\n    public boolean equals(Object obj) {\n        if (this == obj) return true;\n        if (obj == null || getClass() != obj.getClass()) return false;\n        Position other = (Position) obj;\n        return row == other.row && col == other.col;\n    }\n    \n    @Override\n    public int hashCode() {\n        return Objects.hash(row, col);\n    }\n    \n    public int compareTo(Position other) {\n        if (row != other.row) return Integer.compare(row, other.row);\n        return Integer.compare(col, other.col);\n    }\n    \n    @Override\n    public String toString() {\n        return \"(\" + row + \",\" + col + \")\";\n    }\n    \n    // Convert to chess notation (e.g., e4, f7)\n    public String toChessNotation() {\n        char file = (char)('a' + col);\n        char rank = (char)('8' - row);\n        return \"\" + file + rank;\n    }\n}\n\n// Move class to represent a chess move\nclass Move {\n    private Position from;\n    private Position to;\n    private Piece piece;\n    private Piece capturedPiece;\n\n    public Move() {\n        piece = null;\n        capturedPiece = null;\n    }\n    \n    public Move(Position f, Position t, Piece p, Piece captured) {\n        from = f;\n        to = t;\n        piece = p;\n        capturedPiece = captured;\n    }\n    \n    public Position getFrom() { \n        return from; \n    }\n    public Position getTo() { \n        return to; \n    }\n    public Piece getPiece() { \n        return piece; \n    }\n    public Piece getCapturedPiece() { \n        return capturedPiece; \n    }\n}\n\n// Abstract Piece class following Strategy Pattern\nabstract class Piece {\n    protected Color color;\n    protected PieceType type;\n    protected boolean hasMoved;\n\n    public Piece(Color c, PieceType t) {\n        color = c;\n        type = t;\n        hasMoved = false;\n    }\n    \n    public Color getColor() { \n        return color; \n    }\n    public PieceType getType() { \n        return type; \n    }\n    public boolean getHasMoved() { \n        return hasMoved; \n    }\n    public void setMoved(boolean moved) { \n        hasMoved = moved; \n    }\n    \n    public abstract List<Position> getPossibleMoves(Position currentPos, Board board);\n    public abstract String getSymbol();\n    \n    public String toString() {\n        String colorStr = (color == Color.WHITE) ? \"W\" : \"B\";\n        return colorStr + getSymbol();\n    }\n}\n\n// Concrete Piece implementations\nclass King extends Piece {\n    public King(Color color) { \n        super(color, PieceType.KING); \n    }\n    \n    @Override\n    public List<Position> getPossibleMoves(Position currentPos, Board board) {\n        List<Position> moves = new ArrayList<>();\n        int[][] directions = {{-1,-1}, {-1,0}, {-1,1}, {0,-1}, {0,1}, {1,-1}, {1,0}, {1,1}};\n        \n        for (int i = 0; i < 8; i++) {\n            Position newPos = new Position(currentPos.getRow() + directions[i][0], currentPos.getCol() + directions[i][1]);\n            if (newPos.isValid() && !board.isOccupiedBySameColor(newPos, this.color)) {\n                moves.add(newPos);\n            }\n        }\n        return moves;\n    }\n    \n    @Override\n    public String getSymbol() { \n        return \"K\"; \n    }\n}\n\nclass Queen extends Piece {\n    public Queen(Color color) { \n        super(color, PieceType.QUEEN); \n    }\n    \n    @Override\n    public List<Position> getPossibleMoves(Position currentPos, Board board) {\n        List<Position> moves = new ArrayList<>();\n        int[][] directions = {{-1,-1}, {-1,0}, {-1,1}, {0,-1}, {0,1}, {1,-1}, {1,0}, {1,1}};\n        \n        for (int d = 0; d < 8; d++) {\n            for (int i = 1; i < 8; i++) {\n                Position newPos = new Position(currentPos.getRow() + directions[d][0]*i, currentPos.getCol() + directions[d][1]*i);\n                if (!newPos.isValid()) break;\n\n                if (board.isOccupiedBySameColor(newPos, this.color)) break;\n\n                moves.add(newPos);\n                if (board.isOccupied(newPos)) break; // Stop after capturing\n            }\n        }\n        return moves;\n    }\n    \n    @Override\n    public String getSymbol() { \n        return \"Q\"; \n    }\n}\n\nclass Rook extends Piece {\n    public Rook(Color color) { \n        super(color, PieceType.ROOK); \n    }\n    \n    @Override\n    public List<Position> getPossibleMoves(Position currentPos, Board board) {\n        List<Position> moves = new ArrayList<>();\n        int[][] directions = {{-1,0}, {1,0}, {0,-1}, {0,1}};\n        \n        for (int d = 0; d < 4; d++) {\n            for (int i = 1; i < 8; i++) {\n                Position newPos = new Position(currentPos.getRow() + directions[d][0]*i, currentPos.getCol() + directions[d][1]*i);\n                if (!newPos.isValid()) break;\n\n                if (board.isOccupiedBySameColor(newPos, this.color)) break;\n\n                moves.add(newPos);\n                if (board.isOccupied(newPos)) break;\n            }\n        }\n        return moves;\n    }\n    \n    @Override\n    public String getSymbol() { \n        return \"R\"; \n    }\n}\n\nclass Bishop extends Piece {\n    public Bishop(Color color) { \n        super(color, PieceType.BISHOP); \n    }\n    \n    @Override\n    public List<Position> getPossibleMoves(Position currentPos, Board board) {\n        List<Position> moves = new ArrayList<>();\n        int[][] directions = {{-1,-1}, {-1,1}, {1,-1}, {1,1}};\n        \n        for (int d = 0; d < 4; d++) {\n            for (int i = 1; i < 8; i++) {\n                Position newPos = new Position(currentPos.getRow() + directions[d][0]*i, currentPos.getCol() + directions[d][1]*i);\n                if (!newPos.isValid()) break;\n                if (board.isOccupiedBySameColor(newPos, this.color)) break;\n                moves.add(newPos);\n                if (board.isOccupied(newPos)) break;\n            }\n        }\n        return moves;\n    }\n    \n    @Override\n    public String getSymbol() { \n        return \"B\"; \n    }\n}\n\nclass Knight extends Piece {\n    public Knight(Color color) { \n        super(color, PieceType.KNIGHT); \n    }\n    \n    @Override\n    public List<Position> getPossibleMoves(Position currentPos, Board board) {\n        List<Position> moves = new ArrayList<>();\n        int[][] knightMoves = {{-2,-1}, {-2,1}, {-1,-2}, {-1,2}, {1,-2}, {1,2}, {2,-1}, {2,1}};\n        \n        for (int i = 0; i < 8; i++) {\n            Position newPos = new Position(currentPos.getRow() + knightMoves[i][0], currentPos.getCol() + knightMoves[i][1]);\n            if (newPos.isValid() && !board.isOccupiedBySameColor(newPos, this.color)) {\n                moves.add(newPos);\n            }\n        }\n        return moves;\n    }\n    \n    @Override\n    public String getSymbol() { \n        return \"N\"; \n    }\n}\n\nclass Pawn extends Piece {\n    public Pawn(Color color) { \n        super(color, PieceType.PAWN); \n    }\n    \n    @Override\n    public List<Position> getPossibleMoves(Position currentPos, Board board) {\n        List<Position> moves = new ArrayList<>();\n        int direction = (color == Color.WHITE) ? -1 : 1;\n        \n        // Forward move\n        Position oneStep = new Position(currentPos.getRow() + direction, currentPos.getCol());\n        if (oneStep.isValid() && !board.isOccupied(oneStep)) {\n            moves.add(oneStep);\n            \n            // Double move from starting position\n            if (!hasMoved) {\n                Position twoStep = new Position(currentPos.getRow() + 2*direction, currentPos.getCol());\n                if (twoStep.isValid() && !board.isOccupied(twoStep)) {\n                    moves.add(twoStep);\n                }\n            }\n        }\n        \n        // Diagonal captures\n        Position leftCapture = new Position(currentPos.getRow() + direction, currentPos.getCol() - 1);\n        Position rightCapture = new Position(currentPos.getRow() + direction, currentPos.getCol() + 1);\n        \n        if (leftCapture.isValid() && board.isOccupied(leftCapture) && \n            !board.isOccupiedBySameColor(leftCapture, this.color)) {\n            moves.add(leftCapture);\n        }\n        \n        if (rightCapture.isValid() && board.isOccupied(rightCapture) && \n            !board.isOccupiedBySameColor(rightCapture, this.color)) {\n            moves.add(rightCapture);\n        }\n        \n        return moves;\n    }\n    \n    @Override\n    public String getSymbol() { \n        return \"P\"; \n    }\n}\n\n// Factory Pattern for creating pieces\nclass PieceF\n\n// ... trimmed for portfolio reading ..."
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Multiple users can play chess at the same time.",
                "Use a score-based matchmaking algorithm.",
                "Support standard chess rules while keeping them extensible.",
                "Users within a match can send messages.",
                "Users can quit a match in between."
              ]
            }
          ]
        },
        {
          "id": "rate-limiter",
          "title": "Rate Limiter",
          "description": "Fixed window, sliding window, token bucket, leaky bucket, config, and factory.",
          "notes": [
            "User",
            "> Tier (FREE, PREMIUM)",
            "Rate Limiter Strategy",
            "> Fixed Window, SLiding Window Logs, Token Bucket, Sliding Window Counter",
            "> Factory",
            "> ENUM",
            "> Config (windox, maxReq)",
            "Rate Limiter Service"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images_enhanced/img_23.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.rate_limiter;\n\nimport org.nailyourinterview.lld.rate_limiter.enums.UserTier;\nimport org.nailyourinterview.lld.rate_limiter.model.User;\nimport org.nailyourinterview.lld.rate_limiter.service.RateLimiterService;\n\nimport java.util.concurrent.CountDownLatch;\nimport java.util.concurrent.CyclicBarrier;\nimport java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\n\npublic class Main {\n    // call allowreq func 20 times simultaneously\n    static void checkConcurrency(RateLimiterService rateLimiterService) throws InterruptedException {\n        User freeUser1 = new User(\"user1\", UserTier.FREE);\n\n        int threads = 20; // simulate 20 concurrent requests\n        ExecutorService executor = Executors.newFixedThreadPool(threads);\n\n        CyclicBarrier barrier = new CyclicBarrier(threads);\n        CountDownLatch latch = new CountDownLatch(threads);\n\n        for (int i = 1; i <= threads; i++) {\n            final int reqNum = i;\n            executor.submit(() -> {\n                try {\n                    // all threads wait here until barrier is full\n                    barrier.await();\n                } catch (Exception e) {\n                    e.printStackTrace();\n                }\n\n                boolean allowed = rateLimiterService.allowRequest(freeUser1);\n                System.out.println(Thread.currentThread().getName() +\n                        \" | Request \" + reqNum + \" for FreeUser1: \" + (allowed ? \"ALLOWED\" : \"BLOCKED\"));\n\n                latch.countDown();\n            });\n        }\n\n        latch.await(); // wait for all threads to finish\n        executor.shutdown();\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        RateLimiterService rateLimiterService = new RateLimiterService();\n\n        User freeUser = new User(\"user1\", UserTier.FREE); // 10 req in 60 sec\n        User premiumUser = new User(\"user2\", UserTier.PREMIUM); // 100 req in 60 sec\n\n//        System.out.println(\"=== Free User Requests ===\");\n//        for (int i = 1; i <= 15; i++) {\n//            boolean allowed = rateLimiterService.allowRequest(freeUser);\n//            System.out.println(\"Request \" + i + \" for Free User: \" + (allowed ? \"ALLOWED\" : \"BLOCKED\"));\n//            Thread.sleep(100); // simulate delay between requests\n//        }\n//\n//        System.out.println(\"\\n=== Premium User Requests ===\");\n//        for (int i = 1; i <= 120; i++) {\n//            boolean allowed = rateLimiterService.allowRequest(premiumUser);\n//            System.out.println(\"Request \" + i + \" for Premium User: \" + (allowed ? \"ALLOWED\" : \"BLOCKED\"));\n//            Thread.sleep(100);\n//        }\n\n        checkConcurrency(rateLimiterService);\n    }\n}"
            },
            {
              "label": "RateLimiterService.java",
              "content": "package org.nailyourinterview.lld.rate_limiter.service;\n\nimport org.nailyourinterview.lld.rate_limiter.enums.RateLimitType;\nimport org.nailyourinterview.lld.rate_limiter.enums.UserTier;\nimport org.nailyourinterview.lld.rate_limiter.factory.RateLimiterFactory;\nimport org.nailyourinterview.lld.rate_limiter.limiter.RateLimiter;\nimport org.nailyourinterview.lld.rate_limiter.model.RateLimitConfig;\nimport org.nailyourinterview.lld.rate_limiter.model.User;\n\nimport java.util.HashMap;\nimport java.util.Map;\n\npublic class RateLimiterService {\n    private final Map<UserTier, RateLimiter> rateLimiters = new HashMap<>();\n\n    public RateLimiterService() {\n        // Configure per-tier limits + algorithms\n        rateLimiters.put(\n                UserTier.FREE,\n                RateLimiterFactory.createRateLimiter(\n                        RateLimitType.TOKEN_BUCKET,\n                        new RateLimitConfig(10, 60) // 10 req/min\n                )\n        );\n\n        rateLimiters.put(\n                UserTier.PREMIUM,\n                RateLimiterFactory.createRateLimiter(\n                        RateLimitType.FIXED_WINDOW,\n                        new RateLimitConfig(100, 60) // 100 req/min\n                )\n        );\n    }\n\n    public boolean allowRequest(User user) {\n        RateLimiter limiter = rateLimiters.get(user.getTier());\n        if (limiter == null) {\n            throw new IllegalArgumentException(\"No limiter configured for tier: \" + user.getTier());\n        }\n        return limiter.allowRequest(user.getUserId());\n    }\n}"
            },
            {
              "label": "RateLimiterFactory.java",
              "content": "package org.nailyourinterview.lld.rate_limiter.factory;\n\nimport org.nailyourinterview.lld.rate_limiter.enums.RateLimitType;\nimport org.nailyourinterview.lld.rate_limiter.limiter.*;\nimport org.nailyourinterview.lld.rate_limiter.model.RateLimitConfig;\n\npublic class RateLimiterFactory {\n    public static RateLimiter createRateLimiter(RateLimitType algo, RateLimitConfig config) {\n        return switch (algo) {\n            case TOKEN_BUCKET -> new TokenBucketRateLimiter(config);\n            case FIXED_WINDOW -> new FixedWindowRateLimiter(config);\n            case SLIDING_WINDOW_LOG -> new SlidingWindowLogRateLimiter(config);\n            case SLIDING_WINDOW_COUNTER -> new SlidingWindowCounterRateLimiter(config);\n            case LEAKY_BUCKET -> new LeakyBucketRateLimiter(config);\n            default -> throw new IllegalArgumentException(\"Unknown algorithm: \" + algo);\n        };\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Rate limit users based on user ID and their tier, such as free or premium.",
                "Support four rate-limiting types and keep the design extensible.",
                "Keep the implementation thread-safe and efficient."
              ]
            }
          ]
        },
        {
          "id": "amazon-locker",
          "title": "Amazon Locker",
          "description": "Locker slots, package assignment, OTP pickup, agent delivery, locker states, and allocation strategies.",
          "notes": [
            "Locker -> Locker Status",
            "Slot -> Slot Type",
            "Package -> Package Size, Package Status",
            "Slot Allocation Strategy -> First Fit",
            "LockerState -> Idle, Customer Pickup, Carrier Entry, Agent Delivery",
            "OTP Service -> OTP info and assignment strategy",
            "Agent Service -> delivery agent details and zip-based assignment"
          ],
          "images": [
            {
              "label": "Locker Structure",
              "src": "assets/study/lld/projects-md/amazon-locker/locker-structure.png"
            },
            {
              "label": "Locker State",
              "src": "assets/study/lld/projects-md/amazon-locker/locker-state.png"
            },
            {
              "label": "OTP Service",
              "src": "assets/study/lld/projects-md/amazon-locker/otp-service.png"
            },
            {
              "label": "Agent Service",
              "src": "assets/study/lld/projects-md/amazon-locker/agent-service.png"
            },
            {
              "label": "Locker Flow",
              "src": "assets/study/lld/projects-md/amazon-locker/locker-flow.png"
            }
          ],
          "code": [],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Support lockers with multiple slot types and slot availability states.",
                "Assign incoming packages to compatible locker slots based on package size.",
                "Generate OTPs for customer pickup and keep OTP details tied to the locker and package.",
                "Support agent or carrier delivery into the locker machine.",
                "Model locker lifecycle through states such as idle, customer pickup, carrier entry, and agent delivery."
              ]
            },
            {
              "title": "Design Notes",
              "items": [
                "Keep Locker, Slot, Package, and OTPInfo as separate domain models so state changes stay explicit.",
                "Use a SlotAllocationStrategy such as FirstFit so better strategies can be added without changing LockerService.",
                "Use State pattern for locker machine behavior because customer pickup and carrier delivery allow different operations.",
                "Agent assignment can be a strategy keyed by zip code, load, or distance."
              ]
            },
            {
              "title": "How to explain the solution",
              "items": [
                "Start with the package lifecycle: package arrives, a slot is allocated, OTP is generated, customer authenticates, and the slot becomes free again.",
                "Separate inventory state from machine state. Slot occupancy belongs to the locker inventory, while pickup or delivery mode belongs to the locker machine.",
                "Mention concurrency around slot allocation because two packages should not reserve the same slot at the same time."
              ]
            }
          ]
        },
        {
          "id": "atm",
          "title": "ATM",
          "description": "ATM states, card/account models, repositories, services, and cash dispenser chain.",
          "notes": [
            "ATM Machine",
            "> ATM Entity (Total amt, loc) -> ATMStatus(State)",
            "> Card Entity -> Account",
            "> ATM State (Idle, Card Insert, Authenticate, Dispense)",
            "> Dispense State (Cash Flow state -> FiveHundred, TwoHundred, Hundred)"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images_enhanced/img_30.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.atm;\n\nimport org.nailyourinterview.lld.atm.model.ATM;\nimport org.nailyourinterview.lld.atm.model.Account;\nimport org.nailyourinterview.lld.atm.model.Card;\nimport org.nailyourinterview.lld.atm.repository.ATMRepository;\nimport org.nailyourinterview.lld.atm.service.ATMMachine;\n\npublic class Main {\n    public static void main(String[] args) {\n        Card card = new Card(\n                \"CARD123\",\n                \"1234\",\n                new Account(\"ACC123\", 5000)\n        );\n\n        ATM atm1 = new ATM(\"ATM1\", 5, 5, 20);\n        ATM atm2 = new ATM(\"ATM2\", 0, 2, 5);\n\n        ATMRepository atmRepository = new ATMRepository();\n        atmRepository.save(atm1);\n        atmRepository.save(atm2);\n\n        ATMMachine atmMachine2 = new ATMMachine(\"ATM2\", atmRepository);\n\n        atmMachine2.insertCard(card);\n        atmMachine2.enterPin(\"1234\");\n        atmMachine2.selectOption(\"WITHDRAW\");\n        atmMachine2.dispenseCash(1410);\n    }\n}"
            },
            {
              "label": "ATMMachine.java",
              "content": "package org.nailyourinterview.lld.atm.service;\n\nimport lombok.Getter;\nimport lombok.Setter;\nimport org.nailyourinterview.lld.atm.factory.ATMStateFactory;\nimport org.nailyourinterview.lld.atm.model.ATM;\nimport org.nailyourinterview.lld.atm.model.Card;\nimport org.nailyourinterview.lld.atm.repository.ATMRepository;\nimport org.nailyourinterview.lld.atm.state.ATMState;\n\n@Getter\npublic class ATMMachine {\n    private final ATM atm;\n    private ATMState state;\n    private final ATMRepository atmRepository;\n    @Setter private Card currentCard;\n\n    public ATMMachine(String atmId, ATMRepository atmRepository) {\n        this.atmRepository = atmRepository;\n        this.atm = atmRepository.getById(atmId)\n                .orElseThrow(() -> new RuntimeException(\"ATM not found\"));\n        this.state = ATMStateFactory.getState(atm.getStatus(), this);\n    }\n\n    public void insertCard(Card card) {\n        state.insertCard(card);\n    }\n\n    public void enterPin(String pin) {\n        state.enterPin(pin);\n    }\n\n    public void selectOption(String option) {\n        state.selectOption(option);\n    }\n\n    public void dispenseCash(int amount) {\n        state.dispenseCash(amount);\n    }\n\n    public void ejectCard() {\n        state.ejectCard();\n    }\n\n    public void setState(ATMState state) {\n        this.state = state;\n        this.atm.setStatus(state.getStatus());\n        // persist the changes in db\n    }\n}"
            },
            {
              "label": "ATMStateFactory.java",
              "content": "package org.nailyourinterview.lld.atm.factory;\n\nimport org.nailyourinterview.lld.atm.enums.ATMStatus;\nimport org.nailyourinterview.lld.atm.service.ATMMachine;\nimport org.nailyourinterview.lld.atm.state.*;\n\npublic class ATMStateFactory {\n\n    public static ATMState getState(ATMStatus status, ATMMachine machine) {\n        return switch (status) {\n            case IDLE -> new IdleState(machine);\n            case CARD_INSERTED -> new CardInsertedState(machine);\n            case AUTHENTICATED -> new AuthenticatedState(machine);\n            case DISPENSE_CASH -> new DispenseCashState(machine);\n            default -> throw new IllegalArgumentException(\"Unknown ATM status: \" + status);\n        };\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Focus first on the cash withdrawal operation.",
                "Handle withdrawals based on amount and note distribution.",
                "Support different note values such as Rs. 2000, Rs. 500, and Rs. 100.",
                "Make it easy to extend the system for more note types in the future.",
                "Build the system to support multiple ATM machines."
              ]
            }
          ]
        },
        {
          "id": "uber",
          "title": "Uber",
          "description": "Ride booking with fare strategy, product types, driver matching strategy, location, vehicle support, and ride service.",
          "notes": [
            "Fare Service -> Fare Strategy -> Late Night, Location",
            "Fare -> Product -> Auto, XL, Bike",
            "Driver Matching Service -> Driver Matching Strategy -> Night, Near",
            "Driver -> Location -> Vehicle with supported products",
            "Ride -> Rider",
            "Ride Service",
            "Main app"
          ],
          "images": [
            {
              "label": "Fare Service",
              "src": "assets/study/lld/projects-md/uber/fare-service.png"
            },
            {
              "label": "Driver Matching",
              "src": "assets/study/lld/projects-md/uber/driver-matching.png"
            },
            {
              "label": "Ride Service",
              "src": "assets/study/lld/projects-md/uber/ride-service.png"
            },
            {
              "label": "Overview",
              "src": "assets/study/lld/projects-md/uber/overview.png"
            },
            {
              "label": "Location Model",
              "src": "assets/study/lld/projects-md/uber/location-model.png"
            },
            {
              "label": "Product Model",
              "src": "assets/study/lld/projects-md/uber/product-model.png"
            },
            {
              "label": "Vehicle Model",
              "src": "assets/study/lld/projects-md/uber/vehicle-model.png"
            },
            {
              "label": "Strategy Model",
              "src": "assets/study/lld/projects-md/uber/strategy-model.png"
            },
            {
              "label": "Main Flow",
              "src": "assets/study/lld/projects-md/uber/main-flow.png"
            }
          ],
          "code": [],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Riders should be able to request a ride from a pickup location to a destination.",
                "Support different ride products such as bike, auto, and XL.",
                "Calculate fare using replaceable fare strategies such as late-night pricing or location-based pricing.",
                "Match drivers using replaceable matching strategies such as nearest driver or night-safe matching.",
                "Drivers should have location and vehicle details, including the products their vehicle can support."
              ]
            },
            {
              "title": "Design Notes",
              "items": [
                "Keep FareService independent from RideService so pricing rules can change without touching ride orchestration.",
                "Represent ride product as a model or enum-backed type so vehicle compatibility stays explicit.",
                "DriverMatchingService should depend on DriverMatchingStrategy, not a hard-coded nearest-driver algorithm.",
                "RideService coordinates the request: validate product, ask matching service for a driver, compute fare, and create the ride."
              ]
            },
            {
              "title": "How to explain the solution",
              "items": [
                "Walk through the happy path from rider request to driver assignment and ride creation.",
                "Call out the two strongest extension points: fare calculation and driver matching.",
                "Mention scale boundaries briefly: real location search would move to geo-indexing, but the LLD should keep that behind a matching abstraction."
              ]
            }
          ]
        },
        {
          "id": "customer-support",
          "title": "Customer Support",
          "description": "Issue tracking with assignment strategy, agent service, issue service, and repositories.",
          "notes": [
            "Issue tracking with assignment strategy, agent service, issue service, and repositories."
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images1_enhanced/img_7.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images1_enhanced/img_8.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.customer_support;\n\nimport org.nailyourinterview.lld.customer_support.enums.IssueStatus;\nimport org.nailyourinterview.lld.customer_support.enums.IssueType;\nimport org.nailyourinterview.lld.customer_support.model.Issue;\nimport org.nailyourinterview.lld.customer_support.repository.AgentRepository;\nimport org.nailyourinterview.lld.customer_support.repository.IssueRepository;\nimport org.nailyourinterview.lld.customer_support.service.AgentService;\nimport org.nailyourinterview.lld.customer_support.service.AssignmentService;\nimport org.nailyourinterview.lld.customer_support.service.IssueService;\nimport org.nailyourinterview.lld.customer_support.strategy.assignment.DefaultAssignmentStrategy;\n\nimport java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.Collections;\nimport java.util.Map;\n\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        AgentRepository agentRepository = new AgentRepository();\n        IssueRepository issueRepository = new IssueRepository();\n\n        AgentService agentService = new AgentService(agentRepository);\n        IssueService issueService = new IssueService(issueRepository, agentRepository);\n        AssignmentService assignmentService = new AssignmentService(agentRepository, issueRepository, new DefaultAssignmentStrategy());\n\n        Issue i1 = issueService.createIssue(\"T1\", IssueType.PAYMENT_RELATED, \"Payment Failed\", \"My payment failed but money is debited\", \"testUser1@test.com\");\n        Issue i2 = issueService.createIssue(\"T2\", IssueType.MUTUAL_FUND_RELATED, \"Purchase Failed\", \"Unable to purchase Mutual Fund\", \"testUser2@test.com\");\n        Issue i3 = issueService.createIssue(\"T3\", IssueType.PAYMENT_RELATED, \"Payment Failed\", \"My payment failed but money is debited\", \"testUser2@test.com\");\n\n        agentService.addAgent(\"agent1@test.com\", \"Agent 1\", Arrays.asList(IssueType.PAYMENT_RELATED, IssueType.GOLD_RELATED));\n        agentService.addAgent(\"agent2@test.com\", \"Agent 2\", Collections.singletonList(IssueType.PAYMENT_RELATED));\n\n        assignmentService.assignIssue(i1.getId());\n        assignmentService.assignIssue(i2.getId());\n        assignmentService.assignIssue(i3.getId());\n\n        System.out.println(\"\\n--- Issues for testUser2@test.com ---\");\n        issueService.getIssues(Map.of(\"email\", \"testUser2@test.com\"))\n                .forEach(System.out::println);\n\n        System.out.println(\"\\n--- Payment Related Issues ---\");\n        issueService.getIssues(Map.of(\"type\", \"Payment Related\"))\n                .forEach(System.out::println);\n\n        issueService.updateIssue(i3.getId(), IssueStatus.IN_PROGRESS, \"Waiting for payment confirmation\");\n\n        issueService.resolveIssue(i3.getId(), \"Payment failed. Debited amount will be reversed.\");\n\n        System.out.println(\"\\n--- Agent Work History ---\");\n        agentService.viewAgentsWorkHistory();\n    }\n}"
            },
            {
              "label": "AssignmentService.java",
              "content": "package org.nailyourinterview.lld.customer_support.service;\n\nimport lombok.AllArgsConstructor;\nimport org.nailyourinterview.lld.customer_support.enums.IssueStatus;\nimport org.nailyourinterview.lld.customer_support.model.Agent;\nimport org.nailyourinterview.lld.customer_support.model.Issue;\nimport org.nailyourinterview.lld.customer_support.repository.AgentRepository;\nimport org.nailyourinterview.lld.customer_support.repository.IssueRepository;\nimport org.nailyourinterview.lld.customer_support.strategy.assignment.AssignmentStrategy;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\n@AllArgsConstructor\npublic class AssignmentService {\n    private final AgentRepository agentRepository;\n    private final IssueRepository issueRepository;\n    private final AssignmentStrategy strategy;\n\n    public void assignIssue(String issueId) {\n        Issue issue = issueRepository.getById(issueId);\n        if (issue == null) throw new IllegalArgumentException(\"Issue not found\");\n\n        List<Agent> agents = new ArrayList<>(agentRepository.getAll());\n        Agent assigned = strategy.assign(agents, issue);\n\n        if (assigned != null) {\n            assigned.setAssignedIssueId(issue.getId());\n            issue.setAssignedAgentId(assigned.getId());\n            System.out.println(\">>> Issue \" + issueId + \" assigned to agent \" + assigned.getId());\n        } else {\n            for (Agent agent : agents) {\n                if (agent.getExpertise().contains(issue.getIssueType())) {\n                    agent.getWaitList().add(issue.getId());\n                    issue.setStatus(IssueStatus.WAITING);\n                    System.out.println(\">>> Issue \" + issueId + \" added to waitlist of Agent \" + agent.getId());\n                    return;\n                }\n            }\n            System.out.println(\">>> No agent found with expertise for issue \" + issueId);\n        }\n    }\n}"
            },
            {
              "label": "AssignmentStrategy.java",
              "content": "package org.nailyourinterview.lld.customer_support.strategy.assignment;\n\nimport org.nailyourinterview.lld.customer_support.model.Agent;\nimport org.nailyourinterview.lld.customer_support.model.Issue;\n\nimport java.util.List;\n\npublic interface AssignmentStrategy {\n    Agent assign(List<Agent> agents, Issue issue);\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Some transactions may fail or remain pending due to bank, NPCI, or internal system issues.",
                "Customers should be able to log unsuccessful transactions and raise complaints.",
                "Customer issues should be categorized into types such as payment, mutual fund, gold, or insurance.",
                "Agents should have expertise tied to issue types.",
                "If all agents are busy, issues should be placed into a waiting state.",
                "Agents can work on one issue at a time, update its status, and receive another issue once the current one is resolved."
              ]
            }
          ]
        },
        {
          "id": "bookmyshow",
          "title": "BookMyShow",
          "description": "Show booking with theatres, halls, seats, seat locking, booking mementos, payment strategy, and concurrency control.",
          "notes": [
            "Show -> mapped to Hall and Theatre",
            "Show -> mapped to Movie and Seat",
            "Seat Strategy -> Regular, Incline + enum + factory",
            "Booking Service -> Booking, Show, User, Payment Strategy",
            "Booking Repo can keep final booking and booking memento",
            "Lock Strategy -> InMemory or Redis",
            "Seat + Show can form the lock key"
          ],
          "images": [
            {
              "label": "Show Model",
              "src": "assets/study/lld/projects-md/bookmyshow/show-model.png"
            },
            {
              "label": "Booking and Locking",
              "src": "assets/study/lld/projects-md/bookmyshow/booking-locking.png"
            },
            {
              "label": "Payment and Booking",
              "src": "assets/study/lld/projects-md/bookmyshow/payment-booking.png"
            }
          ],
          "code": [],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Support movies, theatres, halls, shows, and seats.",
                "A show should map a movie to a theatre hall and a set of seats for a specific time.",
                "Users should be able to select seats and create bookings.",
                "Seat booking should prevent two users from booking the same seat for the same show.",
                "Support multiple payment modes through a payment strategy.",
                "Seat locks should expire after a configured TTL if payment is not completed."
              ]
            },
            {
              "title": "Design Notes",
              "items": [
                "Use ShowSeat or a seat-show key to represent availability because a physical seat is reused across shows.",
                "Use a LockStrategy so local in-memory locking can later be replaced with Redis or another distributed lock.",
                "BookingService should coordinate lock acquisition, booking creation, payment, and lock release.",
                "A memento-style object can capture an in-progress booking snapshot before final confirmation."
              ]
            },
            {
              "title": "How to explain the solution",
              "items": [
                "Start with the domain chain: Movie -> Show -> Hall -> Seat -> Booking.",
                "Spend time on concurrency because seat locking is the core interview point.",
                "Make payment pluggable, but keep payment failure behavior clear: release or expire the locked seats."
              ]
            }
          ]
        },
        {
          "id": "doctor-appointment",
          "title": "Doctor Appointment",
          "description": "Doctor registration, availability, slot ranking, booking, cancellation, waitlist, and trending doctor.",
          "notes": [
            "Doctor registration, availability, slot ranking, booking, cancellation, waitlist, and trending doctor."
          ],
          "images": [],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.doctors_appointment;\n\nimport org.nailyourinterview.lld.doctors_appointment.model.Booking;\nimport org.nailyourinterview.lld.doctors_appointment.model.Doctor;\nimport org.nailyourinterview.lld.doctors_appointment.dto.DoctorSlot;\nimport org.nailyourinterview.lld.doctors_appointment.model.Patient;\nimport org.nailyourinterview.lld.doctors_appointment.enums.Specialization;\nimport org.nailyourinterview.lld.doctors_appointment.repository.BookingRepository;\nimport org.nailyourinterview.lld.doctors_appointment.repository.DoctorRepository;\nimport org.nailyourinterview.lld.doctors_appointment.repository.PatientRepository;\nimport org.nailyourinterview.lld.doctors_appointment.service.BookingService;\nimport org.nailyourinterview.lld.doctors_appointment.service.DoctorService;\nimport org.nailyourinterview.lld.doctors_appointment.service.PatientService;\nimport org.nailyourinterview.lld.doctors_appointment.strategy.RatingBasedRankStrategy;\nimport org.nailyourinterview.lld.doctors_appointment.strategy.SlotRankStrategy;\nimport org.nailyourinterview.lld.doctors_appointment.strategy.StartTimeRankStrategy;\n\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        DoctorRepository doctorRepository = new DoctorRepository();\n        PatientRepository patientRepository = new PatientRepository();\n        BookingRepository bookingRepository = new BookingRepository();\n\n        DoctorService doctorService = new DoctorService(doctorRepository);\n        PatientService patientService = new PatientService(patientRepository);\n        BookingService bookingService = new BookingService(bookingRepository, doctorRepository, patientRepository);\n        SlotRankStrategy rankStrategy = new StartTimeRankStrategy();\n\n        // Register doctors\n        Doctor curious = doctorService.register(\"Curious\", Specialization.CARDIOLOGIST, 4.5);\n        Doctor dreadful = doctorService.register(\"Dreadful\", Specialization.CARDIOLOGIST, 3.8);\n        Doctor daring = doctorService.register(\"Daring\", Specialization.DERMATOLOGIST, 4.2);\n\n        // Declare availability\n        doctorService.declareAvailability(curious.getId(), List.of(\"9:30\", \"12:30\", \"16:00\"));\n        doctorService.declareAvailability(dreadful.getId(), List.of(\"12:30\", \"13:00\"));\n\n        // Register patients\n        Patient p1 = patientService.register(\"Shubh\");\n        Patient p2 = patientService.register(\"Kunal\");\n\n        // Search slots\n        System.out.println(\"Available Cardiologist slots:\");\n        List<DoctorSlot> slots = bookingService.search(Specialization.CARDIOLOGIST, rankStrategy);\n        for (DoctorSlot slot : slots) {\n            System.out.println(slot.getDoctor().getName() + \" - \" + slot.getSlot());\n        }\n\n        // Book slots\n        Booking b1 = bookingService.book(p1.getId(), curious.getId(), \"12:30\");\n\n        // Bookings of Doctor Curious\n        System.out.println(\"\\nDoctor Curious bookings:\");\n        for (Booking b : bookingService.viewBookingsByDoctor(curious.getId())) {\n            System.out.println(\"Booking: Patient ID \" + patientService.findById(b.getPatientId()).getName() + \", Slot \" + b.getSlot());\n        }\n\n        // Try booking same slot for another patient\n        try {\n            Booking b2 = bookingService.book(p2.getId(), curious.getId(), \"12:30\");\n        } catch (Exception e) {\n            System.out.println(\"\\nPatient 2 waitlisted: \" + e.getMessage());\n        }\n\n        // Cancel booking and observe waitlist trigger\n        bookingService.cancel(b1.getId());\n\n        // Final bookings\n        System.out.println(\"\\nDoctor Curious bookings:\");\n        for (Booking b : bookingService.viewBookingsByDoctor(curious.getId())) {\n            System.out.println(\"Booking: Patient ID \" + patientService.findById(b.getPatientId()).getName() + \", Slot \" + b.getSlot());\n        }\n    }\n}"
            },
            {
              "label": "BookingService.java",
              "content": "package org.nailyourinterview.lld.doctors_appointment.service;\n\nimport lombok.AllArgsConstructor;\nimport org.nailyourinterview.lld.doctors_appointment.enums.Specialization;\nimport org.nailyourinterview.lld.doctors_appointment.exception.BookingNotFoundException;\nimport org.nailyourinterview.lld.doctors_appointment.model.Booking;\nimport org.nailyourinterview.lld.doctors_appointment.model.Doctor;\nimport org.nailyourinterview.lld.doctors_appointment.dto.DoctorSlot;\nimport org.nailyourinterview.lld.doctors_appointment.model.Patient;\nimport org.nailyourinterview.lld.doctors_appointment.repository.BookingRepository;\nimport org.nailyourinterview.lld.doctors_appointment.repository.DoctorRepository;\nimport org.nailyourinterview.lld.doctors_appointment.repository.PatientRepository;\nimport org.nailyourinterview.lld.doctors_appointment.strategy.SlotRankStrategy;\n\nimport java.util.*;\n\n@AllArgsConstructor\npublic class BookingService {\n    private final BookingRepository bookingRepo;\n    private final DoctorRepository doctorRepo;\n    private final PatientRepository patientRepo;\n\n    public List<DoctorSlot> search(Specialization spec, SlotRankStrategy strategy) {\n        List<Doctor> doctors = doctorRepo.findBySpecialization(spec);\n        List<DoctorSlot> result = new ArrayList<>();\n\n        for (Doctor d : doctors) {\n            for (Map.Entry<String, Boolean> e : d.getAvailability().entrySet()) {\n                if (e.getValue()) result.add(new DoctorSlot(d, e.getKey()));\n            }\n        }\n        return strategy.rank(result);\n    }\n\n    public Booking book(UUID patientId, UUID doctorId, String slot) {\n        Doctor doctor = doctorRepo.findById(doctorId);\n        Map<String, Boolean> availability = doctor.getAvailability();\n\n        // Slot not declared\n        if (!availability.containsKey(slot)) {\n            throw new RuntimeException(\"Invalid slot: Doctor has not declared availability for this slot.\");\n        }\n\n        // Patient already has a booking in this slot\n        for (Booking b : bookingRepo.findByPatient(patientId)) {\n            if (b.getSlot().equals(slot)) {\n                throw new RuntimeException(\"Patient already has an appointment at this time\");\n            }\n        }\n\n        // Book if slot is available\n        if (availability.get(slot)) {\n            Booking booking = new Booking(patientId, doctorId, slot);\n            bookingRepo.save(booking);\n            availability.put(slot, false); // mark slot as booked\n\n            System.out.println(\"\\n\" + patientRepo.findById(patientId).getName() + \" booked a slot successfully for slot : \" + slot);\n\n            return booking;\n        } else {\n            // Add to waitlist if valid but booked\n            String key = doctorId.toString() + \"-\" + slot;\n            bookingRepo.addToWaitlist(key, patientId);\n            throw new RuntimeException(\"Slot already booked. Added to waitlist.\");\n        }\n    }\n\n    public void cancel(UUID bookingId) {\n        Booking booking = bookingRepo.getBookingById(bookingId);\n        if (booking == null) throw new BookingNotFoundException(\"Booking not found\");\n\n        Doctor doctor = doctorRepo.findById(booking.getDoctorId());\n        doctor.getAvailability().put(booking.getSlot(), true); // Mark slot as available\n        bookingRepo.delete(booking);\n\n        System.out.println(\"\\n\" + patientRepo.findById(booking.getPatientId()).getName() + \" cancelled the booking for slot : \" + booking.getSlot());\n\n        // Promote first patient in waitlist\n        String key = doctor.getId().toString() + \"-\" + booking.getSlot();\n        UUID nextPatient = bookingRepo.popFromWaitlist(key);\n        if (nextPatient != null) {\n            book(nextPatient, doctor.getId(), booking.getSlot());\n        }\n    }\n\n    public List<Booking> viewBookingsByDoctor(UUID doctorId) {\n        return bookingRepo.findByDoctor(doctorId);\n    }\n\n    public List<Booking> viewBookingsByPatient(UUID patientId) {\n        return bookingRepo.findByPatient(patientId);\n    }\n}"
            },
            {
              "label": "SlotRankStrategy.java",
              "content": "package org.nailyourinterview.lld.doctors_appointment.strategy;\n\nimport org.nailyourinterview.lld.doctors_appointment.dto.DoctorSlot;\n\nimport java.util.List;\n\npublic interface SlotRankStrategy {\n    List<DoctorSlot> rank(List<DoctorSlot> slots);\n}"
            }
          ]
        },
        {
          "id": "logger",
          "title": "Logger",
          "description": "Chain of handlers, appenders, formatters, levels, and logger configuration.",
          "notes": [
            "LogMessage",
            "LogLevel",
            "LoggerService (head here)",
            "> LoggerHandlerConfig (build)",
            "> LogHandler (COR)",
            "> Info,debug",
            "> LogAppenderStrategy",
            "> File, ..."
          ],
          "images": [
            {
              "label": "Logging Flow",
              "src": "assets/study/lld/Light/Images1_enhanced/img_13.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images1_enhanced/img_14.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images1_enhanced/img_15.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.logger;\n\nimport org.nailyourinterview.lld.logger.appenders.ConsoleAppender;\nimport org.nailyourinterview.lld.logger.appenders.FileAppender;\nimport org.nailyourinterview.lld.logger.enums.LogLevel;\nimport org.nailyourinterview.lld.logger.formatter.PlainTextFormatter;\n\npublic class Main {\n    public static void main(String[] args) {\n        Logger logger = Logger.getInstance();\n\n        LogHandlerConfiguration.addAppenderForLevel(\n                LogLevel.INFO,\n                new ConsoleAppender(new PlainTextFormatter())\n        );\n\n        LogHandlerConfiguration.addAppenderForLevel(\n                LogLevel.ERROR,\n                new ConsoleAppender(new PlainTextFormatter())\n        );\n\n        LogHandlerConfiguration.addAppenderForLevel(\n                LogLevel.ERROR,\n                new FileAppender(new PlainTextFormatter(), \"logs.txt\")\n        );\n\n        // Usage\n        logger.info(\"This is some key information\"); // CONSOLE\n        logger.error(\"Oh no! there's an error\"); // CONSOLE + FILE\n    }\n}"
            },
            {
              "label": "Logger.java",
              "content": "package org.nailyourinterview.lld.logger;\n\nimport org.nailyourinterview.lld.logger.enums.LogLevel;\nimport org.nailyourinterview.lld.logger.handlers.*;\nimport org.nailyourinterview.lld.logger.model.LogMessage;\n\nclass Logger {\n    private static final Logger INSTANCE = new Logger();\n\n    private final LogHandler handlerChain;\n\n    private Logger() {\n        handlerChain = LogHandlerConfiguration.build();\n    }\n\n    public static Logger getInstance() {\n        return INSTANCE;\n    }\n\n    public void log(LogLevel level, String message) {\n        LogMessage msg = new LogMessage(level, message, System.currentTimeMillis());\n        handlerChain.handle(msg);\n    }\n\n    public void debug(String msg) { log(LogLevel.DEBUG, msg); }\n    public void info(String msg)  { log(LogLevel.INFO, msg); }\n    public void warn(String msg)  { log(LogLevel.WARN, msg); }\n    public void error(String msg) { log(LogLevel.ERROR, msg); }\n    public void fatal(String msg) { log(LogLevel.FATAL, msg); }\n}"
            },
            {
              "label": "LogHandlerConfiguration.java",
              "content": "package org.nailyourinterview.lld.logger;\n\nimport org.nailyourinterview.lld.logger.appenders.LogAppender;\nimport org.nailyourinterview.lld.logger.enums.LogLevel;\nimport org.nailyourinterview.lld.logger.handlers.*;\n\n\npublic class LogHandlerConfiguration {\n\n    private static final LogHandler debug = new DebugHandler();\n    private static final LogHandler info = new InfoHandler();\n    private static final LogHandler warn = new WarnHandler();\n    private static final LogHandler error = new ErrorHandler();\n    private static final LogHandler fatal = new FatalHandler();\n\n    public static LogHandler build(){\n        debug.setNext(info);\n        info.setNext(warn);\n        warn.setNext(error);\n        error.setNext(fatal);\n\n        return debug;\n    }\n\n    public static void addAppenderForLevel(LogLevel level, LogAppender appender) {\n        switch (level) {\n            case DEBUG -> debug.subscribe(appender);\n            case INFO  -> info.subscribe(appender);\n            case WARN  -> warn.subscribe(appender);\n            case ERROR -> error.subscribe(appender);\n            case FATAL -> fatal.subscribe(appender);\n        }\n    }\n}"
            }
          ]
        },
        {
          "id": "car-rental",
          "title": "Car Rental",
          "description": "Vehicle factory, booking strategy, pricing strategy, branches, and payment processing.",
          "notes": [
            "Vehicle factory, booking strategy, pricing strategy, branches, and payment processing."
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images1_enhanced/img_17.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images1_enhanced/img_18.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.car_rental;\n\nimport org.nailyourinterview.lld.car_rental.enums.*;\nimport org.nailyourinterview.lld.car_rental.factory.VehicleFactory;\nimport org.nailyourinterview.lld.car_rental.model.*;\nimport org.nailyourinterview.lld.car_rental.repository.*;\nimport org.nailyourinterview.lld.car_rental.service.BookingService;\nimport org.nailyourinterview.lld.car_rental.strategy.booking.*;\nimport org.nailyourinterview.lld.car_rental.strategy.payment.*;\nimport org.nailyourinterview.lld.car_rental.strategy.pricing.*;\nimport org.nailyourinterview.lld.car_rental.utils.DateTimeParser;\n\nimport java.time.LocalDateTime;\nimport java.util.Optional;\n\npublic class Main {\n    public static void main(String[] args) {\n        BranchRepository branchRepo = new BranchRepository();\n        BookingRepository bookingRepo = new BookingRepository();\n\n        Branch branch1 = new Branch(\"B1\", \"New York\");\n        Branch branch2 = new Branch(\"B2\", \"Boston\");\n        branchRepo.addBranch(branch1);\n        branchRepo.addBranch(branch2);\n\n        branch1.addVehicle(VehicleFactory.create(VehicleType.SEDAN, \"NY1234\", 25, 3.5));\n        branch1.addVehicle(VehicleFactory.create(VehicleType.SEDAN, \"NY5678\", 22, 3));\n        branch1.addVehicle(VehicleFactory.create(VehicleType.SUV, \"NYB100\", 30, 4));\n\n        branch2.addVehicle(VehicleFactory.create(VehicleType.SEDAN, \"BO1234\", 25, 4));\n\n        User user = new User(\"U1\", \"John Doe\", \"john@example.com\");\n\n        LocalDateTime start = DateTimeParser.parse(\"21 May 7:30 AM 2025\");\n        LocalDateTime end = DateTimeParser.parse(\"21 May 12:30 PM 2025\");\n\n        BookingService bookingService = BookingService.getInstance(\n                branchRepo,\n                bookingRepo,\n                new LeastBookedVehicleStrategy(),\n                new HourlyPricingStrategy()\n        );\n\n        System.out.println(\"--------------\");\n\n        Thread t1 = new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + \" started!\");\n            bookingService.bookVehicle(\n                    \"B1\",\n                    VehicleType.SUV,\n                    start,\n                    end,\n                    user,\n                    new CreditCardPaymentStrategy(),\n                    branch1,\n                    branch2,\n                    100.0\n            );\n            System.out.println(Thread.currentThread().getName() + \" ended!\");\n        });\n\n        Thread t2 = new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + \" started!\");\n            bookingService.bookVehicle(\n                    \"B1\",\n                    VehicleType.SUV,\n                    start,\n                    end,\n                    user,\n                    new WalletPaymentStrategy(),\n                    branch1,\n                    branch2,\n                    100.0\n            );\n            System.out.println(Thread.currentThread().getName() + \" ended!\");\n        });\n\n        t1.start();\n        t2.start();\n\n        System.out.println(\"--------------\");\n    }\n}\n\n/*\n    Thread t1 = new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + \" started!\");\n            bookingService.bookVehicle(\n                    \"B1\",\n                    VehicleType.SUV,\n                    start,\n                    end,\n                    user,\n                    new CreditCardPaymentStrategy(),\n                    branch1,\n                    branch2,\n                    100.0\n            );\n            System.out.println(Thread.currentThread().getName() + \" ended!\");\n        });\n\n        Thread t2 = new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + \" started!\");\n            bookingService.bookVehicle(\n                    \"B1\",\n                    VehicleType.SUV,\n                    start,\n                    end,\n                    user,\n                    new WalletPaymentStrategy(),\n                    branch1,\n                    branch2,\n                    100.0\n            );\n            System.out.println(Thread.currentThread().getName() + \" ended!\");\n        });\n\n        t1.start();\n        t2.start();\n */"
            },
            {
              "label": "BookingService.java",
              "content": "package org.nailyourinterview.lld.car_rental.service;\n\nimport lombok.Setter;\nimport org.nailyourinterview.lld.car_rental.enums.*;\nimport org.nailyourinterview.lld.car_rental.model.*;\nimport org.nailyourinterview.lld.car_rental.repository.*;\nimport org.nailyourinterview.lld.car_rental.strategy.booking.BookingStrategy;\nimport org.nailyourinterview.lld.car_rental.strategy.payment.PaymentStrategy;\nimport org.nailyourinterview.lld.car_rental.strategy.pricing.PricingStrategy;\n\nimport java.time.LocalDateTime;\nimport java.util.List;\nimport java.util.Optional;\nimport java.util.UUID;\n\npublic class BookingService {\n    private static volatile BookingService instance;\n\n    private final BranchRepository branchRepo;\n    private final BookingRepository bookingRepo;\n\n    @Setter\n    private BookingStrategy bookingStrategy;\n    @Setter\n    private PricingStrategy pricingStrategy;\n\n    private BookingService(BranchRepository branchRepo,\n                           BookingRepository bookingRepo,\n                           BookingStrategy bookingStrategy,\n                           PricingStrategy pricingStrategy) {\n        this.branchRepo = branchRepo;\n        this.bookingRepo = bookingRepo;\n        this.bookingStrategy = bookingStrategy;\n        this.pricingStrategy = pricingStrategy;\n    }\n\n    public static BookingService getInstance(BranchRepository branchRepo,\n                                             BookingRepository bookingRepo,\n                                             BookingStrategy bookingStrategy,\n                                             PricingStrategy pricingStrategy) {\n        if (instance == null) {\n            synchronized (BookingService.class) {\n                if (instance == null) {\n                    instance = new BookingService(branchRepo, bookingRepo, bookingStrategy, pricingStrategy);\n                }\n            }\n        }\n        return instance;\n    }\n\n    public Optional<Booking> bookVehicle(String branchId,\n                                         VehicleType vehicleType,\n                                         LocalDateTime start,\n                                         LocalDateTime end,\n                                         User user,\n                                         PaymentStrategy paymentStrategy,\n                                         Branch pickUpBranch,\n                                         Branch dropBranch,\n                                         double distanceKm) {\n\n        Branch branch = branchRepo.getBranch(branchId);\n        if (branch == null) {\n            System.out.println(\"Branch not found\");\n            return Optional.empty();\n        }\n\n        List<Vehicle> activeVehicles = branch.getVehiclesByType(vehicleType).stream()\n                .filter(v -> v.getStatus() == VehicleStatus.AVAILABLE)\n                .filter(v -> !v.getIsBooked().get())\n                .toList();\n\n        if (activeVehicles.isEmpty()) {\n            System.out.println(\"No active \" + vehicleType.name() + \" vehicles available.\");\n            return Optional.empty();\n        }\n\n        // Booking strategy tries to createBooking and return a vehicle with atomic isBooked set\n        Vehicle vehicle = bookingStrategy.bookVehicle(activeVehicles);\n\n        if (vehicle == null) {\n            System.out.println(\"No vehicle could be booked.\");\n            return Optional.empty();\n        }\n\n        double amount = pricingStrategy.calculatePrice(vehicle, start, end, distanceKm);\n\n        Booking booking = Booking.builder()\n                .bookingId(UUID.randomUUID().toString())\n                .user(user)\n                .vehicle(vehicle)\n                .pickupBranch(pickUpBranch)\n                .dropBranch(dropBranch)\n                .startTime(start)\n                .endTime(end)\n                .amount(amount)\n                .build();\n\n        PaymentProcessor processor = new PaymentProcessor(paymentStrategy);\n        if (!processor.pay(booking)) {\n            System.out.println(\"Payment failed\");\n            // Rollback booking if payment fails\n            vehicle.getIsBooked().set(false);\n            return Optional.empty();\n        }\n\n        booking.setStatus(BookingStatus.CONFIRMED);\n        bookingRepo.addBooking(booking);\n\n        vehicle.incrementBookingCount();\n        vehicle.setStatus(VehicleStatus.BOOKED);\n\n        System.out.println(booking);\n\n        return Optional.of(booking);\n    }\n\n    public void returnVehicle(String bookingId) {\n        Optional<Booking> bookingOpt = bookingRepo.getBookingById(bookingId);\n        if (bookingOpt.isEmpty()) {\n            throw new RuntimeException(\"Booking not found\");\n        }\n\n        Booking booking = bookingOpt.get();\n\n        if (booking.getStatus() != BookingStatus.CONFIRMED) {\n            throw new RuntimeException(\"Vehicle is not currently booked\");\n        }\n\n        booking.setStatus(BookingStatus.COMPLETED);\n        booking.getVehicle().getIsBooked().set(false);\n\n        Branch dropBranch = booking.getDropBranch();\n        dropBranch.addVehicle(booking.getVehicle());\n        System.out.println(\"Vehicle returned to branch \" + dropBranch.getCity() + \": \" + booking.getVehicle().getLicensePlate());\n    }\n}"
            },
            {
              "label": "VehicleFactory.java",
              "content": "package org.nailyourinterview.lld.car_rental.factory;\n\nimport org.nailyourinterview.lld.car_rental.model.SUV;\nimport org.nailyourinterview.lld.car_rental.model.Sedan;\nimport org.nailyourinterview.lld.car_rental.enums.VehicleType;\nimport org.nailyourinterview.lld.car_rental.model.Vehicle;\n\npublic class VehicleFactory {\n    public static Vehicle create(VehicleType type, String licensePlate, double pricePerHour, double pricePerKm) {\n        return switch (type) {\n            case SEDAN -> new Sedan(licensePlate, pricePerHour, pricePerKm);\n            case SUV -> new SUV(licensePlate, pricePerHour, pricePerKm);\n        };\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Support extensible vehicle types such as sedans, hatchbacks, SUVs, and more.",
                "Support multiple vehicle selection strategies such as cheapest first and least booked.",
                "Support multiple rental charge strategies such as hourly and distance-based pricing.",
                "Support multiple payment methods such as UPI, credit card, and cash.",
                "Allow branches to be added, updated, or deleted dynamically.",
                "Each branch should maintain its own vehicle inventory."
              ]
            }
          ]
        },
        {
          "id": "parking-lot",
          "title": "Parking Lot",
          "description": "Floors, spots, gates, tickets, vehicle factory, pricing, payment, and slot locking.",
          "notes": [
            "Vehichle Factory",
            "Vehichle Strategy",
            "> (Bike, Bus, Car)",
            "> ENUM",
            "Parking Lot Service",
            "> Floor",
            "> Slots -> (will take which one can hold vehichle enum)",
            "> Ticket (Contain vehno)"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images_enhanced/img_20.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images_enhanced/img_21.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.parking_lot;\n\nimport org.nailyourinterview.lld.parking_lot.enums.*;\nimport org.nailyourinterview.lld.parking_lot.factory.*;\nimport org.nailyourinterview.lld.parking_lot.model.*;\nimport org.nailyourinterview.lld.parking_lot.service.*;\nimport org.nailyourinterview.lld.parking_lot.utils.DateTimeParser;\n\nimport java.time.LocalDateTime;\nimport java.time.temporal.ChronoUnit;\n\npublic class Main {\n    public static void main(String[] args) {\n        ParkingLot lot = ParkingLot.getInstance();\n        EntryGate entryGate = new EntryGate(\"EG1\");\n        ExitGate exitGate = new ExitGate(\"XG1\");\n\n        lot.setPricingStrategy(PricingStrategyFactory.get(PricingStrategyType.valueOf(\"EVENT_BASED\")));\n\n        ParkingFloor floor1 = new ParkingFloor(\"Floor1\");\n        floor1.addSpot(new ParkingSpot(\"F1S1\", VehicleType.BIKE));\n        floor1.addSpot(new ParkingSpot(\"F1S2\", VehicleType.CAR));\n        floor1.addSpot(new ParkingSpot(\"F1S3\", VehicleType.TRUCK));\n        floor1.addSpot(new ParkingSpot(\"F1S4\", VehicleType.CAR));\n        lot.addFloor(floor1);\n\n        System.out.println(\"--------------------------\");\n\n        Vehicle bike1 = VehicleFactory.create(\"KA01AB1234\", VehicleType.BIKE);\n        Vehicle bike2 = VehicleFactory.create(\"KA01AB5678\", VehicleType.BIKE);\n        LocalDateTime entryTime = DateTimeParser.parse(\"21 May 7:30 AM 2025\");\n        System.out.println(entryTime.truncatedTo(ChronoUnit.HOURS));\n\n        Thread t1 = new Thread(() -> entryGate.parkVehicle(bike1, entryTime));\n        Thread t2 = new Thread(() -> entryGate.parkVehicle(bike2, entryTime));\n\n        t1.start();\n        t2.start();\n\n//        Vehicle car = VehicleFactory.create(\"KA01AB1234\", VehicleType.SEDAN);\n//\n//        LocalDateTime entryTime = DateTimeParser.parse(\"21 May 7:30 AM 2025\");\n//        Ticket ticket = entryGate.parkVehicle(car, entryTime);\n//\n//        System.out.println(\"--------------------------\");\n//\n//        lot.printStatus();\n//\n//        System.out.println(\"--------------------------\");\n//\n//        LocalDateTime exitTime = DateTimeParser.parse(\"21 May 1:15 PM 2025\");\n//        exitGate.unparkVehicle(ticket.getTicketId(), exitTime, PaymentMode.UPI);\n//\n//        System.out.println(\"--------------------------\");\n//\n//        lot.printStatus();\n    }\n}\n\n/*\n\n */"
            },
            {
              "label": "ParkingLot.java",
              "content": "package org.nailyourinterview.lld.parking_lot.service;\n\nimport lombok.Getter;\nimport lombok.Setter;\nimport org.nailyourinterview.lld.parking_lot.enums.PaymentMode;\nimport org.nailyourinterview.lld.parking_lot.enums.*;\nimport org.nailyourinterview.lld.parking_lot.factory.*;\nimport org.nailyourinterview.lld.parking_lot.model.*;\nimport org.nailyourinterview.lld.parking_lot.strategy.payment.*;\nimport org.nailyourinterview.lld.parking_lot.strategy.pricing.*;\n\nimport java.time.LocalDateTime;\nimport java.util.HashMap;\nimport java.util.Map;\nimport java.util.UUID;\n\n@Getter\npublic class ParkingLot {\n    private static final ParkingLot INSTANCE = new ParkingLot();\n\n    private final Map<String, ParkingFloor> floors = new HashMap<>();\n    private final Map<String, Ticket> activeTickets = new HashMap<>();\n    @Setter\n    private PricingStrategy pricingStrategy;\n\n    private ParkingLot() {\n        this.pricingStrategy = PricingStrategyFactory.get(PricingStrategyType.TIME_BASED);\n    }\n\n    public static ParkingLot getInstance() {\n        return INSTANCE;\n    }\n\n    public void addFloor(ParkingFloor floor) {\n        floors.put(floor.getId(), floor);\n    }\n\n    // b1, b2 (one spot)\n    // car, bike\n\n    public Ticket parkVehicle(Vehicle vehicle, LocalDateTime entryTime) {\n        for (ParkingFloor floor : floors.values()) {\n            ParkingSpot spot = floor.findAvailableSpot(vehicle.getType());\n\n            if (spot != null) {\n                // Successfully reserved the spot via atomic operation\n                String ticketId = UUID.randomUUID().toString();\n                Ticket ticket = Ticket.builder()\n                        .ticketId(ticketId)\n                        .entryTime(entryTime)\n                        .vehicle(vehicle)\n                        .floorId(floor.getId())\n                        .spotId(spot.getId())\n                        .build();\n\n                activeTickets.put(ticketId, ticket);\n                System.out.println(\"Vehicle parked. Ticket: \" + ticketId);\n                return ticket;\n            }\n        }\n\n        System.out.println(\"No spot available for vehicle type: \" + vehicle.getType());\n        return null;\n    }\n\n    public void unparkVehicle(String ticketId, LocalDateTime exitTime, PaymentMode paymentMode) {\n        Ticket ticket = activeTickets.get(ticketId);\n        if (ticket == null) {\n            System.out.println(\"Invalid ticket ID.\");\n            return;\n        }\n\n        double fee = pricingStrategy.calculateFee(\n                ticket.getVehicle().getType(),\n                ticket.getEntryTime(),\n                exitTime\n        );\n\n        PaymentStrategy strategy = PaymentStrategyFactory.get(paymentMode);\n        PaymentProcessor processor = new PaymentProcessor(strategy);\n        boolean paid = processor.pay(ticket, fee);\n\n        if (!paid) {\n            System.out.println(\"Vehicle cannot exit. Payment unsuccessful.\");\n            return;\n        }\n\n        ParkingSpot spot = floors.get(ticket.getFloorId()).getSpots().get(ticket.getSpotId());\n        spot.vacate();\n        activeTickets.remove(ticketId);\n\n        System.out.println(\"Vehicle exited. Fee charged: ₹\" + fee);\n    }\n\n    public void printStatus() {\n        floors.forEach((floorId, floor) -> {\n            System.out.println(\"Floor: \" + floorId);\n            floor.getSpots().values().forEach(spot -> {\n                System.out.println(\" Spot \" + spot.getId() + \" [\" + spot.getAllowedType() + \"] - \" + (spot.isOccupied() ? \"Occupied\" : \"Free\"));\n            });\n        });\n    }\n}"
            },
            {
              "label": "VehicleFactory.java",
              "content": "package org.nailyourinterview.lld.parking_lot.factory;\n\nimport org.nailyourinterview.lld.parking_lot.enums.VehicleType;\nimport org.nailyourinterview.lld.parking_lot.model.*;\n\npublic class VehicleFactory {\n    public static Vehicle create(String number, VehicleType type) {\n        return switch (type) {\n            case CAR -> new Car(number);\n            case BIKE -> new Bike(number);\n            case TRUCK -> new Truck(number);\n        };\n    }\n}"
            }
          ],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Support different vehicle types such as bikes, cars, trucks, and buses.",
                "Each parking spot supports a specific vehicle type.",
                "Support multiple pricing strategies such as time-based pricing and event-based pricing.",
                "Support multiple payment methods such as UPI, credit card, and cash."
              ]
            }
          ]
        },
        {
          "id": "heap-data",
          "title": "Heap Data",
          "description": "Array-backed heap design with parent/child indexing, insert heapify-up, remove heapify-down, and resize-friendly storage.",
          "notes": [
            "child = 2*i, 2*i+1",
            "parent = i/2",
            "insert -> compare with parent and swap upward",
            "remove -> swap first with last, remove last, then swap down with greater child"
          ],
          "images": [
            {
              "label": "Heap Indexing",
              "src": "assets/study/lld/projects-md/heap-data/heap-indexing.png"
            },
            {
              "label": "Heap Insert",
              "src": "assets/study/lld/projects-md/heap-data/heap-insert.png"
            },
            {
              "label": "Heap Remove",
              "src": "assets/study/lld/projects-md/heap-data/heap-remove.png"
            }
          ],
          "code": [],
          "textSections": [
            {
              "title": "Requirements",
              "items": [
                "Design an array-backed binary heap.",
                "Support insert by placing the new value at the end and restoring heap order upward.",
                "Support removing the root by replacing it with the last value and restoring heap order downward.",
                "Keep parent and child index calculations simple and consistent.",
                "Make the heap usable as the base for priority queue behavior."
              ]
            },
            {
              "title": "Design Notes",
              "items": [
                "For zero-based arrays, children are usually 2*i + 1 and 2*i + 2, while parent is (i - 1) / 2.",
                "For one-based arrays, children are 2*i and 2*i + 1, while parent is i / 2.",
                "The notes use one-based indexing, so the implementation should explicitly choose one convention and stick to it.",
                "Heapify-up is used after insert; heapify-down is used after extracting or removing the root."
              ]
            },
            {
              "title": "How to explain the solution",
              "items": [
                "Explain the invariant first: every parent must be greater than or equal to its children for a max heap.",
                "Then explain operations in terms of how they temporarily break and restore that invariant.",
                "Mention time complexity: insert and remove are O(log n), peek is O(1), and building a heap from an array can be O(n)."
              ]
            }
          ]
        },
        {
          "id": "hashmap",
          "title": "HashMap",
          "description": "Buckets, hashing, collision handling, load factor, resizing, put/get/remove mechanics.",
          "notes": [
            ".hashCode()",
            "loadfactor increase size"
          ],
          "images": [
            {
              "label": "Rehashing Diagram",
              "src": "assets/study/lld/Light/Images1_enhanced/img_24.png"
            },
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images1_enhanced/img_22.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images1_enhanced/img_23.png"
            },
            {
              "label": "Design Notes",
              "src": "assets/study/lld/Light/Images1_enhanced/img_25.png"
            }
          ],
          "code": [
            {
              "label": "CustomHashMap.java",
              "content": "package org.nailyourinterview.lld.hashmap;\n\nimport lombok.Getter;\nimport lombok.Setter;\n\n@Getter\n@Setter\nclass Node<K, V> {\n    K key;\n    V val;\n    Node next;\n    Node prev;\n\n    Node(K key, V val){\n        this.key = key;\n        this.val = val;\n    }\n}\n\n//hashmap = {(key1, val1), (key2, val2)}\n//hashset = { key1, key2 }\n\npublic class CustomHashMap<K, V> {\n    private final int INITIAL_SIZE = 4;\n    private final int MAX_CAPACITY = 1 << 30;\n    private final float LOAD_FACTOR = 0.75f;\n    private int countOfNodes = 0;\n\n    private Node[] map;\n\n    CustomHashMap(){\n        map = new Node[INITIAL_SIZE];\n        for (int i = 0; i < INITIAL_SIZE; i++) {\n            map[i] = new Node<>(null, null);\n            map[i].next = new Node<>(null, null);\n            map[i].next.prev = map[i];\n        }\n    }\n\n    public V get(K key){\n        Node node = findNode(key);\n        return node == null ? null : (V) node.val;\n    }\n\n    public void put(K key, V val){\n        Node node = findNode(key);\n        if(node != null){\n            node.val = val;\n            return;\n        }\n\n        int bucket = key.hashCode() % map.length;\n        Node head = map[bucket];\n\n        Node newNode = new Node(key, val);\n        Node old_first = head.next;\n        head.next = newNode;\n        newNode.prev = head;\n        newNode.next = old_first;\n        old_first.prev = newNode;\n\n        countOfNodes++;\n\n        if(countOfNodes > LOAD_FACTOR * map.length){\n            rehash(map.length * 2);\n        }\n    }\n\n    public void remove(K key){\n        Node nodeToRemove = findNode(key);\n\n        if (nodeToRemove == null) return;\n\n        Node prevNode = nodeToRemove.prev;\n        Node nextNode = nodeToRemove.next;\n\n        prevNode.next = nextNode;\n        nextNode.prev = prevNode;\n\n        countOfNodes--;\n    }\n\n    public int getSize(){\n        return countOfNodes;\n    }\n\n    private void rehash(int newSize) {\n        if(newSize > MAX_CAPACITY){\n            System.out.println(\"Hashmap is exceeding max capacity\");\n            return;\n        }\n\n        Node[] newMap = new Node[newSize];\n        for (int i = 0; i < newSize; i++) {\n            newMap[i] = new Node<>(null, null);\n            newMap[i].next = new Node<>(null, null);\n            newMap[i].next.prev = newMap[i];\n        }\n\n        for (Node<K, V> curr : map) {\n            while (curr != null) {\n                //ignore head and tail\n                if (curr.key == null){\n                    curr = curr.next;\n                    continue;\n                }\n\n                int newBucket = curr.key.hashCode() % newSize;\n                Node newHead = newMap[newBucket];\n                Node oldFirst = newHead.next;\n\n                // note down curr's next\n                Node nextNode = curr.next;\n\n                newHead.next = curr;\n                curr.prev = newHead;\n                curr.next = oldFirst;\n                oldFirst.prev = curr;\n\n                curr = nextNode;\n            }\n        }\n\n        map = newMap;\n    }\n\n    public Node findNode(K key){\n        int bucket = key.hashCode() % map.length;\n        Node head = map[bucket];\n\n        while(head != null){\n            if(head.key != null && head.key.equals(key)){\n                return head;\n            }\n            head = head.next;\n        }\n        return null;\n    }\n}"
            },
            {
              "label": "Main.java",
              "content": "package org.nailyourinterview.lld.hashmap;\n\npublic class Main {\n    public static void main(String[] args) {\n        CustomHashMap<String, Integer> map = new CustomHashMap<>();\n        map.put(\"Shubh\", 90);\n        map.put(\"Karan\", 80);\n        map.put(\"Alice\", 85);\n        map.put(\"John\", 78);\n        map.put(\"Tom\", 82);\n        map.put(\"Parth\", 95);\n\n        System.out.println(map.get(\"John\"));\n        System.out.println(map.get(\"Bob\"));\n\n\n\n\n\n\n\n\n//            Object obj = \"Tom\";\n//        System.out.println(obj.hashCode() % 8);\n    }\n}"
            }
          ]
        },
        {
          "id": "elevator",
          "title": "Elevator",
          "description": "External/internal dispatchers, scheduler strategy, controller queues, elevator, door, and display.",
          "notes": [
            "Functionality Requirements:",
            "1. A building has multiple elevators and multiple floors.",
            "2. A user can request an elevator externally using Up / Down buttons at each floor.",
            "3. These Up/ Down direction button is used to choose the best Elevator to server the request.",
            "4. One Elevator is chosen, the floor is added in that particular elevator bucket list.",
            "5. A user inside an elevator can also press an internal button to select destination floor.",
            "6. Request generated from elevator Internal button, should always server by the same elevator only.",
            "7. Elevators should remain idle (sleep) when no requests exist, and wake when new request arrives."
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images1_enhanced/img_27.png"
            }
          ],
          "code": [
            {
              "label": "Demo.java",
              "content": "package com.conceptcoding.interviewquestions.elevator;\n\nimport java.util.Arrays;\n\npublic class Demo {\n\n    public static void main(String[] args) {\n\n        try {\n\n\n            // 1. Create elevator cars and their controllers\n            ElevatorCar car1 = new ElevatorCar(1);\n            ElevatorController controller1 = new ElevatorController(car1);\n\n            ElevatorCar car2 = new ElevatorCar(2);\n            ElevatorController controller2 = new ElevatorController(car2);\n\n\n            // 2. Create one internal buttons for each elevator\n            InternalButton internalButton_for_elevator1 = new InternalButton(controller1);\n            InternalButton internalButton_for_elevator2 = new InternalButton(controller2);\n\n\n            //3. create Scheduler with Nearest Strategy\n            ElevatorScheduler elevatorScheduler = new ElevatorScheduler(\n                    Arrays.asList(controller1, controller2),\n                    new NearestElevatorStrategy()\n            );\n\n            //4. Create External Dispatcher\n            ExternalDispatcher externalDispatcher = new ExternalDispatcher(elevatorScheduler);\n\n\n            // Create a 5 floor building:\n            Building building = new Building(5, externalDispatcher);\n\n            // 6. Start both the elevator controllers threads\n            new Thread(controller1, \"Elevator-1\").start();\n            new Thread(controller2, \"Elevator-2\").start();\n\n\n\n\n            // Lets submit the requests\n            /*\n                1. External Call : Floor 3 UP\n                2. External Call : Floor 5 DOWN\n                3. Internal Call : Elevator 1 (press 4)\n                4. Internal Call : Elevator 1 (press 5)\n                5. External Call : Floor 1 DOWN\n                6. External Call : Floor 2 UP\n             */\n\n            building.getFloor(3).pressUpButton();\n            Thread.sleep(5);\n\n            building.getFloor(5).pressDownButton();\n            Thread.sleep(5);\n\n            internalButton_for_elevator1.pressButton(4); // user inside elevator 1 presses floor 4\n            Thread.sleep(5);\n\n            internalButton_for_elevator1.pressButton(5); // user inside elevator 1 presses floor 5\n            Thread.sleep(5);\n\n            building.getFloor(1).pressDownButton();\n            Thread.sleep(5);\n\n            building.getFloor(2).pressUpButton();\n            Thread.sleep(5);\n\n            internalButton_for_elevator1.pressButton(2); // user inside elevator1 presses floor 2\n        }\n        catch (Exception e) {\n\n        }\n\n    }\n}"
            },
            {
              "label": "ElevatorController.java",
              "content": "package com.conceptcoding.interviewquestions.elevator;\n\nimport com.conceptcoding.interviewquestions.elevator.enums.ElevatorDirection;\n\nimport java.util.concurrent.PriorityBlockingQueue;\n\npublic class ElevatorController implements Runnable {\n\n    PriorityBlockingQueue<Integer> upMinPQ;\n    PriorityBlockingQueue<Integer> downMaxPQ;\n\n    ElevatorCar elevatorCar;\n\n    private final Object monitor = new Object();\n\n    ElevatorController(ElevatorCar elevatorCar) {\n\n        this.elevatorCar = elevatorCar;\n        upMinPQ = new PriorityBlockingQueue<>();\n        downMaxPQ = new PriorityBlockingQueue<>(10, (a, b) -> b - a);\n    }\n\n    public void submitRequest(int destinationFloor) {\n        enqueueRequest(destinationFloor);\n    }\n\n    private void enqueueRequest(int destinationFloor) {\n        System.out.println(\"Request details-> destinationFloor: \" + destinationFloor + \" accepted by elevator:\" + elevatorCar.id);\n\n        if (destinationFloor == elevatorCar.nextFloorStoppage){\n            return;\n        }\n        if (destinationFloor >= elevatorCar.nextFloorStoppage) {\n            if (!upMinPQ.contains(destinationFloor)) {\n                upMinPQ.offer(destinationFloor);\n            }\n        } else {\n            if (!downMaxPQ.contains(destinationFloor)) {\n                downMaxPQ.offer(destinationFloor);\n            }\n        }\n\n        synchronized (monitor) {\n            monitor.notify();   // wake elevator thread\n        }\n    }\n\n    @Override\n    public void run() {\n        controlElevator();\n    }\n\n    public void controlElevator() {\n\n        while (true) {\n\n            //no request, go to sleep\n            synchronized (monitor) {\n                while (upMinPQ.isEmpty() && downMaxPQ.isEmpty()) {\n                    try {\n                        System.out.println(\"elevator:\" + elevatorCar.id + \" is IDLE\");\n                        elevatorCar.movingDirection = ElevatorDirection.IDLE;\n                        monitor.wait(); // sleep until request arrives\n                    } catch (InterruptedException e) {\n                        Thread.currentThread().interrupt();\n                    }\n                }\n            }\n\n\n            while (!upMinPQ.isEmpty()) {\n                int floor = upMinPQ.poll();\n                System.out.println(\"Serving floor: \" + floor + \" by elevator:\" + elevatorCar.id + \" currentFloor: \" + elevatorCar.currentFloor);\n                elevatorCar.moveElevator(floor);\n            }\n\n\n            while (!downMaxPQ.isEmpty()) {\n                int floor = downMaxPQ.poll();\n                System.out.println(\"Serving floor: \" + floor + \" by elevator:\" + elevatorCar.id + \" currentFloor: \" + elevatorCar.currentFloor);\n                elevatorCar.moveElevator(floor);\n            }\n        }\n    }\n}"
            },
            {
              "label": "ElevatorCar.java",
              "content": "package com.conceptcoding.interviewquestions.elevator;\n\nimport com.conceptcoding.interviewquestions.elevator.enums.ElevatorDirection;\n\npublic class ElevatorCar {\n\n    int id;\n    int currentFloor;\n    int nextFloorStoppage;\n    ElevatorDirection movingDirection;\n    Door door;\n\n    public ElevatorCar(int id) {\n        this.id = id;\n        currentFloor = 0;\n        movingDirection = ElevatorDirection.IDLE;\n        door = new Door();\n    }\n\n    public void showDisplay() {\n        System.out.println(\"elevator:\" + id + \" Current floor: \" + currentFloor + \" going: \" + movingDirection);\n    }\n\n    public void moveElevator(int destinationFloor) {\n        //this is dump object, so if command has come, to go particular direction and particular floor, it just move\n        //no matter what its current state and floor.\n\n        this.nextFloorStoppage = destinationFloor;\n        if (this.currentFloor == nextFloorStoppage) {\n            door.openDoor(id);\n            return;\n        }\n\n        int startFloor = this.currentFloor;\n        door.closeDoor(id);\n        if(nextFloorStoppage >=currentFloor) {\n            movingDirection = ElevatorDirection.UP;\n            showDisplay();\n            //+1 i am doing bcoz, floor start from 0,1,2.... so if anyone goes from 1st floor to 2nd, so only 1 floor\n            //lift has to move, not 2.\n            for (int i = startFloor+1; i<= nextFloorStoppage; i++) {\n                try {\n                    Thread.sleep(5);\n                }catch (Exception e) {\n\n                }\n                setCurrentFloor(i);\n                showDisplay();\n            }\n        }\n        else  {\n            movingDirection = ElevatorDirection.DOWN;\n\n            showDisplay();\n            for (int i = startFloor-1; i>= nextFloorStoppage; i--) {\n                try {\n                    Thread.sleep(5);\n                }catch (Exception e) {\n\n                }\n                setCurrentFloor(i);\n                showDisplay();\n            }\n        }\n        door.openDoor(id);\n    }\n\n    public void setCurrentFloor(int currentFloor) {\n        this.currentFloor = currentFloor;\n    }\n}"
            }
          ],
          "videos": [
            {
              "source": "Shrayansh",
              "title": "Elevator LLD reference",
              "url": "https://www.youtube.com/playlist?list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW"
            }
          ]
        },
        {
          "id": "cricbuzz",
          "title": "Cricbuzz",
          "description": "Match, innings, overs, balls, score observers, teams, player scorecards, and match type strategy.",
          "notes": [
            "Match",
            "> Team",
            "> Player",
            "> Person",
            "> Batter ScoreCard",
            "> Bowler ScoreCard",
            "> PlayerType",
            "> BattingController"
          ],
          "images": [
            {
              "label": "UML",
              "src": "assets/study/lld/Light/Images1_enhanced/img_26.png"
            }
          ],
          "code": [
            {
              "label": "Main.java",
              "content": "package com.conceptandcoding.LowLevelDesign.LLDCricbuzz;\n\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Player.Person;\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Player.PlayerDetails;\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Player.PlayerType;\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Team;\n\nimport java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\npublic class Main {\n\n    public static void main(String args[]) {\n\n        Main ob = new Main();\n\n        Team teamA = ob.addTeam(\"India\");\n        Team teamB = ob.addTeam(\"SriLanka\");\n\n        MatchType matchType = new T20MatchType();\n        Match match = new Match(teamA, teamB, null, \"SMS STADIUM\", matchType);\n        match.startMatch();\n\n    }\n\n\n    private Team addTeam(String name) {\n\n        Queue<PlayerDetails> playerDetails = new LinkedList<>();\n\n        PlayerDetails p1 = addPlayer(name+\"1\", PlayerType.ALLROUNDER);\n        PlayerDetails p2 = addPlayer(name+\"2\", PlayerType.ALLROUNDER);\n        PlayerDetails p3 = addPlayer(name+\"3\", PlayerType.ALLROUNDER);\n        PlayerDetails p4 = addPlayer(name+\"4\", PlayerType.ALLROUNDER);\n        PlayerDetails p5 = addPlayer(name+\"5\", PlayerType.ALLROUNDER);\n        PlayerDetails p6 = addPlayer(name+\"6\", PlayerType.ALLROUNDER);\n        PlayerDetails p7 = addPlayer(name+\"7\", PlayerType.ALLROUNDER);\n        PlayerDetails p8 = addPlayer(name+\"8\", PlayerType.ALLROUNDER);\n        PlayerDetails p9 = addPlayer(name+\"9\", PlayerType.ALLROUNDER);\n        PlayerDetails p10 = addPlayer(name+\"10\", PlayerType.ALLROUNDER);\n        PlayerDetails p11 = addPlayer(name+\"11\", PlayerType.ALLROUNDER);\n\n        playerDetails.add(p1);\n        playerDetails.add(p2);\n        playerDetails.add(p3);\n        playerDetails.add(p4);\n        playerDetails.add(p5);\n        playerDetails.add(p6);\n        playerDetails.add(p7);\n        playerDetails.add(p8);\n        playerDetails.add(p9);\n        playerDetails.add(p10);\n        playerDetails.add(p11);\n\n        List<PlayerDetails> bowlers = new ArrayList<>();\n        bowlers.add(p8);\n        bowlers.add(p9);\n        bowlers.add(p10);\n        bowlers.add(p11);\n\n        Team team = new Team(name, playerDetails, new ArrayList<>(), bowlers);\n        return team;\n\n    }\n\n    private PlayerDetails addPlayer(String name, PlayerType playerType) {\n\n        Person person = new Person();\n        person.name = name;\n        PlayerDetails playerDetails = new PlayerDetails(person, playerType);\n        return playerDetails;\n    }\n}"
            },
            {
              "label": "Match.java",
              "content": "package com.conceptandcoding.LowLevelDesign.LLDCricbuzz;\n\n\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Inning.InningDetails;\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Team;\n\nimport java.util.Date;\n\npublic class Match {\n\n    Team teamA;\n    Team teamB;\n    Date matchDate;\n    String venue;\n    Team tossWinner;\n    InningDetails[] innings;\n    MatchType matchType;\n\n    public Match(Team teamA, Team teamB, Date matchDate, String venue, MatchType matchType) {\n\n        this.teamA = teamA;\n        this.teamB = teamB;\n        this.matchDate = matchDate;\n        this.venue = venue;\n        this.matchType = matchType;\n        innings = new InningDetails[2];\n    }\n\n    public void startMatch() {\n\n        //1. Toss\n        tossWinner = toss(teamA, teamB);\n\n        //start The Inning, there are 2 innings in a match\n        for(int inning=1; inning<=2; inning++){\n\n            InningDetails inningDetails;\n            Team bowlingTeam;\n            Team battingTeam;\n\n            //assuming here that tossWinner batFirst\n            boolean isChasing = false;\n            if(inning == 1){\n                battingTeam = tossWinner;\n                bowlingTeam = tossWinner.getTeamName().equals(teamA.getTeamName()) ? teamB : teamA;\n                inningDetails = new InningDetails(battingTeam, bowlingTeam, matchType);\n                inningDetails.start( -1);\n\n            }else {\n                bowlingTeam = tossWinner;\n                battingTeam = tossWinner.getTeamName().equals(teamA.getTeamName()) ? teamB : teamA;\n                inningDetails = new InningDetails(battingTeam, bowlingTeam, matchType);\n                inningDetails.start(innings[0].getTotalRuns());\n                if(bowlingTeam.getTotalRuns() > battingTeam.getTotalRuns()) {\n                    bowlingTeam.isWinner = true;\n                }\n            }\n\n\n            innings[inning-1] = inningDetails;\n\n            //print inning details\n            System.out.println();\n            System.out.println(\"INNING \" + inning + \" -- total Run: \" + battingTeam.getTotalRuns());\n            System.out.println(\"---Batting ScoreCard : \" + battingTeam.teamName + \"---\");\n\n            battingTeam.printBattingScoreCard();\n\n            System.out.println();\n            System.out.println(\"---Bowling ScoreCard : \" + bowlingTeam.teamName + \"---\");\n            bowlingTeam.printBowlingScoreCard();\n\n        }\n\n        System.out.println();\n        if(teamA.isWinner){\n            System.out.println(\"---WINNER---\" + teamA.teamName);\n\n        }else {\n            System.out.println(\"---WINNER---\" + teamB.teamName);\n\n        }\n\n    }\n\n    private Team toss(Team teamA, Team teamB){\n        //random function return value between 0 and 1\n        if(Math.random() < 0.5) {\n            return teamA;\n        } else {\n            return teamB;\n        }\n    }\n}"
            },
            {
              "label": "InningDetails.java",
              "content": "package com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Inning;\n\n\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.MatchType;\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Player.PlayerDetails;\nimport com.conceptandcoding.LowLevelDesign.LLDCricbuzz.Team.Team;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class InningDetails {\n    Team battingTeam;\n    Team bowlingTeam;\n    MatchType matchType;\n    List<OverDetails> overs;\n\n    public InningDetails(Team battingTeam, Team bowlingTeam, MatchType matchType) {\n        this.battingTeam = battingTeam;\n        this.bowlingTeam = bowlingTeam;\n        this.matchType = matchType;\n        overs = new ArrayList<>();\n    }\n\n    public void start(int runsToWin){\n\n        //set batting players\n        try {\n            battingTeam.chooseNextBatsMan();\n        }catch (Exception e) {\n\n        }\n\n        int noOfOvers = matchType.noOfOvers();\n        for (int overNumber = 1; overNumber <= noOfOvers; overNumber++) {\n\n            //chooseBowler\n            bowlingTeam.chooseNextBowler(matchType.maxOverCountBowlers());\n\n            OverDetails over = new OverDetails(overNumber, bowlingTeam.getCurrentBowler());\n            overs.add(over);\n            try {\n               boolean won = over.startOver(battingTeam, bowlingTeam, runsToWin);\n               if(won == true) {\n                   break;\n               }\n            }catch (Exception e) {\n                break;\n            }\n\n            //swap striket and non striker\n            PlayerDetails temp = battingTeam.getStriker();\n            battingTeam.setStriker(battingTeam.getNonStriker());\n            battingTeam.setNonStriker(temp);\n        }\n    }\n\n    public int getTotalRuns(){\n       return battingTeam.getTotalRuns();\n    }\n}"
            }
          ],
          "videos": [
            {
              "source": "Shrayansh",
              "title": "Cricbuzz LLD reference",
              "url": "https://www.youtube.com/playlist?list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW"
            }
          ]
        }
      ]
    }
  ]
};
