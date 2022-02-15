# Faculty UPI API

---

## Table of Contents

1. [Description](https://github.com/fityannugroho/faculty-upi#description)
2. [Framework & Database](https://github.com/fityannugroho/faculty-upi#framework--database)
3. [Endpoint API](https://github.com/fityannugroho/faculty-upi#endpoint-api)
4. [Environment Settings](https://github.com/fityannugroho/faculty-upi#environment-settings)
5. [Running the App](https://github.com/fityannugroho/faculty-upi#running-the-app)

---

## Description

This is a Public API that contains general information such as attributes or names of faculties, regional campuses, and study programs at [**Universitas Pendidikan Indonesia (UPI)**](https://www.upi.edu), ranging from undergraduate to doctoral levels.

## Framework & Database

This project use [NestJS](https://nestjs.com) framework that writes in Typescript, and use [MongoDB](https://www.mongodb.com) database. The database contains 2 collection, `faculties` and `studies`.

> Furthermore, The **'faculty'** term refers to both 'faculty' and 'regional campus' because both have same level and similar entities.

`faculties` collection stores all of faculty `document` that each document has fields:

- `_id`, The auto generated document id by MongoDB.
- `code`, The code of faculty (primary key).
- `name`, The name of faculty.
- `abbr`, The abbreviation of faculty's name.

`studies` collection stores all of study program `document` that each document has fields:

- `_id`, The auto generated document id by MongoDB.
- `code`, The code of study program (primary key).
- `name`, The name of study program.
- `faculty`, The faculty's code of study program (foreign key).

## Endpoint API

### **GET All Faculties**

```
GET /faculties
```

Example :

```json
// Request: http://localhost:3000/faculties
// Response: (200 OK)
[
  {
    "_id": "61a4deb405a8fb92d5c25dc4",
    "code": "A",
    "name": "Fakultas Ilmu Pendidikan",
    "abbr": "FIP",
  },
  {
    "_id": "61a4deb405a8fb92d5c25dc5",
    "code": "B",
    "name": "Fakultas Pendidikan Ilmu Pengetahuan Sosial",
    "abbr": "FPIPS"
  },
  ...
]
```

### **GET Faculty by Code**

```
GET /faculties/{facultyCode}
```

Example:

```json
// 1. IF FACULTY CODE IS KNOWN
// Request: http://localhost:3000/faculties/a
// Response: (200 OK)
{
  "_id": "61a4deb405a8fb92d5c25dc4",
  "code": "A",
  "name": "Fakultas Ilmu Pendidikan",
  "abbr": "FIP",
}

// 2. IF FACULTY CODE IS UNKNOWN
// Request: http://localhost:3000/faculties/unknown
// Response: (404 NOT FOUND)
{
  "statusCode": 404,
  "message": "No faculty found with the same code as 'unknown'"
}
```

### **GET Faculties by Name**

```
GET /faculties/name/{facultyName}
```

Example:

```json
// Request: http://localhost:3000/faculties/name/kampus
// Response: (200 OK)
[
  {
    "_id": "61a4deb405a8fb92d5c25dca",
    "code": "G",
    "name": "Kampus UPI Cibiru",
    "abbr": "Kamda Cibiru"
  },
  {
    "_id": "61a4deb405a8fb92d5c25dcb",
    "code": "H",
    "name": "Kampus UPI Sumedang",
    "abbr": "Kamda Sumedang"
  },
  ...
]
```

> Response will be an **empty array** `[]` if there are no faculty matched with `facultyName`.

### **GET Faculties by Abbreviation**

```
GET /faculties/abbr/{facultyAbbr}
```

Example:

```json
// Request: http://localhost:3000/faculties/abbr/fp
// Response: (200 OK)
[
  {
    "_id": "61a4deb405a8fb92d5c25dc5",
    "code": "B",
    "name": "Fakultas Pendidikan Ilmu Pengetahuan Sosial",
    "abbr": "FPIPS"
  },
  {
    "_id": "61a4deb405a8fb92d5c25dc6",
    "code": "C",
    "name": "Fakultas Pendidikan Bahasa dan Sastra",
    "abbr": "FPBS"
  },
  ...
]
```

> Response will be an **empty array** `[]` if there are no faculty matched with `facultyAbbr`.

### **GET All Study Programs**

```
GET /studies
```

Example :

```json
// Request: http://localhost:3000/studies
// Response: (200 OK)
[
  {
    "_id": "61a4decc05a8fb92d5c25dd4",
    "code": "A015",
    "name": "Administrasi Pendidikan",
    "faculty": "A"
  },
  ...,
  {
    "_id": "61a4decc05a8fb92d5c25ddd",
    "code": "B015",
    "name": "Pendidikan Kewarganegaraan",
    "faculty": "B"
  },
  ...
]
```

### **GET Study Program by Code**

```
GET /studies/{studyCode}
```

Example :

```json
// 1. IF STUDY CODE IS KNOWN
// Request: http://localhost:3000/studies/g505
// Response: (200 OK)
{
  "_id": "61a4decc05a8fb92d5c25e15",
  "code": "G505",
  "name": "Rekayasa Perangkat Lunak",
  "faculty": "G"
}

// 2. IF STUDY CODE IS UNKNOWN
// Request: http://localhost:3000/studies/unknown
// Response: (404 NOT FOUND)
{
  "statusCode": 404,
  "message": "No study program found with the same code as 'unknown'"
}
```

### **GET Study Program by Name**

```
GET /studies/name/{studyName}
```

Example :

```json
// Request: http://localhost:3000/studies/name/ilmu
// Response: (200 OK)
[
  {
    "_id": "61a4decc05a8fb92d5c25de0",
    "code": "B085",
    "name": "Ilmu Pendidikan Agama Islam",
    "faculty": "B"
  },
  {
    "_id": "61a4decc05a8fb92d5c25de1",
    "code": "B095",
    "name": "Pendidikan Ilmu Pengetahuan Sosial",
    "faculty": "B"
  },
  ...
]
```

> Response will be an **empty array** `[]` if there are no study program matched with `studyName`.

### **GET All Study Programs by Faculty Code**

```
GET /faculties/{facultyCode}/studies
```

Example :

```json
// 1. IF FACULTY CODE IS KNOWN
// Request: http://localhost:3000/faculties/a/studies
// Response: (200 OK)
[
  {
    "_id": "61a4decc05a8fb92d5c25dd4",
    "code": "A015",
    "name": "Administrasi Pendidikan",
    "faculty": "A"
  },
  {
    "_id": "61a4decc05a8fb92d5c25dd5",
    "code": "A025",
    "name": "Bimbingan dan Konseling",
    "faculty": "A"
  },
  ...
]

// 2. IF FACULTY CODE IS KNOWN
// Request: http://localhost:3000/faculties/unknown/studies
// Response: (404 NOT FOUND)
{
  "statusCode": 404,
  "message": "No faculty found with the same code as 'unknown'"
}
```

## Environment Settings

**1. Create `.env` file**

You can easily duplicate the `.env.example` file and rename it to `.env`.

**2. Configure `HOST` and `PORT`**

Open `.env` file, then :

- Set `HOST` with the hostname of your app. The default is `localhost`.

- Set `PORT` with port number you want to use. The default is `3000`.

The default values of `HOST` and `PORT` is example values to used in **development** stage. You may have to change it later for **production** stage.

**3. Configure database connection**

Set `MONGODB_CONNECT_URI` with connection string of your cluster. See [MongoDB docs](https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster) for details. The connection string looks like this :

```bash
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URI/DB_NAME?retryWrites=true&w=majority
```

**4. App is ready**

Now you are ready to [run the app](https://github.com/fityannugroho/faculty-upi#running-the-app) on local.

## Running The App

For run the app in development environment, use this command :

```bash
$ npm run start
```

See [nestjs.README.md](./nestjs.README.md#running-the-app) file for details.

Finally, you can access the endpoint from http://localhost:3000 by default, or depends on `PORT` settings at `.env` file.
