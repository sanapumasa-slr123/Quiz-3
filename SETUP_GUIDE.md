# Electrical Services Platform - Setup & Quick Start Guide

## Project Status: FULLY OPERATIONAL

Both frontend and backend servers are currently running and fully functional!

## Services Available

The platform currently features **3 professional services**:

1. **WiFi Installation** - $200.00
   - Professional WiFi network setup and optimization
   - Rating: 4.9

2. **CCTV Installation** - $350.00  
   - Complete surveillance system setup
   - Rating: 4.8

3. **Light Installation** - $150.00
   - Professional lighting fixture installation
   - Rating: 4.7

## Running Servers

### Frontend
- **URL**: http://localhost:5173
- **Status**: Running (Vite dev server)
- **Port**: 5173

### Backend
- **URL**: http://localhost:8000
- **Admin**: http://localhost:8000/admin
- **API**: http://localhost:8000/api
- **Status**: Running (Django dev server)
- **Port**: 8000

## Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@electrical.com`

### Test User
You can use the admin credentials to log in to the Django admin panel at: `http://localhost:8000/admin`

## API Endpoints

All endpoints are fully functional and tested:

### Services (Public - No Auth Required)
```
GET /api/services/          # List all services
GET /api/service/{id}/      # Get service details
```

### Authentication
```
POST /api/token/            # Get access and refresh tokens
POST /api/token/refresh/    # Refresh access token
```

### Users (Requires Authentication)
```
GET /api/users/             # List all users
GET /api/users/profile/     # Get current user profile
```

## API Test Results

```
✓ Successfully retrieved 3 services
✓ Successfully retrieved service details
✓ Successfully obtained authentication tokens
✓ Successfully retrieved user list
✓ Successfully retrieved user profile
```

## Project Structure

```
Quiz3/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Redux store
│   │   ├── services/            # API service
│   │   ├── App.jsx              # Main app
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/                     # Django REST API
│   ├── services_project/        # Django settings
│   ├── services_app/            # App logic
│   │   ├── models.py            # Database models
│   │   ├── views.py             # API views
│   │   ├── serializers.py       # Serializers
│   │   └── urls.py              # URL routing
│   ├── manage.py
│   ├── requirements.txt
│   ├── init_db.py               # Database initialization
│   └── db.sqlite3               # Database
│
├── README.md                    # Full documentation
├── test_api.py                  # API test script
└── SETUP_GUIDE.md               # This file
```

## Frontend Features

### Pages Available
1. **Home Page** - Browse all services in card layout
2. **Detail Page** - View full service information
3. **Users Page** - List all platform users
4. **Profile Page** - View user profile

### Components
- Header with navigation
- Footer
- Service Cards (responsive)
- User Cards (reusable)
- Loading spinner
- Error messages
- Redux state management

## Backend Features

### Django Models
- **User** - Django built-in user model
- **Expert** - Expert profile linked to user
- **ElectricalService** - Service details (WiFi, CCTV, Light Installation)

### API Features
- JWT authentication
- Permission-based access control
- CORS enabled
- Serialization/Deserialization
- Error handling

## How to Use the Platform

### 1. View Services (No Login Required)
- Visit: http://localhost:5173
- Browse available services
- Click on any service to view details

### 2. Access Admin Panel
- Visit: http://localhost:8000/admin
- Use credentials: `admin` / `admin123`
- Manage services, users, and content

### 3. Test API Endpoints
- Run: `python test_api.py`
- See all endpoints working with real data

## Troubleshooting

### Issue: "Connection Refused" in Frontend
**Solution**: Ensure backend is running on port 8000
```bash
cd backend
python manage.py runserver
```

### Issue: Database errors
**Solution**: Reset database
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python init_db.py
```

### Issue: Port already in use
**Solution**: Kill the process using the port or use a different port
```bash
# For port 8000
python manage.py runserver 8001

# For port 5173
npm run dev -- --port 5174
```

## Dependencies

### Frontend
- React 18.2
- React Router DOM
- Redux Toolkit
- Axios
- Vite

### Backend
- Django 4.2
- Django REST Framework
- Django CORS Headers
- Django Simple JWT

## Quick Commands

### Start Frontend
```bash
cd frontend
npm install  # If needed
npm run dev
```

### Start Backend
```bash
cd backend
python manage.py runserver
```

### Test API
```bash
python test_api.py
```

### Reset Database
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python init_db.py
```

## Features Summary

| Feature | Status |
|---------|--------|
| Service Listing | Enabled |
| Service Details | Enabled |
| User Management | Enabled |
| JWT Authentication | Enabled |
| CORS Configuration | Enabled |
| Redux State Management | Enabled |
| Responsive Design | Enabled |
| Admin Interface | Enabled |
| API Testing | Enabled |
| Error Handling | Enabled |

## Support

For issues or questions:
1. Check the main README.md file
2. Review the test_api.py script for API examples
3. Check backend logs in Django terminal
4. Check browser console for frontend errors

## You're All Set!

Your Electrical Services Platform is ready to use!

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **Admin**: http://localhost:8000/admin

Happy coding!
