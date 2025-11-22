function hienThiThongBao(noiDung) {
  var thongBao = document.getElementById("thongbao");
  if (thongBao) {
    thongBao.textContent = noiDung;
  } else {
    alert(noiDung);
  }
}

function dangki() {
  console.log(1);

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (!username || !password || !confirmPassword) {
    hienThiThongBao("vui lòng điền đầy đủ thông tin");
    return;
  }

  if (password !== confirmPassword) {
    hienThiThongBao("Mật khẩu không khớp");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let daTonTai = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      daTonTai = true;
      break;
    }
  }

  if (daTonTai) {
    hienThiThongBao("Tên đăng nhập đã tồn tại");
    return;
  }

  users.push({ username: username, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  hienThiThongBao("Đăng kí thành công");
}

function dangnhap() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    hienThiThongBao("Vui lòng điền đầy đủ thông tin");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      user = users[i];
      break;
    }
  }

  if (user) {
    hienThiThongBao("Đăng nhập thành công");
    localStorage.setItem("currentUser", username);
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } else {
    hienThiThongBao("Sai tên đăng nhập hoặc mật khẩu");
  }
}
