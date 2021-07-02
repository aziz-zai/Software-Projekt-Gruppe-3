   **DEPLOY YOUR PROJECT**

   **1. STEP (DONE)**

   ---npm run build---

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

   **2. STEP (DONE)**

   --move the build file to the static folder in your flask application--

   **3. STEP (DONE)**

   --create a app.yaml file--

   **4. STEP (DONE)**

   --connect to google cloud--

    4.1 - create a new project
    4.2 - create a sql instance with you database settings. (MYSQL)
        4.2.1 - create a cloud database
    4.3 - create a cloud storage bucket
        4.3.1 - import your sql dump file
    4.4 - go back to your sql instance and upload your dump file from the cloud storage bucket
    4.5 - go to "APIS und Dienste", search for sql and activate
    4.6 - to test your cloud database. - go to your sql instance dashboard and open "cloud shell" 
        4.6.1 - connect to your instance and select your database

   **5. STEP (DONE)**

 -- connect locally and create a GAE App --
 
    5.1 - get a list of your gcloud sql instances in your terminal with "gcloud sql instances list" 
    5.2 - get your Google App Engine with "gcloud projects describe [projectnumber]"
    5.3 - Create a new App in GAE
        5.3.1 - with "gcloud app create -project=[projectid]" in terminal OR with GAE Dashboard
        
   **6. STEP**

 ---upload files to Google cloud--
 
    6.1 - go to your path you want to deploy from and copy with "dir"
    6.2 - deploy app with "gcloud app deploy"
    6.3 - show in browser with "gcloud app browser"

     
