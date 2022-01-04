package com.eproject.backend.entities;
// Generated Jan 3, 2022, 8:04:04 PM by Hibernate Tools 5.1.10.Final

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * ImageCategory generated by hbm2java
 */
@Entity
@Table(name = "image_category", catalog = "photoshare")
public class ImageCategory implements java.io.Serializable {

	private ImageCategoryId id;
	private Category category;
	private Image image;

	public ImageCategory() {
	}

	public ImageCategory(ImageCategoryId id, Category category, Image image) {
		this.id = id;
		this.category = category;
		this.image = image;
	}

	@EmbeddedId

	@AttributeOverrides({ @AttributeOverride(name = "imageId", column = @Column(name = "image_id", nullable = false)),
			@AttributeOverride(name = "categoryId", column = @Column(name = "category_id", nullable = false)) })
	public ImageCategoryId getId() {
		return this.id;
	}

	public void setId(ImageCategoryId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id", nullable = false, insertable = false, updatable = false)
	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id", nullable = false, insertable = false, updatable = false)
	public Image getImage() {
		return this.image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

}
