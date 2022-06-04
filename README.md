This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## مستند معماری

برنامه چت آنلاین به صورتی طراحی شده که با استفاده از ثبت نام و ورود کاربر میتوان از آن استفاده کرد. این برنامه از [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) برای تاییدیه کاربرها و ارسال و دریافت درخواست ها استفاده میشود. برای real-time بودن پیام ها از پکیج [socket-io](https://www.npmjs.com/package/socket.io) برای Backend و [socket-io-clinet](https://www.npmjs.com/package/socket.io-client) برای Frontend استفاده شده است. ازقابلیت های این برنامه به موارد زیر میتوان اشاره کرد:

- ایجاد ارتباط میان دو کاربر
- ذخیره سازی اطلاعات (ازقبیل پیام و زمان ارسال) در پایگاه داده mongodb(noSQL-database)
- نمایش آنلاین یا آفلاین بودن کاربران به صورت لحظه ای
- ارسال و دریافت پیام ها به صورت real-time
- استنفاده از آیتم های فریم ورک [Material UI](https://mui.com/)

## نحوه پیاده سازی

این برنامه درابتدا،از پکیج [pm2](https://www.npmjs.com/package/pm2) برای راه اندازی شدن استفاده میکند. لذا برای شروع بر روی سرور خود از دستور زیر شروع کنید:

```bash
npm install -g pm2
```

سپس برای اجرای کدهای فرانت، دستور زیر را واردکنید:

```bash
yarn start:prod # yarn & next-build & pm2 start
```

درمرورگر سیستم ادرس مقابل را وارد میکنیم: [http://localhost:3000](http://localhost:3000)

درابتدا فایل `pages/index.js` شروع به اجرا شدن میکند که شروع به بررسی آن میکنیم:

اولین عملکردی که شروع به اجرا شدن میکند socketIO() نام دارد. وظیفه ی اصلی این عملکرد بررسی [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) و فعال کردن [socket-io](https://www.npmjs.com/package/socket.io) درصورت معتبر بودن [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) میباشد و درصورتی که [توکن](https://en.wikipedia.org/wiki/JSON_Web_Token) معتبر نباشد صفحه به صورت خودکار به صفحه ی احرازهویت سوویچ میشود.

عملکرد بعدی آن React.useEffect میباشد که تنها یکبار به ازای لود شدن صفحه اجرا میشود و وظیفه اصلی آن گرفتن اطلاعات اصلی کاربر و فعال کردن [socket-io-clinet](https://www.npmjs.com/package/socket.io-client) برای کانکشن اطلاعات کاربران میباشد.

عملگر بعدی removeElement() میباشد که وظیفه اصلی آن حذف کاربر موجود از لیست کاربران است.

در ادامه صفحه به دوبخش `components/home/users` و `components/home/chat-section` تقسیم خواهد شد

درقسمت `components/home/users` تمامی اطلاعات کاربران و کاربر فعال موجود نمایش داده شده است و درصورت کلیک بر روی هر یک از کاربران، قسمت چت با آن کاربر فعال خواهد شد.

قسمت بعدی که مهمترین بخش این صفحه است `components/home/chat-section` نام دارد. این بخش شامل سه زیرمجموعه `components/home/opposit-info`، `components/home/all-massages` و `components/home/send-massage` میباشد. درقسمت `components/home/opposit-info` اطلاعات کاربرمقابل را نمایش میدهد. قسمت `components/home/all-massages` تمام پیام های موجود را نمایش میدهد و کانکشن گرفتن پیام هارا روی شبکه خاص خود net-id() برقرار میکند و در آخر `components/home/send-massage` پیام را ارسال میکند و کانکشن ارسال پیام را برقرار میکند.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
