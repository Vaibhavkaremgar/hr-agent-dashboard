# ✅ Railway Deploy Checklist

## Before Deploy

- [x] Migration script created (`server/migrations/004-set-insurance-company-names.js`)
- [x] Server startup updated to run migration automatically
- [x] Debug box added to Add Customer modal
- [x] Backend uses company_name for client detection
- [x] Sheet names linked via .env variables

## Deploy Now

### Step 1: Push to Git
```bash
git add .
git commit -m "fix: Auto-run insurance migration on startup"
git push origin main
```

### Step 2: Wait for Railway
- Railway will auto-deploy (takes ~3-5 minutes)
- Watch the build logs in Railway dashboard

### Step 3: Check Logs
Look for these messages in Railway logs:
```
✅ Database migrations completed successfully
✅ Updated Joban users
✅ Updated KMG users
✅ Insurance company names migration completed
🚀 Server running
```

### Step 4: Test
1. Open your Railway app URL
2. Login as Joban user
3. Press F12 (open console)
4. Go to Customers → Add Customer
5. See blue debug box with "isJoban: YES ✅"
6. Verify Joban fields appear

## Expected Results

### For Joban User:
- Modal title: "Add New Customer (Joban Putra Insurance)"
- Debug box shows: `Client Key: joban`
- Fields visible:
  - ✅ Last Year Premium
  - ✅ Cheque Hold, Payment Date, Cheque No, Cheque Bounce
  - ✅ Owner Alert Sent
- Fields hidden:
  - ❌ OD Expiry Date
  - ❌ Reason

### For KMG User:
- Modal title: "Add New Customer (KMG Insurance Agency)"
- Debug box shows: `Client Key: kmg`
- Fields visible:
  - ✅ OD Expiry Date
  - ✅ Reason
- Fields hidden:
  - ❌ Last Year Premium
  - ❌ Cheque fields
  - ❌ Owner Alert Sent

## If Something Goes Wrong

### Check Railway Logs
```
Railway Dashboard → Your Project → Deployments → Latest → Logs
```

### Common Issues:

**Issue 1: Migration fails**
- Check if users exist with client_type = 'insurance'
- Manually set company_name in database

**Issue 2: Fields still wrong**
- Check browser console for clientKey value
- Verify company_name in database
- Clear browser cache and logout/login

**Issue 3: Server won't start**
- Check Railway logs for error
- Verify all dependencies installed
- Check .env variables set

## Quick Fix Commands

If migration didn't work, connect to your database and run:

```sql
-- Check current state
SELECT id, email, company_name, client_type FROM users WHERE client_type = 'insurance';

-- Fix Joban
UPDATE users SET company_name = 'Joban Putra Insurance' WHERE email LIKE '%joban%';

-- Fix KMG
UPDATE users SET company_name = 'KMG Insurance' WHERE email LIKE '%kmg%';

-- Verify
SELECT id, email, company_name FROM users WHERE client_type = 'insurance';
```

---

**Ready to Deploy:** YES ✅
**Estimated Time:** 5 minutes
**Risk Level:** LOW (migration is safe and idempotent)
