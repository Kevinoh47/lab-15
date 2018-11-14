![cf](http://i.imgur.com/7v5ASc8.png) Access Control (ACL)
==========================================================
## Heroku
https://codefellows-401-lab15.herokuapp.com/

## Travis
[![Build Status](https://travis-ci.com/Kevinoh47/lab-15.svg?branch=working15)](https://travis-ci.com/Kevinoh47/lab-15)

## Submission Instructions
  * Follow the instructions in the "Lab Instructions" documentation in the reference folder of the class repository

### Overview
Implement Role Based Authentication

#### Feature Tasks -- Server
* Protect your API Routes with the proper permissions based on user capability
  * `app.get('/schema')` should require the `superuser` capability
  * `app.get(...)` should require the `read` capability
  * `app.post(...)` should require the `create` capability
  * `app.put(...)` should require the `update` capability
  * `app.patch(...)` should require the `update` capability
  * `app.delete(...)` should require the `delete` capability

* You will need to create, allocate, and identify user permissions in the model
* You will need to restrict based on the given permission via middleware

#### Feature Tasks -- RESTy
* Add support for basic and bearer authentication
* You will need to add fields for those on the form
* You will need to pass those through, when present, in the superagent calls.

#### Test
* Add tests to the api routes, asserting restricted access to the routes as shown.

#### Documentation
Write a description of the project in your README.md, including detailed instructions for how to build your app. In your frontend README.md add a code block with your frontend .env vars, and in your backend README.md add a code block with your backend .env vars.
