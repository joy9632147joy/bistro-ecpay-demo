# Holin Bistro - 購物車與綠界金流串接demo

### 專案介紹
這是一個模擬精釀餐酒館（Holin Bistro）線上周邊商品販售的 Side Project。
本專案為**技術練習作品**，主要目的在於實作完整的「電商購物車邏輯」，並練習將 **Spring Boot 後端**、**JWT 資安驗證** 以及 **第三方支付（綠界科技 ECPay）** 進行實際的 API 串接與整合。

### 核心技術 (Tech Stack)
* **前端 (Frontend)**：HTML5, 原生 JavaScript, Bootstrap 5, CSS3
* **後端 (Backend)**：Java 17, Spring Boot, Spring Security, Spring Data JPA
* **資料庫 (Database)**：MySQL (實作關聯式資料庫設計)
* **資安與驗證 (Security)**：JWT (JSON Web Token) 跨域無狀態身分驗證
* **第三方串接 (3rd Party API)**：綠界科技 ECPay 全方位金流 API (AIO)

### 核心實作功能 (Features)

#### 1. 綠界金流完整串接 (ECPay Integration)
* 根據綠界 API 規範，使用 Java `MessageDigest` 實作 SHA-256 加密產生 `CheckMacValue`。
* 實作前端金流表單的動態生成與防止 XSS 攻擊的自動跳轉 (`submit()`) 機制。
* 處理金流授權成功後的 ClientBackURL 頁面導向邏輯。

#### 2. JWT 登入與權限驗證 (Security & Auth)
* 實作 Spring Security 搭配自定義 JwtFilter，攔截未經授權的結帳請求。
* **資安防護**：結帳時後端**僅認可 Token 中解析出的信箱資訊**來綁定訂單，徹底防止前端惡意篡改會員 ID 的資安風險（IDOR 漏洞防範）。

#### 3. 關聯式資料庫設計 (RDBMS Design)
* 嚴格遵守資料庫正規化，實作一對多 (One-to-Many) 的關聯設計。
* 清楚分離 `Orders`（訂單主檔）與 `OrderItems`（訂單明細檔），確保系統具備良好的擴充性與查詢效能。

#### 4. 購物車狀態管理 (Shopping Cart Logic)
* 前端使用原生 JavaScript 實作購物車的加入、刪除、數量增減。
* 動態計算總金額與購物車徽章數量。
