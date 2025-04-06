# Adopt Me API

## Docker Testing Instructions

### Prerequisites
- Docker and Docker Compose installed on the testing machine
- Git (to clone the repository)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Orbitado/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme
```

### Step 2: Set Up Environment Variables
Create a `.env` file in the root directory with the following content:
```
MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority"
PORT=8080
```
**Note:** Replace with appropriate MongoDB connection string. For testing purposes, you can use the provided connection string.

### Step 3: Build and Run the Docker Container
```bash
docker-compose up --build
```

The application should start and connect to the MongoDB database. You'll see output indicating the server is running and connected to MongoDB.

### Step 4: Testing the API
The API will be available at `http://localhost:8080`. You can test the endpoints using tools like Postman or curl:

#### Example Endpoints:
- GET `http://localhost:8080/api/users` - List all users
- GET `http://localhost:8080/api/pets` - List all pets

### Step 5: Stopping the Application
Press `Ctrl+C` in the terminal where docker-compose is running, or use:
```bash
docker-compose down
```

## Alternative Testing Method (Without Docker)
If Docker testing is not possible, the application can also be run directly:

1. Install Node.js (v18 recommended)
2. Create the `.env` file as described in Step 2
3. Run:
```bash
npm install
npm start
```

## Troubleshooting
- If you see connection errors, verify the MongoDB URI is correct
- Ensure ports 8080 is not being used by another application
- Check Docker logs: `docker-compose logs` 