
# Running AI Website Locally

This guide explains how to set up, run, and preview the **AI Website** on your local system.



## 📋 Prerequisites
[Node.js](https://nodejs.org/) (LTS version recommended)  
 npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)



## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/USD-AI-ResearchLab/AI_website.git
cd AI_website
````

### 2. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

*(You only need to do this once unless `package.json` changes.)*



## 🚀 Running Locally

### Start Development Server

```bash
npm run dev
```

* This will start a local server.
* By default, open your browser at:
  👉 [http://localhost:5173](http://localhost:5173)



## 📦 Building for Production

To generate an optimized build of the project:

```bash
npm run build
```

* The production-ready files will be output into the `dist/` folder.



## 👀 Previewing the Production Build

You can test the production build locally with:

```bash
npm run preview
```

* This will serve the built project, usually at:
  👉 [http://localhost:4173](http://localhost:4173)



## 🔑 Common Commands

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Run development server                      |
| `npm run build`   | Build project for production (into `dist/`) |
| `npm run preview` | Preview the production build locally        |


