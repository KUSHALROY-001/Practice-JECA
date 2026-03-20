# WB JECA Practice Portal

## What is this?
**WB JECA** (West Bengal Joint Entrance for Computer Application) is a state-level entrance exam conducted for admission into MCA (Master of Computer Applications) programs. 

This project is a dedicated, ad-free practice platform specifically built for WB JECA aspirants. It allows students to solve **Previous Year Questions (PYQs)** in a simulated exam environment. 

### Key Features:
- **Full Year Mock Exams**: Attempt complete previous year papers with a realistic 120-minute countdown timer.
- **Topic-wise Practice**: Drill down into specific subjects (like C Programming, Operating Systems, Data Structures, etc.) to strengthen your weak areas.
- **Auto-Submission & Scoring**: The exam automatically submits when time runs out. Incorrect answers carry a **-0.25 negative marking**, giving you an accurate picture of your true score.
- **Detailed Review**: After submission, you get a full breakdown of correct, wrong, and unattempted marking with visual indicators.

---

## How to Run this Project on Your Computer (Step-by-Step)
Assuming you have no prior coding experience, just follow these exact steps to get the practice portal running on your machine.

### Step 1: Install Node.js
You need one piece of software installed on your computer first:
- Go to [nodejs.org](https://nodejs.org/) and download the "LTS" (Long Term Support) version. 
- Install it like any normal program (just keep clicking Next).

### Step 2: Start the Practice Portal
1. Open the downloaded project folder.
2. Click on the address bar at the top of the file explorer, type `cmd`, and press **Enter**. This opens a black terminal window in that folder.
3. Type the following command and press Enter:
   ```bash
   npm install
   ```
   *(Wait for it to finish downloading some files. You only need to do this once!)*
4. Once it's done, start the website by typing:
   ```bash
   npm run dev
   ```
5. The terminal will give you a local link (usually `http://localhost:5173`). Copy that link or hold `Ctrl` and click it to open the practice portal in your favorite web browser!

---

*Note: Whenever you want to practice again in the future, you just need to open the project folder, type `cmd` again, and run `npm run dev`.*
