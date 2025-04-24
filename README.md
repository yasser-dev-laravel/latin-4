# Latin Academy Nexus

نظام إدارة متكامل للأكاديمية اللاتينية، مبني باستخدام Laravel و React.

## المتطلبات الأساسية

- PHP >= 8.1
- Composer
- Node.js >= 16
- npm >= 7
- MySQL >= 8.0

## التثبيت

### Backend (Laravel)

1. انتقل إلى مجلد Backend:
```bash
cd backend-laravel
```

2. قم بتثبيت التبعيات:
```bash
composer install
```

3. انسخ ملف البيئة:
```bash
cp .env.example .env
```

4. قم بتعديل ملف `.env` حسب إعدادات قاعدة البيانات الخاصة بك

5. قم بتوليد مفتاح التطبيق:
```bash
php artisan key:generate
```

6. قم بتشغيل الترحيلات:
```bash
php artisan migrate
```

7. قم بتشغيل الخادم:
```bash
php artisan serve
```

### Frontend (React)

1. في المجلد الرئيسي للمشروع، قم بتثبيت التبعيات:
```bash
npm install
```

2. انسخ ملف البيئة:
```bash
cp .env.example .env
```

3. قم بتشغيل خادم التطوير:
```bash
npm run dev
```

## الوصول إلى التطبيق

- Backend API: http://localhost:8000
- Frontend: http://localhost:5173

## المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.
