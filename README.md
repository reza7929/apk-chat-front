This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## مستند معماری

برنامه چت آنلاین به صورتی طراحی شده که با استفاده از ثبت نام و ورود کاربر میتوان از آن استفاده کرد. این برنامه از [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) برای تاییدیه کاربرها و ارسال و دریافت درخواست ها استفاده میشود. برای real-time بودن پیام ها از پکیج [socket-io](https://www.npmjs.com/package/socket.io) استفاده شده و برای Backend [socket-io-clinet](https://www.npmjs.com/package/socket.io-client) و برای Frontend استفاده شده است. ازقابلیت های این برنامه به موارد زیر میتوان اشاره کرد:

- ایجاد ارتباط میان دو کاربر
- ذخیره سازی اطلاعات (ازقبیل پیام و زمان ارسال) در پایگاه داده [mongodb(noSQL-database)](https://www.mongodb.com/)
- نمایش آنلاین یا آفلاین بودن کاربران به صورت لحظه ای
- ارسال و دریافت پیام ها به صورت real-time
- استنفاده از آیتم های فریم ورک [Material UI](https://mui.com/)

## نحوه پیاده سازی

در ابتدا پکیج [yarn](https://www.npmjs.com/package/yarn) را به صورت گلوبال بر روی سیستم نصب میکنیم تا به جای [npm](https://www.npmjs.com/package/npm) از [yarn](https://www.npmjs.com/package/yarn) استفاده کنیم. دلیل اینکار سرعت بهتر و سازگاری بهتر نصب پکیج ها بر روی سرور میباشد و همچنین با کش کردن باعت بهبود عملکرد میشود.

```bash
npm install -g yarn
```

** نکته مهم **

درصورتی که برنامه قرار باشد بر روی سیستم اجرا و تست شود،همان دستور `yarn dev` اجرا شود و نیازی به ادامه اجرای مستند پیاده سازی نیست. درغیراینصورت ادامه ی این نحوه پیاده سازی را دنبال کنید.

این برنامه درابتدا، برای فعال سازی و راه اندازی از پکیج [pm2](https://www.npmjs.com/package/pm2) استفاده میکند. لذا برای راه اندازی بر روی سرور خود ابتدا پکیج [pm2](https://www.npmjs.com/package/pm2) را نصب کنید:

```bash
npm install -g pm2
```

اکنون برای اجرای کدهای فرانت، دستور زیر را واردکنید:

```bash
yarn start:prod # yarn & next-build & pm2 start
```

## مستند عملکرد برنامه

درمرورگر سیستم ادرس مقابل را وارد میکنیم: [http://localhost:3000](http://localhost:3000)

درابتدا فایل `pages/index.js` شروع به اجرا شدن میکند که شروع به بررسی آن میکنیم:

اولین عملکردی که شروع به اجرا شدن میکند socketIO() نام دارد. وظیفه ی اصلی این عملکرد بررسی [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) و فعال کردن [socket-io](https://www.npmjs.com/package/socket.io) درصورت معتبر بودن [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) میباشد و درصورتی که [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) معتبر نباشد صفحه به صورت خودکار به صفحه ی احرازهویت سوویچ میشود.

عملکرد بعدی آن React.useEffect میباشد که تنها یکبار به ازای لود شدن صفحه اجرا میشود و وظیفه اصلی آن گرفتن اطلاعات اصلی کاربر و فعال کردن [socket-io-clinet](https://www.npmjs.com/package/socket.io-client) برای کانکشن اطلاعات کاربران میباشد.

عملگر بعدی removeElement() میباشد که وظیفه اصلی آن حذف کاربر موجود از لیست کاربران است.

در ادامه صفحه به دوبخش `components/home/users` و `components/home/chat-section` تقسیم خواهد شد

درقسمت `components/home/users` تمامی اطلاعات کاربران و کاربر فعال موجود نمایش داده شده است و درصورت کلیک بر روی هر یک از کاربران، قسمت چت با آن کاربر فعال خواهد شد.

قسمت بعدی که مهمترین بخش این صفحه است `components/home/chat-section` نام دارد. این بخش شامل سه زیرمجموعه اعم از `components/home/opposit-info`، `components/home/all-massages` و `components/home/send-massage` میباشد. درقسمت `components/home/opposit-info` اطلاعات کاربرمقابل را نمایش میدهد. قسمت `components/home/all-massages` تمام پیام های موجود را نمایش میدهد و همچنین کانکشن سرور پیام های ارسالی را برقرار میکند و در آخر `components/home/send-massage` پیام را ارسال میکند و کانکشن ارسال پیام را برقرار میکند.

فایل بعدی که باید بررسی شود، `pages/auth.js` نام دارد:

این صفحه دارای دوبخش `componrnts/login-data-set` و `components/register-data-set` میباشد.

دربخش `componrnts/login-data-set` اطلاعات مربوط به ورود کاربر میباشد که در صورت کامل بودن اطلاعات درخواست به سرور ارسال خواهد شد و درصورت تایید سرور [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) ایجاد خواهد شد و در [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) مرورگر ذخیره خواهد شد و به صفحه اصلی سوویچ خواهد شد.

دربخش `componrnts/register-data-set` که مربوط به ثبت نام کاربر است درصورت تکمیل بودن اطلاعات به سرور درخواست داده خواهد شد و پس از بررسی اطلاعات در سرور ذخیره خواهد شد، توکن ساخته میشود و به سمت مرورگر فرستاده میشود ودر [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) مرورگر ذخیره خواهد شد.
