package com.online.stock.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user_admin")
public class AdminUser {
    @Id
    @Column(name = "ID")
    private String username;
    @Column(name = "PASSWORD")
    private String password;

}
