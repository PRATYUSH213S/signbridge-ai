# SignBridge-AI 🤟

An AI-powered sign language learning platform that combines interactive lessons, real-time hand recognition, and engaging quizzes to help users master sign language.

![SignBridge-AI](https://img.shields.io/badge/SignBridge-AI-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-47A248?logo=mongodb)

## 🌟 Features

- **Interactive Learning Modules**
  - Video-based lessons for beginners
  - Alphabet sign trainer (A-Z)
  - Number sign recognition (1-10)
  - Word-based sign learning (HOME, PERSON, TIME, YOU)

- **AI-Powered Sign Detection**
  - Real-time hand recognition using TensorFlow.js and MediaPipe
  - Webcam-based sign detection and validation
  - Instant feedback on sign accuracy

- **Engaging Quizzes**
  - Alphabet recognition quizzes
  - Number sign quizzes
  - Interactive practice sessions

- **Text-to-Sign Conversion**
  - Convert text to sign language animations
  - Visual representation of signs

- **User Authentication**
  - Secure signup and login system
  - User progress tracking

- **Modern UI/UX**
  - Responsive design
  - Beautiful animations and transitions
  - Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.0 - UI framework
- **React Router** 7.5.0 - Navigation
- **TensorFlow.js** 4.22.0 - Machine learning
- **MediaPipe Hands** 0.4.1675469240 - Hand tracking
- **Three.js** 0.175.0 - 3D animations
- **React Bootstrap** 2.10.9 - UI components
- **Axios** 1.8.4 - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** 5.1.0 - Web framework
- **MongoDB** with Mongoose 8.13.2 - Database
- **bcryptjs** 3.0.2 - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally on `mongodb://127.0.0.1:27017`)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PRATYUSH213S/signbridge-ai.git
   cd signbridge-ai
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## 🏃 Running the Application

### Step 1: Start MongoDB

Make sure MongoDB is running on your system. If you have MongoDB installed locally, start the MongoDB service:

**Windows:**
```bash
# MongoDB should be running as a service, or start it manually:
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
mongod
```

### Step 2: Start the Backend Server

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm start
```

The backend server will run on **http://localhost:5000**

### Step 3: Start the Frontend Development Server

Open a **new terminal** (keep the backend running) and navigate to the frontend directory:

```bash
cd frontend
npm start
```

The frontend will automatically open in your browser at **http://localhost:3000**

## 📁 Project Structure

```
SignBridge-AI/
├── backend/
│   ├── index.js              # Express server entry point
│   ├── models/
│   │   └── User.js           # User model (MongoDB schema)
│   ├── routes/
│   │   └── auth.js           # Authentication routes
│   └── package.json
│
├── frontend/
│   ├── public/               # Static files
│   ├── src/
│   │   ├── Animations/       # Sign language animations
│   │   │   ├── Alphabets/    # A-Z sign animations
│   │   │   └── Words/        # Word sign animations
│   │   ├── assets/           # Images and media files
│   │   ├── Models/           # 3D models (xbot, ybot)
│   │   ├── page/             # Additional pages
│   │   ├── About.jsx         # About page
│   │   ├── App.js            # Main app component
│   │   ├── Contact.jsx       # Contact page
│   │   ├── Home.jsx          # Home page
│   │   ├── Learn.jsx         # Learning hub
│   │   ├── BeginnerLearn.jsx # Beginner lessons
│   │   ├── AlphabetSignTrainer.jsx # Alphabet trainer
│   │   ├── Quiz.jsx          # Quiz selection
│   │   ├── SignQuiz.jsx      # Sign recognition quiz
│   │   ├── NumberSignQuiz.jsx # Number quiz
│   │   ├── Login.jsx         # Login page
│   │   ├── Signup.jsx        # Signup page
│   │   └── Convert.jsx       # Text-to-sign converter
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /api/signup` - User registration
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## 🎯 Key Features Explained

### 1. Alphabet Sign Trainer
Learn and practice sign language alphabets (A-Z) with interactive animations and real-time feedback.

### 2. Number Sign Quiz
Test your knowledge of number signs (1-10) using webcam-based detection.

### 3. AI Sign Detection
Uses TensorFlow.js and MediaPipe to detect and validate hand signs in real-time through your webcam.

### 4. Text-to-Sign Converter
Convert text input into visual sign language representations.

## 🌐 Routes

- `/` - Home page
- `/about` - About page
- `/contact-us` - Contact page
- `/learn` - Learning hub
- `/video-learn` - Beginner video lessons
- `/alphabet` - Alphabet sign trainer
- `/signup` - User registration
- `/login` - User login
- `/quiz` - Quiz selection
- `/give-quiz` - Alphabet recognition quiz
- `/number-quiz` - Number sign quiz
- `/sign-kit/convert` - Text-to-sign converter

## 🔒 Environment Variables

Currently, the backend uses a local MongoDB connection. To use a different database:

1. Update the connection string in `backend/index.js`:
   ```javascript
   mongoose.connect("your-mongodb-connection-string", {
     // options
   });
   ```

2. For production, consider using environment variables:
   ```javascript
   mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sign-language_learn");
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Pratyush**

- GitHub: [@PRATYUSH213S](https://github.com/PRATYUSH213S)

## 🙏 Acknowledgments

- TensorFlow.js team for the amazing ML library
- MediaPipe for hand tracking capabilities
- React community for excellent documentation
- All contributors and users of SignBridge-AI

## 📞 Support

For support, email or open an issue in the GitHub repository.

---

**Made with ❤️ for the sign language learning community**

