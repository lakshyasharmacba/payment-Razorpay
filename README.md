# Razorpay Payment Integration — Full Stack Project

A full-stack e-commerce checkout app integrated with **Razorpay** for payments, including order creation, checkout, and webhook-based payment confirmation.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** — runtime
- **Express 5** — web server / REST API
- **Razorpay Node SDK** — order creation & payment handling
- **cors** — cross-origin request handling
- **dotenv** — environment variable management
- **crypto** (Node built-in) — webhook signature verification
- **nodemon** — auto-restart dev server

### Frontend
- **React 19**
- **Vite 7** — build tool / dev server
- **React Router DOM v7** — routing
- **Axios** — API calls to backend
- **Razorpay Checkout.js** (loaded via script) — payment popup UI

### Dev Tools
- **ngrok** — local tunnel for testing Razorpay webhooks on localhost

---

## 📁 Project Structure

```
razorpay tutorial/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/        (Homes.jsx, Checkout.jsx, etc.)
    │   ├── services/      (api.js)
    │   ├── components/
    │   └── assets/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env              ← must be in frontend root, NOT in src/
```

---

## 🔑 Environment Variables

### Backend — `backend/.env`

| Variable | Description |
|---|---|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID (test: `rzp_test_...`, live: `rzp_live_...`) |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret — **never expose to frontend** |
| `RAZORPAY_WEBHOOK_SECRET` | Secret set while creating the webhook on Razorpay Dashboard, used to verify webhook signatures |
| `FRONTEND_URL` | Frontend origin, used for CORS (e.g. `http://localhost:5173`) |
| `PORT` | Port the backend server runs on (default: `5000`) |

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Frontend — `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_RAZORPAY_KEY_ID` | Same as backend's Key ID — only the public Key ID, never the secret |
| `VITE_API_BASE_URL` | Backend base URL the frontend calls (e.g. `http://localhost:5000`) |

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ **Important:** Vite only reads `.env` files placed at the project root (`frontend/.env`), not inside `frontend/src/`.

---

## 🚀 Running Locally

You'll need **3 terminals** running at the same time.

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

### 3. ngrok (for webhook testing)
```bash
ngrok http 5000
```
Copy the generated `https://xxxx.ngrok-free.dev` URL.

---

## 🔗 Webhook Setup (Razorpay Dashboard)

1. Go to **Razorpay Dashboard → Settings → Webhooks → Add New Webhook**
2. **Webhook URL:**
   - Local: `https://<your-ngrok-url>/api/webhooks/razorpay`
   - Production: `https://<your-deployed-backend>/api/webhooks/razorpay`
3. **Secret:** any strong string you choose — must match `RAZORPAY_WEBHOOK_SECRET` in `.env`
4. **Active Events:** select at minimum:
   - `payment.captured`
   - `payment.failed`
5. Save, then update `.env` with the secret and restart the backend.

---

## 🧪 Test Mode Payment Details

| Field | Value |
|---|---|
| Card Number | `4111 1111 1111 1111` (domestic Visa test card) |
| Expiry | Any future date, e.g. `12/30` |
| CVV | Any 3 digits, e.g. `123` |
| OTP | Any 4–10 random (non-repeating) digits |

> QR / UPI Intent only works in **Live Mode** — not testable in Test Mode.

---

## 📦 Deployment Notes

| Environment | Backend | Frontend | Webhook URL |
|---|---|---|---|
| Local | `localhost:5000` via ngrok | `localhost:5173` | ngrok URL |
| Production | Render / Railway / AWS etc. | Vercel / Netlify | Real backend domain |

When going live:
- Replace `rzp_test_...` keys with `rzp_live_...` keys
- Complete Razorpay account KYC/activation
- Create a **separate webhook** for Live Mode with its own secret