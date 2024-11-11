# Quiz Room

**Quiz Room** is a web app that allows users to create or join "rooms" to participate in quizzes with friends. The app uses Firebase for real-time data management and hosting.
**Quiz Room** is a minimalist web app designed to be an accessory for playing a quiz in person with your friends. The app does not include the quiz questions itself, but instead serves as a tool to track answers and ensure fairness during gameplay. Players can join a unique room, submit their answers, and the app records the order in which answers are submitted, making it clear who answered first. It also prevents players from changing their answers after submission or copying from others.

The app uses Firebase for real-time data management and hosting.

## Main Features

-   **Create a room**: Users can create a new room and invite other participants.
-   **Join a room**: Users can join an existing room by entering the room ID or follow a link.
-   **Real-time answers**: Participants' answers are submitted in real-time.
-   **Fast answers**: Players can answer using predefined letters (A-F) or enter their custom answers.
-   **Game Control for Room Creator**: The room creator has exclusive control to reveal answers, reset the game, and share the room with others via a shareable URL.

## Prerequisites

Before you can use or develop this project, you need to have a Firebase project set up with the following services:

-   **Firebase Realtime Database**: For storing quiz data (questions, answers, etc.).
-   **Firebase Hosting**: For hosting the web application.

### Setup Instructions

1. Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
2. Enable **Realtime Database** and **Hosting** in the Firebase console for your project.
3. Download and install Firebase CLI if you haven't already:

    ```bash
    npm install -g firebase-tools
    ```

4. Once your Firebase project is set up, add a `.env.local` file to the root of your project with the following configuration:

    ```bash
    VITE_FIREBASE_API_KEY=your-firebase-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-firebase-app-id
    VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
    ```

    You can obtain these values from the **Firebase Console** under **Project Settings** (top left).

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/quiz-room.git
    cd quiz-room
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure your Firebase project locally:

    ```bash
    firebase login
    firebase use --add
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

    The application will be available at `https://localhost:5173/`.

5. To deploy the app on Firebase Hosting, run the following:
    ```bash
    firebase deploy
    ```

## Project Structure

-   **src**: Contains all the source files for the app (React components, Firebase services, etc.).
-   **public**: Contains static files like `favicon.ico`.
-   **.env.local**: The file containing environment variables to configure Firebase.
-   **firebase.json**: The Firebase Hosting configuration and Firebase security rules.

## Contributing

Contributions are welcome! If you would like to contribute to this project, feel free to open a _pull request_ or submit an _issue_.

## License

Distributed under the MIT License. See the [LICENSE](LICENSE) file for more details.
