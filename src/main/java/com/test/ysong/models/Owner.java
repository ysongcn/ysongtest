package com.test.ysong.models;

import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by ysong on 16/2/25.
 */
@Entity
@Table(name="app_owner")
public class Owner extends Model {

    @Id
    private Long id;

    @Column
    private String name;

}
