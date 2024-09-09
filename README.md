# Car Rental Reservation System

## Assignment Name: Car Rental Reservation System Backend







  



  

## API Endpoints

### 1\. Sign Up

**Route**: `/api/auth/signup` (**POST**)

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "user",  // role can be user or admin
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, City, Country"
 
}
```

**Response**:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "_id": "6071f0fbf98b210012345678",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "phone": "1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-06-10T12:00:00.000Z",
    "updatedAt": "2024-06-10T12:00:00.000Z"
  }
}
```

###   

### 2\. Sign In

**Route**: `/api/auth/signin`(**POST**)

**Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "_id": "6071f0fbf98b210012345678",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "phone": "1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-06-10T12:00:00.000Z",
    "updatedAt": "2024-06-10T12:00:00.000Z"
  },
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (your JWT token)"
}
```

### 3\. Create a Car (Only accessible to the Admin)

**Route**: `/api/cars`(**POST**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Bearer is added in the token when it is generated
```

  

**Request Body:**

```json
{
  "name": "Tesla Model 3",
  "description": "An electric car with advanced technology and performance.",
  "color": "White",
  "isElectric": true,
  "features": ["AC", "Bluetooth", "Long Range Battery"],
  "pricePerHour": 500
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Car created successfully",
  "data": {
     "_id": "608a6d8d03a1b40012abcdef",
    "name": "Tesla Model 3",
    "description": "An electric car with advanced technology and performance.",
    "color": "White",
    "isElectric": true,
    "features": ["AC", "Bluetooth", "Long Range Battery"],
    "pricePerHour": 500,
    "status": "available",
    "isDeleted": false,
    "createdAt": "2024-04-28T12:00:00.000Z",
    "updatedAt": "2024-04-28T12:00:00.000Z"
  }
}
```

### 4\. Get All Cars

**Route**: `/api/cars`(**GET**)

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cars retrieved successfully",
  "data": [
    {
      "_id": "608a6d8d03a1b40012abcdef",
      "name": "Tesla Model 3",
      "description": "An electric car with advanced technology and performance.",
      "color": "White",
      "isElectric": true,
      "features": ["AC", "Bluetooth", "Long Range Battery"],
      "pricePerHour": 500,
      "status": "available",
      "isDeleted": false,
      "createdAt": "2024-04-28T12:00:00.000Z",
      "updatedAt": "2024-04-28T12:00:00.000Z"
    },
    // more data
  ]
}
```

  

### 5\. Get A Car

**Route**: `/api/cars/:id`(**GET**)

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "A Car retrieved successfully",
  "data": {
    "_id": "608a6d8d03a1b40012abcdef",
    "name": "Tesla Model 3",
    "description": "An electric car with advanced technology and performance.",
    "color": "White",
    "isElectric": true,
    "features": ["AC", "Bluetooth", "Long Range Battery"],
    "pricePerHour": 500,
    "status": "available",
    "isDeleted": false,
    "createdAt": "2024-04-28T12:00:00.000Z",
    "updatedAt": "2024-04-28T12:00:00.000Z"
  }
}
```

  

### **6\. Update A Car (Only Accessible to the Admin)**

**Route:** `/api/cars/:id`(**PUT**)

**Request Headers:**

