package com.joy.holin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joy.holin.entity.Members;
import com.joy.holin.repo.MembersRepo;

@Service
public class MembersService {

	@Autowired
	private MembersRepo membersRepo;

	public Members verifyLogin(String email, String pwd) {

		Members members = membersRepo.findByEmail(email).orElse(null);
		if (members == null) {
			return null;
		}

		return members;
	}
}
