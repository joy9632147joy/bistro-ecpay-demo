package com.joy.holin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.holin.dto.MemberLoginDto;
import com.joy.holin.dto.MemberRegisterDto;
import com.joy.holin.entity.Members;
import com.joy.holin.service.MembersService;
import com.joy.holin.util.JwtToken;

@RestController
@RequestMapping("/api/customer")
public class MemberController {

	@Autowired
	private MembersService membersService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody MemberRegisterDto registerDto) {
		try {
			membersService.register(registerDto);
			return ResponseEntity.ok("註冊成功");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginDto loginDto) {
		Members members = membersService.verifyLogin(loginDto.getEmail(), loginDto.getPwd());

		if (members == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("帳號或密碼錯誤");
		}

		String jwtToken = JwtToken.createTokenWithRole(members.getEmail(), "CUSTOMER");
		return ResponseEntity.ok(Map.of("token", jwtToken));
	}

}
