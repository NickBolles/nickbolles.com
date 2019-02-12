## Getting started

### The quick route with docker
1. Run and pull the image
```
docker run -it -p 8080:8080 registry.dev.nickbolles.com/nbolles/www_nickbolles_com:latest
```
2. The app should be running and accessible
* http://localhost:8080

### The long route
1. Clone the project
```
git clone https://gitlab.dev.nickbolles.com/nbolles/www_nickbolles_com.git
```
2. Navigate to the vue directory
```
cd www_nickbolles_com/vue
```
3. Install dependencies
```
npm i
```
4. run the dev server with
```
npm run dev
```
5. Or you can build the production app with
```
npm run build
```
6. and run it with
```
npm run start
```
