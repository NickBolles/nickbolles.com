## Getting started

### The quick route with docker
1. Pull and run the image

   ```sh
   docker run -it -p 8080:8080 registry.dev.nickbolles.com/nbolles/www_nickbolles_com:latest
   ```
   
2. The app should be running and accessible at http://localhost:8080

### The long route
1. Clone the project

   ```sh
   git clone https://gitlab.dev.nickbolles.com/nbolles/www_nickbolles_com.git
   ```
   
2. Navigate to the vue directory

   ```sh
   cd www_nickbolles_com/vue
   ```
   
3. Install dependencies

   ```sh
   npm i
   ```
   
4. Run the dev server with

    ```sh
    npm run dev
    ```
    
    A. Or you can build the production app with
    
      ```sh
      npm run build
      ```
       
    B. And run it with
    
     ```sh
     npm run start
     ```
