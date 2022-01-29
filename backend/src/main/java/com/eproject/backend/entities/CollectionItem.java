package com.eproject.backend.entities;
// Generated Jan 3, 2022, 8:04:04 PM by Hibernate Tools 5.1.10.Final

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * CollectionItem generated by hbm2java
 */
@Entity
@Table(name = "collection_item", catalog = "photoshare")
@NoArgsConstructor
@Data
public class CollectionItem implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "collection_id", nullable = false)
	private Collection collection;

	@Temporal(TemporalType.DATE)
	@Column(name = "created_at", nullable = false, length = 10)
	private Date createdAt;

	@Column(name = "image_info", nullable = false)
	private String imageInfo;

	@Column(name = "image_url", nullable = false, length = 200)
	private String imageUrl;

	@Column(name = "is_premium", nullable = false)
	private boolean isPremium;

	@Temporal(TemporalType.DATE)
	@Column(name = "updated_at", nullable = false, length = 10)
	private Date updatedAt;

	public CollectionItem(Collection collection, Date createdAt, String imageInfo, String imageUrl, boolean isPremium,
			Date updatedAt) {
		this.collection = collection;
		this.createdAt = createdAt;
		this.imageInfo = imageInfo;
		this.imageUrl = imageUrl;
		this.isPremium = isPremium;
		this.updatedAt = updatedAt;
	}

}
