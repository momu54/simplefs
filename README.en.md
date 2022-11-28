# Simple file system

## This file was translated using Google!!!!

English | [Traditional Chinese](https://github.com/MoMuAlt/simplefs/blob/main/README.md)

## Why am I doing this

When I was diagnosed and quarantined  
The whole class is writing a practice paper before the exam  
I don't know what to do in front of the computer  
Hence this somewhat useless repository

## Why do this and not something else

I've always wanted to turn my old computer at home into a cloud drive  
Tried smb, WebDAV, etc.  
But it's not working all the time  
smb often fails to log in on windows  
WebDAV settings are super invincible and troublesome (for a lazy person like me)  
So I just made this  
Very easy to use file sharing program

## Function

1. Simply list files (".." for previous folder)
2. **Very insecure** password function (please do not put secrets in the server)

## warn

1. This program is super invincible and unsafe (probably the little brother on the roadside can crack it)
2. This program often crashes (when I test, I just fix it if I encounter any problems, and forget it if I don’t encounter any problems, Good Luck!)

## how to use

If you already know how rubbish this program is and you insist on using it  
You can follow the steps below

1. Copy this repository to your computer

    ```pwsh
    git clone https://github.com/MoMuAlt/simplefs/
    ```

2. Go to the repository folder

    ```pwsh
    cd simplefs
    ```

    Or use File Explorer to enter
    as long as you are happy

3. Install node.js

    Go to the [official website](https://nodejs.org) of node.js
    Download the **Current** version (LTS I haven't tested)
    and install

4. Add certificate

    1. ~~ Find a way to get an ssl certificate~~(cough cough)  
       You can also self-sign the certificate, too many people on the Internet teach, I don’t need to talk about it  
       If you're too lazy to Google  
       I can help you, click [here](https://google.com/search?q=self+signed+certificate)

    - We need a .pem public key and a .key private key

    2. Put them into this folder
    3. Remember the names of these two files

5. Setting up the environment

    1. Make a copy of `.env.example` and name it `.env`
    2. Update the env file
        ```dotenv
        cert=<your public key file name>
        key=<your private key file name>
        passwd=<password you want to set>
        ```
        Change the words in <>
    3. Install dependencies

        ```pwsh
        yarn
        ```

6. Execute!

    ```pwsh
    yarn start
    ```

7. connect up

    Then you can connect to https://\<your IP\>:8443/?passwd=\<your password\>
    Generally speaking, he will list the files of you and the directory
    If not, please open an issue
