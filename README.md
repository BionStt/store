![.NET Core](https://github.com/aelassas/store/workflows/.NET%20Core/badge.svg)

# store

Microservices sample architecture using ASP.NET Core, Ocelot, MongoDB and JWT.

# Architecture

![Architecture](https://www.codeproject.com/KB/cs/5271708/architecture.jpg)

There are three microservices:

- **CatalogMicroservice**: allows to manage the catalog.
- **CartMicroservice**: allows to manage the cart.
- **IdentityMicroservice**: allows to manage users.

Each microservice implements a single businness capability and has its own MongoDB database.

There are two API gateways, one for the front end and one for the back end.

Below is the front end API gateway:

- **GET /catalog**: retrieves catalog items.
- **GET /catalog/{id}**: retrieves a catalog item.
- **GET /cart**: retrieves cart items.
- **POST /cart**: adds a cart item.
- **PUT /cart**: updates a cart item.
- **DELETE /cart**: deletes a cart item.
- **POST /identity/login**: performs a login.
- **POST /identity/register**: registers a user.
- **GET /identity/validate**: validates a JWT token.

Below is the back end API gateway:

- **GET /catalog**: retrieves catalog items.
- **GET /catalog/{id}**: retrieves a catalog item.
- **POST /catalog**: creates a catalog item.
- **PUT /catalog**: updates a catalog item.
- **DELETE /catalog**: deletes a catalog item.
- **POST /identity/login**: performs a login.
- **POST /identity/register**: registers a user.
- **GET /identity/validate**: validates a JWT token.

Finally, there are two client apps. A front end for accessing the store and a back end for managing the store.

The front end allows registered users to see the available catalog items, allows to add catalog items to the cart, and allows to remove catalog items from the cart.

Here is a screenshot of the store page in the front end:

![Front end](https://www.codeproject.com/KB/cs/5271708/frontend.jpg)

The back end allows admin users to see the available catalog items, allows to add new catalog items, and allows to remove catalog items.

Here is a screenshot of the store page in the back end:

![Back end](https://www.codeproject.com/KB/cs/5271708/backend.jpg)

# Source Code

![Source code](https://www.codeproject.com/KB/cs/5271708/solution.jpg)

- **CatalogMicroservice** project contains the source code of the microservice managing the catalog.
- **CartMicroservice** project contains the source code of the microservice managing the cart.
- **IdentityMicroservice** project contains the source code of the microservice managing users.
- **Middleware** project contains the source code of common functionalities used by microservices.
- **FrontendGateway** project contains the source code of the front end API gateway.
- **BackendGateway** project contains the source code of the back end API gateway.
- **Frontend** project contains the source code of the front end client app.
- **Backend** project contains the source code of the back end client app.

The source code is described on [CodeProject](https://www.codeproject.com/Articles/5271708/Microservices-using-ASP-NET-Core-Ocelot-MongoDB-an).

# How to Run the Application

You can run the application using IISExpress in Visual Studio 2019.

You will need to install MongoDB if it is not installed.

First, right click on the solution, click on properties and select multiple startup projects. Select all the projects as startup projects except Middleware project:

![vs](https://www.codeproject.com/KB/cs/5271708/vs-startup.jpg)

Then, press **F5** to run the application.

You can access the front end from https://localhost:44317/.

You can access the back end from https://localhost:44301/.

To login to the front end for the first time, just click on **Register** to create a new user and login.

To login to the back end for the first time, you will need to create an admin user. To do so, open Postman and execute the following POST request https://localhost:44397/api/identity/register with the following payload:

```js
{
  "email": "admin@store.com",
  "password": "password",
  "isAdmin": true
}
```
Finally, you can login to the back end with the admin user you created.

# Further Reading

- [Microservices architecture style](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
- [Health monitoring](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/monitor-app-health)
- [Load balancing](https://ocelot.readthedocs.io/en/latest/features/loadbalancer.html)
- [Testing ASP.NET Core services](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/test-aspnet-core-services-web-apps)
