from flask import Flask, render_template, request, session, jsonify, redirect, url_for
import mysql.connector
import numpy as np
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
import pandas_ta as pta
import os
from tensorflow.keras.models import load_model

app = Flask(__name__)
app.secret_key = "6EWd-5ePyAt7ZuOGMI9TD1ioVWAujAwu"

# Connect to MySQL database
db = mysql.connector.connect(user='root', password='Suhas@2324', database='bitcoin_prediction', port=3306)
cursor = db.cursor()
csv_file_path = os.path.join('DATASET', 'Bitcoin History.csv')
# Load dataset
df = pd.read_csv(csv_file_path)

# Load machine learning model
model_path = os.path.join('models', 'bitcoin_lstm_model.h5')
model = load_model(model_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/signup')
def signup():
    # Your login logic here
    return render_template('signup.html')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()
        if user:
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            error = "Invalid username or password. Please try again."
            return render_template('index.html', error=error)

# @app.route('/dashboard')
# def dashboard():
#     if 'username' in session:
#         username = session['username']
#         return render_template('dashboard.html', username=username)
#     else:
#         return redirect(url_for('index'))
    
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/prediction')
def prediction():
    # Your prediction logic here
    return render_template('prediction.html')


if __name__ == '__main__':
    app.run(debug=True)