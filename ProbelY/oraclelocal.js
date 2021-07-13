const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

app.use(express.json());

async function selectAllUnits(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM SERVIS`);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      console.log("Result"+result);
      return res.send(result.rows);
    }
  }
}
async function selectAllPatients(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM HASTAYATIS`);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}
async function selectUnitWithAd(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    const ad=req.params;
    console.log('Connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM SERVIS WHERE "SERVİSAD"  LIKE '%' || :ad || '%'`,ad);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('Close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}
async function getPatientsWithdoktorId(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    const doktorId=req.params.doktorId;
    const servisId=req.params.servisId;

    console.log(req.params);
    console.log('Connected to database');
    // run execute
    result = await connection.execute(`SELECT  hy.hastaId,hy.protokolno,d.doktorad,hb.hastaad,hb.hastasoyad,hb.hastacınsıyet,hb.hastakg,hb.hastayas,o.odaadı,hy.yatısıd FROM HASTAYATIS hy JOIN hastabılgı hb ON hy.hastaıd=hb.hastaıd JOIN doktor d ON hy.doktorıd=d.doktorıd JOIN oda o ON o."SERVİSID"=hy."SERVİSID" WHERE hy."SERVİSID"=:servisId  AND hy.doktorıd=:doktorId`, [ req.params.servisId, req.params.doktorId  ]);
    //
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('Close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}
async function getPatientsDetail(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    const yatisid=req.params;
    console.log(req.params);
    console.log('Connected to database');
    // run execute
    result = await connection.execute(`SELECT * FROM HASTADETAY hd JOIN hastaolcum ho ON hd.yatısıd=ho.yatısıd WHERE hd.yatısıd=:yatisid`,yatisid);
    //
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('Close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}
async function getOlcumDegerleri(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    const yatisid=req.params;
    console.log(req.params);
    console.log('Connected to database');
    // run execute
    result = await connection.execute(`SELECT * FROM hastaolcum ho WHERE ho.yatısıd=:yatisid`,yatisid);
    //
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('Close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}
async function getDoctorPassword(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    const email=req.params;
    console.log(req.params);
    console.log('Connected to database');
    // run execute
    result = await connection.execute(`Select * from doktor WHERE doktoruname=:email`,email);
    //
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('Close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}
async function getPatientsWithServiceId(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "YAMUR",
      password: "1234",
      connectString: "localhost:1521/XEPDB1",
    });

    const serviceId=req.params;
    console.log(req.params);
    console.log('Connected to database');
    // run execute
    result = await connection.execute(`SELECT  hy.hastaId,hy.protokolno,d.doktorad,hb.hastaad,hb.hastasoyad,hb.hastacınsıyet,hb.hastakg,hb.hastayas,o.odaadı,hy.yatısıd FROM HASTAYATIS hy JOIN hastabılgı hb ON hy.hastaıd=hb.hastaıd JOIN doktor d ON hy.doktorıd=d.doktorıd JOIN oda o ON hy."SERVİSID"=o."SERVİSID"  WHERE hy."SERVİSID"=:serviceId`,serviceId);
    //
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('Close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('Query send nothing.');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}


app.get('/units', (req, res) => {
  selectAllUnits(req, res);
});
app.get('/patients', (req, res) => {
  selectAllPatients(req,res);
});
app.get('/units/:ad',(req,res) =>{
  selectUnitWithAd(req,res);
});
app.get('/patients/serviceId/:serviceId/',(req,res)=>{
  getPatientsWithServiceId(req,res);
});
app.get('/patients/doktorId/:doktorId/:servisId' ,(req,res) =>{
  getPatientsWithdoktorId(req,res);
})
app.get('/patients/detail/:yatisid' ,(req,res) =>{
  getPatientsDetail(req,res);
})
app.get('/patients/olcumler/:yatisid' ,(req,res) =>{
  getOlcumDegerleri(req,res);
})
app.get('/doktor/email/:email' ,(req,res) =>{
  getDoctorPassword(req,res);
})


// app.get('/patients/:serviceId/:hastaId',(req,res)=>{
//   getPatientDetailWithServiceId(req,res);
// });

app.listen(port, () => {
  console.log(`Listening http://192.168.1.43:${port}`);
});
