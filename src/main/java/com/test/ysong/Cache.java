package com.test.ysong;


import org.ehcache.CacheManagerBuilder;
import org.ehcache.config.CacheConfigurationBuilder;

public class Cache {

    static org.ehcache.Cache<Long, String> TOKEN_MAP;
    static org.ehcache.Cache<String, String> VCODE_MAP;
    static org.ehcache.Cache<String, String> API_TOKEN_MAP;

    public static org.ehcache.Cache<Long,String> tokenMap(){
        if(TOKEN_MAP==null) TOKEN_MAP = CacheManagerBuilder.newCacheManagerBuilder()
                .build(true).createCache("TOKEN_MAP",
                        CacheConfigurationBuilder
                                .newCacheConfigurationBuilder()
                                .buildConfig(Long.class, String.class));
        return TOKEN_MAP;
    }


    public static org.ehcache.Cache<String,String> apiTokenMap(){
        if(API_TOKEN_MAP==null) API_TOKEN_MAP = CacheManagerBuilder.newCacheManagerBuilder()
                .build(true).createCache("API_TOKEN_MAP",
                        CacheConfigurationBuilder
                                .newCacheConfigurationBuilder()
                                .buildConfig(String.class, String.class));
        return API_TOKEN_MAP;
    }


}
