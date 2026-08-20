# Mobile Addiction Prediction

A machine learning web application that predicts a user's mobile addiction level as High, Medium, or Low based on daily mobile usage behavior.

## Live Demo

[Open the Mobile Addiction Predictor](https://mobile-addiction-prediction-79cz.vercel.app/)

The deployed application provides an interactive interface for entering behavioral features and receiving a prediction with class probabilities.

## About the Project

Mobile Addiction Prediction is an end-to-end machine learning project that combines a Decision Tree classifier with a Flask REST API and a browser-based frontend.

The project demonstrates a complete workflow:

- Data preparation
- Machine learning model training
- Model evaluation
- Flask API integration
- Interactive frontend
- Vercel deployment

## Features

- Mobile addiction classification into High, Medium, or Low
- Interactive behavioral inputs
- Prediction confidence and class probabilities
- Decision Tree based inference
- Flask REST API
- Responsive web interface
- Vercel deployment

## Tech Stack

| Layer | Technology |
|---|---|
| Machine Learning | Scikit-learn |
| Model | Decision Tree Classifier |
| Backend | Python, Flask |
| Frontend | HTML5, CSS3, JavaScript |
| Data Processing | Pandas, NumPy |
| Deployment | Vercel |

## Machine Learning Model

The current model is a `DecisionTreeClassifier`.

```text
Algorithm          : Decision Tree Classifier
Criterion          : Gini Impurity
Maximum Depth      : 5
Classes            : High, Medium, Low
Features           : 5 behavioral inputs
```

The model is designed to provide interpretable predictions while keeping inference lightweight for a web application.

## Input Features

The predictor uses five behavioral features:

| Feature | Description |
|---|---|
| Gaming Time | Daily time spent gaming on mobile |
| Social Media Time | Daily time spent on social media applications |
| Sleep Hours | Average daily sleep duration |
| Daily Unlocks | Number of phone unlocks per day |
| Notifications per Day | Number of notifications received per day |

## Prediction Output

The API returns the predicted addiction level together with confidence and class probabilities.

Example:

```json
{
  "prediction": "High",
  "confidence": 87.0,
  "probabilities": {
    "High": 87.0,
    "Medium": 9.0,
    "Low": 4.0
  }
}
```

## Project Structure

```text
mobile-addiction-prediction/
├── app.py
├── mobile_addiction_clean.csv
├── requirements.txt
├── static/
├── templates/
├── .gitignore
├── CODEOWNERS
├── CONTRIBUTING.md
├── LICENSE
├── vercel.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8+
- pip
- Git

### Installation

```bash
git clone https://github.com/PRAKASH43E38/mobile-addiction-prediction.git
cd mobile-addiction-prediction
pip install -r requirements.txt
```

### Run Locally

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## API Reference

### `POST /predict`

Predicts the user's mobile addiction level.

Example request:

```json
{
  "gaming_time_hr": 4.5,
  "social_media_time_hr": 3.0,
  "sleep_hours": 5.5,
  "daily_unlocks": 200,
  "notifications_per_day": 150
}
```

Example response:

```json
{
  "prediction": "High",
  "confidence": 84.0,
  "probabilities": {
    "High": 84.0,
    "Medium": 12.0,
    "Low": 4.0
  }
}
```

### `GET /model-info`

Returns information about the model, accuracy, input features, and prediction classes.

## Results

The project currently reports an accuracy of approximately 82.5% on its test split.

> Model performance depends on the dataset, train/test split, and feature distribution. The reported accuracy should not be interpreted as a clinical or diagnostic measure.

## Security and Repository Standards

This repository follows the project's GitHub collaboration standards.

### Git Workflow

- Use atomic commits focused on one change.
- Use descriptive imperative commit messages.
- Never push directly to `main`.
- Create a unique feature branch for each change.
- Open a Draft Pull Request early when feedback is useful.
- Delete the remote feature branch after merging.
- Never commit API keys, credentials, or `.env` files.
- Use environment variables for secrets.

### Branch Rulesets

The repository should enforce the following rules under GitHub repository settings:

- Require pull requests before merging.
- Require successful status checks before merging.
- Block force pushes.
- Require Code Owner reviews.
- Require signed commits.

These protections are repository settings and must be enabled under:

`Settings → Rules → Rulesets → New branch ruleset`

### Mandatory Repository Files

The repository includes the following files:

| File | Purpose |
|---|---|
| `README.md` | Project documentation and setup instructions |
| `CONTRIBUTING.md` | Contribution and Git workflow guidelines |
| `.gitignore` | Excludes dependencies, build artifacts, OS files, and secrets |
| `LICENSE` | Defines the project's licensing terms |
| `CODEOWNERS` | Defines ownership and review responsibilities |

## Contributing

Contributions should follow the repository workflow.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feat/your-feature-name
```

3. Make one focused change.
4. Commit using a descriptive imperative message.

```bash
git commit -m "Add feature description"
```

5. Push the feature branch.

```bash
git push origin feat/your-feature-name
```

6. Open a Draft Pull Request for early feedback.
7. Convert it to a ready-for-review Pull Request when the work is complete.
8. Merge only after required checks and reviews pass.
9. Delete the remote feature branch after merging.

## Security

Do not commit:

- API keys
- Passwords
- Access tokens
- `.env` files
- Private credentials
- Other sensitive configuration

Use environment variables and keep secrets excluded through `.gitignore`.

## Future Improvements

- Compare Decision Tree with Random Forest and XGBoost.
- Add model explainability.
- Expand the dataset with additional validated data.
- Add automated API tests.
- Improve input validation and rate limiting.
- Add automated model retraining.
- Add CI/CD checks with GitHub Actions.

## License

This project is distributed under the license included in the repository's `LICENSE` file.

## Author

Prakash R

B.Tech Artificial Intelligence & Data Science
