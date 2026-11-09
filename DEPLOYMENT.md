# Hướng Dẫn Triển Khai & Tự Động Deploy Lên Cloudflare Pages
## Dự án: CÔNG TY TNHH TM&DV GIẢI PHÁP HÀNH TINH XANH (GREEN PLANET) - htxgroup.vn

Tài liệu hướng dẫn chi tiết cách cấu hình tự động triển khai (Auto Deploy / CI-CD) mỗi khi bạn **commit & push code** lên Git, cùng với các bước trỏ tên miền chính thức **`htxgroup.vn`** vào Cloudflare Pages.

---

## 1. Tổng Quan Kiến Trúc Triển Khai

- **Nền tảng hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) (Hệ thống CDN toàn cầu, tốc độ cao, hỗ trợ SSL miễn phí, băng thông không giới hạn).
- **Cơ chế kích hoạt**: Tự động kích hoạt khi có commit mới được push vào nhánh `main` hoặc `master`.
- **Cấu hình định tuyến SPA**: Đã tích hợp file `public/_redirects` với rule `/* /index.html 200` giúp toàn bộ đường dẫn React Router (như `/gioi-thieu`, `/lien-he`) hoạt động mượt mà không bị lỗi 404 khi tải lại trang.
- **Tối ưu Cache & Security**: Đã tích hợp file `public/_headers` thiết lập sẵn các header bảo mật và cache tài nguyên tĩnh.

---

## 2. Cách 1: Tự Động Deploy Qua Cloudflare Pages Git Integration (Khuyên Dùng Nhất)

Đây là phương pháp chuẩn và đơn giản nhất của Cloudflare: bạn chỉ cần liên kết tài khoản GitHub/GitLab với Cloudflare Pages một lần duy nhất.

### Bước 2.1: Đẩy mã nguồn lên kho lưu trữ Git (GitHub hoặc GitLab)
Nếu dự án chưa được khởi tạo Git, hãy chạy các lệnh sau trong thư mục dự án:

```bash
git init
git add .
git commit -m "feat: complete clone tcgroup.com.vn with responsive UI and Cloudflare config"
git branch -M main
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
git push -u origin main
```