```javascript
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

**Request Body:**

```json
{
     "color": "Black",  
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Car updated successfully",
  "data": {
    "_id": "608a6d8d03a1b40012abcdef",
    "name": "Tesla Model 3",
    "description": "An electric car with advanced technology and performance.",
    "color": "Black",
    "isElectric": true,
    "features": ["AC", "Bluetooth", "Long Range Battery"],
    "pricePerHour": 500,
    "status": "available",
    "isDeleted": false,
    "createdAt": "2024-04-28T12:00:00.000Z",
    "updatedAt": "2024-04-29T12:00:00.000Z"
  }   
}
```

###   

### **7\. Delete A Car (Only Accessible to the Admin)**

**Route:** `/api/cars/:id`(**DELETE**) \[SOFT DELETE\]

**Request Headers:**

```javascript
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Car Deleted successfully",
  "data": {
    "_id": "608a6d8d03a1b40012abcdef",
    "name": "Tesla Model 3",
    "description": "An electric car with advanced technology and performance.",
    "color": "Black",
    "isElectric": true,
    "features": ["AC", "Bluetooth", "Long Range Battery"],
    "pricePerHour": 500,
    "status": "available",
    "isDeleted": true,
    "createdAt": "2024-04-28T12:00:00.000Z",
    "updatedAt": "2024-05-29T12:00:00.000Z"
  }   
}
```

  

### **8\. Get All Bookings (Accessible to the Admin)**

**Route:** `/api/bookings`(**GET**)

**Query Parameters:**

*   `carId`: ID of the car for which availability needs to be checked.
*   `date`: The specific date for which availability needs to be checked (format: YYYY-MM-DD).

  

Example Request:

`/api/bookings?carId=608a6d8d03a1b40012abcdef&date=2024-06-15`

  

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": null, 
      "user": {
          "_id": "6071f0fbf98b210012345688",
          "name": "Tom",
          "email": "tom@example.com",
          "role": "user",
          "phone": "1234567890",
          "address": "123 Main St, City, Country",
      },
      "car": {
        "_id": "608a6d8d03a1b40012abcdef",
        "name": "Tesla Model 3",
        "description": "An electric car with advanced technology and performance.",
        "color": "White",
        "isElectric": true,
        "features": ["AC", "Bluetooth", "Long Range Battery"],
        "pricePerHour": 500,
        "status": "unavailable",
        "isDeleted": false,
        "createdAt": "2024-04-28T12:00:00.000Z",
        "updatedAt": "2024-04-28T12:00:00.000Z"
      },
      "totalCost": 0, 
      "createdAt": "2024-04-28T12:00:00.000Z",
      "updatedAt": "2024-05-29T12:00:00.000Z"
    },
    
  ]
}
```

  

### **9\. Book a Car (Only Accessible to the User)**

**Route:** `/api/bookings`(**POST**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

  

**Request Body:**

```json
{
   "carId": "60d9c4e4f3b4b544b8b8d1c7",
   "date": "2024-06-15",
   "startTime": "13:00",
}
```

  

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Car booked successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": null, 
      "user": {
          "_id": "6071f0fbf98b210012345688",
          "name": "Tom",
          "email": "tom@example.com",
          "role": "user",
          "phone": "1234567890",
          "address": "123 Main St, City, Country",
      },
      "car": {
        "_id": "608a6d8d03a1b40012abcdef",
        "name": "Tesla Model 3",
        "description": "An electric car with advanced technology and performance.",
        "color": "White",
        "isElectric": true,
        "features": ["AC", "Bluetooth", "Long Range Battery"],
        "pricePerHour": 500,
        "status": "unavailable", 
        "isDeleted": false,
        "createdAt": "2024-04-28T12:00:00.000Z",
        "updatedAt": "2024-04-28T12:00:00.000Z"
      },
      "totalCost": 0, 
      "createdAt": "2024-04-28T12:00:00.000Z",
      "updatedAt": "2024-05-29T12:00:00.000Z"
    }
}
```

  

### **10\. Get User's Bookings (Only Accessible To the User)**

**Route:** `/api/bookings/my-bookings`(**GET**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c




```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "My Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "15:00",
      "user": {
          "_id": "6071f0fbf98b210012345688",
          "name": "Tom",
          "email": "tom@example.com",
          "role": "user",
          "phone": "1234567890",
          "address": "123 Main St, City, Country",
      },
      "car": {
        "_id": "608a6d8d03a1b40012abcdef",
        "name": "Tesla Model 3",
        "description": "An electric car with advanced technology and performance.",
        "color": "White",
        "isElectric": true,
        "features": ["AC", "Bluetooth", "Long Range Battery"],
        "pricePerHour": 500,
        "status":"unavailable",
        "isDeleted": false,
        "createdAt": "2024-04-28T12:00:00.000Z",
        "updatedAt": "2024-04-28T12:00:00.000Z"
      },
      "totaCost":1000,
      "createdAt": "2024-04-28T12:00:00.000Z",
      "updatedAt": "2024-05-29T12:00:00.000Z"
    },
   // ...additional bookings...
  ]
}
```

##   

## **11\. Return The Car (Only Accessible To Admin)**


**Route:** `/api/cars/return`(PUT)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```

