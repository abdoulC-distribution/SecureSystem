
This project is a secure authentification and access control system designed to protect applications through cryptographic mechanisms and system level security

### Before running the project
- Clone the project from github in a folder 
- Create another folder, for example called dbData 
- Be positionned in the right directory to install all the dependencies 
- npm install 
- Create a **.env.local** file at the root with: 
JWT_SECRET=secret_key

### How to run the project
- Be positionned in the right directory, that is to say inside secure-system file
- Launch 
#    
    npm run dev  
    mongod --dbpath dbData with the good path to reach dbData
#
at the same time in two differents terminal
- Go to localhost:3000 to see the app and use it 
