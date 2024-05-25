import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "QLTC1",
  password: "23062004",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

// Staff_LobbyReception
// Staff_MainScreen

app.get("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.post("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.get("/login", (req, res) => {
  res.render("login/login.ejs");
});

// staff thay doi quy dinh

// app.get("/", (req, res) => {
//   res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
// });

app.post("/thaydoiquydinh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/loaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/ca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/monan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/dichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/thamso", async (req, res) => {
  try {
    const apdungquydinhphatQuery = await db.query("SELECT giatri FROM thamso WHERE tenthamso = 'ApDungQuyDinhPhat'");
    const tiletienphatQuery = await db.query("SELECT giatri FROM thamso WHERE tenthamso = 'TileTienPhat'");
    const apdungquydinhphat = apdungquydinhphatQuery.rows[0].giatri;
    const tiletienphat = tiletienphatQuery.rows[0].giatri;
    res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", { 
      tilephat: tiletienphat,
      quydinhphat: apdungquydinhphat === 1 ? true : false
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});


app.post("/themloaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {table: table.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/xoaloaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", { 
      table: table.rows,
      MLS: MLS.rows 
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/sualoaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", { 
      table: table.rows,
      MLS: MLS.rows
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/themca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {table: table.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/xoaca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    const MC = await db.query("SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", {table: table.rows, MC: MC.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/suaca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    const MC = await db.query("SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", {table: table.rows, MC: MC.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/themmonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {table: table.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/xoamonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    const MMA = await db.query("SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", {table: table.rows, MMA: MMA.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/suamonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    const MMA = await db.query("SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", {table: table.rows, MMA: MMA.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/themdichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichvu_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/xoadichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    const MDV = await db.query("SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", {table: table.rows, MDV: MDV.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/suadichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    const MDV = await db.query("SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", {table: table.rows, MDV: MDV.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/themloaisanhngay", async (req, res) => {
  try {
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh");
    const Table = await db.query("SELECT * FROM loaisanh");
    const maloaisanh = req.body.maloaisanh.trim();
    const tenloaisanh = req.body.tenloaisanh.trim();
    let dongiabantoithieu = req.body.dongiabantoithieu;
    dongiabantoithieu = parseInt(dongiabantoithieu)
    if (dongiabantoithieu < 0) {
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", { DGBTTAm: "Đơn giá bàn tối thiểu phải là số không âm!", table: Table.rows });
    }
    else if (maloaisanh.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {  MLSlen: "Mã loại sảnh không được quá 10 ký tự!", table: Table.rows });
    }
    else {
      const maloaisanhExists = MLS.rows.some(row => row.maloaisanh.trim() === maloaisanh);
      if (maloaisanhExists) {
        res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", { MLSTT: "Mã loại sảnh đã tồn tại!", table: Table.rows });
      } else {
          await db.query("INSERT INTO loaisanh (maloaisanh, tenloaisanh, dongiabantoithieu, tinhtrang) VALUES ($1, $2, $3, $4)", [maloaisanh, tenloaisanh, dongiabantoithieu, 'Còn phục vụ']);

          const updatedTable = await db.query("SELECT * FROM loaisanh");
          res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { table: updatedTable.rows });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});


app.post("/xoaloaisanhngay", async (req, res) => {
  try {
    const maloaisanh = req.body.maloaisanh;
    await db.query("UPDATE loaisanh SET tinhtrang = 'Ngưng phục vụ' WHERE maloaisanh = $1", [maloaisanh]);
    const updatedTable = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/sualoaisanhngay", async (req, res) => {
  try {
    const maloaisanh = req.body.maloaisanh;
    const tenloaisanh = req.body.tenloaisanh;
    const dongiabantoithieu = req.body.dongiabantoithieu;
    const Table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'");
    if (dongiabantoithieu < 0) {
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", { DGBTTAm: "Đơn giá bàn tối thiểu phải là số không âm!", table: Table.rows, MLS: MLS.rows});
    } else {
      await db.query("UPDATE loaisanh SET tenloaisanh = $1, dongiabantoithieu = $2 WHERE maloaisanh = $3", [tenloaisanh, dongiabantoithieu, maloaisanh]);
      const updatedTable = await db.query("SELECT * FROM loaisanh");
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { table: updatedTable.rows });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});


app.post("/themcangay", async (req, res) => {
  try {
    const allCa = await db.query("SELECT * FROM ca");
    const allCaAvb = await db.query("SELECT * FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    const maca = req.body.maca.trim();
    const tenca = req.body.tenca.trim();
    const giobatdau = req.body.giobatdau;
    const gioketthuc = req.body.gioketthuc;
    const Table = await db.query("SELECT * FROM ca");
    if (giobatdau >= gioketthuc) {
      res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", { GBDGKT: "Giờ bắt đầu và giờ kết thúc không hợp lệ!" , table: Table.rows});
      return;
    }
    if (maca.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", { MClen: "Mã ca không được quá 10 ký tự!", table: Table.rows });
    }
    const overlapCa = allCaAvb.rows.some(ca => (giobatdau >= ca.giobatdau && giobatdau < ca.gioketthuc) || (gioketthuc > ca.giobatdau && gioketthuc <= ca.gioketthuc));
    if (overlapCa) {
      res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {TrungCa: "Ca đã trùng với ca đã tồn tại!" , table: Table.rows});
      return;
    }
    const macaExists = allCa.rows.some(row => row.maca.trim() === maca);
    if (macaExists) {
      res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {MCTT: "Mã ca đã tồn tại!", table: Table.rows});
      return;
    } 
    await db.query("INSERT INTO ca (maca, tenca, giobatdau, gioketthuc, tinhtrang) VALUES ($1, $2, $3, $4, $5)", [maca, tenca, giobatdau, gioketthuc, 'Còn phục vụ']);
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { table: updatedTable.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});


app.post("/xoacangay", async (req, res) => {
  try {
    const maca = req.body.maca;
    await db.query("UPDATE ca SET tinhtrang = 'Ngưng phục vụ' WHERE maca = $1", [maca]);
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/suacangay", async (req, res) => {
  try {
    const allCaAvb = await db.query("SELECT * FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    const MC = await db.query("SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    const maca = req.body.maca;
    const tenca = req.body.tenca;
    const giobatdau = req.body.giobatdau;
    const gioketthuc = req.body.gioketthuc;
    const Table = await db.query("SELECT * FROM ca");
    if (giobatdau >= gioketthuc) {
      res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", { MC: MC.rows, GBDGKT: "Giờ bắt đầu và giờ kết thúc không hợp lệ!" , table: Table.rows});
      return;
    }
    const overlapCa = allCaAvb.rows.some(ca => (giobatdau >= ca.giobatdau && giobatdau < ca.gioketthuc) || (gioketthuc > ca.giobatdau && gioketthuc <= ca.gioketthuc));
    if (overlapCa) {
      res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", { MC: MC.rows, TrungCa: "Ca đã trùng với ca đã tồn tại!" , table: Table.rows});
      return;
    }
    await db.query("UPDATE ca SET tenca = $1, giobatdau = $2, gioketthuc = $3 WHERE maca = $4", [tenca, giobatdau, gioketthuc, maca]);
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { table: updatedTable.rows });
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/themmonanngay", async (req, res) => {
  try {
    const MMA = await db.query("SELECT mamonan FROM monan");
    const mamonan = req.body.mamonan.trim();
    const tenmonan = req.body.tenmonan.trim();
    const dongia = req.body.dongia;
    const Table = await db.query("SELECT * FROM monan");
    if (dongia < 0) {
      res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {DONGIA: "Đơn giá phải là số không âm!" , table: Table.rows});
    }
    else if (mamonan.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", { MMAlen: "Mã món ăn không được quá 10 ký tự!", table: Table.rows });
    }
    else {
      const mamonanExists = MMA.rows.some(row => row.mamonan.trim() === mamonan);
      if (mamonanExists) {
        res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", { MMATT: 'Mã món ăn đã tồn tại!', table: Table.rows});
      } else {
          await db.query("INSERT INTO monan (mamonan, tenmonan, dongia, tinhtrang) VALUES ($1, $2, $3, $4)", [mamonan, tenmonan, dongia, 'Còn phục vụ']);

          const updatedTable = await db.query("SELECT * FROM monan");
          res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { table: updatedTable.rows });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", { errorFromServer: "Lỗi hệ thống!"});
  }
});

app.post("/xoamonanngay", async (req, res) => {
  try {
    const mamonan = req.body.mamonan;
    await db.query("UPDATE monan SET tinhtrang = 'Ngưng phục vụ' WHERE mamonan = $1", [mamonan]);
    const updatedTable = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/suamonanngay", async (req, res) => {
  try {
    const mamonan = req.body.mamonan;
    const tenmonan = req.body.tenmonan;
    const dongia = req.body.dongia;
    const Table = await db.query("SELECT * FROM monan");
    const MMA = await db.query("SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'");
    if (dongia < 0) {
      res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", { MMA: MMA.rows, DONGIA: "Đơn giá phải là số không âm!" , table: Table.rows});
    }
    else {
      await db.query("UPDATE monan SET tenmonan = $1, dongia = $2 WHERE mamonan = $3", [tenmonan, dongia, mamonan]);
      const updatedTable = await db.query("SELECT * FROM monan");
      res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { table: updatedTable.rows });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/themdichvungay", async (req, res) => {
  try {
    const MDV = await db.query("SELECT madichvu FROM dichvu");
    const madichvu = req.body.madichvu.trim();
    const tendichvu = req.body.tendichvu.trim();
    const dongia = req.body.dongia;
    const Table = await db.query("SELECT * FROM dichvu");
    if (dongia < 0) {
      res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", { DONGIA: "Đơn giá phải là số không âm!" , table: Table.rows});
    }
    else if (madichvu.length > 10) {
      res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", { MDVlen: "Mã dịch vụ không được quá 10 ký tự!", table: Table.rows });
    }
    else {
      const madichvuExists = MDV.rows.some(row => row.madichvu.trim() === madichvu);
      if (madichvuExists) {
        res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", { MDVTT: 'Mã dịch vụ đã tồn tại!', table: Table.rows});
      } else {
          await db.query("INSERT INTO dichvu (madichvu, tendichvu, dongia, tinhtrang) VALUES ($1, $2, $3, $4)", [madichvu, tendichvu, dongia, 'Còn phục vụ']);

          const updatedTable = await db.query("SELECT * FROM dichvu");
          res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", { table: updatedTable.rows });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/xoadichvungay", async (req, res) => {
  try {
    const madichvu = req.body.madichvu;
    await db.query("UPDATE dichvu SET tinhtrang = 'Ngưng phục vụ' WHERE madichvu = $1", [madichvu]);
    const updatedTable = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/suadichvungay", async (req, res) => {
  try {
    const MDV = await db.query("SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'");
    const Table = await db.query("SELECT * FROM dichvu");
    const madichvu = req.body.madichvu;
    const tendichvu = req.body.tendichvu;
    const dongia = req.body.dongia;
    if (dongia < 0) {
      res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", { DONGIA: "Đơn giá phải là số không âm!" , table: Table.rows, MDV: MDV.rows});
    }
    else {
      await db.query("UPDATE dichvu SET tendichvu = $1, dongia = $2 WHERE madichvu = $3", [tendichvu, dongia, madichvu]);
      const updatedTable = await db.query("SELECT * FROM dichvu");
      res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoidichVu.ejs", { table: updatedTable.rows });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});

app.post("/thaydoithamso", async (req, res) => {
  try {
    const apDungQuyDinhPhat = req.body.quydinhphat === 'true' ? 1 : 0;
    const tiLeTienPhat = parseFloat(req.body.tilephat);
    if (tiLeTienPhat < 0) {
      res.status(500).render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", {TLTP: "Tỉ lệ tiền phạt phải là số không âm!", quydinhphat: apDungQuyDinhPhat, tilephat: tiLeTienPhat});
      return;
    }
    await db.query("UPDATE thamso SET giatri = $1 WHERE tenthamso = 'TileTienPhat'", [tiLeTienPhat]);
    await db.query("UPDATE thamso SET giatri = $1 WHERE tenthamso = 'ApDungQuyDinhPhat'", [apDungQuyDinhPhat]);
    res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo_Sua.ejs");
  } catch (err) {
    console.log(err);
    res.status(500).render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", { errorFromServer: "Lỗi hệ thống!" });
  }
});



// end staff thay doi quy dinh

// staff lobby

app.post("/updatelobby", async (req, res) => {
  res.render("staff/lobby/updatelobby.ejs");
});

app.post("/deletelobby", async (req, res) => {
  res.render("staff/lobby/deletelobby.ejs");
});

app.post("/createlobby", async (req, res) => {
  res.render("staff/lobby/createlobby.ejs");
});

app.post("/xacnhanxoasanh", async (req, res) => {
  res.render("staff/lobby/deletelobbydone.ejs");
});

// end staff lobby

// staff
// user/main.ejs
// staff/Staff_MainScreen.ejs

app.post("/login", (req, res) => {
  res.render("login/login.ejs");
});

app.post("/dologin", async (req, res) => {
  const username = req.body.username;
  const matkhau = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const dbpassword = user.matkhau;
      if (matkhau === dbpassword) {
        res.render("user/main.ejs", {
          name: user.username,
          email: user.email,
          hovaten: user.hovaten,
          sdt: user.sodienthoai,
        });
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/confirmchange", (req, res) => {
  res.render("user/confirmchange.ejs");
});

app.post("/dosignup", async (req, res) => {
  const hovaten = req.body.hovaten;
  const username = req.body.username;
  const email = req.body.email;
  const matkhau = req.body.matkhau;
  const sodienthoai = req.body.sodienthoai;

  const result = await db.query(
    "INSERT INTO users (username, hovaten, email, matkhau, sodienthoai) VALUES($1, $2, $3, $4, $5) RETURNING *;",
    [username, hovaten, email, matkhau, sodienthoai]
  );

  res.render("login/login.ejs");
});

app.post("/signup", (req, res) => {
  res.render("login/signup.ejs");
});

app.post("/tiepnhansanh", (req, res) => {
  res.render("staff/lobby/lobby.ejs");
});

app.post("/tracuu", (req, res) => {
  res.render("staff/tracuu/Staff_LookUp.ejs");
});

app.post("/lapbaocao", async(req, res) => {
  try {
    const nam = 2024;
    const thang = 1;
    const result = await db.query("SELECT DATE_PART('day', ngaylaphoadon) AS ngay, COUNT(*) AS soluongtieccuoi, SUM(tongtienhoadon) AS doanhthu FROM HOADON WHERE DATE_PART('year', ngaylaphoadon) = $1 AND DATE_PART('month', ngaylaphoadon) = $2 GROUP BY DATE_PART('day', ngaylaphoadon) ORDER BY ngay", [nam, thang]);
    const rows = result.rows;
    const totalDoanhThu = rows.reduce((sum, row) => sum + parseFloat(row.doanhthu), 0);
    const dataWithTyle = rows.map((row, index) => ({
      stt: index + 1,
      ngay: row.ngay,
      soluongtieccuoi: row.soluongtieccuoi,
      doanhthu: row.doanhthu,
      tyle: (row.doanhthu / totalDoanhThu * 100).toFixed(2) + '%'
    }));

    res.render("staff/baocao/Staff_MonthlyReport.ejs", { data: dataWithTyle, nam: nam, months: thang, totalDoanhThu: totalDoanhThu});
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/baocao", async(req, res) => {
  try {
    const nam = req.body.nam;
    const thang = req.body.months;
    const result = await db.query("SELECT DATE_PART('day', ngaylaphoadon) AS ngay, COUNT(*) AS soluongtieccuoi, SUM(tongtienhoadon) AS doanhthu FROM HOADON WHERE DATE_PART('year', ngaylaphoadon) = $1 AND DATE_PART('month', ngaylaphoadon) = $2 GROUP BY DATE_PART('day', ngaylaphoadon) ORDER BY ngay", [nam, thang]);
    const rows = result.rows;
    const totalDoanhThu = rows.reduce((sum, row) => sum + parseFloat(row.doanhthu), 0);
    const dataWithTyle = rows.map((row, index) => ({
      stt: index + 1,
      ngay: row.ngay,
      soluongtieccuoi: row.soluongtieccuoi,
      doanhthu: row.doanhthu,
      tyle: (row.doanhthu / totalDoanhThu * 100).toFixed(2) + '%'
    }));

    res.render("staff/baocao/Staff_MonthlyReport.ejs", { data: dataWithTyle, nam: nam, months: thang, totalDoanhThu: totalDoanhThu});
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/laphoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill.ejs", {
    table_data: table_data,
  });
});

app.post("/chitiethoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill_Unpaid.ejs", {
    table_data: table_data,
  });
});

app.post("/thongtin", (req, res) => {
  res.render("staff/staffinfo.ejs");
});

app.post("/adminmain", async (req, res) => {
  res.render("admin/main.ejs");
});

app.post("/deleteuser", async (req, res) => {
  res.render("admin/deleteuser.ejs");
});

app.post("/deleteuserdone", async (req, res) => {
  res.render("admin/deleteuserdone.ejs");
});

app.post("/updateuser", async (req, res) => {
  res.render("admin/updateuser.ejs");
});

app.post("/createuser", async (req, res) => {
  res.render("admin/createuser.ejs");
});

// user

app.post("/userinfo", async (req, res) => {
  res.render("user/main.ejs");
});

app.post("/dattiec", async (req, res) => {
  res.render("user/dattiec/dattiec.ejs");
});

app.post("/userthemmonan", async (req, res) => {
  res.render("user/dattiec/themmonan.ejs");
});

app.post("/userthemdichvu", async (req, res) => {
  res.render("user/dattiec/themdichvu.ejs");
});

app.post("/usertracuu", async (req, res) => {
  res.render("user/tracuu/UserLookUp.ejs");
});

app.post("/logout", async (req, res) => {
  res.render("login/login.ejs");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
