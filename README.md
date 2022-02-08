That start this project you need install some library. Open terminal and enter next:
- sudo apt-get install docker-ce docker-ce-cli containerd.io
- npm install -g npm 

When you download application in your computer - need rename file 'env.example' to '.env'


1.Run backend:

1.1 in /TestTask enter : sudo docker-compose up --build

1.2 you get error "django.db.utils.OperationalError: (2002, "Can't connect to MySQL server on 'db' (115)"))" and press "CTRL+C"

1.3 when container is stopping enter "sudo docker-compose up --build" 

   1.3.1 if you get previous error or another make next: in /TestTask enter 'sudo chmod -R 0777 *' and get started from point "1.1"

1.4 when container is running open new terminal window and enter next:

   1.4.1 In /TestTask enter 'sudo docker-compose exec web bash' (You entry in backend_TestTask container)

   1.4.2 Enter : /cd backend

   1.4.3 python3 manage.py makemigrations

   1.4.4 Enter : python3 manage.py migrate

   1.4.5 Wait when migrate is finished and close this terminal window

1.5 Then you need restart docker-container ('CTRL+C' and then 'sudo docker-compose up')

2.Run frontend:

2.1 open new terminal window and go in /TestTask/frontend 

2.2 enter : npm start

Application is running.
