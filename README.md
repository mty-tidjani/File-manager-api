# File Service API
This is an api for uploading, streaming and downloading files.
- With image files you can resize directly from the api by adding query parameters like *https?//myhost.com/img/my_image.jpg?w=200&h=200*.
- With video files on upload the thumbnail is extracted.

## Stack

 1. NodeJs
 2. Typescript
 3. MongoDB
 4. Express
 5. Winston
 6. FFMPEG
 7. Multer

## Start project
1 - Clone project

    $  git clone https://github.com/mty-tidjani/File-manager-api.git 

2 - Install dependencies

    $  npm install
or

    $  Yarn
3 - Run Test or check code
 Tslint

    $  npm run tslint
Test

    $  npm test
Test with coverage

    $  npm run test:cover

4 - Run app

    $  cp .env.example .env
    $  npm start
Verify service is running on localhost:4040 then you are good to go.
Modify/Update project to fit your Project needs and...

5 - Build/Deploy

    $  docker-compose up


By **MOMO Tidjani**

