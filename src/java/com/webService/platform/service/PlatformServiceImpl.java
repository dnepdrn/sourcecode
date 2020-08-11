package com.webService.platform.service;

import com.webService.platform.dao.PlatformDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlatformServiceImpl implements PlatformService {

    @Autowired
    PlatformDao PlatformDao;


    @Override
    public List<Map<String, Object>> selectAPI(Map<String, Object> commandMap) throws Exception {
        try {
            return PlatformDao.selectAPI(commandMap);
        } catch (Exception e) {
            e.getMessage();
            throw e;
        }
    }


    @Override
    public List<Map<String, Object>> selectAPISecond(Map<String, Object> commandMap) throws Exception {
        try {
            return PlatformDao.selectAPISecond(commandMap);
        } catch (Exception e) {
            e.getMessage();
            throw e;
        }
    }

}
