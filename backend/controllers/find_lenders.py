import sys
import json
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

borrower_request = json.loads(sys.stdin.read())

lenders_data = pd.DataFrame({
    'Lender_ID': [1, 2, 3, 4, 5],
    'Min_Loan': [5000, 10000, 2000, 15000, 8000],
    'Max_Loan': [7000, 12000, 3000, 16000, 9000],
    'Interest_Rate': [8.5, 7.0, 9.0, 6.5, 7.5],
    'Credit_Score_Required': [650, 700, 600, 750, 680]
})

def normalize(df):
    min_vals = df.min()
    max_vals = df.max()
    return (df - min_vals) / (max_vals - min_vals).replace(0, 1)

features = lenders_data[['Min_Loan', 'Max_Loan', 'Interest_Rate', 'Credit_Score_Required']]
normalized_lenders = normalize(features)

borrower_input = pd.DataFrame([[
    float(borrower_request.get('loanAmount', 0)),
    float(borrower_request.get('loanAmount', 0)),  # Assuming Min_Loan = Max_Loan
    float(borrower_request.get('interestRate', 0)),
    float(borrower_request.get('creditScore', 0))
]], columns=['Min_Loan', 'Max_Loan', 'Interest_Rate', 'Credit_Score_Required'])

normalized_borrower = normalize(borrower_input)

if normalized_borrower.isnull().values.any():
    print(json.dumps({"error": "Borrower input contains NaN values"}))
    sys.exit(1)

knn = NearestNeighbors(n_neighbors=3, metric='euclidean')
knn.fit(normalized_lenders)

distances, indices = knn.kneighbors(normalized_borrower)
best_lenders = lenders_data.iloc[indices[0]]

response_json = best_lenders.to_json(orient='records', indent=4)  # Add indentation for readability
print(response_json)
