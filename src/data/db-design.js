window.DB_DESIGN_ITEMS = [
  {
    "id": "db-01",
    "number": 1,
    "title": "Instagram",
    "difficulty": "Core",
    "focus": "Model social content around users, posts, media items, and interactions. Keep media-specific data separate from post metadata so one post can support multiple ordered photos or videos.",
    "answerImage": "assets/study/db-design/answer-01.png",
    "prompt": "Design Instagram",
    "requirements": [
      "User Management: Stores primary user details including identification, names, profile names, and signup dates.",
      "Posts: Enables users to publish content, supporting multiple photos or videos per post via a dedicated media table with positional ordering.",
      "Social Connections: Implements a follower system using a many-to-many relationship table.",
      "Filters: Applies preset filters to individual media items",
      "Effects: Supports multiple adjustable effects (e.g., brightness, contrast) on a single photo or video using a many-to-many relationship.",
      "Location: Captures longitude and latitude coordinates for geographic tagging.",
      "Captions: Allows for a text description per post",
      "User Tags: Supports tagging other users in media with specific x/y coordinates.",
      "Comments: Allows threaded conversations on posts, including support for replies via a self-join.",
      "Reactions: Supports a boolean-style 'like' system between users and posts.",
      "Post Types: Extends the model to differentiate between regular posts and Stories using a post-type category"
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Start with users as the owner of content and social actions. A post is not the same thing as a photo or video: model a post as the container and store each ordered media item separately so carousels, videos, tags, filters, and effects stay flexible.",
      "Interactions should be independent tables. Followers are a user-to-user relationship, comments need a self-reference for replies, reactions are usually one row per user and post, and media tags need coordinates because the same post can tag different people at different positions."
    ],
    "video": {
      "title": "Instagram database design",
      "url": "https://youtu.be/i_1CbyzzlDk?si=tja8U2WeZWpu3JPy"
    }
  },
  {
    "id": "db-02",
    "number": 2,
    "title": "Facebook",
    "difficulty": "Core",
    "focus": "Start with users and friendships, then separate posts, comments, likes, and media. A clean friendship table is the key relationship because feeds depend on user-to-user connections.",
    "answerImage": "assets/study/db-design/answer-02.png",
    "prompt": "Design Facebook",
    "requirements": [
      "Sign up and create a profile",
      "Add other profiles as friends",
      "Add posts that contain text, photos, or videos",
      "See posts that friends have added",
      "Like and add comments to posts others have added"
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "The core challenge is the friendship graph. Store profiles separately from friend relationships, and make the friendship status explicit so pending, accepted, blocked, or removed states can be represented without losing history.",
      "Posts should support text and optional media through child tables. Likes and comments belong to posts, while feed generation depends on joining posts with accepted friend relationships rather than duplicating posts into every user feed."
    ],
    "video": {
      "title": "Facebook database design",
      "url": "https://youtu.be/sougyTO_Wjw?si=B1_Gb6pry-xkdEeN"
    }
  },
  {
    "id": "db-03",
    "number": 3,
    "title": "E Commerce",
    "difficulty": "Advanced",
    "focus": "E-commerce schemas become easier when account, catalog, inventory, cart, order, payment, shipping, review, and promotion concerns are kept in separate bounded areas.",
    "answerImage": "assets/study/db-design/answer-03.png",
    "prompt": "Design an e-commerce website",
    "requirements": [
      "Create Accounts: Users can create accounts and log in to the website",
      "Contact Details: Users can store their name and contact details such as email and phone number",
      "Addresses: Users can add one or more addresses to their account and can set a default shipping address",
      "Payment Methods: Users can add one or more payment methods to their account and can set a default payment method",
      "Products: The website can store a large number of products",
      "Categories: Each product belongs in a category, and categories can belong to other categories",
      "Product Variations: Each product can have different variations, such as different colours or sizes. Each of these variations (e.g. colour) can have different values (e.g. red, blue, black)",
      "Number In Stock: The website should keep track of the number of each product that is in stock",
      "Shopping Cart: Visitors can add one or more products to their shopping cart as part of their shopping experience. Shopping carts are not saved in the database unless they are logged in.",
      "Payment Details for Order: A user needs to provide their payment details and address details as part of placing an order.",
      "Shipping Method: The user can select a shipping method from a list of methods. Each shipping method has a single standard price.",
      "Order Status: The order and shipping process follows several stages once the order is placed, such as processing, delivery in progress, and delivered.",
      "Reviews: Users can leave reviews for products they have purchased, which include a rating from 1-5 and a text comment.",
      "Promotions: The website allows for promotions or sales to be run, which allows for one or more product categories to have a specific discount on their price"
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Split the design into account, catalog, cart, order, payment, shipping, and review areas. This keeps customer profile data stable while orders capture point-in-time facts such as selected address, payment method, price, shipping method, and status.",
      "Product variation is the main modeling decision. A product can have multiple options such as color and size, and inventory is usually tracked at the sellable SKU or variant level instead of the generic product level."
    ],
    "video": {
      "title": "E Commerce database design",
      "url": "https://youtu.be/1HamqOuv2Cw?si=5nueRn-X0rHoM3Eh"
    }
  },
  {
    "id": "db-04",
    "number": 4,
    "title": "Food Delivery",
    "difficulty": "Core",
    "focus": "Treat restaurant menus, customer orders, delivery assignments, addresses, statuses, and ratings as different lifecycle stages instead of forcing all data into one order table.",
    "answerImage": "assets/study/db-design/answer-04.png",
    "prompt": "Design a food delivery application",
    "requirements": [
      "Place order: Customers can choose a restaurant and place an order for food from the restaurant",
      "Menu items: Each restaurant has different menu items and prices. Out of scope - customising the order by adding and removing ingredients",
      "Delivery time: Customers can specify a delivery time, either ASAP (when the order is placed) or at a future time",
      "Delivery address: Customers can store multiple delivery addresses on their profile",
      "Order status: Restaurants can accept the order and update the status of the order as it is made",
      "Assign order: Delivery drivers can pick an order to deliver to assign it to themselves",
      "Pick up order: Delivery drivers can pick up an order that is ready from the restaurant and deliver it to the customer",
      "Ratings: Customers can rate delivery drivers and restaurants"
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Model restaurants and menu items independently from customer orders. An order should store selected items and item prices at the time of ordering because menus can change later.",
      "Delivery is a workflow. Keep order status, restaurant acceptance, driver assignment, pickup, delivery address, and ratings separate so each stage can change without rewriting the original order details."
    ],
    "video": {
      "title": "Food Delivery database design",
      "url": "https://youtu.be/vf_9sUqhjwM?si=1qmSQJBws5E_VeB2"
    }
  },
  {
    "id": "db-05",
    "number": 5,
    "title": "StackOverflow",
    "difficulty": "Core",
    "focus": "Questions and answers can share a post-like abstraction, but accepted answer, voting, tags, and comments need explicit relationships to avoid duplicated logic.",
    "answerImage": "assets/study/db-design/answer-05.png",
    "prompt": "Design Stack Overflow",
    "requirements": [
      "User registration: Individuals can register and maintain a profile with details such as location and bio.",
      "Question creation: Registered users can create question posts for the community.",
      "Answers: Users can submit answers to existing questions.",
      "Tags: The system supports a defined set of tags that can be attached to posts for categorization.",
      "Comments: Users can add short comments to questions and answers for clarification or discussion.",
      "Voting: Users can upvote or downvote any question or answer.",
      "Accepted answer: The question owner can mark one answer as the accepted answer."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "A clean approach is to treat questions and answers as posts with a post type, while still allowing answer rows to reference their parent question. Tags, votes, and comments then attach to posts in a consistent way.",
      "The accepted answer is a special relationship owned by the question author. Store it explicitly on the question or in a separate accepted-answer mapping, and enforce that the accepted answer belongs to the same question."
    ],
    "video": {
      "title": "StackOverflow database design",
      "url": "https://youtu.be/pAFA2jhTlD0?si=MFFIyodvtNkP5gp4"
    }
  },
  {
    "id": "db-06",
    "number": 6,
    "title": "High School",
    "difficulty": "Advanced",
    "focus": "School designs usually need time-aware modeling: school years, terms, class periods, enrollments, and scores change over time and should not overwrite history.",
    "answerImage": "assets/study/db-design/answer-06.png",
    "prompt": "Design a high school management database",
    "requirements": [
      "Students: Store details like name, gender, date of birth, and enrollment date.",
      "Parents and carers: Track multiple guardians (parents, grandparents, etc.) and their contact details, linked via a many-to-many relationship.",
      "School years: Define the timeframe for a school year with start and end dates.",
      "Terms: Accommodate a flexible number of terms per school year",
      "Year levels: Manage student enrollment across different grade levels (e.g., Kinder to Year 12).",
      "Classes: Track classes that students attend",
      "Subjects: Assign subjects (e.g., Physics, Sport) to classes",
      "Departments: Group subjects into departments for organizational reporting.",
      "Teachers: Assign teachers to instruct specific classes",
      "Teacher details: Store teacher contact and demographic information",
      "Classes and terms: Associate specific classes with terms and years, including a descriptive name for the class.",
      "Classrooms: Record classroom locations, their types, and capacity",
      "Class times: Define daily periods with start and end times for the school year.",
      "Multiple periods: Allow classes to span across multiple periods",
      "Student scores: Capture student performance grades for individual classes and overall yearly results.",
      "Score grade mapping: Create a mapping system to convert numeric scores into letter grades (e.g., A, B, C)."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "School systems are time-heavy. Students move across year levels, classes happen in terms, teachers change, and scores belong to a specific class offering rather than to a student globally.",
      "Use junction tables for many-to-many relationships: students to guardians, students to classes, teachers to class offerings, and classes to periods. This preserves history and avoids overwriting old enrollments."
    ],
    "video": {
      "title": "High School database design",
      "url": "https://youtu.be/1YPT6VH256w?si=rzC-E4NsYe1UthaN"
    }
  },
  {
    "id": "db-07",
    "number": 7,
    "title": "Trello",
    "difficulty": "Core",
    "focus": "The important part is preserving board structure and activity history: boards contain ordered lists, lists contain ordered cards, and cards collect comments, labels, checklists, watchers, and attachments.",
    "answerImage": "assets/study/db-design/answer-07.png",
    "prompt": "Design Trello",
    "requirements": [
      "User Sign-up: Ability for a user to create an account",
      "Board Creation: Users can create public or private boards",
      "Lists/Columns: Ability to add, rename, and order columns on a board",
      "Cards: Adding cards to lists with names and descriptions",
      "Comments: Adding text comments to specific cards",
      "Checklists: Adding actionable items to cards that can be checked off",
      "Members/Watching: Assigning or watching users on a specific card",
      "Activity Tracking: Keeping a history of changes made to a card",
      "Archiving: The ability to hide cards from the board without deleting them.",
      "Labels: Creating and assigning color-coded labels to cards",
      "Due Dates/Reminders: Adding deadlines and time-based alerts to cards",
      "Attachments: The ability to upload and attach files to a card"
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "The board hierarchy is simple but ordering matters: boards contain ordered lists, lists contain ordered cards, and cards collect collaboration data such as comments, labels, checklists, watchers, members, attachments, and due dates.",
      "Activity history should be append-only. Instead of only storing the latest card state, add an activity table so moves, renames, assignments, checklist updates, and archives can be audited and replayed."
    ],
    "video": {
      "title": "Trello database design",
      "url": "https://youtu.be/7Ck8wSoKJXI?si=aDP6cofDhWlEum-Z"
    }
  },
  {
    "id": "db-08",
    "number": 8,
    "title": "Real Estate",
    "difficulty": "Core",
    "focus": "Separate property facts from listing cycles. A property can be listed, inspected, offered on, contracted, rented, or sold at different points in time.",
    "answerImage": "assets/study/db-design/answer-08.png",
    "prompt": "Design a real estate listing and sales system",
    "requirements": [
      "Property Details: Capturing information about properties, including address, type, size, and other attributes.",
      "Sale or Rent Status: Defining whether a property is listed for sale or rent and tracking its process/status.",
      "Pricing: Storing either a sale price or a monthly rental price",
      "Features: Managing property features (e.g., washing machine, carport) using a many-to-many relationship.",
      "Listing Process: Managing properties that go through multiple listing cycles over time by separating property data from listing data.",
      "Employees on Property: Tracking employees assigned to properties, their specific roles (e.g., selling agent), and the time periods they are active.",
      "Employee Details: Recording staff information such as names, dates of employment, and job titles.",
      "Inspections: Scheduling and managing property inspections assigned to specific employees.",
      "Clients: Tracking client details and linking them to properties of interest and attended inspections.",
      "Offers: Recording client offers for properties, including the offer amount and status (e.g., accepted or rejected).",
      "Contracts: Handling the final sale or lease documentation, including signed dates, contract status, and associated clients/employees."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Separate the property from the listing. A property has durable facts such as address, size, and features, while listings represent sale or rent attempts that can happen multiple times over the property lifecycle.",
      "Offers, inspections, contracts, clients, and employees are event-like entities connected to a listing. This lets you track who inspected what, who made an offer, and which agent handled each stage."
    ],
    "video": {
      "title": "Real Estate database design",
      "url": "https://youtu.be/DeWO891SL5g?si=EY5m9xyyyRqjE8tQ"
    }
  },
  {
    "id": "db-09",
    "number": 9,
    "title": "Train booking",
    "difficulty": "Core",
    "focus": "Train booking is mostly about route normalization. A journey has ordered stations, schedule-specific pricing, carriage classes, bookings, passengers, and ticket status.",
    "answerImage": "assets/study/db-design/answer-09.png",
    "prompt": "Design a train booking system",
    "requirements": [
      "Train stations and journeys: Model stations and journeys, with a journey-station table to store the ordered stops in a route.",
      "Departure timing: Store planned departure time for each station within a journey.",
      "Schedules: Add a schedule lookup such as weekday or weekend and connect it to train journeys.",
      "Carriage classes: Support different carriage classes such as first class and economy within a journey.",
      "Capacity: Store seating capacity for each carriage class.",
      "Pricing: Model prices by schedule and carriage class so fares can vary by journey pattern.",
      "Bookings: Store customer booking details, journey, source station, destination station, selected class, and price at purchase time.",
      "Tickets: Store ticket number and seat number for booked passengers.",
      "Passengers: Store passenger login and identity details such as name, email, and encrypted password.",
      "Booking status: Track booking lifecycle states such as active, cancelled, or completed."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Routes are the center of the schema. A train journey contains ordered stations, and each station in that journey needs stop order and timing data. This avoids storing route information repeatedly in every booking.",
      "Pricing and capacity depend on schedule and carriage class. Store booking details with the selected journey, source station, destination station, class, ticket number, passenger, seat, and the price captured at purchase time."
    ],
    "video": {
      "title": "Train booking database design",
      "url": "https://youtu.be/PD6jpvAyRNo?si=0MED_OYGRfZYcydP"
    }
  },
  {
    "id": "db-10",
    "number": 10,
    "title": "Hotel Management",
    "difficulty": "Core",
    "focus": "Hotel schemas need booking dates, multiple rooms per booking, room classes, features, beds, add-ons, payments, room status, and guest contact information.",
    "answerImage": "assets/study/db-design/answer-10.png",
    "prompt": "Design a hotel management system",
    "requirements": [
      "Guest & Basic Booking: Establish the relationship between guests and bookings (including check-in/out dates and party size) and link them to rooms.",
      "Multiple Rooms per Booking: Transition from a one-to-many to a many-to-many relationship using a booking_room joining table.",
      "Room & Floor Details: Separate room data from floor data for better management.",
      "Room Classification: Create a room_class table (e.g., Deluxe, Standard) to define the type of room.",
      "Room Features: Link features (like a large TV) to specific room classes via a joining table.",
      "Bed Types: Use a bed_type lookup table linked to room classes with a count attribute.",
      "Base Pricing: Store base prices directly within the room class table",
      "Add-ons: Include an add-on table for extras (e.g., valet, mini-bar) that can be linked to bookings.",
      "Booking Total: Add a calculated booking_amount field to the booking table.",
      "Payment Status: Use a payment_status lookup table to track if a booking is paid or unpaid.",
      "Room Status Workflow: Implement a room_status table to manage the lifecycle of a room (e.g., occupied, needs cleaning, ready).",
      "Guest Information: Add contact details (name, email, phone) to the guest table."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "A booking can reserve more than one room, so use a booking-room relationship rather than placing a single room id directly on the booking. Keep room, floor, room class, bed types, and features normalized.",
      "Payments, add-ons, booking total, and room status are separate concerns. This makes it easier to support unpaid bookings, housekeeping workflows, minibar or valet charges, and room availability checks."
    ],
    "video": {
      "title": "Hotel Management database design",
      "url": "https://youtu.be/pYYmvaKy-yQ?si=lKAKgU0GwJBG4e-i"
    }
  },
  {
    "id": "db-11",
    "number": 11,
    "title": "Ecommerce product",
    "difficulty": "Advanced",
    "focus": "Product catalogs get complex when size, color, category hierarchy, stock, and filters are modeled. Use variations and attributes so filtering does not require adding columns for every new property.",
    "answerImage": "assets/study/db-design/answer-11.png",
    "prompt": "Design an e-commerce product catalog",
    "requirements": [
      "Category Hierarchy: The design evolves from basic gender-based groupings to a nested category system using a parent_category_id.",
      "Product Variations: To handle different sizes and colors without duplicating data, the video demonstrates splitting data into product, product_item (for color/price variations), and product_variation (for size and stock) tables.",
      "Flexible Filtering: The most complex part - managing product filters - is solved using an Entity-Attribute-Value (EAV) style approach. This involves creating attribute_type, attribute_option, and a joining product_attribute table to allow for dynamic filtering.",
      "Practical Implementation: Throughout the video, the creator writes and executes MySQL statements to define tables, add foreign keys, and perform data updates, ensuring the database remains normalized and functional."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Catalog design is about avoiding duplicate products. Keep product identity separate from product items and variations so color, size, price, and stock can change independently.",
      "Filtering is usually solved with attribute tables or an EAV-style model. This allows new filter types such as material, brand, fit, storage, or display size without altering the product table every time."
    ],
    "video": {
      "title": "Ecommerce product database design",
      "url": "https://youtu.be/8bkGKwb29L4?si=oJYKeXU8jIYUs8qo"
    }
  },
  {
    "id": "db-12",
    "number": 12,
    "title": "Udemy",
    "difficulty": "Advanced",
    "focus": "Course platforms need enrollment, modules, lessons, quizzes, attempts, locking rules, and completion tracking. Keep learning content separate from student progress.",
    "answerImage": "assets/study/db-design/answer-12.png",
    "prompt": "Design Udemy",
    "requirements": [
      "Enrollment: Many students can enroll in many courses, so enrollment must be modeled as a many-to-many relationship.",
      "Student login: Students provide an email address and password to register and log in.",
      "Course details: Each course stores a name, description, and price.",
      "Enrollment date: Capture when a student enrolls in a course.",
      "Modules: Courses are divided into ordered modules with a name and module number.",
      "Lessons: Modules contain ordered lessons with a name and lesson number.",
      "Lesson content: Lessons store video URL references and rich text content.",
      "Progress locking: A course can require students to complete lessons in sequence before moving ahead.",
      "Quiz structure: Courses can include quizzes with multiple-choice questions and multiple possible correct answers.",
      "Quiz attempts: Store attempt time and score for each student quiz attempt.",
      "Pass to proceed: A quiz can require a passing score before the student can continue.",
      "Lesson completion: Track when a student completes each lesson.",
      "Course completion: Track the exact date and time when a student completes the full course."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Course platforms have two parallel models: course content and student progress. Course, module, lesson, quiz, question, and answer tables describe what exists; enrollment, completion, and attempts describe what a student has done.",
      "Locking and pass-to-proceed rules should be modeled as configuration on lessons or quizzes, not as hardcoded application behavior. That keeps the same schema usable for self-paced and strict sequential courses."
    ],
    "video": {
      "title": "Udemy database design",
      "url": "https://youtu.be/FZVHZTaot1E?si=cVSjmcrJovJfZPab"
    }
  },
  {
    "id": "db-13",
    "number": 13,
    "title": "Airbnb",
    "difficulty": "Advanced",
    "focus": "Airbnb-like systems combine property listings, hosts, bookings, guests, reviews, favorites, location lookup tables, amenities, and filterable attributes.",
    "answerImage": "assets/study/db-design/answer-13.png",
    "prompt": "Design Airbnb",
    "requirements": [
      "Property Table: The central entity storing property details, including name, location, country, price, address, and description.",
      "User Account: Manages user information (first/last name, email, password) and tracks hosting start dates.",
      "Bookings: Handles reservation logic by linking users to properties, storing check-in/out dates, nightly rates, and various fees (service, cleaning).",
      "Lookup & Mapping Tables: To ensure data integrity, the design uses lookup tables for predefined lists like Countries, Locations, Categories, Property Types, and Languages.",
      "Many-to-Many Relationships: These are managed through joining tables to handle complex associations such as Favorites, Property Attributes, and Guest Types.",
      "Reviews: A relational structure capturing user feedback, including overall ratings and component-specific ratings for individual properties.",
      "Filtering: The database supports search filters for place types, price ranges, and amenities.",
      "Status Management: Includes a status table for booking workflows (e.g., created, pending approval, approved)."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Start with users, properties, and bookings. A user can be a host or guest, a property belongs to a host, and bookings capture check-in, check-out, fees, nightly rate, status, and guest counts at the time of reservation.",
      "Search and filtering require normalized lookup and mapping tables for location, property type, amenities, categories, languages, guest types, and attributes. Reviews and favorites should stay separate from bookings so browsing and reputation features remain flexible."
    ],
    "video": {
      "title": "Airbnb database design",
      "url": "https://youtu.be/U2_MBLS04aQ?si=KiOQCbbIlIRQAiZx"
    }
  },
  {
    "id": "db-14",
    "number": 14,
    "title": "Movie theatre",
    "difficulty": "Advanced",
    "focus": "Cinema booking designs should separate movie metadata from cinema locations, theaters, showtimes, seats, ticket types, concessions, and customer purchases.",
    "answerImage": "assets/study/db-design/answer-14.png",
    "prompt": "Design a movie theatre booking system",
    "requirements": [
      "Movies: Central entity storing titles, runtimes, release dates, and age ratings.",
      "Cast & Crew: Separate tables for Directors and Cast members, using joining tables to handle many-to-many relationships.",
      "Genres: A dedicated genre table with a joining table to associate multiple genres with a single movie.",
      "Location Hierarchy: Structures for States and Cinemas to manage geographical availability.",
      "Theaters: Crucial for physical organization, linking specific rooms to cinemas and showings.",
      "Showing Times: An entity that ties the Movie, Cinema, and Theater together with a specific timestamp.",
      "Features & Attributes: Lookup tables for specific session attributes like Extreme Screen or Accessibility options.",
      "Seat Management: Tables for Seat Types and individual seat mappings within a Theater.",
      "Ticketing & Sales: Tables for Ticket Types (e.g., adult, child) and Snacks, with joining tables to record quantities purchased within a specific Booking.",
      "Customer Information: Adding fields for Email address and Creation timestamps to finalize the booking process.",
      "Lookup Tables: The transition from simple text fields to normalized lookup tables (e.g., for movie status or feature types) ensures the design is flexible for future updates."
    ],
    "articleTitle": "How to think about the solution",
    "article": [
      "Separate movie metadata from scheduling. Movies have genres, age ratings, cast, and crew, while showings connect a movie to a cinema, theater, timestamp, and session features.",
      "Seat and ticket modeling matters for booking correctness. Store theater seats, seat types, ticket types, booking line items, and snack purchases separately so availability and pricing can be calculated without ambiguity."
    ],
    "video": {
      "title": "Movie theatre database design",
      "url": "https://youtu.be/ifEpT5STEU0?si=qm_6UzFjNMqG2elI"
    }
  },
  {
    "id": "db-15",
    "number": 15,
    "title": "Movie Library Redesign",
    "difficulty": "Redesign",
    "focus": "Design a database for managing movies, formats, physical discs, seasons, episodes, people, genres, users, rentals, watch lists, and viewing status.",
    "answerImage": "assets/study/db-design/answer-15.png",
    "prompt": "Design a movie rental and media library database",
    "requirements": [
      "Store movies with title, plot, category, type, rating, duration, release year, score, and episode count where applicable.",
      "Support multiple formats for a movie, such as DVD, Blu-ray, or digital formats, including audio and subtitle language details.",
      "Support seasons, episodes, and physical discs, including the ability to map episodes to discs.",
      "Track people involved in a movie or episode, including their position such as actor, director, writer, or other crew roles.",
      "Support genres, movie-to-movie relationships, series grouping, ratings, categories, and other lookup values.",
      "Support users, rental checkout/check-in history, watch list events, and each user's movie watching status or progress.",
      "Compare two possible solutions: Approach 1 is a valid but table-heavy solution, while Approach 2 is the cleaner improved design."
    ],
    "articleTitle": "Comparing the two approaches",
    "article": [
      "Approach 1 is a solution, but it is table-heavy and harder to maintain. It exposes many details directly through composite keys and relationship tables, so understanding a simple question often requires walking across several tightly coupled tables.",
      "Approach 2 keeps the same domain but improves clarity. The better design should make ownership and relationships easier to explain: movies own core metadata, formats and discs are inventory concerns, seasons and episodes are content structure, and user rentals or watch progress are user activity concerns.",
      "In an interview, this comparison is useful because it shows the difference between a schema that merely stores data and a schema that is easier to query, evolve, and reason about."
    ],
    "answerApproaches": [
      {
        "label": "Approach 1",
        "title": "Valid but table-heavy design",
        "description": "A UML-style representation of the existing solution. It stores the domain, but composite keys and cross-table relationships make it harder to maintain.",
        "image": "assets/study/db-design/answer-15-approach-1.svg"
      },
      {
        "label": "Approach 2",
        "title": "Improved database design",
        "description": "The cleaner answer diagram from the solution document.",
        "image": "assets/study/db-design/answer-15.png"
      }
    ],
    "video": {
      "title": "Movie Library Redesign database design",
      "url": "https://youtu.be/ifEpT5STEU0?si=qm_6UzFjNMqG2elI"
    }
  }
];
