# 📱 Mobile Addiction Predictor

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-API-black?style=for-the-badge&logo=flask&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-orange?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![Accuracy](https://img.shields.io/badge/Accuracy-82.5%25-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)

**A real-time Machine Learning web app that predicts your mobile addiction level based on daily usage behavior.**

[🚀 Live Demo](https://mobile-addiction-prediction-79cz.vercel.app/) · [📊 Try the Predictor](https://mobile-addiction-prediction-79cz.vercel.app/) · [🤝 Contributing](CONTRIBUTING.md) · [🐛 Report Bug](../../issues)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [ML Model Details](#-ml-model-details)
- [Input Features](#-input-features)
- [Prediction Output](#-prediction-output)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [How It Works](#-how-it-works)
- [Results & Performance](#-results--performance)
- [Repository Standards](#-repository-standards)
- [Contributing](#-contributing)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🧠 About the Project

**Mobile Addiction Predictor** is an end-to-end Machine Learning project that classifies a user's mobile addiction level as **High**, **Medium**, or **Low** — based on their daily digital behavior patterns.

The project combines a **trained Decision Tree classifier** (scikit-learn) with a **Flask REST API backend**, deployed and served via **Vercel**. Users can adjust interactive sliders in the browser and get instant ML predictions with class probabilities.

> Built as part of a hands-on ML learning journey — from data → model → API → deployment.

---

## 🚀 Live Demo

🔗 **[https://mobile-addiction-prediction-79cz.vercel.app/](https://mobile-addiction-prediction-79cz.vercel.app/)**

1. Adjust the 5 sliders based on your daily habits
2. Click **"Predict Addiction Level"**
3. Get your result with confidence score + class probabilities

---

## ✨ Features

- 🎯 **Real ML Prediction** — Not a fake/random result; actual trained model inference
- 📊 **Class Probabilities** — Shows probability scores for High / Medium / Low addiction
- 🎛️ **Interactive Sliders** — Smooth UI with 5 behavioral feature inputs
- ⚡ **Flask REST API** — Clean backend API endpoint for the prediction logic
- 🌐 **Vercel Deployment** — Serverless deployment, no server management needed
- 📱 **Responsive Design** — Works on both desktop and mobile browsers
- 🔁 **Try Again Button** — Reset and re-predict easily

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **ML Model** | Scikit-learn — Decision Tree Classifier |
| **Backend** | Python, Flask (REST API) |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Deployment** | Vercel (Serverless) |
| **Model Serialization** | Pickle / Joblib |

---

## 🤖 ML Model Details

```
Algorithm     : Decision Tree Classifier
Criterion     : Gini Impurity
Max Depth     : 5
Accuracy      : 82.5%
Classes       : High | Medium | Low
Features Used : 5 behavioral inputs
```

The **Decision Tree** was chosen for its:
- **Interpretability** — Easy to understand which feature drives the prediction
- **Speed** — Fast inference, ideal for real-time web use
- **No feature scaling required** — Works directly on raw slider values

---

## 📥 Input Features

The model takes **5 behavioral features** as input:

| # | Feature | Range | Unit | Description |
|---|---|---|---|---|
| 1 | 🎮 **Gaming Time** | 0 – 12 | hours/day | Daily time spent gaming on mobile |
| 2 | 📱 **Social Media Time** | 0 – 12 | hours/day | Daily time on social media apps |
| 3 | 😴 **Sleep Hours** | 2 – 12 | hours/night | Average sleep per night |
| 4 | 🔓 **Daily Unlocks** | 10 – 400 | count | How many times phone is unlocked per day |
| 5 | 🔔 **Notifications/Day** | 0 – 300 | count | Total notifications received per day |

> **Note:** Sleep Hours is inversely correlated — lower sleep = higher addiction risk.

---

## 📤 Prediction Output

The model returns:

```json
{
  "prediction": "High",
  "confidence": 0.87,
  "probabilities": {
    "High": 0.87,
    "Medium": 0.09,
    "Low": 0.04
  }
}
```

| Field | Description |
|---|---|
| `prediction` | Final predicted class: `High`, `Medium`, or `Low` |
| `confidence` | Probability score of the predicted class (0–1) |
| `probabilities` | Full class probability distribution |

---

## 📁 Project Structure

```
ml-repository001/
│
├── api/
│   └── predict.py          # Flask API — prediction endpoint
│
├── model/
│   ├── train.py            # Model training script
│   ├── decision_tree.pkl   # Serialized trained model
│   └── dataset.csv         # Training dataset
│
├── static/
│   ├── style.css           # Frontend styling
│   └── script.js           # Slider logic + API calls
│
├── templates/
│   └── index.html          # Main UI page
│
├── .gitignore              # Excludes build targets, .env, model binaries
├── CODEOWNERS              # Auto-assigns reviewers per directory
├── CONTRIBUTING.md         # Workflow guidelines and PR expectations
├── LICENSE                 # MIT License
├── vercel.json             # Vercel deployment config
├── requirements.txt        # Python dependencies
└── README.md               # You are here 📍
```

---

## ⚙️ Getting Started

### Prerequisites

```bash
Python 3.8+
pip
```

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ml-repository001.git
cd ml-repository001

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the Flask app
python api/predict.py

# 4. Open browser
# http://localhost:5000
```

### Dependencies (`requirements.txt`)

```
flask
scikit-learn
numpy
pandas
gunicorn
```

> ⚠️ **Never commit `.env` files or API keys.** Use environment variables and ensure `.gitignore` covers all secrets before pushing.

---

## 📡 API Reference

### `POST /api/predict`

Predicts addiction level based on input features.

**Request Body:**

```json
{
  "gaming": 4.5,
  "social_media": 3.0,
  "sleep": 5.5,
  "unlocks": 200,
  "notifications": 150
}
```

**Response:**

```json
{
  "prediction": "High",
  "confidence": 0.84,
  "probabilities": {
    "High": 0.84,
    "Medium": 0.12,
    "Low": 0.04
  }
}
```

**Status Codes:**

| Code | Meaning |
|---|---|
| `200` | Prediction successful |
| `400` | Invalid / missing input data |
| `500` | Internal server error |

---

## 🔍 How It Works

```
User Input (Sliders)
        ↓
JavaScript → Collects 5 feature values
        ↓
POST /api/predict  (JSON payload)
        ↓
Flask API → Loads trained model (.pkl)
        ↓
Decision Tree → model.predict() + predict_proba()
        ↓
JSON Response → prediction + confidence + probabilities
        ↓
Frontend → Displays result with confidence bar
```

The frontend makes an async `fetch()` call to the Flask API, which loads the serialized Decision Tree model and returns the prediction result in real-time.

---

## 📈 Results & Performance

| Metric | Value |
|---|---|
| **Overall Accuracy** | **82.5%** |
| **Algorithm** | Decision Tree |
| **Max Depth** | 5 |
| **Split Criterion** | Gini Impurity |

The model demonstrates solid performance for a behavioral classification task with 5 features. The Gini-based Decision Tree at depth=5 provides a good balance between underfitting and overfitting.

---

## 🛡️ Repository Standards

This repository follows professional GitHub collaboration standards:

### Git Workflow
- **Atomic Commits** — Every commit is focused on a single change (e.g., `Fix prediction endpoint null check`)
- **Descriptive Messages** — Imperative verbs: `Add`, `Fix`, `Update`, `Remove`
- **Feature Branches** — All work happens on dedicated branches; never push directly to `main`
- **Draft PRs** — Open early as Draft to gather feedback before final review
- **Clean Branches** — Feature branches are deleted after merging

### Branch Rulesets (Settings > Rulesets)
| Rule | Purpose |
|---|---|
| Require PRs before merging | Blocks direct pushes to `main` |
| Require status checks | CI must pass before merge |
| Block force pushes | Preserves commit history integrity |
| Require code owner reviews | Auto-tags reviewers via `CODEOWNERS` |
| Require signed commits | Cryptographic verification per author |

### Mandatory Files
| File | Status | Purpose |
|---|---|---|
| `README.md` | ✅ Present | Project overview, setup, API docs |
| `CONTRIBUTING.md` | ✅ Present | PR workflow, code style, branch rules |
| `.gitignore` | ✅ Present | Excludes `.env`, `*.pkl`, `__pycache__` |
| `LICENSE` | ✅ Present | MIT License |

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.

**Quick steps:**
1. Fork this repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feat/your-feature-name`
5. Open a Pull Request — start as **Draft** for early feedback

> See [CONTRIBUTING.md](CONTRIBUTING.md) for full workflow, code style expectations, and PR checklist.

---

## 🔮 Future Improvements

- [ ] 🔄 Add **Random Forest** / **XGBoost** for accuracy comparison
- [ ] 📊 Include **SHAP explainability** — visualize feature importance per prediction
- [ ] 🗃️ Expand dataset with real-world survey data
- [ ] 📱 Build a **mobile app** version (Flutter / React Native)
- [ ] 🧪 Add **unit tests** for the Flask API
- [ ] 🔐 Add **rate limiting** and input validation on the API
- [ ] 📉 Add a **model retraining pipeline** with new data
- [ ] 🤖 Integrate CI/CD pipeline with GitHub Actions

---

## 👨‍💻 Author

Built with 💻 + ☕ as part of an AI & Data Science learning journey.

> *"The best way to learn ML is to build and deploy real projects."*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If this project helped you, give it a star!** ⭐

Made with ❤️ | Deployed on [Vercel](https://mobile-addiction-prediction-79cz.vercel.app/)

</div>
