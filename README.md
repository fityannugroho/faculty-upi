# Faculty UPI API

---

## Table of Contents

1. [Description](#description)
2. [Framework & Database](#framework--database)
3. [API Endpoint](#api-endpoint)
4. [Environment Settings](#environment-settings)
5. [Running the App](#running-the-app)

---

## Description

This is a Public API that contains general information such as attributes or names of faculties, regional campuses, and study programs at [**Universitas Pendidikan Indonesia (UPI)**](https://www.upi.edu), ranging from undergraduate to doctoral levels.

## Framework & Database

This project use [NestJS](https://nestjs.com) framework that writes in Typescript, and use [MongoDB](https://www.mongodb.com) database. The database contains 2 collection, `faculties` and `studies`.

> Furthermore, The **'faculty'** term refers to both 'faculty' and 'regional campus' because both have same level and similar entities.

`faculties` collection stores all of faculty `document` that each document has fields:

- `_id`, The auto generated document id by MongoDB.
- `code`, The code of faculty (_primary key_).
- `name`, The name of faculty.
- `abbr`, The abbreviation of faculty's name.

`studies` collection stores all of study program `document` that each document has fields:

- `_id`, The auto generated document id by MongoDB.
- `code`, The code of study program (_primary key_).
- `name`, The name of study program.
- `faculty`, The faculty's code of study program (_foreign key_).

## API Endpoint

### Get All Faculties

```
GET /faculties
```

- Use this endpoint to get all of faculty.
- It will return an array of faculty.
- Usage example : https://faculty-upi.herokuapp.com/faculties

### Get Specific Faculty

```bash
GET /faculties/{facultyCode}
```

- Use this endpoint to get a specific faculty by its code.
- The `facultyCode` must be **an alphabet character**. If not, you will get `400 Bad Request` response.
- The response will be `404 Not Found` if there are no faculty with code that equals to `facultyCode`.
- Usage example : https://faculty-upi.herokuapp.com/faculties/a

### Get Study Programs in Faculty

```
GET /faculties/{facultyCode}/studies
```

- Use this endpoint to get all of study programs in a specific faculty.
- The `facultyCode` must be **an alphabet character**. If not, you will get `400 Bad Request` response.
- The response will be `404 Not Found` if there are no faculty with code that equals to `facultyCode`.
- Usage example : https://faculty-upi.herokuapp.com/faculties/a/studies

### Find Faculties by Name

```
GET /faculties/name/{facultyName}
```

- Use this endpoint to find faculties by its name.
- The `facultyName` must be **at least 3 characters**. If not, you will get `400 Bad Request` response.
- The response will be an **empty array** `[]` if there are **no faculty matched** with `facultyName`.
- Usage example : https://faculty-upi.herokuapp.com/faculties/name/kampus

### Find Faculties by Abbreviation

```
GET /faculties/abbr/{facultyAbbr}
```

- Use this endpoint to find faculties by its abbreviation.
- The `facultyAbbr` must be **at least 3 characters**. If not, you will get `400 Bad Request` response.
- The response will be an **empty array** `[]` if there are **no faculty matched** with `facultyAbbr`.
- Usage example : https://faculty-upi.herokuapp.com/faculties/abbr/kamda

### Get All Study Programs

```
GET /studies
```

- Use this endpoint to get all of study program.
- It will return an array of study program.
- Usage example : https://faculty-upi.herokuapp.com/studies

### Get Spesific Study Program

```
GET /studies/{studyCode}
```

- Use this endpoint to get a specific study program by its code.
- The `studyCode` must be **4 alphanumeric characters**. If not, you will get `400 Bad Request` response.
- The response will be `404 Not Found` if there are no study program with code that equals to `studyCode`.
- Usage example : https://faculty-upi.herokuapp.com/studies/G505

### Find Study Program by Name

```
GET /studies/name/{studyName}
```

- Use this endpoint to find study programs by its name.
- The `studyName` must be **at least 3 characters**. If not, you will get `400 Bad Request` response.
- The response will be an **empty array** `[]` if there are **no study program matched** with `studyName`.
- Usage example : https://faculty-upi.herokuapp.com/studies/name/pendidikan

> Go to [**API documentation**](https://faculty-upi.herokuapp.com) for more details about the endpoint, and also **try to use** it in the 'playground'.

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
