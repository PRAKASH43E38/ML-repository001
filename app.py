from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# ── TRAIN MODEL ON STARTUP ─────────────────────────────────────
df = pd.read_csv('mobile_addiction_clean.csv')

X = df.drop('addiction_level', axis=1)
y = df['addiction_level']

le    = LabelEncoder()
y_enc = le.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(
    X, y_enc, test_size=0.2, random_state=42, stratify=y_enc
)

model = DecisionTreeClassifier(
    max_depth=5,
    criterion='gini',
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
model.fit(X_train, y_train)

acc = accuracy_score(y_test, model.predict(X_test))
print(f"✅ Model trained | Accuracy: {acc*100:.2f}% | Classes: {le.classes_.tolist()}")

FEATURES = [
    'gaming_time_hr',
    'social_media_time_hr',
    'sleep_hours',
    'daily_unlocks',
    'notifications_per_day'
]

# ── ROUTES ────────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        for col in FEATURES:
            if col not in data:
                return jsonify({'error': f'Missing field: {col}'}), 400

        inp = pd.DataFrame([{
            'gaming_time_hr':        float(data['gaming_time_hr']),
            'social_media_time_hr':  float(data['social_media_time_hr']),
            'sleep_hours':           float(data['sleep_hours']),
            'daily_unlocks':         int(data['daily_unlocks']),
            'notifications_per_day': int(data['notifications_per_day'])
        }])

        pred_enc   = model.predict(inp)[0]
        pred_proba = model.predict_proba(inp)[0]
        prediction = le.inverse_transform([pred_enc])[0]

        classes    = le.classes_.tolist()
        prob_dict  = {cls: round(float(p) * 100, 1)
                      for cls, p in zip(classes, pred_proba)}

        return jsonify({
            'prediction':    prediction,
            'confidence':    round(float(pred_proba.max()) * 100, 1),
            'probabilities': prob_dict
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/model-info')
def model_info():
    return jsonify({
        'model':    'DecisionTreeClassifier',
        'accuracy': f'{acc*100:.2f}%',
        'features': FEATURES,
        'classes':  le.classes_.tolist()
    })


if __name__ == '__main__':
    print("\n🚀 Server started at http://127.0.0.1:5000\n")
    app.run(debug=True, port=5000)
