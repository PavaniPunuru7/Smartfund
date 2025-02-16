import sys
import json
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN

def check_anomaly(loan_amount, interest_rate, credit_score):
    input_data = np.array([[loan_amount, interest_rate, credit_score]])

    dataset = np.array([
        [5000, 8.5, 800],
        [6000, 7.0, 750],
        [7000, 9.0, 720],
        [4500, 6.5, 680],
        [5500, 7.5, 730],
        [8000, 8.0, 690],
        [10000, 9.5, 650],
        [6000, 7.2, 740],
        [5500, 6.8, 710],
        [6500, 8.3, 730],
        [5500, 7.1, 700],
        [7500, 8.2, 710]
    ])

    # Use the same StandardScaler instance for both dataset and input data
    scaler = StandardScaler()
    dataset_scaled = scaler.fit_transform(dataset)
    input_data_scaled = scaler.transform(input_data)  # Transform using the same scaler

    # Apply DBSCAN
    dbscan = DBSCAN(eps=0.8, min_samples=2)
    dbscan.fit(dataset_scaled)

    # Combine dataset with input data
    all_data = np.vstack([dataset_scaled, input_data_scaled])
    labels = dbscan.fit_predict(all_data)

    # Get the label for the input data (last row)
    cluster_label = labels[-1]

    if cluster_label == -1:
        return "The borrower's application is flagged as an anomaly (fraudulent)."
    else:
        return "The borrower's application is normal."

if __name__ == "__main__":
    # Read borrower data from stdin (received from `server.js`)
    borrower_data = json.loads(sys.stdin.read())

    # Extract values
    loan_amount = borrower_data["loanAmount"]
    interest_rate = borrower_data["interestRate"]
    credit_score = borrower_data["creditScore"]

    # Perform fraud check
    result = check_anomaly(loan_amount, interest_rate, credit_score)

    # Print result for Node.js to read
    print(result)
