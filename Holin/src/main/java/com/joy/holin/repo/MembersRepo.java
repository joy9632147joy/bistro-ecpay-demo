package com.joy.holin.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joy.holin.entity.Members;

public interface MembersRepo extends JpaRepository<Members, Long> {

	Optional<Members> findByEmail(String email);
}
