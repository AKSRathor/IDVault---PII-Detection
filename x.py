import pandas as pd
import random
import string

# Function to generate random names
def random_name():
    first_names = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Laura', 'Chris', 'Jessica']
    last_names = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin']
    return f"{random.choice(first_names)} {random.choice(last_names)}"

# Function to generate random phone numbers
def random_phone_number():
    return f"+1-{random.randint(100,999)}-{random.randint(100,999)}-{random.randint(1000,9999)}"

# Function to generate random email addresses
def random_email(name):
    domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com']
    name_part = name.replace(' ', '.').lower()
    return f"{name_part}@{random.choice(domains)}"

# Function to generate random addresses
def random_address():
    streets = ['Main St', 'High St', 'Oak St', 'Maple Ave', 'Pine Dr', 'Elm St', 'Cedar Ln']
    return f"{random.randint(100,9999)} {random.choice(streets)}, {random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'])}, USA"

# Function to generate random SSNs
def random_ssn():
    return f"{random.randint(100,999)}-{random.randint(10,99)}-{random.randint(1000,9999)}"

# Generate a dataframe with PII data
data = {
    'Name': [random_name() for _ in range(10)],
    'Phone Number': [random_phone_number() for _ in range(10)],
    'Email': [random_email(random_name()) for _ in range(10)],
    'Address': [random_address() for _ in range(10)],
    'SSN': [random_ssn() for _ in range(10)],
}

df = pd.DataFrame(data)

# Saving the dataframe to a CSV file
csv_file_path = 'pii_detection_data.csv'
df.to_csv(csv_file_path, index=False)

csv_file_path