import requests
import json

BASE_URL = "http://localhost:8000/api"

print("=" * 60)
print("TESTING ELECTRICAL SERVICES PLATFORM API")
print("=" * 60)

# Test 1: Get services list (no auth required)
print("\n1. Testing GET /api/services/")
try:
    response = requests.get(f"{BASE_URL}/services/")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        services = response.json()
        print(f"✓ Successfully retrieved {len(services)} services:")
        for service in services:
            print(f"  - {service['service_name']} (${service['price']}, Rating: {service['rating']}⭐)")
    else:
        print(f"Response: {response.text}")
except Exception as e:
    print(f"✗ Error: {e}")

# Test 2: Get service detail (no auth required)
if response.status_code == 200 and len(services) > 0:
    service_id = services[0]['id']
    print(f"\n2. Testing GET /api/service/{service_id}/")
    try:
        response = requests.get(f"{BASE_URL}/service/{service_id}/")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            service = response.json()
            print(f"✓ Successfully retrieved service details:")
            print(f"  Name: {service['service_name']}")
            print(f"  Description: {service['description'][:100]}...")
            print(f"  Price: ${service['price']}")
            print(f"  Duration: {service['duration_of_service']}")
            print(f"  Expert: {service['name_of_the_expert']}")
        else:
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"✗ Error: {e}")

# Test 3: Get token
print("\n3. Testing POST /api/token/ (Login)")
try:
    response = requests.post(f"{BASE_URL}/token/", json={
        "username": "admin",
        "password": "admin123"
    })
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        tokens = response.json()
        print(f"✓ Successfully obtained tokens")
        print(f"  Access Token: {tokens['access'][:50]}...")
        access_token = tokens['access']
    else:
        print(f"Response: {response.text}")
        access_token = None
except Exception as e:
    print(f"✗ Error: {e}")
    access_token = None

# Test 4: Get users list (with auth)
if access_token:
    print("\n4. Testing GET /api/users/ (with authentication)")
    headers = {"Authorization": f"Bearer {access_token}"}
    try:
        response = requests.get(f"{BASE_URL}/users/", headers=headers)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            users = response.json()
            print(f"✓ Successfully retrieved {len(users)} users")
        else:
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"✗ Error: {e}")

    # Test 5: Get profile
    print("\n5. Testing GET /api/users/profile/ (with authentication)")
    try:
        response = requests.get(f"{BASE_URL}/users/profile/", headers=headers)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            profile = response.json()
            print(f"✓ Successfully retrieved profile")
            print(f"  Name: {profile['first_name']} {profile['last_name']}")
            print(f"  Email: {profile['email']}")
        else:
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"✗ Error: {e}")

print("\n" + "=" * 60)
print("API TESTING COMPLETE")
print("=" * 60)
