# Fresh Deployment Guide

## Step 1: Clean Up Local Changes

```bash
cd C:\Users\hp\hr-agent-dashboard
git add .
git commit -m "Complete fix for auth and deployment"
git push origin main
```

## Step 2: Railway Backend Setup

### A. Delete Old Service (Optional - Fresh Start)
1. Go to Railway Dashboard
2. Delete the old backend service
3. Create new service from GitHub repo

### B. Environment Variables (CRITICAL)

Set these in Railway → Backend Service → Variables:

```
NODE_ENV=production
PORT=8080
DB_PATH=./data/hirehero.db

FRONTEND_URL=https://automations-frontend-production-01fd.up.railway.app

JWT_SECRET=af36f5a0060d60295b1a6cbce9ef88a734d07caa0d3db9107bb6d07e83094e505cfab3cf85385bcb340d33d31cbac2d7653b762935f55af4a7012ad7931c1e9f

GOOGLE_PROJECT_ID=n8n-local-integration-477807
GOOGLE_CLIENT_EMAIL=dash-one@n8n-local-integration-477807.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVvxlDUSGaM0EU
jcSUTHTTfrKbP/W3o6ag8nvQRzADvu4sxbZ3+2eMvfbsDUI4S9r3PJHFUAcchyJk
5KJKwbkv39tnQH+iIlZTeE/nb9rVF9QQWiV+qdP0vxW2eR3FeuxRxPkfylBQowMz
utE9AFOiMwwaoEcQODogVEZhMPgLcj4tvot9yGsjLd0nZJsRP5DCt6qhrtUorn6u
GzuMgT2kqLUHxQbzjrYvOGi9q5rK/Du8jBE4LWkCC1eJFIdy0oLw1Qm5+VOlkTnU
LwyRKjOV2K6MACYvaLLrozWdA5qrULh4NDbMp7meGryu+TlY+X9wVF+B7ylyTeNa
N+9JI/vhAgMBAAECggEAXOXa8X5797xp/yhkdT3LkrYgo0gHn+JBA/ePp2ShMieT
9aKSnRAHn8xaWpqimrwhNU4+Xr7a8GOtJ6OVA5+xwGRvQ69tKYb59Po35DMhrXbX
RKohXK0sAVXhdnaqYU99EUbmLZJtGLbYp+18jiIrtzWvf40EhcCiRrXKBujVDYe0
m7t0weMKgfr7MngEm6Awl946yJC3lPrIF6FT0EOCaludffm05CfxU7z+9YLn/V2P
H5wwwaa5AbxbF54EYW+krC3G2qrHlr0du7tt4h+Thi4Be/w/+jpIKViSYJfRH2hx
SsVYNp6/aZRgS9nW3xAYq6MBej5gnTGlFI/i1hdirwKBgQDxtliunmUGXRYoo4vP
q2CSf9/ztGVaPrlxszg+7yNrf+kZ0kdyTgdOC90YtkpjU9X87HvCv2avnM+Y69Ci
pgALACe2OpmsUc7JpupoX8BnYTKCqUqJdgHj9qDx8pOXQW2OTUcif7ZAuoZM2Fpf
pRvipHgWfJfrQBz7qEXiDgGBrwKBgQDiYZD44Stsh6s9jy7PayqnYsgo+SDWLD4Q
2HN/9suYM4hrPbHKia/ItFMhz0n6o5V9fuOKSmL7c1vVAwXDF6BP2QkUtK2h+94L
RhO9DWsF7lxgdFkMczSlEaVbXDmmSA6mU2aaAXuzvwiN1k4CRzyS8ZpCx/u8gzHJ
smnF0LSPbwKBgQC1DYNL+TVvGNb6Rdb6DULfOY3E/IFWodlCg55D9diwMzWls870
neH24ggQ9Kqv0CJfu7vQWpJORMVzpF+5FWK+2rTkWOy3GOguQCshV2fFiBbPrIM6
h/xOh3RzBuLqz4WCq/v2qXcY8R6b/QtkzUYf9FZHcbhR7MpI7vi5pQgX3QKBgEfq
3vdx8S2lXA1Oc3yJex96DkSWAIyJuZ34ZZj9emh71pbbHqRNYX7NaquPAt2RImif
6wF/6Dohx8bAExCLbO5w8KWXUKHpNf024gZpQNq9grNRwwhlgQ//rxx7DAV7VswY
Krw6RGYyBjGpJ1cp8mBsSKl2hs64jxSYjWm+h94ZAoGAL6mEFXrgZi4Cj7R/fN+Q
vyBDndv3zVDY7poriPIp+uHyezgxMtwOhG0vTN2myhVS4bZt1rdpZGxheWGju6tU
KF2CQLWJpwh9zc5SF4+f+TUwtS557TrCevx4wVC+zZKu0rLtPyYHAY+3+rsPGXlQ
66OaMDXRxaDYVGFdpYzw3VQ=
-----END PRIVATE KEY-----

GOOGLE_SHEETS_SPREADSHEET_ID=1amZkYzhw2lMmIbw0ftFAw8KJ1SX86zJ2rubWDQgs8CE
GOOGLE_SHEETS_TAB=output
GOOGLE_SHEETS_EMAIL_TAB=email_logs

N8N_WEBHOOK_URL=https://unhearing-unreproved-westin.ngrok-free.dev/webhook/Hr_agent

VOICE_API_KEY=0cbc12c8-db94-41b9-a289-efead1815ff5
VOICE_ORG_ID=b34f0285-61e1-4729-bb48-2f30d94ae988
VOICE_BASE_URL=https://api.vapi.ai

RAZORPAY_KEY_ID=rzp_test_ReMGjXR9MRhVgk
RAZORPAY_KEY_SECRET=mPYbsRQEudzf5ig8YOQfZk1d
RAZORPAY_WEBHOOK_SECRET=F7xsFkRM@kpuS6N

LOW_BALANCE_THRESHOLD=0.2
MIN_RECHARGE_CENTS=500
MAX_UPLOAD_MB=10

ENABLE_IP_RESTRICTIONS=false
ENABLE_SESSION_LIMITS=false
BYPASS_IP_FOR_LOCALHOST=true

KMG_INSURANCE_SHEETS_SPREADSHEET_ID=1EpMAg1gSXPKr83cTugvGexrqv3Yt5Tb85Re2Shah8mw
KMG_INSURANCE_SHEETS_TAB=updating_input

JOBAN_INSURANCE_SHEETS_SPREADSHEET_ID=1oX5MGRMo6oz87ivTXeMOy6vtIDPJXXawz_lGqmOvUEo
JOBAN_INSURANCE_SHEETS_TAB=Sheet1
```

