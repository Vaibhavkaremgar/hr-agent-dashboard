# Railway Deployment Guide

## 🚀 Deployed Application URL
**Production URL**: `https://hr-agent-dashboard-production-01fd.up.railway.app`

---

## 📋 Required Environment Variables for Railway

Add these environment variables in Railway dashboard:

### 1. Server Configuration
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://hr-agent-dashboard-production-01fd.up.railway.app
```

### 2. Database
```
DB_PATH=./data/hirehero.db
```

### 3. JWT Secret
```
JWT_SECRET=af36f5a0060d60295b1a6cbce9ef88a734d07caa0d3db9107bb6d07e83094e505cfab3cf85385bcb340d33d31cbac2d7653b762935f55af4a7012ad7931c1e9f
```

### 4. Google Sheets API (CRITICAL for Sync)
```
GOOGLE_PROJECT_ID=n8n-local-integration-477807
GOOGLE_CLIENT_EMAIL=dash-one@n8n-local-integration-477807.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVvxlDUSGaM0EU\njcSUTHTTfrKbP/W3o6ag8nvQRzADvu4sxbZ3+2eMvfbsDUI4S9r3PJHFUAcchyJk\n5KJKwbkv39tnQH+iIlZTeE/nb9rVF9QQWiV+qdP0vxW2eR3FeuxRxPkfylBQowMz\nutE9AFOiMwwaoEcQODogVEZhMPgLcj4tvot9yGsjLd0nZJsRP5DCt6qhrtUorn6u\nGzuMgT2kqLUHxQbzjrYvOGi9q5rK/Du8jBE4LWkCC1eJFIdy0oLw1Qm5+VOlkTnU\nLwyRKjOV2K6MACYvaLLrozWdA5qrULh4NDbMp7meGryu+TlY+X9wVF+B7ylyTeNa\nN+9JI/vhAgMBAAECggEAXOXa8X5797xp/yhkdT3LkrYgo0gHn+JBA/ePp2ShMieT\n9aKSnRAHn8xaWpqimrwhNU4+Xr7a8GOtJ6OVA5+xwGRvQ69tKYb59Po35DMhrXbX\nRKohXK0sAVXhdnaqYU99EUbmLZJtGLbYp+18jiIrtzWvf40EhcCiRrXKBujVDYe0\nm7t0weMKgfr7MngEm6Awl946yJC3lPrIF6FT0EOCaludffm05CfxU7z+9YLn/V2P\nH5wwwaa5AbxbF54EYW+krC3G2qrHlr0du7tt4h+Thi4Be/w/+jpIKViSYJfRH2hx\nSsVYNp6/aZRgS9nW3xAYq6MBej5gnTGlFI/i1hdirwKBgQDxtliunmUGXRYoo4vP\nq2CSf9/ztGVaPrlxszg+7yNrf+kZ0kdyTgdOC90YtkpjU9X87HvCv2avnM+Y69Ci\npgALACe2OpmsUc7JpupoX8BnYTKCqUqJdgHj9qDx8pOXQW2OTUcif7ZAuoZM2Fpf\npRvipHgWfJfrQBz7qEXiDgGBrwKBgQDiYZD44Stsh6s9jy7PayqnYsgo+SDWLD4Q\n2HN/9suYM4hrPbHKia/ItFMhz0n6o5V9fuOKSmL7c1vVAwXDF6BP2QkUtK2h+94L\nRhO9DWsF7lxgdFkMczSlEaVbXDmmSA6mU2aaAXuzvwiN1k4CRzyS8ZpCx/u8gzHJ\nsmnF0LSPbwKBgQC1DYNL+TVvGNb6Rdb6DULfOY3E/IFWodlCg55D9diwMzWls870\nneH24ggQ9Kqv0CJfu7vQWpJORMVzpF+5FWK+2rTkWOy3GOguQCshV2fFiBbPrIM6\nh/xOh3RzBuLqz4WCq/v2qXcY8R6b/QtkzUYf9FZHcbhR7MpI7vi5pQgX3QKBgEfq\n3vdx8S2lXA1Oc3yJex96DkSWAIyJuZ34ZZj9emh71pbbHqRNYX7NaquPAt2RImif\n6wF/6Dohx8bAExCLbO5w8KWXUKHpNf024gZpQNq9grNRwwhlgQ//rxx7DAV7VswY\nKrw6RGYyBjGpJ1cp8mBsSKl2hs64jxSYjWm+h94ZAoGAL6mEFXrgZi4Cj7R/fN+Q\nvyBDndv3zVDY7poriPIp+uHyezgxMtwOhG0vTN2myhVS4bZt1rdpZGxheWGju6tU\nKF2CQLWJpwh9zc5SF4+f+TUwtS557TrCevx4wVC+zZKu0rLtPyYHAY+3+rsPGXlQ\n66OaMDXRxaDYVGFdpYzw3VQ=\n-----END PRIVATE KEY-----\n"
```

**IMPORTANT**: In Railway, paste the private key with actual newlines (`\n`), not escaped (`\\n`)

### 5. Insurance Sheets Configuration
```
KMG_INSURANCE_SHEETS_SPREADSHEET_ID=1EpMAg1gSXPKr83cTugvGexrqv3Yt5Tb85Re2Shah8mw
KMG_INSURANCE_SHEETS_TAB=updating_input
JOBAN_INSURANCE_SHEETS_SPREADSHEET_ID=1oX5MGRMo6oz87ivTXeMOy6vtIDPJXXawz_lGqmOvUEo
JOBAN_INSURANCE_SHEETS_TAB=Sheet1
```

### 6. n8n Webhook Configuration (UPDATE REQUIRED)
```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/Hr_agent
```

**⚠️ ACTION REQUIRED**: Update your n8n webhook URL to point to production

### 7. Payment Configuration
```
RAZORPAY_KEY_ID=rzp_test_ReMGjXR9MRhVgk
RAZORPAY_KEY_SECRET=mPYbsRQEudzf5ig8YOQfZk1d
RAZORPAY_WEBHOOK_SECRET=F7xsFkRM@kpuS6N
```

### 8. Voice API Configuration
```
VOICE_API_KEY=0cbc12c8-db94-41b9-a289-efead1815ff5
VOICE_ORG_ID=b34f0285-61e1-4729-bb48-2f30d94ae988
VOICE_BASE_URL=https://api.vapi.ai
```

### 9. Security Configuration
```
ENABLE_IP_RESTRICTIONS=true
ENABLE_SESSION_LIMITS=true
BYPASS_IP_FOR_LOCALHOST=false
```

---

## 🔧 n8n Workflow Updates Required

### 1. Update Webhook URLs in n8n
Replace all localhost/ngrok URLs with production URL:

**Old URLs to Replace:**
- `http://localhost:5000/api/insurance/log-message`
- `https://unhearing-unreproved-westin.ngrok-free.dev/webhook/Hr_agent`

