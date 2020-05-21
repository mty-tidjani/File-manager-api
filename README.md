# File Service API
This is an api for uploading, streaming and downloading files. Here I assume it is deployed with [SimpleApiGateway](https://github.com/mty-tidjani/SimpleApiGateway) on the same server so I don't check if user is authenticated or not. 

## Stack

 1. NodeJs
 2. Typescript
 3. MongoDB
 4. Mongo
 5. Express
 6. Winston
 7. ApiDoc
 8. FFMPEG
 9. Multer

## Start project
1 - Clone project

    $  git clone https://github.com/mty-tidjani/File-api-service.git 

2 - Install dependencies

    $  npm install
or

    $  Yarn
3 - Run Test or check code
 Tslint

     $  npm run tslint
Test

     $  npm run test
4 - Run app

    $  cp .env.example .env
    $  npm start
Verify service is running on localhost:4040 then you are good to go.
Modify/Update project to fit your Project needs and...

5 - Build/Deploy

    $  docker-compose up


**- Tidjani** :  Thank you!

**- You**: you're welcome.
