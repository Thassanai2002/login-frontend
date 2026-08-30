# Login Frontend (Angular)

หน้าเว็บสำหรับเข้าใช้ระบบ Login/สมัครสมาชิก — สร้างด้วย Angular 20

## เทคโนโลยี

- Angular 20 (standalone components)
- Angular Router + Guard
- Angular Forms (Template-driven)

## โครงสร้าง

```
frontend/
├── src/app/
│   ├── app.config.ts              # providers (Router, HttpClient)
│   ├── app.routes.ts              # กำหนด route + authGuard
│   ├── app.ts                     # root component
│   ├── auth.guard.ts              # guard กันหน้า (login ↔ home)
│   ├── services/auth.service.ts   # ยิง API register/login
│   ├── login/login.component.ts   # หน้าเข้าสู่ระบบ
│   ├── register/register.component.ts # หน้าสมัครสมาชิก
│   └── home/home.component.ts     # หน้า "สวัสดี <user>" + ปุ่มออกจากระบบ
├── proxy.conf.json                # forward /api → หลังบ้าน (dev)
└── angular.json
```

## วิธีรัน

ต้องรันหลังบ้านก่อน (ดู [backend/README.md](../backend/README.md)) แล้วรัน:

```
cd frontend
npm start
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:4200`

## หน้าเพจ (Routes)

| path | หน้า | guard |
|------|------|-------|
| `/login` | หน้าข้าสู่ระบบ (มีลิงก์ไปสมัคร) | กลับ `/home` ถ้า login แล้ว |
| `/register` | หน้าสมัคร (user + pass) | - |
| `/home` | "สวัสดี \<user\>" + ปุ่มออกจากระบบ | บังคับต้อง login |
| `**` | redirect ไป `/login` | - |

## เรียก API ยังไง

`auth.service.ts` เรียก endpoint เหล่านี้:

| method | endpoint |
|--------|----------|
| `register(username, password)` | `POST /api/auth/register` |
| `login(username, password)` | `POST /api/auth/login` |

โดยพ่วฐานแล้วจะเก็บ session ไว้ใน `localStorage` (`username`)

## Proxy

ในโหมด dev ทุก request ที่ขึ้นต้น `/api` จะถูกส่งต่อผ่าน `proxy.conf.json` ไปยังหลังบ้านที่ `http://localhost:5285`:

```json
{
  "/api": {
    "target": "http://localhost:5285",
    "secure": false,
    "changeOrigin": true
  }
}
```

> ถ้าจะยิงตรงแบบไม่ใช้ proxy ให้เปลี่ยน `apiUrl` ใน `services/auth.service.ts` เป็น `http://localhost:5285/api/auth` (หลังบ้านเปิด CORS ไว้แล้ว)