**New Production URLs:**
- `https://hr-agent-dashboard-production-01fd.up.railway.app/api/insurance/log-message`

### 2. Message Logging Webhook Configuration

**Endpoint**: `POST /api/insurance/log-message`

**Required Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "mobile": "9876543210",
  "message_type": "reminder_30",
  "channel": "whatsapp",
  "message_content": "Your policy expires in 30 days",
  "status": "sent",
  "client_key": "kmg"
}
```

**Client Keys:**
- KMG Insurance: `"client_key": "kmg"`
- Joban Putra Insurance: `"client_key": "joban"`

### 3. n8n Workflow Nodes to Update

#### Node 1: HTTP Request (Message Logging)
```
Method: POST
URL: https://hr-agent-dashboard-production-01fd.up.railway.app/api/insurance/log-message
Headers: Content-Type: application/json
Body: JSON with customer_name, mobile, message_type, channel, message_content, status, client_key
```

#### Node 2: Webhook Trigger (if using)
```
Webhook URL: Update in n8n settings to use production domain
```

---

## 📱 Mobile & Device Compatibility

The application is **fully responsive** and works on:
- ✅ Desktop (1920x1080 and above)
- ✅ Laptop (1366x768 and above)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

**Responsive Features:**
- Tailwind CSS responsive classes (`sm:`, `md:`, `lg:`, `xl:`)
- Mobile-optimized sidebar navigation
- Touch-friendly buttons and forms
- Adaptive table layouts
- Responsive modals and dialogs

---

## 🔍 Testing Sync to Sheet

### Test Steps:
1. Login to production: `https://hr-agent-dashboard-production-01fd.up.railway.app`
2. Navigate to Insurance Dashboard → Customers
3. Click "Add Customer"
4. Fill in customer details
5. Click "Add Customer"
6. Check browser console for sync logs
7. Verify customer appears in Google Sheet