### Bước 2.2: Tạo Project trên Cloudflare Pages
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Chọn menu **Workers & Pages** ở thanh điều hướng bên trái.
3. Nhấp nút **Create application** > Chọn tab **Pages** > Chọn **Connect to Git**.
4. Cấp quyền truy cập cho Cloudflare tới tài khoản GitHub/GitLab của bạn và chọn Repository vừa tạo.
5. Cấu hình thông số Build (**Build settings**):
   - **Project name**: `htxgroup-vn` (hoặc tên tuỳ chọn)
   - **Production branch**: `main`
   - **Framework preset**: Chọn `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (để trống)
6. Mục **Environment variables (Biến môi trường)**:
   - Thêm biến: `NODE_VERSION` với giá trị `20.18.0` (hoặc `22`)
7. Nhấp nút **Save and Deploy**.

> ✅ **Kết quả**: Cloudflare sẽ tiến hành tải mã nguồn, chạy `npm run build` và deploy website của bạn sau khoảng 1 phút. Mỗi lần bạn chạy `git commit` và `git push` lên nhánh `main`, Cloudflare sẽ tự động build và cập nhật phiên bản mới nhất ngay lập tức.

---

## 3. Cách 2: Tự Động Deploy Qua GitHub Actions

Nếu bạn muốn kiểm soát quy trình CI/CD hoàn toàn thông qua GitHub Actions, dự án đã có sẵn file cấu hình tại [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Các bước cài đặt:
1. Vào **Cloudflare Dashboard** > **My Profile** > **API Tokens** > Nhấp **Create Token**.
2. Chọn template **Cloudflare Pages** (Quyền: *Account > Cloudflare Pages > Edit*).
3. Sao chép **API Token** và **Account ID** (tìm thấy ở thanh bên phải trang tổng quan tài khoản Cloudflare).
4. Mở Repository trên **GitHub** > Vào **Settings** > **Secrets and variables** > **Actions** > **New repository secret**:
   - `CLOUDFLARE_API_TOKEN`: Dán API Token bạn vừa tạo.
   - `CLOUDFLARE_ACCOUNT_ID`: Dán Account ID của Cloudflare.
5. Khi bạn push code lên `main`, GitHub Actions sẽ tự động chạy build và deploy thẳng vào dự án `htxgroup-vn` trên Cloudflare Pages.

---

## 4. Cấu Hình Tên Miền Chính Thức: `htxgroup.vn`

### Bước 4.1: Thêm Custom Domain trong Cloudflare Pages
1. Trong trang quản lý dự án Cloudflare Pages (`htxgroup-vn`), chọn tab **Custom domains**.
2. Nhấp vào **Set up a custom domain**.
3. Nhập tên miền: `htxgroup.vn` > Nhấp **Continue**.
4. Thực hiện tương tự cho tên miền con: `www.htxgroup.vn`.

---

### Bước 4.2: Cấu hình bản ghi DNS (DNS Records)

#### Trường hợp 1: Tên miền `htxgroup.vn` được quản lý bởi Cloudflare DNS (Khuyên dùng)
Nếu NameServers của `htxgroup.vn` đã trỏ về Cloudflare:
- Cloudflare Pages sẽ **tự động cấu hình** các bản ghi DNS cần thiết (CNAME flattening cho root domain và CNAME cho subdomain www). Bạn chỉ cần bấm xác nhận.

#### Trường hợp 2: Tên miền `htxgroup.vn` quản lý tại nhà đăng ký khác (PA Vietnam, Mắt Bão, INET, Viettel...)
Đăng nhập vào trang quản trị DNS của nhà cung cấp tên miền của bạn và tạo 2 bản ghi sau:

| Loại bản ghi (Type) | Tên bản ghi (Host / Name) | Giá trị (Target / Points to) | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** (hoặc ALIAS/ANAME) | `@` (hoặc `htxgroup.vn`) | `htxgroup-vn.pages.dev` | Tự động (hoặc 3600) |
| **CNAME** | `www` | `htxgroup-vn.pages.dev` | Tự động (hoặc 3600) |

*(Lưu ý: Thay `htxgroup-vn.pages.dev` bằng địa chỉ URL Pages gốc được cấp trong Dashboard của bạn).*

---

### Bước 4.3: Kích Hoạt Chứng Chỉ Bảo Mật SSL/HTTPS
1. Trong Cloudflare Dashboard, vào mục **SSL/TLS** của domain `htxgroup.vn`.
2. Đặt chế độ mã hóa thành **Full** hoặc **Full (strict)**.
3. Vào tab **Edge Certificates** > Bật **Always Use HTTPS** để tự động chuyển hướng toàn bộ truy cập HTTP sang HTTPS an toàn.
4. Bật **Automatic HTTPS Rewrites**.

---

## 5. Danh Sách Các File Cấu Hình Đã Tích Hợp Sẵn

Dự án đã được cấu hình tối ưu 100% cho Cloudflare Pages:

- **[`public/_redirects`](public/_redirects)**:
  ```text
  /*    /index.html   200
  ```
  *Đảm bảo khi người dùng tải lại trang tại bất kỳ URL con nào (`/gioi-thieu`, `/lien-he`, `/tin-tuc`) đều không bị lỗi 404.*

- **[`public/_headers`](public/_headers)**:
  *Tối ưu hóa bộ nhớ đệm (Cache-Control) cho hình ảnh và tệp JavaScript, CSS, đồng thời bổ sung các header bảo mật (X-Frame-Options, X-Content-Type-Options).*

- **[`.node-version`](.node-version)**:
  *Chỉ định Node.js phiên bản `20.18.0` cho môi trường build của Cloudflare Pages.*

- **[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)**:
  *Pipeline CI/CD tự động build và deploy dự án khi push code lên GitHub.*

---

## 6. Kiểm Tra Và Nghiệm Thu

Sau khi hoàn tất:
1. Truy cập thử tên miền: **`https://htxgroup.vn`** và **`https://www.htxgroup.vn`**.
2. Kiểm tra biểu tượng ổ khóa xanh (Chứng chỉ bảo mật SSL) trên trình duyệt.
3. Nhấp chuyển qua các trang: *Giới thiệu, Sản phẩm, Lĩnh vực hoạt động, Tin tức, Liên hệ*.
4. Thử F5 (Tải lại trang) tại một trang con (ví dụ: `https://htxgroup.vn/gioi-thieu/thong-tin-chung`) để đảm bảo không bị lỗi 404.
5. Kiểm tra giao diện trên điện thoại di động hoặc bật Responsive Mode trên Chrome DevTools (F12 > Toggle Device Toolbar) để xem menu điều hướng di động.
