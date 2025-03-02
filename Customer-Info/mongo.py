from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Change URI if using Atlas
db = client["customerInfo"]  # ✅ Use correct case
collection = db["customers"]

# Sample data
sample_data = [
    { "name": "Alice", "email": "alice@example.com", "bank": "Chase", "AccountType": "Student", "CurrCountry": "USA", "VisitCountry": "Canada" },
    { "name": "Bob", "email": "bob@example.com", "bank": "Wells Fargo", "AccountType": "Business", "CurrCountry": "USA", "VisitCountry": "Mexico" },
    { "name": "Charlie", "email": "charlie@example.com", "bank": "Bank of America", "AccountType": "Savings", "CurrCountry": "UK", "VisitCountry": "France" }
]

# Insert into MongoDB
collection.insert_many(sample_data)

print("✅ Sample data inserted successfully!")

