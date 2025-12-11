# Journey Booking Platform

A full-stack MERN application for booking transportation trips with admin panel functionality.

## Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Project Setup

### 1. Clone & Install Dependencies

```bash
# Install client dependencies
cd assignment/client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Environment Configuration

Create `.env` file in `assignment/server`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES=7d
```

### 3. Start the Application

#### Start Server (Terminal 1)
```bash
cd assignment/server
npm run dev
```
Server runs on: `http://localhost:3000`

#### Start Client (Terminal 2)
```bash
cd assignment/client
npm run dev
```
Client runs on: `http://localhost:5173`

## Project Structure

```
assignment/
├── client/
│   ├── src/
│   │   ├── pages/        # Page components (Home, Admin, Login, etc.)
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API calls
│   │   ├── context/      # Auth context
│   │   └── hooks/        # Custom hooks
│   └── package.json
│
└── server/
    ├── src/
    │   ├── routes/       # API routes
    │   ├── controllers/  # Business logic
    │   ├── models/       # Database models
    │   ├── middleware/   # Auth, CORS, etc.
    │   └── server.js     # Express app entry
    └── package.json
```

## Key Features

✅ User Authentication (Register/Login)  
✅ Trip Management (CRUD operations)  
✅ Admin Dashboard with Statistics  
✅ Photo Upload for Trips  
✅ Protected Routes  
✅ Responsive Design  

## Available Commands

### Client
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality
npm run prettier     # Format code with Prettier
```

### Server
```bash
npm run dev          # Start with nodemon
npm run start        # Start production
npm run lint         # Check code quality
npm run prettier     # Format code with Prettier
```

## Default Credentials

After registering a user:
- Email: `test@example.com`
- Password: `password123`

## Common Issues

**Port 3000 already in use?**
```bash
lsof -i :3000
kill -9 <PID>
```

**MongoDB connection failed?**
- Check MONGO_URI in `.env`
- Ensure MongoDB Atlas network access is enabled

**Vite dev server not starting?**
```bash
cd assignment/client
npm install
npm run dev
```

## License

MIT
