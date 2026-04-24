# Setting up Firebase & AI Services

This guide will walk you through setting up the necessary backend infrastructure for ResourceBridge, which includes Firebase for authentication/database and Google AI Studio for the AI parsing features.

## 1. Firebase Setup

### Step 1.1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the prompts. (You can disable Google Analytics for now).
3. Once the project is ready, click on the **Web** icon (`</>`) on the project overview page to register a new web app.
4. Give it a name (e.g., "ResourceBridge App") and click **Register app**.
5. You will see a `firebaseConfig` object. Copy the values and paste them into your `.env.local` file matching the variables:
   - `apiKey` ➔ `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` ➔ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` ➔ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` ➔ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` ➔ `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` ➔ `NEXT_PUBLIC_FIREBASE_APP_ID`

### Step 1.2: Enable Authentication
1. In the Firebase Console left sidebar, go to **Build > Authentication**.
2. Click **Get Started**.
3. Go to the **Sign-in method** tab.
4. Enable **Email/Password** (keep "Email link" disabled) and click Save.
5. Enable **Google** (you'll need to select a support email from the dropdown) and click Save.

### Step 1.3: Enable Firestore Database
1. Go to **Build > Firestore Database** in the left sidebar.
2. Click **Create database**.
3. Choose a location close to you.
4. Start in **Test mode** (this allows you to read/write without strict security rules during development).

### Step 1.4: Enable Storage (For Avatars/Uploads)
1. Go to **Build > Storage** in the left sidebar.
2. Click **Get Started** and start in **Test mode**.

---

## 2. AI Services Setup

### Step 2.1: Google AI API (Required)
ResourceBridge uses the AI model to parse messy text and extract data from documents.
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on **Get API Key** in the left sidebar.
4. Click **Create API Key**. You can create it in a new project or select your existing Firebase project.
5. Copy the generated key and paste it into your `.env.local` file as:
   `GEMINI_API_KEY=your_generated_key_here`

### Step 2.2: Google Cloud Vision API (Optional)
The app currently has a fallback that automatically uses AI Vision if this key isn't provided, so **this step is entirely optional**.
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your Firebase project from the project dropdown at the top.
3. Search for "Cloud Vision API" in the top search bar, click on it, and click **Enable**.
4. Go to **APIs & Services > Credentials** in the sidebar.
5. Click **Create Credentials > API Key**.
6. Copy the key and paste it into `.env.local` as:
   `GOOGLE_CLOUD_VISION_API_KEY=your_vision_key_here`

---

## 3. Restart the Server
Because you modified the `.env.local` file, Next.js needs to reload the environment variables.
1. Go to your terminal where your app is currently running.
2. Press `Ctrl + C` to stop the server.
3. Run `npm run dev` again to restart it.

You are now fully set up! You can go to the login page, create a new account, and explore the dashboard!