**Request Body:**

```json
{
   "bookingId": "60d9c4e4f3b4b544b8b8d1c7",
   "endTime": "15:00"
}
```

  

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Car returned successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "15:00",
      "user": {
          "_id": "6071f0fbf98b210012345688",
          "name": "Tom",
          "email": "tom@example.com",
          "role": "user",
          "phone": "1234567890",
          "address": "123 Main St, City, Country",
        },
      "car": {
        "_id": "608a6d8d03a1b40012abcdef",
        "name": "Tesla Model 3",
        "description": "An electric car with advanced technology and performance.",
        "color": "White",
        "isElectric": true,
        "features": ["AC", "Bluetooth", "Long Range Battery"],
        "pricePerHour": 500,
        "status": "available" // The status of the car is updated to "available" indicating it is now ready for booking, following its return. 
        "isDeleted": false,
        "createdAt": "2024-04-28T12:00:00.000Z",
        "updatedAt": "2024-04-28T12:00:00.000Z"
      },
      "totalCost":1000, //Calculated using the start time, end time, and price per hour.
      "createdAt": "2024-04-28T12:00:00.000Z",
      "updatedAt": "2024-05-29T12:00:00.000Z"
    }
}


```



  

## Bonus Part:

### **1\. No Data Found is done**



```elixir
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data": []
}
```

### **2\. Error Handling: is done using global error handler middleware**


  

**Error Response Object Should include the following properties:**

*   success → false
*   message → Error Type → Validation Error, Cast Error, Duplicate Entry
*   errorMessages
*   stack

  

#### **Sample Error Response**

```json
{
    "success": false,
    "message": "E11000 duplicate key error collection: Assignment-3.users index: phone_1 dup key: { phone: \"17834567890\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: Assignment-3.users index: phone_1 dup key: { phone: \"17834567890\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: Assignment-3.users index: phone_1 dup key: { phone: \"17834567890\" }\n    at InsertOneOperation.execute (H:\\sakib code\\web_devolopment course 2.0\\Level 2\\Mission - 3(Be a Backend Brainiac)\\My code\\Assignment -3\\Car-rental-reservation\\node_modules\\mongoose\\node_modules\\mongodb\\src\\operations\\insert.ts:83:13)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at executeOperation (H:\\sakib code\\web_devolopment course 2.0\\Level 2\\Mission - 3(Be a Backend Brainiac)\\My code\\Assignment -3\\Car-rental-reservation\\node_modules\\mongoose\\node_modules\\mongodb\\src\\operations\\execute_operation.ts:196:12)\n    at Collection.insertOne (H:\\sakib code\\web_devolopment course 2.0\\Level 2\\Mission - 3(Be a Backend Brainiac)\\My code\\Assignment -3\\Car-rental-reservation\\node_modules\\mongoose\\node_modules\\mongodb\\src\\collection.ts:269:12)"
}
```
 

### **3\. Not Found Route:**


```json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found",
}
```


### **4\. Authentication Middleware:**

Implemented an Authentication Middleware to authenticate my application in auth.ts. 
Ensures that only user  and admin can access their own accessible routes.

```json
{
    "success": false,
    "message": "You are not authorized!",
    "errorMessages": [
        {
            "path": "",
            "message": "You are not authorized!"
        }
    ],
    "stack": "Error: You are not authorized!\n    at H:\\sakib code\\web_devolopment course 2.0\\Level 2\\Mission - 3(Be a Backend Brainiac)\\My code\\Assignment -3\\Car-rental-reservation\\src\\app\\middlewares\\auth.ts:42:13\n    at Generator.next (<anonymous>)\n    at fulfilled (H:\\sakib code\\web_devolopment course 2.0\\Level 2\\Mission - 3(Be a Backend Brainiac)\\My code\\Assignment -3\\Car-rental-reservation\\src\\app\\middlewares\\auth.ts:5:58)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```

### **5\. Zod Validation:**
All data is validated using zod validation schema
