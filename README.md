# iMIS

Installation and setup

1. install git
   https://git-scm.com/download/win
   64-bit Git for Windows Setup

2. download postgreSQL and pgadmin
   https://www.postgresql.org/download/windows/
   click the Download the Installer

3. download python
   https://www.python.org/downloads/
   check admin previliges when installing py.exe
   check add python.exe to path
   click customized installation
   check Install python for all users

4. download node.js
   https://nodejs.org/en/download/prebuilt-installer
   Download the LTS version

5. download dependencies for frontend
   cd into frontend folder
   run command: npm i

6. download dependencies for backend
   cd into backend folder
   run command: pip install -r .\requirements.txt

7. run historical migrations scritps
   cd into historical_migrations folder
   then run command: python import_parts.py 6. running the app
   on mac:
   cd into iMIS folder
   run ./start-app-mac.sh

on windows:

Modification
1, Have to migrate when ever change the data model.
python manage.py makemigrations
python manage.py migrate
