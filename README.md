# Order Management System

## This project uses

#### Backend

* Ruby 2.7.0

* Rails 6.0.3.2

* Postgresql 12.3

#### Frontend

* Yarn 1.22.4

* Webpacker

* React.js

* Bootstrap 4.5.0

* Redux

## Project setup

### Install dependencies

```bash
bundle install
yarn install
```

### Create database

```bash
rails db:create db:migrate
```

## Run the application

```bash
rails s -b 0.0.0.0 -p 3000 & bin/webpack-dev-server
```
