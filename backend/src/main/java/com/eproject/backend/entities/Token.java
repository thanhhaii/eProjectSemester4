package com.eproject.backend.entities;
// Generated Jan 3, 2022, 8:04:04 PM by Hibernate Tools 5.1.10.Final

import com.eproject.backend.common.TokenType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import javax.persistence.*;

/**
 * Token generated by hbm2java
 */
@Entity
@Table(name = "token", catalog = "photoshare")
@Data
public class Token implements java.io.Serializable {

	@Id

	@Column(name = "id", unique = true, nullable = false)
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
	)
	private String id;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Temporal(TemporalType.DATE)
	@Column(name = "expire_at", nullable = false, length = 10)
	private Date expireAt;

	@Temporal(TemporalType.DATE)
	@Column(name = "issued_at", nullable = false, length = 10)
	private Date issuedAt = new Date();

	@Column(name = "token_type", nullable = false, length = 1)
	private int tokenType = TokenType.TYPE_TOKEN_USER;

	public Token() {
	}

	public Token(User user, Date expireAt, int tokenType) {
		this.user = user;
		this.expireAt = expireAt;
		this.tokenType = tokenType;
	}

}
