package com.eproject.backend.entities;
// Generated Jan 3, 2022, 8:04:04 PM by Hibernate Tools 5.1.10.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Role generated by hbm2java
 */
@Entity
@Table(name = "role", catalog = "photoshare")
public class Role implements java.io.Serializable {

	private Integer id;
	private Date createdAt;
	private String name;
	private Date updatedAd;
	private Set<UserRole> userRoles = new HashSet<UserRole>(0);

	public Role() {
	}

	public Role(Date createdAt, String name, Date updatedAd) {
		this.createdAt = createdAt;
		this.name = name;
		this.updatedAd = updatedAd;
	}

	public Role(Date createdAt, String name, Date updatedAd, Set<UserRole> userRoles) {
		this.createdAt = createdAt;
		this.name = name;
		this.updatedAd = updatedAd;
		this.userRoles = userRoles;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", nullable = false, length = 10)
	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@Column(name = "name", nullable = false, length = 20)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_ad", nullable = false, length = 10)
	public Date getUpdatedAd() {
		return this.updatedAd;
	}

	public void setUpdatedAd(Date updatedAd) {
		this.updatedAd = updatedAd;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
	public Set<UserRole> getUserRoles() {
		return this.userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

}
