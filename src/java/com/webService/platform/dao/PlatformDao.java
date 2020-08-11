package com.webService.platform.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.session.SqlSession;

import java.util.List;
import java.util.Map;

@Repository("PlatformDao")
public class PlatformDao {

    @Autowired
    private SqlSession SqlSession;

    public List<Map<String, Object>> selectAPI(Map<String, Object> commandMap) {
//        System.out.println("console_commandMap"+commandMap);
        return SqlSession.selectList("insertAPI", commandMap);
    }

    public List<Map<String, Object>> selectAPISecond(Map<String, Object> commandMap) {
        return SqlSession.selectList("insertAPISecond", commandMap);
    }
}
