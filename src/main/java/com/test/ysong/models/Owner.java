package com.test.ysong.models;

import com.avaje.ebean.Model;

import javax.persistence.*;

/**
 * Created by ysong on 16/2/25.
 */
@Entity
@Table(name="app_owner")
public class Owner extends Model {
    public static final Finder<Long,Owner> find = new Finder<>(Long.class, Owner.class);

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Company company;

    @Id
    private Long id;

    @Column
    private String name;

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
