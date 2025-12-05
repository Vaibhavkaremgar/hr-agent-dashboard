# Railway Deployment Fix

## CRITICAL: Database Persistence Issue

Railway uses **ephemeral storage** - your database resets on every deploy!

### Solution: Add Persistent Volume

1. **Go to Railway Dashboard**
2. **Select your backend service**
3. **Click "Variables" tab**
4. **Add Volume:**
   - Click "New Variable"
   - Select "Add Volume"
   - Mount Path: `/app/server/data`
   - This will persist your SQLite database

### Environment Variables to Set

```
NODE_ENV=production
PORT=5000
DB_PATH=./data/hirehero.db
FRONTEND_URL=https://automations-frontend-production-01fd.up.railway.app
JWT_SECRET=af36f5a0060d60295b1a6cbce9ef88a734d07caa0d3db9107bb6d07e83094e505cfab3cf85385bcb340d33d31cbac2d7653b762935f55af4a7012ad7931c1e9f
ENABLE_IP_RESTRICTIONS=false
ENABLE_SESSION_LIMITS=false
BYPASS_IP_FOR_LOCALHOST=true

# Copy all other vars from server/.env
```

### After Volume is Added

The database will persist across deployments. Users created will stay.

## Deploy Commands

```bash
git add .
git commit -m "Fix token persistence and add Railway config"
git push
```

## Login Credentials (After Deploy)

- **Admin:** vaibhavkar0009@gmail.com / Vaibhav@121
- **KMG:** kvreddy1809@gmail.com / kmg123
- **Joban:** jobanputra@gmail.com / joban123

## Verify Deployment

1. Check Railway logs for:
   - ✅ Admin user created
   - ✅ KMG Insurance created
   - ✅ Joban Putra Insurance Shoppe created

2. Login as admin
3. Go to "Clients" - you should see KMG and Joban
4. Refresh page - you should stay logged in
