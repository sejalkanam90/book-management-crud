# 📚 Book Management System

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange)
![Java](https://img.shields.io/badge/Java-17-red)

## 📖 About Project

Full Stack Book Management Application with complete CRUD Operations using **Spring Boot** and **React.js**.

---

## ✨ Features

- ➕ Add new books to library
- 📖 View all books
- ✏️ Update book details
- ❌ Delete books
- 🔍 Search books by title/author
- 🔐 User Login and Signup

---

## 🛠️ Tech Stack

### Backend
- Spring Boot
- Spring Data JPA
- MySQL Database
- Maven
- Java 17

### Frontend
- React.js
- Vite
- Axios
- React Router
- CSS3

---

## 🚀 How to Run

### Prerequisites

| Software | Version |
|----------|---------|
| Java JDK | 17+ |
| Node.js | 18+ |
| MySQL | 8.x |
| Maven | 3.8+ |

### Step 1: Clone Repository

```bash
git clone https://github.com/sejalkanam90/book-management-crud.git
cd book-management-crud
Step 2: Create Database
Open MySQL and run:

sql
CREATE DATABASE springbootBookManagement;
Step 3: Configure Backend
Open springbootproject/springbootproject/src/main/resources/application.properties:

properties
spring.application.name=springbootproject
server.port=8080
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/springbootBookManagement?createDatabaseIfNotExist=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update

Step 4: Run Backend
bash
cd springbootproject/springbootproject
mvn clean install
mvn spring-boot:run
Backend URL: http://localhost:8080

Step 5: Run Frontend
Open new terminal:

bash
cd Book-Management-Frontend
npm install
npm run dev
Frontend URL: http://localhost:5173

📡 API Endpoints
Method	Endpoint	Description
GET	/book	Test API
POST	/book	Add new book
GET	/book/getbooks	Get all books
GET	/book/{bookid}	Get book by ID
PUT	/book/updatebook	Update book
DELETE	/book/delete/{bookid}	Delete book


📁 Project Structure
Backend (Spring Boot)
text
springbootproject/springbootproject/
├── src/main/java/com/linkcode/springbootproject/
│   ├── controller/BookControlller.java
│   ├── service/BookService.java
│   ├── repository/BookRepository.java
│   ├── entity/Book.java
│   └── SpringbootprojectApplication.java
├── src/main/resources/application.properties
├── pom.xml
└── target/
Frontend (React)
text
Book-Management-Frontend/
├── src/project/pages/
│   ├── Home.jsx
│   ├── AddBook.jsx
│   ├── UpdateBook.jsx
│   ├── RemoveBook.jsx
│   ├── SearchBook.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── src/project/components/Navbar.jsx
├── src/project/context/AuthContext.jsx
├── src/App.jsx
├── src/main.jsx
├── package.json
├── vite.config.js
└── index.html

📸 Screenshots
Page	Screenshot
Home Page
<img width="2879" height="1629" alt="Screenshot 2026-05-16 204825" src="https://github.com/user-attachments/assets/4242c533-9a4c-4b0e-9da7-3e755e13f6d6" />
<img width="2879" height="1629" alt="Screenshot 2026-05-16 204825" src="https://github.com/user-attachments/assets/2ee08929-a209-4060-b81d-e3fd0968545f" />
<img width="2879" height="1629" alt="Screenshot 2026-05-16 204825" src="https://github.com/user-attachments/assets/5f0579ee-036f-42de-9075-c8523b19f0d2" />

<img width="2879" height="1627" alt="Screenshot 2026-05-16 203930" src="https://github.com/user-attachments/assets/346d1c6d-4578-4f3c-909e-1d6bd5d46a85" />


Add Book

<img width="2871" height="1634" alt="Screenshot 2026-05-16 204102" src="https://github.com/user-attachments/assets/fc22b61c-5be6-4c14-bddc-974fe4952413" />

Update Book	

<img width="2879" height="1637" alt="Screenshot 2026-05-16 204141" src="https://github.com/user-attachments/assets/2da8c140-7634-43ab-b7a3-ed77e242629b" />

Delete Book	
<img width="2879" height="1631" alt="Screenshot 2026-05-16 204239" src="https://github.com/user-attachments/assets/41480fed-d62b-4e75-a46d-b6f3a9263f1e" />

Search Book	

<img width="2879" height="1626" alt="Screenshot 2026-05-16 204119" src="https://github.com/user-attachments/assets/f07dc757-f180-42d2-93b8-ed4a6e8cf120" />


<img width="2879" height="1626" alt="Screenshot 2026-05-16 204119" src="https://github.com/user-attachments/assets/21f9b064-ec0b-4aed-a02c-daecb1b5574e" />

Login Page	

<img width="2870" height="1623" alt="Screenshot 2026-05-16 204811" src="https://github.com/user-attachments/assets/358845c3-2576-4a7c-96f6-f2fb92f6bfe1" />

Signup Page	Coming soon

<img width="2879" height="1629" alt="Screenshot 2026-05-16 204825" src="https://github.com/user-attachments/assets/84f25443-de02-4e24-98fa-fc9476d9e96e" />



👨‍💻 Author
Sejal Kanam90

GitHub:sejalkanam90

Project Link: https://github.com/sejalkanam90/book-management-crud

📝 License
This project is open source for learning purposes.

