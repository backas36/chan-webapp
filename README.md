# ChanChan

## A awesome website + ERP admin panel

[![N|Solid](https://firebasestorage.googleapis.com/v0/b/chanchan-368709.appspot.com/o/others%2Fchanchan-01.jpg?alt=media&token=d67b2d45-df59-456a-90d1-076b0e8d7331)](https://firebasestorage.googleapis.com/v0/b/chanchan-368709.appspot.com/o/others%2Fchanchan-01.jpg?alt=media&token=d67b2d45-df59-456a-90d1-076b0e8d7331)

The inspiration of this side porject is from my best friend. Since her business just start-up, and ask me build one ERP system cloud help her recording cost and item manage.

- [Demo Link](https://chan-web.onrender.com)
  - test account/password : test@test.com / 12qwaszx!
- [Backed Souce code](https://github.com/backas36/chan-server)

## Table of Conect

---

- [Project Status](#project-status)
- [Technologies](#technologies)
- [Tool/3party I used](#tool/3party-i-used)
- [Modules](#modules)
- [User Stories](#user-stories)
- [Folder Structure](#folder-structure)
- [Summary](#summary)

## Project Status

---

The project status is in staging phase, backend, database, redis, and static website all render in render.com.

## Technologies

---

- Frontend
  react hooks, react-router-dom v6, redux-toolkit, rtk query, Material UI, google oauth
- Backend
  express, knex, postgreSql, redis
- Deploy
  docker for local deveploment
- Tools
  VS Cod for frontend, intelliJ IDEA for backend.

## Tool/3party I used

---

- mui/x-data-grid, mui/x-date-picer, emotion
- redux-toolkit, redux-state-sync
- async-mutex
- date-fns
- env-cmd
- formik, yup
- i18next
- react-toastify
- recharts

## Modules

---

- Authentication ✔️
- User ✔️
- Users ✔️
- Users Actions Log ✔️
- Inventory (building ...)
- Suppliers (building ...)

## User Stories

---

[x] It can toggle light/dark theme on the topbar.
[x] It can toggle en/zh-TW language on the topbar.
[x] User can register by own system or login with google oauth to login.
[x] User can change password, upload avatar, manage own account detail.
[x] User can reset password in the safe way if forgot password to login.
[x] It can manage users, if user role is up to editor level.
[x] It can setup password to acvitate the account after the manager create a user.
[x] It can view admin panel everthing, if user role is up to basic level.
[ ] It can add inventory, and calculate the product cost automatically by user role is up to editor level.
[ ] It can add product detail, and the front site would show in products page by user role is up to editor level.

### Folder structure

- public
  manifest, index.html, favicon
- src
  - assests
    - images, styles, theme config, i18n data
  - components
    - global components, and components which use for pages.
  - features
    - main folder for build project
    - modules functions of project.
    - It has components, hooks, services, or utils if features need.
  - hooks
    - global hooks
    - eg. useToggle, useCustomTheme ...
  - layout
    - global ui layout, page ui wrapper
  - lib
    - some third party tool
    - eg. i18n instance
  - pages
    - the file would match of each route.
  - routes
    - routes maneger
  - services
    - rtk query config, firbase config, glocal context(store)
  - utils
    - the fucntions use for globally.

## Summary

---

Actually, I haven't used redux-toolkit in any react project before, since it's not too big project I made. But It looks very easy to manage states, and clean code for project after I study redux-toolkit documents.
So it inspire me to implement everything in project by redux-toolit.

And due to setup redux-toolkit for project, I think it's good chance to check the power of rtk query in this project. (Eg. You don't need to store data in state after fetching api.)

It's not quite much reference of how to use rtk query. But the offcial document expain very clearly for everything. I think it's good chance for me to learn how to read documents, and custom code in my case as a junior developer.

The conclusion of this project, I implement every thing in enterprise level as possible even it just a side porject. So I learned a lot of skill, and use much tool I haven't used before, like redis, docker, or other react eco system library.
