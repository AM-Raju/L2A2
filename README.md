## Instruction to run this project locally.

**Intro**

This backend project is build with typeScript, expressJS, mongoDB, and mongoose. We did some operations on user's data and user's order.

**Step 1:** Clone the project from git hub with this command.

```
git clone https://github.com/AM-Raju/L2A2.git
```

**Step 2:** After download use `cd` command to enter into project directory.

```
cd <project_folder>
```

**Step 3:** Run `npm install` to install the necessary dependencies.

```
npm install
```

**Step 4:** Connet your server with mongoDB and configure environment variable. Please have a look on `index.ts` file in `config` folder prior to configure environment variable.

**Step 5:** After successful configuration run the server with this command

```
npm run start:dev
```

The server will open on 5000 port. You will also get some additional command on `package.json` file to run this project.

#### API's of this project.

_01._ Create user in the DB.

```
POST /api/users/create-user
```

_02._ Get all users from DB.

```
GET /api/users
```

_03._ Get user by `userId`

```
GET /api/users/:userId
```

_04._ Delete user by `userId`

```
DELETE /api/users/:userId
```

_05._ Update user by `userId`

```
PUT /api/users/:userId
```

_06._ Insert order into user data.

```
PUT /api/users/:userId/orders
```

_07._ Get all orders of an user.

```
GET /api/users/:userId/orders
```

_08._ Calculate total order price of an user.

```
GET /api/users/:userId/orders/total-price
```
