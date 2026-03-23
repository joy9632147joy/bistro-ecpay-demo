package com.joy.holin.controller;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.holin.dto.OrderDto;
import com.joy.holin.dto.OrderRequestDto;
import com.joy.holin.entity.Orders;
import com.joy.holin.repo.OrdersRepo;
import com.joy.holin.service.EcpayService;
import com.joy.holin.service.OrderService;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrdersRepo ordersRepo;

    @Autowired
    private EcpayService ecpayService;

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDto requestDto, Authentication authentication) {
        try {
            // 從 JWT 中取得當前登入者的 Email
            String userEmail = authentication.getName();

            // 把 Email 傳給 Service
            OrderDto order = orderService.createOrder(requestDto, userEmail);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<?> getOrdersByMember(@PathVariable("memberId") Long memberId) {
        return ResponseEntity.ok(orderService.getOrdersByMember(memberId));
    }

    @PostMapping("/checkout/{orderId}")
    public ResponseEntity<?> checkout(@PathVariable("orderId") Long orderId) {
        try {
            OrderDto result = orderService.checkout(orderId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 2. ===== 新增這個 API 讓前端拿綠界 HTML 表單 =====
    @GetMapping("/payment/form/{orderId}")
    public ResponseEntity<?> getPaymentForm(@PathVariable("orderId") Long orderId) {
        try {
            // 從資料庫找出這筆訂單
            Orders order = ordersRepo.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("查無訂單"));

            // 呼叫 EcpayService 產生綠界的 HTML 表單字串
            String form = ecpayService.createPaymentForm(order);

            // 將表單字串回傳給前端
            return ResponseEntity.ok(form);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
