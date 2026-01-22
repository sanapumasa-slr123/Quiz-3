import requests
import json

try:
    response = requests.get('http://localhost:8000/api/services/', timeout=5)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✓ Services loaded: {len(data)} services")
        for service in data:
            print(f"  - {service['service_name']}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Connection error: {e}")
