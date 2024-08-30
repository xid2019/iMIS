# iMIS

## Installation and Setup

1. **Install Git**  
   Download Git from [https://git-scm.com/download/win](https://git-scm.com/download/win)  
   Choose the 64-bit Git for Windows Setup.

2. **Download PostgreSQL and pgAdmin**  
   Visit [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)  
   Click "Download the Installer."

3. **Download Python**  
   Get Python from [https://www.python.org/downloads/](https://www.python.org/downloads/)

   - Check "Admin privileges" when installing `py.exe`.
   - Check "Add python.exe to PATH."
   - Click "Customized installation."
   - Check "Install Python for all users."

4. **Download Node.js**  
   Visit [https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)  
   Download the LTS version.

5. **Download dependencies for frontend**

   - Navigate to the `frontend` folder.
   - Run the command: `npm i`

6. **Download dependencies for backend**

   - Navigate to the `backend` folder.
   - Run the command: `pip install -r .\requirements.txt`

7. **Download VS Code**  
   [Visual Studio Code](https://code.visualstudio.com/) is recommended for development.

8. **Run historical migrations scripts**
   - Navigate to the `historical_migrations` folder.
   - Run the command: `python import_parts.py`

## Running the App

### On Mac:

1. Navigate to the `iMIS` folder.
2. Run the script: `./start-app-mac.sh`

### On Windows:

1. Navigate to the `iMIS` folder.
2.

## Modification

1. **Migrate whenever you change the data model.**
   - Run: `python manage.py makemigrations`
   - Then: `python manage.py migrate`