### Expected Console Logs:
```
✅ Google Sheets API initialized successfully
Customer added, syncing to sheet...
Sync to sheet successful
```

### If Sync Fails:
1. Check Railway logs for Google Sheets auth errors
2. Verify GOOGLE_PRIVATE_KEY has proper newlines
3. Ensure service account has edit access to sheets
4. Check spreadsheet IDs are correct

---

## 🔐 Google Sheets Permissions

Ensure the service account email has **Editor** access:
1. Open Google Sheet
2. Click "Share"
3. Add: `dash-one@n8n-local-integration-477807.iam.gserviceaccount.com`
4. Set permission: **Editor**
5. Click "Send"

**Required for both sheets:**
- KMG: `1EpMAg1gSXPKr83cTugvGexrqv3Yt5Tb85Re2Shah8mw`
- Joban: `1oX5MGRMo6oz87ivTXeMOy6vtIDPJXXawz_lGqmOvUEo`

---

## 🚨 Common Issues & Solutions

### Issue 1: "Customer added but sync to sheet failed"
**Solution**: 
- Check GOOGLE_PRIVATE_KEY format in Railway
- Ensure newlines are actual `\n` not `\\n`
- Verify service account has sheet access

### Issue 2: n8n webhook not receiving data
**Solution**:
- Update n8n webhook URL to production
- Add `client_key` to webhook payload
- Check n8n workflow is active

### Issue 3: CORS errors on mobile
**Solution**:
- Already configured in `server/src/index.js`
- Production URL whitelisted: `https://hr-agent-dashboard-production-01fd.up.railway.app`

---

## 📊 Client-Specific Features

### KMG Insurance
- Fields: Current Policy No, Registration No, OD Expiry Date, Renewal Date, Reason
- Sheet: `1EpMAg1gSXPKr83cTugvGexrqv3Yt5Tb85Re2Shah8mw`
- Tab: `updating_input`
- Client Key: `kmg`

### Joban Putra Insurance
- Fields: Policy No, REGN no, Date of Expiry, Last Year Premium, Cheque fields, Owner Alert Sent
- Sheet: `1oX5MGRMo6oz87ivTXeMOy6vtIDPJXXawz_lGqmOvUEo`
- Tab: `Sheet1`
- Client Key: `joban`

---

## ✅ Deployment Checklist

- [ ] All environment variables added to Railway
- [ ] GOOGLE_PRIVATE_KEY formatted correctly (with `\n`)
- [ ] Service account has Editor access to both sheets
- [ ] n8n webhook URLs updated to production
- [ ] n8n workflows tested with production URL
- [ ] CORS configured for production domain
- [ ] Database migrations run successfully
- [ ] Test customer add/edit on production
- [ ] Test sync to sheet functionality
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop

---

## 🆘 Support

If issues persist:
1. Check Railway logs: `railway logs`
2. Check browser console for errors
3. Verify all environment variables are set
4. Test Google Sheets API manually
5. Verify n8n workflow is active and updated
