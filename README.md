# ResourceBridge ⚡

**Turn Chaos Into Community Action.**

ResourceBridge is an AI-powered platform built for the **Google Solution Challenge 2026**. It transforms scattered community data—such as messy WhatsApp messages, verbal notes, and handwritten surveys—into a clear, actionable dashboard. By leveraging Google's Gemini AI, ResourceBridge instantly categorizes urgency and intelligently matches critical community needs with available volunteers based on their skills and location.

---

## 🌟 Key Features

*   **Smart-Paste Magic:** Paste messy, unstructured WhatsApp messages or notes. Gemini AI parses, structures, and categorizes it into an actionable need in seconds.
*   **Document Scanner:** Upload a photo of a handwritten survey or physical form. The AI reads, extracts, and structures the data automatically.
*   **Priority Map:** A real-time visual map highlighting urgent and critical community needs with glowing, color-coded markers.
*   **AI-Powered Matching:** Intelligently matches registered volunteers to needs based on their skills, proximity, and the urgency level.
*   **Gamified Volunteering:** Volunteers earn XP, unlock badges, and climb leaderboards—turning community help into an engaging and rewarding experience.
*   **Secure & Scalable:** Built on Firebase with robust role-based security rules (NGO Admin vs. Volunteer).

---

## 🛠️ Technology Stack

*   **Framework:** Next.js 16 (App Router), React 19
*   **Styling:** Tailwind CSS v4, Framer Motion (Animations)
*   **Backend & Auth:** Firebase (Authentication, Firestore, Storage)
*   **AI Services:** Google Gemini 2.0 Flash, Google Cloud Vision
*   **Mapping:** Leaflet & React-Leaflet

---

## 🚀 Getting Started

### Prerequisites
Before running the application, you must set up Firebase and Google AI Studio to obtain the necessary API keys. 

We have provided a detailed guide to help you set up your environment:
👉 **[Read the Setup Guide (SETUP.md)](./SETUP.md)**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/resourcebridge.git
   cd resourcebridge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.example` to `.env.local` (or create a new `.env.local` file) and paste your API keys as instructed in the `SETUP.md` guide.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🤝 Contributing
This project is built for the Google Solution Challenge 2026. Contributions, issues, and feature requests are welcome!

## 📄 License
This project is licensed under the MIT License.

Built by Pixel_Pioneers 🚀
