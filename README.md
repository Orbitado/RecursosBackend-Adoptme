# Adopt Me API

## Docker Image
This application is available as a Docker image at:
https://hub.docker.com/r/orbitado/adoptme

You can pull it using:
```bash
docker pull orbitado/adoptme:latest
```

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
MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
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

## Docker Container Management
For easier Docker container management, you can use the following npm scripts:

```bash
# Start containers in detached mode
npm run compose:up

# Stop containers
npm run compose:down
```

## Testing
This project includes automated tests using Mocha, Chai, and Supertest.

### Running Tests
To run the tests, make sure your application is running (either with Docker or directly), then execute:

```bash
npm test
```

### Test Suite Structure
- `supertest.test.js`: Entry point that imports all test files
- `adoption.test.js`: Tests for the adoption API endpoints

The tests verify basic API functionality:
- Retrieving adoptions
- Handling invalid adoption requests
- Error responses for non-existent resources

To add your own tests, create new test files and import them in the `supertest.test.js` file.