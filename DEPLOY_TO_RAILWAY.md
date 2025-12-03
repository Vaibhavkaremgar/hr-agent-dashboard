# 🚂 Deploy to Railway - Joban Fields Fix

## What Changed

The migration now runs **automatically** when the server starts. No manual steps needed!

## Deploy Steps

### 1. Commit and Push to Git

```bash
git add .
git commit -m "fix: Auto-run insurance company name migration on startup"
git push origin main
```

### 2. Railway Will Auto-Deploy

Railway will:
1. Pull your latest code
2. Build the Docker image
3. Start the server
4. **Automatically run the migration** (sets company_name for insurance users)
5. Server starts normally

### 3. Check Railway Logs

In Railway dashboard, check the logs. You should see:

```
✅ Connected to SQLite database
✅ Database migrations completed successfully
✅ Updated Joban users
✅ Updated KMG users
📋 Insurance users after migration:
  - joban@example.com → Joban Putra Insurance
  - kmg@example.com → KMG Insurance
✅ Insurance company names migration completed
🚀 Viral Bug Automations server running on http://localhost:5000
```

### 4. Test the Fix

1. Go to your Railway app URL
2. Login as Joban user
3. Open browser console (F12)
4. Look for: `🔍 CLIENT CONFIG LOADED: {clientKey: "joban", ...}`
5. Go to Customers → Add Customer
6. You'll see **BLUE DEBUG BOX** showing:
   ```
   Client Key: joban
   Client Name: Joban Putra Insurance
   isJoban: YES ✅
   ```
7. Verify Joban fields appear:
   - ✅ Last Year Premium
   - ✅ Cheque Hold
   - ✅ Payment Date
   - ✅ Cheque No
   - ✅ Cheque Bounce
   - ✅ Owner Alert Sent

## What the Migration Does

On every server startup, it checks and updates:

```sql
-- Sets company_name for Joban users
UPDATE users 
SET company_name = 'Joban Putra Insurance' 
WHERE client_type = 'insurance' 
AND (email LIKE '%joban%' OR email LIKE '%jobanputra%');

-- Sets company_name for KMG users
UPDATE users 
SET company_name = 'KMG Insurance' 
WHERE client_type = 'insurance' 
AND (email LIKE '%kmg%');
```

## If Migration Fails

Check Railway logs for errors. If you see migration errors:

1. Go to Railway dashboard
2. Open your database (if using Railway PostgreSQL)
3. Or connect to your SQLite database
4. Run manually:
   ```sql
   UPDATE users SET company_name = 'Joban Putra Insurance' WHERE email = 'your-joban-email';
   UPDATE users SET company_name = 'KMG Insurance' WHERE email = 'your-kmg-email';
   ```

## Environment Variables

Make sure these are set in Railway:

```
KMG_INSURANCE_SHEETS_SPREADSHEET_ID=1EpMAg1gSXPKr83cTugvGexrqv3Yt5Tb85Re2Shah8mw
KMG_INSURANCE_SHEETS_TAB=updating_input

JOBAN_INSURANCE_SHEETS_SPREADSHEET_ID=1oX5MGRMo6oz87ivTXeMOy6vtIDPJXXawz_lGqmOvUEo
JOBAN_INSURANCE_SHEETS_TAB=Sheet1
```

## Rollback (If Needed)

If something goes wrong:

```bash
git revert HEAD
git push origin main
```

Railway will auto-deploy the previous version.

---

**Status:** ✅ Ready to Deploy
**Time:** 5 minutes (Railway build time)
**Auto-Migration:** YES ✅
