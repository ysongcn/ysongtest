package com.test.ysong.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.ysong.Application;
import com.test.ysong.Cache;
import com.test.ysong.models.Company;
import com.test.ysong.models.Owner;
import org.jetbrains.annotations.NotNull;
import spark.Request;
import spark.Response;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by ysong on 16/2/25.
 */
public class CompanyApi {
    static final Logger log = Logger.getGlobal();

    public static Object get(Request request, Response response) {
        String id = request.params("id");
        HashMap<String,Object> ret = new HashMap<String,Object>();

        if( "".equals(id) || id == null){ // get company list
            List<Company> list = Company.find.all();
            ret.put("list",list);

        }else{ // get company
            Company bean = Company.find.byId(Long.parseLong(id));
            ret.put("bean",bean);

        }

        response.status(200);
        return ret;
    }

    public static Object post(Request request, Response response) {
        HashMap<String,Object> ret = new HashMap<String,Object>();

        try {
            JsonNode data = new ObjectMapper().readTree(request.body());

            Company o  = new Company();

            o.setName(data.get("name").asText());
            o.setAddress(data.get("address").asText());
            o.setCity(data.get("city").asText());
            o.setCountry(data.get("country").asText());
            if(data.get("email")!=null) o.setEmail(data.get("email").asText());
            if(data.get("phone")!=null) o.setPhone(data.get("phone").asText());

            String strowner = data.get("owner").asText();

            o.save();
            if(strowner.indexOf(";") !=-1 && strowner.indexOf(",") != -1){
                String[] all = strowner.split(";");
                for (String s: all) {
                    String[] beanstr  = s.split(",");
                    Owner owner = Owner.find.byId(Long.parseLong(beanstr[1]));
                    owner.setCompany(o);
                    owner.update();
                }
            }

            ret.put("id",o.getId());
            log.log(Level.INFO,"new company saved: id="+o.getId());
        } catch (IOException e) {
            e.printStackTrace();
            log.log(Level.WARNING,"Exception:"+e.getMessage());
        }
        return ret;
    }

    public static Object put(Request request, Response response) {
        HashMap<String,Object> ret = new HashMap<String,Object>();

        try {
            JsonNode data = new ObjectMapper().readTree(request.body());

            Company o  = Company.find.byId(Long.parseLong(data.get("id").asText()));
            o.setName(data.get("name").asText());
            o.setAddress(data.get("address").asText());
            o.setCity(data.get("city").asText());
            o.setCountry(data.get("country").asText());
            if(data.get("email")!=null) o.setEmail(data.get("email").asText());
            if(data.get("phone")!=null) o.setPhone(data.get("phone").asText());

            String strowner = data.get("owner").asText();

            o.save();


            if(strowner.indexOf(";") !=-1 && strowner.indexOf(",") != -1){
                String[] all = strowner.split(";");
                for (String s: all) {
                    String[] beanstr  = s.split(",");
                    Owner owner = Owner.find.byId(Long.parseLong(beanstr[1]));
                    if(owner!=null){
                        owner.setCompany(o);
                        owner.update();
                    }
                }
            }

            Owner.find.where().eq("company_id",null).findList().forEach((owner)->{
                owner.delete();
            });

            ret.put("id",o.getId());
            log.log(Level.INFO,"new company saved: id="+o.getId());
        } catch (IOException e) {
            e.printStackTrace();
            log.log(Level.WARNING,"Exception:"+e.getMessage());
        }
        return ret;
    }

    public static Object delete(Request request, Response response) {
        String id = request.params("id");

        if( "".equals(id) || id == null) {
            log.log(Level.WARNING,"Exception: remove null id owner");

        }else{
            Long tid = Long.parseLong(id);

            Company c = Company.find.byId(tid);
            if(c!=null){
                c.getOwners().forEach((o)->{
                    o.delete();
                });
                c.delete();
            }
            log.log(Level.INFO,"owner deleted: id="+tid);

        }
        return "ok";
    }

}