### C. Add Persistent Volume (CRITICAL)
1. Railway → Backend Service → Settings → Volumes
2. Click "New Volume"
3. Mount Path: `/app/data`
4. Click "Add"

### D. Build Settings
1. Railway → Backend Service → Settings
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `node src/index.js`

## Step 3: Railway Frontend Setup

### Update Frontend Environment
Railway → Frontend Service → Variables:

```
VITE_API_URL=https://automationdash.up.railway.app
```

(Replace with your actual backend URL)

## Step 4: Deploy

Push code:
```bash
git add .
git commit -m "Fresh deployment with all fixes"
git push origin main
```

Railway will auto-deploy both services.

## Step 5: Verify Deployment

### Check Backend Logs
Look for:
```
✅ Admin exists
✅ KMG Insurance exists
✅ Joban Putra Insurance Shoppe exists
🚀 Viral Bug Automations server running
```

### Test Login
Go to frontend URL and login with:

**Admin:**
- Email: `vaibhavkar0009@gmail.com`
- Password: `Vaibhav@121`

**KMG Insurance:**
- Email: `kvreddy1809@gmail.com`
- Password: `kmg123`

**Joban Insurance:**
- Email: `jobanputra@gmail.com`
- Password: `joban123`

## Step 6: Verify Features

1. ✅ Login works
2. ✅ Refresh page - stays logged in
3. ✅ Admin sees Clients section
4. ✅ KMG and Joban appear in clients list

## Troubleshooting

### If login fails:
1. Check Railway backend logs for errors
2. Verify CORS origins include frontend URL
3. Check JWT_SECRET is set
4. Verify database volume is mounted

### If clients don't show:
1. Check backend logs for "✅ KMG Insurance exists"
2. Verify users were created in database
3. Check admin route is working

### If logout on refresh:
1. Verify frontend is using localStorage (not sessionStorage)
2. Check browser console for errors
3. Clear browser cache and try again
