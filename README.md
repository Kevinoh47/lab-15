![cf](http://i.imgur.com/7v5ASc8.png) Access Control (ACL)
==========================================================
## Heroku
https://codefellows-401-lab15.herokuapp.com/

## Travis
[![Build Status](https://travis-ci.com/Kevinoh47/lab-15.svg?branch=working15)](https://travis-ci.com/Kevinoh47/lab-15)

## Notes
We have a users collection and a roles collection. We use a virtual join on the user.role = roles.role to add an ACL to check a user's permissions.

Here is the output a mongodb query, db.roles.find():
{ "_id" : ObjectId("5bf384f83f9ddfc765140019"), "role" : "admin", "capabilities" : [ "create", "read", "update", "delete" ] }
{ "_id" : ObjectId("5bf388d63f9ddfc76514001a"), "role" : "editor", "capabilities" : [ "create", "read", "update" ] }
{ "_id" : ObjectId("5bf389053f9ddfc76514001b"), "role" : "user", "capabilities" : [ "read" ] }
{ "_id" : ObjectId("5bf39b2c3f9ddfc76514001c"), "role" : "superuser", "capabilities" : [ "create", "read", "update", "delete", "superuser" ] }

We use auth middleware to protect the routes based on role capabilities. For example, the get /api/v1/:model/schema requires the "superuser" capability, which is only granted to the "superuser" role. Any user who wants to see a schema, must be currently assigned the "superuser" role.


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
