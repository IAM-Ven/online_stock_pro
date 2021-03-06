package com.online.stock.services.impl;

import com.online.stock.dto.SysGroup;
import com.online.stock.dto.request.SystemVarAddReq;
import com.online.stock.dto.response.SystemVarRes;
import com.online.stock.model.SysVar;
import com.online.stock.repository.SysVarRepository;
import com.online.stock.services.ISystemVarService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemVarService implements ISystemVarService {
    @Autowired
    private SysVarRepository sysVarRepository;
    @Override
    public List<SysVar> getListSysVar() {
        List<SysVar> sysVarList = sysVarRepository.findAll();
        return  sysVarList;
    }

    @Override
    public void addSysVar(SystemVarAddReq req) {
        SysVar sysVar = new SysVar();
        BeanUtils.copyProperties(req, sysVar);
        sysVar.setGrname(req.getGrname().name());
        sysVarRepository.save(sysVar);
    }

    @Override
    public void updateSysVar(SystemVarAddReq req) {
        SysVar sysVar = sysVarRepository.findFirstByGrnameAndVarname(req.getGrname().name(),
                req.getVarname());
        if (sysVar != null) {
            BeanUtils.copyProperties(req, sysVar);
            sysVarRepository.save(sysVar);
        }
    }

    @Override
    public void deleteSysVar(String sysGroup, String varName) {
        SysVar sysVar = sysVarRepository.findFirstByGrnameAndVarname(sysGroup,
                varName);
        if (sysVar != null) {
            sysVarRepository.delete(sysVar);
        }
    }
}
