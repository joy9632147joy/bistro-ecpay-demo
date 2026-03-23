package com.joy.holin.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.joy.holin.entity.Orders;

@Service
public class EcpayService {

    @Value("${ecpay.merchant-id}")
    private String merchantId;

    @Value("${ecpay.hash-key}")
    private String hashKey;

    @Value("${ecpay.hash-iv}")
    private String hashIV;

    @Value("${ecpay.api-url}")
    private String apiUrl;

    public String createPaymentForm(Orders order) throws Exception {
        // 1. 建立參數 Map（按照綠界規定的欄位）
        Map<String, String> params = new TreeMap<>();
        params.put("MerchantID", merchantId);
        params.put("MerchantTradeNo", "HOLIN" + order.getId() + System.currentTimeMillis() % 10000);
        params.put("MerchantTradeDate", LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")));
        params.put("PaymentType", "aio");
        params.put("TotalAmount", String.valueOf(order.getTotalPrice()));
        params.put("TradeDesc", "HoLin53周邊商品");
        params.put("ItemName", "HoLin53周邊商品");
        params.put("ReturnURL", "http://localhost:8081/api/payment/notify"); // 綠界回調
        params.put("ClientBackURL", "http://localhost:8081/HolinProject_Products.html"); // 付款完成導向
        params.put("ChoosePayment", "Credit");
        // 2. 產生 CheckMacValue
        String checkMacValue = generateCheckMacValue(params);
        params.put("CheckMacValue", checkMacValue);

        // 3. 產生 HTML form（自動 submit 到綠界）
        StringBuilder form = new StringBuilder();
        form.append("<form id='ecpayForm' action='").append(apiUrl).append("' method='POST'>");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            form.append("<input type='hidden' name='").append(entry.getKey())
                    .append("' value='").append(entry.getValue()).append("'/>");
        }
        form.append("</form>");
        form.append("<script>document.getElementById('ecpayForm').submit();</script>");

        return form.toString();
    }

    private String generateCheckMacValue(Map<String, String> params) throws Exception {
        // 1. 按照 key 排序並串接
        StringBuilder sb = new StringBuilder();
        sb.append("HashKey=").append(hashKey).append("&");
        params.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(e -> sb.append(e.getKey()).append("=").append(e.getValue()).append("&"));
        sb.append("HashIV=").append(hashIV);

        // 2. URL encode 並轉小寫
        String encoded = URLEncoder.encode(sb.toString(), StandardCharsets.UTF_8)
                .toLowerCase()
                .replace("%2d", "-")
                .replace("%5f", "_")
                .replace("%2e", ".")
                .replace("%21", "!");

        // 3. SHA256 加密
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(encoded.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            hexString.append(String.format("%02X", b));
        }
        return hexString.toString();
    }

}
