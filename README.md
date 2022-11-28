# 簡單檔案系統

[English](https://github.com/MoMuAlt/simplefs/blob/main/README.en.md) | 繁體中文

## 為甚麼我要做這個東西

在我確診被隔離的時候  
全班在寫段考前練習卷  
我在電腦前不知道要幹嘛  
所以才有這個有點沒用的儲存庫

## 為什麼是做這個而不是其他東西

我一直一來都很想要把家裡的舊電腦改成雲端硬碟  
嘗試過 smb, WebDAV 等等  
但是一直都很不好用  
smb 在 windows 常常登不進去
WebDAV 設定超級無敵麻煩(對於我這個懶人來說)  
所以我順手做了這個  
非常易於使用的檔案分享程式

## 功能

1. 簡單的列出檔案 (..為上一個資料夾)
2. **非常沒有安全性**的密碼功能 (請不要把機密放在伺服器裡面)

## 警告

1. 這個程式超級無敵不安全 (大概路邊小弟弟都能破解)
2. 這個程式常常 crash (我測試的時候就是遇到什麼問題就修, 沒遇到就算了, Good Luck!)

## 如何使用

如果你已經明白這個程式有多垃圾你還堅持要用的話  
你可以遵循以下步驟

1. 把這個儲存庫複製到你的電腦裡

    ```pwsh
    git clone https://github.com/MoMuAlt/simplefs/
    ```

2. 進到儲存庫資料夾

    ```pwsh
    cd simplefs
    ```

    或者是用檔案總管進  
    你高興就好

3. 安裝 node.js 和 yarn

    1. 到 node.js 的[官網](https://nodejs.org)  
       下載**Current**版本 (LTS 我沒測試)  
       並安裝

    2. 安裝 yarn

    ```pwsh
    npm install -g yarn
    ```

4. 添加證書

    1. ~~想辦法搞一個 ssl 證書~~(咳咳)  
       你也可以自簽名證書, 這個網路上太多人教了, 我不需要講  
       如果你懶得 Google 的話  
       我可以幫你, 點[這裡](https://google.com/search?q=self+signed+certificate)

    - 我們需要一個.pem 公鑰跟一個.key 私鑰

    2. 把他們放到這個資料夾裡面
    3. 記住這兩個檔案的名稱

5. 設定環境

    1. 把`.env.example`複製一份, 並命名為`.env`
    2. 更新 env 檔案
        ```dotenv
        cert=<你的公鑰檔名>
        key=<你的私鑰檔名>
        passwd=<你想設定的密碼>
        ```
        將<>中的字改掉
    3. 安裝依賴

        ```pwsh
        yarn
        ```

6. 執行!

    ```pwsh
    yarn start
    ```

7. 連上去

    接下來就可以連到 https://\<你的 IP\>:8443/?passwd=\<你的密碼\>  
    一般來說他會列出你跟目錄的檔案  
    如果沒有的話請發個 issue
