# Electrical Services Platform

A comprehensive platform for discovering and booking professional electrical installation and maintenance services. Built with React + Vite for the frontend and Django REST Framework for the backend.

### Featured Services:
- **WiFi Installation** - Professional WiFi network setup and optimization
- **CCTV Installation** - Complete surveillance system setup
- **Light Installation** - Professional lighting fixture installation

## 📋 Project Structure

```
Quiz3/
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable components (Header, Footer, Cards, etc.)
│   │   ├── pages/         # Page components (Home, Detail, Users, Profile)
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API service
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.sample
│
└── backend/               # Django REST API
    ├── services_project/  # Django project settings
    ├── services_app/      # Django app
    │   ├── models.py      # Database models
    │   ├── serializers.py # DRF serializers
    │   ├── views.py       # API viewsets
    │   ├── urls.py        # URL routing
    │   └── permissions.py # Custom permissions
    ├── manage.py
    ├── requirements.txt
    └── .env.sample
```

## 🎯 Features

### Frontend
- **Home Page (ListView)**: Display all available electrical services in a card-based grid layout
- **Detail Page (DetailView)**: Show comprehensive service information including expert details and pricing
- **Users Page**: List all platform users and experts
- **Profile Page**: View current user's profile information
- **Redux State Management**: Centralized state management for services and users
- **Responsive Design**: Fully responsive on web and mobile devices
- **Loading & Error States**: Proper handling of async operations
- **Reusable Components**: Header, Footer, ServiceCard, UserCard, Loader, Message
- **JWT Authentication**: Token-based authentication support

### Backend
- **Service Listing**: Retrieve all services (authenticated users only)
- **Service Details**: Get detailed information about a specific service
- **User Listing**: View all platform users (superuser + authenticated only)
- **User Profile**: Get current user's profile information
- **JWT Authentication**: Token-based authentication system
- **Permission Classes**: Role-based access control
- **CORS Support**: Configured for frontend-backend communication
- **Admin Panel**: Django admin interface for data management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- npm or yarn (for frontend)
- pip (for backend)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**:
   ```bash
   cp .env.sample .env
   ```

6. **Run migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser for admin access**:
   ```bash
   python manage.py createsuperuser
   ```

8. **Load sample data (optional)**:
   ```bash
   python manage.py shell
   ```
   Then in the shell:
   ```python
   from django.contrib.auth.models import User
   from services_app.models import ElectricalService, Expert

   # Create a superuser if not already created
   admin = User.objects.get(username='admin')

   # Create an expert
   expert = Expert.objects.create(user=admin, bio="Professional electrician with 10+ years experience")

   # Add sample services
   services = [
       {
           "service_name": "Electrical Wiring Installation",
           "description": "Professional installation of electrical wiring systems in residential and commercial buildings. Includes proper grounding, circuit breaker installation, and safety compliance.",
           "category": "installation",
           "price": 150.00,
           "duration_of_service": "2-4 hours",
           "rating": 4.8,
           "name_of_the_expert": "John Smith",
           "sample_image": "https://via.placeholder.com/300x200?text=Wiring+Installation"
       },
       {
           "service_name": "Electrical Panel Repair",
           "description": "Expert repair and maintenance of electrical panels. Troubleshooting faulty circuits, replacing damaged components, and ensuring optimal performance.",
           "category": "repair",
           "price": 200.00,
           "duration_of_service": "1-2 hours",
           "rating": 4.9,
           "name_of_the_expert": "Jane Doe",
           "sample_image": "https://via.placeholder.com/300x200?text=Panel+Repair"
       },
       # Add more services as needed
   ]

   for service_data in services:
       ElectricalService.objects.create(**service_data)

   exit()
   ```

9. **Start the Django development server**:
   ```bash
   python manage.py runserver
   ```
   Backend will run at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.sample .env
   ```
   Update `.env` if your backend URL is different.

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Frontend will run at `http://localhost:5173`

## 🔐 Authentication

The platform uses JWT (JSON Web Token) authentication:

1. **Get Authentication Token**:
   - Send POST request to `/api/token/` with username and password
   - Receive access token and refresh token

2. **Using the Token**:
   - Include token in Authorization header: `Authorization: Bearer <token>`
   - Token is automatically added by the frontend API service

