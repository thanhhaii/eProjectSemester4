package com.eproject.backend.entities;
// Generated Jan 3, 2022, 8:04:04 PM by Hibernate Tools 5.1.10.Final

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * Image generated by hbm2java
 */
@Entity
@Table(name = "image", catalog = "photoshare")
@Data
@NoArgsConstructor
public class Image implements java.io.Serializable {

    @Id

    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(name = "created_at", nullable = false, length = 10)
    private Date createdAt = new Date();

    @Column(name = "image_info")
    private String imageInfo;

    @Column(name = "image_url", nullable = false, length = 200)
    private String imageUrl;

    @Column(name = "is_premium", nullable = false)
    private boolean isPremium = false;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false, length = 10)
    private Date updatedAt = new Date();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
    private Set<ImageCategory> imageCategories = new HashSet<ImageCategory>(0);

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
    private Set<ImageCollection> imageCollections = new HashSet<ImageCollection>(0);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Image(String imageUrl, User user) {
        this.imageUrl = imageUrl;
        this.user = user;
    }

    public Image(String id, Date createdAt, String imageInfo, String imageUrl, boolean isPremium, Date updatedAt,
                 String userId, Set<ImageCategory> imageCategories) {
        this.id = id;
        this.createdAt = createdAt;
        this.imageInfo = imageInfo;
        this.imageUrl = imageUrl;
        this.isPremium = isPremium;
        this.updatedAt = updatedAt;
        this.user.setId(userId);
        this.imageCategories = imageCategories;
    }

}
