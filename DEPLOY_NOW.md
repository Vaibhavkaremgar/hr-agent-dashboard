# Quick Deploy Guide

## Step 1: Push Code to Git
```bash
git add .
git commit -m "Fix auth and seed users"
git push
```

## Step 2: Railway Environment Variables

Go to Railway Dashboard → Your Backend Service → Variables

Add/Update these:
```
ENABLE_IP_RESTRICTIONS=false
ENABLE_SESSION_LIMITS=false
BYPASS_IP_FOR_LOCALHOST=true
```

## Step 3: Redeploy

Railway will auto-deploy after git push. Wait 2-3 minutes.

## Step 4: Login Credentials

### Admin
- Email: `vaibhavkar0009@gmail.com`
- Password: `Vaibhav@121`

### KMG Insurance
- Email: `kvreddy1809@gmail.com`
- Password: `kmg123`

### Joban Putra Insurance
- Email: `jobanputra@gmail.com`
- Password: `joban123`

## Step 5: Verify

1. Go to: https://automations-frontend-production-01fd.up.railway.app
2. Login with admin credentials
3. Check "Clients" section - you should see KMG and Joban

## If Still Issues

Check Railway logs:
```
Railway Dashboard → Backend Service → Deployments → View Logs
```

Look for:
- ✅ Admin user created
- ✅ KMG Insurance created
- ✅ Joban Putra Insurance created
