# Projectui - 3bees.io

### Objective : 

 	1. Show list of Items in a listview and frontend should have the capability of receiving push notification.
 	2. Showing Client Token.
 	3. Should support Refresh Page Action &  Clear Page Action.

### Pre-requirement :

​	Before start running the project these are the mandatory steps has to be followed.

  		1. Enter command to pull all the npm modules
         		1. **npm install**
		2. Change the fcm-client credentials in the config.js. (Location : projectui\src\config\config.js)
		3.  Change the message messagingSenderId in the firebase-messaging-sw.js (Location  : projectui\public\firebase-messaging-sw.js).
		4. Finally your ready to go with
     		1. CMD >  **npm start**
		5. Copy the Client Token And paste it in the under nodejs backend project -> config.yaml -> clienttoken



### Sample Image : 

1. While starting our APP.

​	![](E:\workspace\testproject\projectui\emptylist.PNG)

2. Notification push message.

   ![](E:\workspace\testproject\projectui\pushmessage.PNG)

3. List Items

   ![](E:\workspace\testproject\projectui\listwithItem.PNG)

   4.Exception case

   ![](E:\workspace\testproject\projectui\exceptionhandling.PNG) 

   5. List overflow

      ![](E:\workspace\testproject\projectui\overflow_list.PNG)

### (#NOTE : Don't change REACTJS project port,Because CORS Handled for port 3000 )



# ​			    THANK YOU