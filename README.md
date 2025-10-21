# FutureForge: Forge Ahead With Us

FutureForge is a full-stack career improvement platform that simplifies job searching by integrating smart job matching, customizable portfolio creation, professional resume building, AI Interviewer, and interactive quizzes in one unified solution.

## 🔑 Key Features

### 🔍 Smart Job Search

- Real-time job scraping using **Python** and **SerpAPI**
- Automated updates 6 times per month via **GitHub Actions**
- Automated deletion of jobs older than 60 days every month via **GitHub Actions**
- Smart filtering by role, location, and keywords
- Bookmark system for saving interesting positions

### 📄 Resume Builder

- **Professional**: Clean two-page format
- **Creative**: Dual-column layout with prominent skills
- **Modern**: Contemporary design with photo support
- Instant preview and download functionality

### 🌐 Portfolio Builder

- Choose from 12+ professionally designed themes
- One-click deployment to Vercel via integrated API
- Built-in content management for real-time updates
- Server-side rendered (SSR) previews for faster and SEO-friendly access
- Instantly shareable portfolio links to showcase your skills

### 🤖 AI Interviewer (Beta Version)

- Choose your **level**: Beginner, Intermediate, or Advanced
- Select by **topic** (Python, SQL, MongoDB, DSA theory, etc.) or **role** (Frontend, Backend, Data Science)
- System generates interview-style questions using **Groq LLM**
- Users can **answer by typing or speaking**
- Answers are evaluated in real-time with:
  - **Score out of 10**
  - **Personalized feedback** on strengths and areas for improvement
- Option to move to the next question or reset role/level/topic

### 📝 Quiz & Aptitude Practice (Beta Version)

- Practice quizzes across multiple domains:
  - **DSA (Data Structures & Algorithms)**
  - **SQL**
  - **Mathematics**
  - **JavaScript & React.js**
  - **Operating Systems & Computer Networks**
- Supports **mixed quizzes** combining multiple fields
- Provides instant evaluation with correct answers and explanations
- Currently available in **hardcore mode** (direct practice without hints)

### 🤖 Future Features

- **Smart Notifications**: Email alerts for relevant jobs every 5 days
- **Company Reviews**: Anonymous, verified company reviews to help you choose the right fit with confidence

<h2>🧰 Technology Stack</h2>

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Technologies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>React.js, Tailwind CSS, JavaScript, Zustand, TanStack Query</td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>Node.js, Express.js, Python, Flask, LangChain</td>
    </tr>
    <tr>
      <td><strong>Database</strong></td>
      <td>MongoDB, Redis</td>
    </tr>
    <tr>
      <td><strong>Tools</strong></td>
      <td>GitHub Actions, Postman, Nodemailer</td>
    </tr>
    <tr>
      <td><strong>Deployment</strong></td>
      <td>Vercel, Render</td>
    </tr>
    <tr>
      <td><strong>APIs</strong></td>
      <td>SerpAPI for job data, Vercel API for one-click deployment, Groq LLM API for AI Interviewer</td>
    </tr>
  </tbody>
</table>

## 🖌️ FutureForge Simple UI Sketches

Below are the initial hand-drawn UI concepts for FutureForge’s dashboard and tools.

![FutureForge UI Dashboard](./assets/FutureForge%20UI%20Dashboard.png)

![FutureForge UI Dashboard](./assets/FutureForge%20UI%20Tools.png)

## ⚙️ Setup Instructions

Follow the steps below to set up and run **FutureForge** locally.

1. Clone the Repository
   ```bash
   git clone https://github.com/FutureForgeOrg/FutureForge.git
   cd FutureForge
   ```
   
2. Environment Setup
   - Each folder contains its own .env.example file, Copy the example file and create your own .env configuration in each service directory
   - Repeat this for the following folders:
     - frontend
     - backend
     - admin-client
   - Fill in the required keys based on the .env.example templates provided.

3. Frontend Setup
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Backend Setup
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   
5. Admin Client Setup
   ```bash
   cd admin-client
   npm install
   npm run dev
   ```

6. Job Engine Service Setup

   1. Navigate to the Folder

      ```bash
      cd services/job_engine
      ```

   2. Create & Activate Conda Environment

      ```bash
      conda create -n futureforge_jobs python=3.10 -y
      conda activate futureforge_jobs
      ```

   3. Install Dependencies

      ```bash
      pip install -r requirements.txt
      ```

   4. Setup Environment Variables  
      - Copy the example environment file and update your own keys

   5. Setup the Database

      ```bash
      python scripts/setup_db.py
      ```

   6. Run the Job Scraper

      ```bash
      python scripts/run_scraper.py --test
      ```

7. AI Interviewer Setup

   1. Navigate to the Folder

      ```bash
      cd services/ai_interviewer
      ```

   2. Create & Activate Conda Environment

      ```bash
      conda create -n futureforge_ai python=3.10 -y
      conda activate futureforge_ai
      ```

   3. Install Dependencies

      ```bash
      pip install -r requirements.txt
      ```

   4. Setup Environment Variables  
      - Copy the example environment file and update your own keys

   5. Run the AI Interviewer Service  
      - Start the Flask app in full mode (API + UI):

        ```bash
        python run.py
        ```

      - Or run in API-only mode (for backend integration only):

        ```bash
        python run.py --api-only
        ```
