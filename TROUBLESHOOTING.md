# 🔧 Troubleshooting Guide - WiFi, CCTV & Light Services Platform

##  Common Issues & Solutions

### 1. Frontend Not Loading Services

**Symptoms:**
- Page shows "No services available"
- Loader keeps spinning
- Network tab shows failed API requests

**Solutions:**

a) **Clear Browser Cache**
   - Press `Ctrl + Shift + Delete` (Windows)
   - Clear all cache
   - Reload page

b) **Check Backend is Running**
   ```bash
   # Should return 3 services
   curl http://localhost:8000/api/services/
   ```

c) **Check CORS Settings**
   - Backend CORS should allow `http://localhost:5173`
   - Edit `backend/services_project/settings.py` if needed

d) **Restart Frontend Server**
   ```bash
   cd frontend
   npm run dev
   ```

---

### 2. Backend API Not Responding

**Symptoms:**
- Error: "Connection refused"
- Admin panel not accessible
- API returns 500 error

**Solutions:**

a) **Check Backend is Running**
   ```bash
   cd backend
   python manage.py runserver
   ```

b) **Reset Database**
   ```bash
   cd backend
   rm db.sqlite3
   python manage.py migrate
   python init_db.py
   ```

c) **Check for Syntax Errors**
   ```bash
   python manage.py check
   ```

d) **Clear Python Cache**
   ```bash
   find . -type d -name __pycache__ -exec rm -r {} +
   ```

---

### 3. Services Not Showing Correct Data

**Symptoms:**
- Wrong service names
- Missing expert names
- Incorrect prices

**Solutions:**

a) **Verify Database Content**
   ```bash
   cd backend
   python manage.py shell
   >>> from services_app.models import ElectricalService
   >>> for s in ElectricalService.objects.all():
   ...     print(s.service_name, s.price)
   >>> exit()
   ```

b) **Reinitialize Database**
   ```bash
   cd backend
   python init_db.py
   ```

c) **Check Admin Panel**
   - Go to http://localhost:8000/admin
   - Login with admin/admin123
   - Verify services in "Electrical Services"

---

### 4. Authentication Issues

**Symptoms:**
- "Unauthorized" error
- Can't access profile or users page
- Token not being stored

**Solutions:**

a) **Get New Token**
   ```bash
   curl -X POST http://localhost:8000/api/token/ \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

b) **Clear localStorage**
   - Open browser DevTools (F12)
   - Console tab: `localStorage.clear()`
   - Reload page

c) **Check Token Expiry**
   - Token expires after 60 minutes
   - Need to refresh or login again

---

### 5. Port Already in Use

**Symptoms:**
- "Address already in use" error
- Can't start server on port 5173 or 8000

**Solutions:**

a) **Find Process Using Port**
   ```bash
   # Windows
   netstat -ano | findstr :5173
   netstat -ano | findstr :8000
   
   # Kill process
   taskkill /PID <PID> /F
   ```

b) **Use Different Port**
   ```bash
   # Frontend (change port in vite.config.js)
   # Backend
   python manage.py runserver 8001
   ```

---

### 6. Package Installation Issues

**Symptoms:**
- Module not found errors
- Import errors
- npm install fails

**Solutions:**

a) **Reinstall Frontend**
   ```bash
   cd frontend
   rm -r node_modules package-lock.json
   npm install
   ```

b) **Reinstall Backend**
   ```bash
   cd backend
   pip install -r requirements.txt --force-reinstall
   ```

---

##  Verification Checklist

### Frontend
- [ ] Page loads at http://localhost:5173
- [ ] Services visible on home page
- [ ] Can click on service cards
- [ ] Detail page shows service information
- [ ] Users page loads
- [ ] Profile page loads
- [ ] Header navigation works
- [ ] No console errors (F12)

### Backend
- [ ] Server running on http://localhost:8000
- [ ] Admin panel accessible
- [ ] API endpoints responding
- [ ] Services in database
- [ ] Database migrations complete

### Services
- [ ] ✅ WiFi Installation - $200
- [ ] ✅ CCTV Installation - $350
- [ ] ✅ Light Installation - $150

---

##  Debugging Tips

### Browser Console (F12)
1. Network tab - check API calls
2. Console tab - check for JS errors
3. Application tab - check localStorage

### Backend Terminal
- Watch for error messages
- Check SQL query execution
- Monitor performance

### Quick API Test
```bash
# Services list
curl http://localhost:8000/api/services/

# Get token
curl -X POST http://localhost:8000/api/token/ \
  -d "username=admin&password=admin123"

# Get profile (with token)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:8000/api/users/profile/
```

---

##  System Requirements

- **Frontend**: Node.js 16+, npm/yarn
- **Backend**: Python 3.8+, pip
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Ports**: 5173 (frontend), 8000 (backend)
- **RAM**: 1GB minimum
- **Disk**: 500MB minimum

---

##  Performance Tips

1. **Clear cache regularly** for development
2. **Use DevTools** to monitor network requests
3. **Restart servers** if experiencing slowness
4. **Monitor database size** over time
5. **Check terminal for warnings/errors**

---

##  Everything Working?

If all checks pass, your platform is fully operational! 

 **Enjoy your WiFi, CCTV & Light Services Platform!**

For more help, check the main README.md file.
