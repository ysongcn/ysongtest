package com.test.ysong.models;


import com.avaje.ebean.Model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by ysong on 16/2/25.
 */


@Entity
@Table(name="app_company")
public class Company extends Model{

    public static final Finder<Long,Company> find = new Finder<>(Long.class, Company.class);

    @Id
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String city;

    @Column
    private String country;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private String phone;

    @OneToMany
    private List<Owner> owners;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Owner> getOwners() {
        return owners;
    }

    public void setOwners(List<Owner> owners) {
        this.owners = owners;
    }
}