3. **Token Refresh**:
   - Access tokens expire after 60 minutes
   - Use refresh token to get a new access token
   - Send POST request to `/api/token/refresh/` with refresh token

## 📡 API Endpoints

### Services
- `GET /api/services/` - List all services (authenticated)
- `GET /api/service/<id>/` - Get service details (authenticated)

### Users
- `GET /api/users/` - List all users (superuser + authenticated)
- `GET /api/users/profile/` - Get current user's profile (authenticated)

### Authentication
- `POST /api/token/` - Obtain access and refresh tokens
- `POST /api/token/refresh/` - Refresh access token

## 🎨 Components Overview

### Frontend Components

**Reusable Components**:
- `Header`: Navigation bar with logo and links
- `Footer`: Footer with contact information
- `ServiceCard`: Card component for displaying service preview
- `UserCard`: Card component for displaying user information
- `Loader`: Loading spinner
- `Message`: Alert/notification component

**Pages**:
- `HomePage`: Services list view
- `DetailPage`: Service detail view
- `UserListPage`: Users list view
- `ProfilePage`: Current user profile view

### Redux Store Structure

```javascript
{
  services: {
    services: [],      // Array of service objects
    serviceDetail: {}, // Selected service details
    loading: false,    // Loading state
    error: null        // Error message if any
  },
  users: {
    users: [],         // Array of user objects
    profile: {},       // Current user profile
    loading: false,    // Loading state
    error: null        // Error message if any
  }
}
```

## 🌐 Responsive Design

The platform is fully responsive across devices:

- **Desktop**: Multi-column grid layout with optimized spacing
- **Tablet**: 2-column grid layout with adjusted font sizes
- **Mobile**: Single column layout with touch-friendly buttons

Media breakpoints:
- `768px`: Tablet and below adjustments

## 🔒 Permission System

### Backend Permissions

1. **Service Listing**: Requires authentication
2. **Service Detail**: Requires authentication
3. **User Listing**: Requires authentication + superuser role
4. **User Profile**: Requires authentication

### Role-Based Access

- **Regular User**: Can view services, their profile, and user list (if superuser)
- **Superuser**: Can view all services, all users, and manage content through admin

## 📝 Data Models

### User (Django built-in)
- `id`: Unique identifier
- `first_name`: User's first name
- `last_name`: User's last name
- `email`: User's email
- `username`: Unique username

### Expert
- `id`: Unique identifier
- `user`: Reference to User model
- `bio`: Professional biography
- `created_at`: Creation timestamp

### ElectricalService
- `id`: Unique identifier
- `service_name`: Name of the service
- `description`: Detailed description
- `category`: Service category (installation, maintenance, repair)
- `price`: Service price
- `duration_of_service`: Expected duration
- `rating`: Service rating (1-5)
- `sample_image`: Image URL
- `name_of_the_expert`: Expert's name
- `expert`: Reference to Expert model (optional)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## 🛠️ Development

### Adding New Services

Use Django admin:
1. Navigate to `http://localhost:8000/admin`
2. Log in with superuser credentials
3. Add new services to "Electrical Services"

### Customizing Services

Edit service data in `services_app/models.py` and create migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, ensure:
- Backend is running on `http://localhost:8000`
- Frontend is running on `http://localhost:5173`
- CORS settings in `services_project/settings.py` are correct

### Authentication Errors
- Clear localStorage: `localStorage.clear()`
- Get new token from `/api/token/`
- Ensure token is valid and not expired

### Database Errors
- Delete `db.sqlite3` and run migrations again
- Restart Django development server

## 📦 Production Deployment

### Frontend
```bash
npm run build
# Upload dist/ folder to hosting service
```

### Backend
1. Set `DEBUG = False` in settings.py
2. Configure allowed hosts
3. Set up proper database (PostgreSQL recommended)
4. Use gunicorn or similar WSGI server
5. Configure static files and media serving

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Django Documentation](https://docs.djangoproject.com)
- [Django REST Framework](https://www.django-rest-framework.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [JWT Authentication](https://tools.ietf.org/html/rfc7519)

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a comprehensive quiz project demonstrating:
- Full-stack development with React and Django
- RESTful API design
- State management with Redux
- Responsive UI/UX design
- Authentication and authorization
- Component-based architecture
- Professional code organization
