package com.online.stock.model;

import com.online.stock.dto.response.HandleAccResponse;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "V_GENERAL_INFO")
public class VGeneralInfo {
    @Id
    @Column(name = "CUSTID")
    private String custId;
    @Column(name = "REAL_MARGRATE")
    private float realMargrate;
    @Column(name = "BTMAX")
    private long bitMax;
    @Column(name = "STMAX")
    private long stMax;
    @Column(name = "TSR")
    private long tsr;
    @Column(name = "TOTAL_LOAN")
    private long totalLoad;
    @Column(name= "TEMPPROFIT")
    private float tempprofit;
    public HandleAccResponse convertData() {
        HandleAccResponse response = new HandleAccResponse();
        response.setCUSTID(this.custId);
        response.setREAL_MARGRATE(String.valueOf(this.realMargrate));
        response.setTSR(String.valueOf(this.tsr));
        response.setTEMPPROFIT(String.valueOf(this.tempprofit));
        return  response;
    }
}
