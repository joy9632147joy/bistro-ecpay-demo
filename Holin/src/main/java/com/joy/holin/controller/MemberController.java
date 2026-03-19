package com.joy.holin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.holin.dto.MemberLoginDto;
import com.joy.holin.entity.Members;
import com.joy.holin.service.MembersService;

@RestController
@RequestMapping("/auth")
public class MemberController {

	@Autowired
	private MembersService membersService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginDto loginDto) {
		Members members = membersService.verifyLogin(loginDto.getEmail(), loginDto.getPwd());

		if (members == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("帳號或密碼錯誤");
		}

		return ResponseEntity.ok(members);
	}
}
