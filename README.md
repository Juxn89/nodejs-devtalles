# REST Server | TypeScript
## Commands
- Create **tsconfig.json** file: ```tsc ---init```
- Install and set-up **TSLint**
 - Install dev dependencies: ```npm i typescript tslint -D -E```
 - Execute __TSLint__: ```.\node_modules\.bin\tslint --init```

 ## Set-up
 ### Common
 - Create **.env** file, you can use as reference **env.template** file
 - Make sure fill all environment variables
 
 ### Docker 
 - Run following commands: ```docker-compose up -d mysql``` and ```docker-compose up -d phpmyadmin```