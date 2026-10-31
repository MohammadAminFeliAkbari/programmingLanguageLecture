import type { ReactNode } from 'react';

export type SlideData = {
  title: string;
  kicker: string;
  content: ReactNode;
  accent?: string;
  /** زمان پیشنهادی و نکات گفتاری (روی اسلاید نمایش داده نمی‌شود) */
  notes?: string;
};

/**
 * مقیاس اصلی تایپوگرافی ارائه (px). برای بزرگ یا کوچک‌کردن متن، همین عدد را تغییر بده.
 * عنوان، متن بدنه، بولت‌ها، برچسب‌ها و کدها با این مقدار تنظیم می‌شوند.
 */
export const fontSize = 22;

const mobileFontSize = Math.max(18, Math.round(fontSize * 0.78));
const codeFontSize = fontSize - 3;
const mobileCodeFontSize = Math.max(16, Math.round(codeFontSize * 0.8));
const titleMin = Math.round(fontSize * 1.75);
const titleMax = Math.round(fontSize * 2.16);
const titleVw = (fontSize * 0.108).toFixed(2);

const presentationTypography = `
  .stage h1{font-size:clamp(${titleMin}px,${titleVw}vw,${titleMax}px)!important;line-height:1.28!important}
  .slide-topline{font-size:clamp(20px,1.35vw,26px)!important}
  .slide-mark{font-size:clamp(17px,1.1vw,21px)!important}
  .slide-content{font-size:${fontSize}px!important;line-height:1.5!important;gap:clamp(16px,1.4vw,24px)!important}
  .slide-content .lead{font-size:${fontSize + 4}px!important;line-height:1.45!important}
  .slide-content .bullets li{font-size:${fontSize + 2}px!important;line-height:1.48!important}
  .slide-content h3,.slide-content .info-card h3{font-size:${fontSize}px!important}
  .slide-content .info-card p{font-size:${fontSize - 3}px!important;line-height:1.45!important}
  .slide-content .code-card label{font-size:20px!important}
  .slide-content .code-card pre{font-size:${codeFontSize}px!important;line-height:1.5!important;white-space:pre!important;overflow:auto!important}
  .slide-content .note,.slide-content .footnote{font-size:${fontSize - 4}px!important;line-height:1.5!important}
  .slide-content .timeline b{font-size:${fontSize - 1}px!important}
  .slide-content .timeline span{font-size:${fontSize - 4}px!important;line-height:1.45!important}
  .slide-content .operator-grid p{font-size:${fontSize - 2}px!important}
  .slide-content table{font-size:${fontSize - 4}px!important}
  .slide-content th,.slide-content td{padding:.75em 1em!important}
  .controls,.keyboard-hint{font-size:17px!important}.keyboard-hint kbd{font-size:16px!important}
  .counter{font-size:18px!important}.counter b{font-size:22px!important}
  .top-title,.brand{font-size:17px!important}.brand small{font-size:14px!important}
  .popularity-stat strong{font-size:${fontSize * 3.6}px!important}
  .thumb strong{font-size:16px!important}.thumb-number{font-size:14px!important}
  @media(max-width:760px){
    .stage h1{font-size:clamp(30px,6vw,42px)!important}
    .slide-topline{font-size:14px!important}.slide-content{font-size:${mobileFontSize}px!important;line-height:1.48!important}
    .slide-content .lead{font-size:${mobileFontSize + 2}px!important}
    .slide-content .bullets li{font-size:${mobileFontSize}px!important}
    .slide-content .code-card label{font-size:15px!important}
    .slide-content .code-card pre{font-size:${mobileCodeFontSize}px!important}
    .slide-content .info-card p,.slide-content .timeline span{font-size:${mobileFontSize - 2}px!important}
    .slide-content .note,.slide-content .footnote{font-size:${mobileFontSize - 2}px!important}
    .popularity-stat strong{font-size:${Math.round(fontSize * 2.4)}px!important}
    .controls,.keyboard-hint,.counter{font-size:13px!important}
  }
`;

const code = (s: string) => <pre dir="ltr"><code>{s}</code></pre>;
const bullets = (...items: ReactNode[]) => (
  <ul className="bullets">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
);
const table = (head: string[], rows: ReactNode[][]) => (
  <table>
    <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody>
  </table>
);
const cards = (items: { title: string; body: ReactNode; icon?: string }[]) => (
  <div className="cards">
    {items.map((x, i) => (
      <article className="info-card" key={i}>
        {/* <span className="card-icon">{x.icon ?? `0${i + 1}`}</span> */}
        <h3>{x.title}</h3>
        <p>{x.body}</p>
      </article>
    ))}
  </div>
);

const slideData: SlideData[] = [
  /* ───────────── ۱. عنوان (۰:۳۰) ───────────── */
  {
    title: 'آشنایی با زبان برنامه‌نویسی TypeScript',
    kicker: 'از JavaScript تا برنامه‌های مقیاس‌پذیر',
    notes: '۳۰ ثانیه. معرفی خودتان و موضوع. بگویید: ابتدا از محبوبیت شروع می‌کنیم، بعد تاریخچه، مشکلی که حل می‌کند و در پایان مفاهیم زبان.',
    content: (
      <div className="hero">
        <div className="hero-copy">
          <div className="ts-logo">TS</div>
          <p className="lead">زبان برنامه‌نویسی‌ای برای ساخت نرم‌افزارهای قابل‌اعتمادتر و نگه‌داری‌پذیرتر</p>
          {/* <div className="placeholder-row">
            <span>ارائه‌دهنده: نام شما</span>
            <span>دانشگاه: نام دانشگاه</span>
            <span>درس: نام درس</span>
          </div> */}
        </div>
        <div className="hero-art">
          <div className="orbit o1" /><div className="orbit o2" /><div className="orbit o3" />
          <div className="big-ts">TS</div>
          <span className="float-chip chip-a">JavaScript</span>
          <span className="float-chip chip-b">Types</span>
          <span className="float-chip chip-c">✓</span>
        </div>
      </div>
    ),
  },

  /* ───────────── ۲. محبوبیت (۱:۳۰) ───────────── */
  {
    title: 'TypeScript چقدر محبوب است؟',
    kicker: 'شروع از جایگاه زبان در دنیای واقعی',
    notes: '۱ تا ۱.۵ دقیقه. اعداد دقیق را قبل از ارائه از منابع بالا (Stack Overflow Survey، GitHub Octoverse، State of JS) چک و جایگزین کنید.',
    content: (
      <>
        <p className="lead">
          TypeScript از یک ابزار جانبی برای JavaScript به یکی از پراستفاده‌ترین زبان‌های دنیای نرم‌افزار تبدیل شده است.
        </p>
        {cards([
          { icon: '★', title: 'GitHub', body: 'طبق گزارش Octoverse گیت‌هاب (۲۰۲۵)، TypeScript از نظر تعداد مشارکت‌کنندگان ماهانه به صدر رسید.' },
          { icon: '?', title: 'نظرسنجی توسعه‌دهندگان', body: 'در Stack Overflow Developer Survey یکی از زبان‌های پرکاربرد و پرطرفدار است.' },
          { icon: '⚙', title: 'فریم‌ورک‌ها', body: 'Angular با TypeScript نوشته شده؛ React، Vue، Next.js و NestJS پشتیبانی درجه‌یک دارند.' },
          { icon: '⇩', title: 'اکوسیستم npm', body: 'بیشتر پکیج‌های مهم یا خودشان TypeScript هستند یا فایل نوع دارند (DefinitelyTyped).' },
        ])}
        <div className="note">
          دلیل محبوبیت: سازگاری کامل با JavaScript + ابزارهای بهتر + پذیرش تدریجی در پروژه‌های موجود.
        </div>
        <p className="footnote">منابع پیشنهادی: Stack Overflow Developer Survey · GitHub Octoverse · State of JS</p>
      </>
    ),
  },

  /* ───────────── ۳. تاریخچه (۱:۳۰) ───────────── */
  {
    title: 'تاریخچهٔ TypeScript',
    kicker: 'از انتشار اولیه تا بلوغ اکوسیستم',
    notes: '۱ تا ۱.۵ دقیقه. تأکید: مایکروسافت، طراح اصلی Anders Hejlsberg (خالق C# و Turbo Pascal). مسیر: ۲۰۱۲ → ۲۰۱۴ → ۲۰۱۶ → امروز.',
    content: (
      <>
        <div className="timeline">
          <div><b>۲۰۱۲</b><span>مایکروسافت نسخهٔ 0.8 را به‌صورت عمومی منتشر کرد؛ هدف: ساخت برنامه‌های بزرگ با JavaScript.</span></div>
          <div><b>۲۰۱۴</b><span>انتشار نسخهٔ 1.0 و انتقال توسعه به GitHub با مشارکت جامعهٔ متن‌باز.</span></div>
          <div><b>۲۰۱۵–۱۶</b><span>پذیرش در Angular 2 و انتشار TypeScript 2.0 با strictNullChecks؛ شروع رشد انفجاری.</span></div>
          <div><b>۲۰۲۰–۲۳</b><span>نسخه‌های 4 و 5: قابلیت‌های نوع پیشرفته‌تر، decoratorهای استاندارد و ساخت سریع‌تر.</span></div>
          <div><b>امروز</b><span>استاندارد عملی پروژه‌های وب؛ در حال بازنویسی کامپایلر با زبان Go برای سرعت بسیار بیشتر.</span></div>
        </div>
        <div className="note">
          طراح اصلی: <b>Anders Hejlsberg</b> (سازندهٔ C# و Turbo Pascal) · توسعه‌دهنده: مایکروسافت · مجوز: متن‌باز (Apache 2.0)
        </div>
      </>
    ),
  },

  /* ───────────── ۴. چرا ساخته شد (۱:۳۰) ───────────── */
  {
    title: 'چرا TypeScript ساخته شد؟',
    kicker: 'وقتی پروژه و تیم رشد می‌کنند',
    notes: '۱.۵ دقیقه. JavaScript برای صفحات کوچک طراحی شد (۱۹۹۵، ده روزه). وقتی پروژه‌ها به صدها هزار خط رسیدند، نبود نوع‌ها دردسر شد. JS نمی‌تواند این را حل کند چون زبان پویاست و تغییر آن باید با میلیاردها صفحهٔ موجود سازگار بماند.',
    content: (
      <>
        <div className="split">
          <div>
            <h3>مشکل‌ها در JavaScript</h3>
            {bullets(
              'JavaScript برای اسکریپت‌های کوچک ساخته شد، نه برنامه‌های بزرگ.',
              'نوع مقدارها فقط هنگام اجرا مشخص می‌شود (پویا).',
              'خطای تایپی یا مقدار نادرست تا اجرای همان خط دیده نمی‌شود.',
              'بازآرایی و تغییر نام در کدبیس بزرگ پرریسک است.',
              'قرارداد ورودی و خروجی توابع در کد مستند نیست.',
            )}
          </div>
          <div>
            <h3>چرا خود JavaScript نمی‌تواند؟</h3>
            {bullets(
              'اضافه‌کردن نوع اجباری، میلیاردها صفحهٔ موجود را می‌شکند.',
              'مرورگرها باید JavaScript را بدون تغییر اجرا کنند.',
              'پس راه‌حل باید «روی» JavaScript ساخته شود و پیش از اجرا کار کند.',
            )}
            <div className="note">راه‌حل TypeScript: زبانی که ابرمجموعهٔ JavaScript است و نوع‌ها را در زمان توسعه بررسی می‌کند.</div>
          </div>
        </div>
      </>
    ),
  },

  /* ───────────── ۵. مثال مشکل (۲:۰۰) ───────────── */
  {
    title: 'مثال: مشکل در JavaScript، حل در TypeScript',
    kicker: 'خطا کجا کشف می‌شود؟',
    notes: '۲ دقیقه. مهم‌ترین اسلاید مثال. در JS هر دو خط بدون هشدار اجرا می‌شوند؛ نتیجهٔ اول رشتهٔ "23" و مورد دوم کرش در اجرا. در TS ویرایشگر همان لحظه خط قرمز نشان می‌دهد. اگر وقت بود، همین کد را در VS Code زنده نشان دهید.',
    content: (
      <>
        <div className="split">
          <div className="code-card">
            <label>JavaScript — خطا در زمان اجرا (یا هرگز دیده نمی‌شود)</label>
            {code(
              'function add(a, b) {\n  return a + b;\n}\n\nadd("2", 3); // "23"  ← بدون هیچ هشداری\n\nconst user = { name: "Ali" };\nconsole.log(user.nmae.length);\n// 💥 TypeError در حین اجرا',
            )}
          </div>
          <div className="code-card">
            <label>TypeScript — خطا در زمان نوشتن کد</label>
            {code(
              'function add(a: number, b: number): number {\n  return a + b;\n}\n\nadd("2", 3);\n// ❌ string به number قابل‌تخصیص نیست\n\nconst user = { name: "Ali" };\nuser.nmae;\n// ❌ Property "nmae" does not exist.\n//    Did you mean "name"?',
            )}
          </div>
        </div>
        <div className="note">نتیجه: خطایی که در JavaScript کاربر نهایی می‌بیند، در TypeScript برنامه‌نویس همان لحظهٔ نوشتن می‌بیند.</div>
      </>
    ),
  },

  /* ───────────── مقایسه Python و TypeScript ───────────── */
  {
    title: 'آیا Python هم Type دارد؟',
    kicker: 'مقایسهٔ Type Hints در Python با TypeScript',
    notes:
      'حدود ۱ دقیقه. Python هم نوع‌دهی پویا دارد، اما با Type Hints می‌توان نوع مورد انتظار را مشخص کرد. ابزارهایی مثل mypy و Pyright ناسازگاری‌های نوعی را پیش از اجرا پیدا می‌کنند. تفاوت اصلی در نحوهٔ بررسی نوع‌هاست.',
    content: (
      <>
        <div className="split">
          <div className="code-card">
            <label>Python + Type Hints</label>
            {code(
              'def add(a: int, b: int) -> int:\n    return a + b\n\nadd("2", 3)\n\n# mypy / Pyright:\n# خطای ناسازگاری نوع'
            )}
          </div>

          <div className="code-card">
            <label>TypeScript</label>
            {code(
              'function add(\n  a: number,\n  b: number\n): number {\n  return a + b;\n}\n\nadd("2", 3);\n\n// Type Error'
            )}
          </div>
        </div>

        <div className="split">
          <div>
            <h3>Python</h3>
            {bullets(
              'نوع‌دهی پویا در زمان اجرا',
              'Type Hints برای مشخص کردن نوع مورد انتظار',
              'بررسی ایستا با mypy و Pyright'
            )}
          </div>

          <div>
            <h3>TypeScript</h3>
            {bullets(
              'بررسی ایستای نوع‌ها پیش از اجرا',
              'تشخیص خطا با کامپایلر و ویرایشگر',
              'تبدیل کد به JavaScript'
            )}
          </div>
        </div>

        <div className="note">
          نکتهٔ مهم: Python هم Type دارد؛ اما Type Hints به‌تنهایی
          مانع اجرای کد ناسازگار نمی‌شوند. ابزارهای بررسی نوع
          می‌توانند این خطاها را پیش از اجرا گزارش کنند.
        </div>
      </>
    ),
  },

  /* ───────────── ۶. کامپایل و خروجی JS (۱:۳۰) ───────────── */
  {
    title: 'کد TypeScript در نهایت JavaScript می‌شود',
    kicker: 'مرورگر و Node.js فقط JavaScript اجرا می‌کنند',
    notes: '۱.۵ دقیقه. نکتهٔ جالب: بعد از کامپایل، فایل .js تحویل می‌گیرید و باید با موتور JavaScript اجرا شود. نوع‌ها حذف می‌شوند (type erasure) و در زمان اجرا وجود ندارند.',
    content: (
      <>
        <div className="flow">
          <div className="flow-node">app.ts<small>کد TypeScript</small></div>
          <b>←</b>
          <div className="flow-node">tsc<small>تایپ‌چک + تبدیل</small></div>
          <b>←</b>
          <div className="flow-node">app.js<small>خروجی JavaScript</small></div>
          <b>←</b>
          <div className="flow-node">Node.js / مرورگر<small>اجرا با موتور JS</small></div>
        </div>
        <div className="split">
          <div className="code-card">
            <label>ورودی: app.ts</label>
            {code(
              'interface User {\n  name: string;\n  age: number;\n}\n\nconst greet = (u: User): string =>\n  `سلام ${u.name}`;',
            )}
          </div>
          <div className="code-card">
            <label>خروجی: app.js</label>
            {code(
              'const greet = (u) => `سلام ${u.name}`;\n\n// interface و نوع‌ها حذف شدند',
            )}
          </div>
        </div>
        <div className="code-card compact">
          {code('npx tsc app.ts   # تولید app.js\nnode app.js     # اجرا با موتور JavaScript')}
        </div>
      </>
    ),
  },

  /* ───────────── ۷. کاربردها (۱:۳۰) ───────────── */
  {
    title: 'TypeScript کجا استفاده می‌شود؟',
    kicker: 'از رابط کاربری تا زیرساخت',
    notes: '۱.۵ دقیقه. هر کارت را در یک جمله بگویید. می‌توانید از تجربهٔ شخصی خودتان (Next.js، NestJS) به‌عنوان مثال استفاده کنید.',
    content: (
      <>
        {cards([
          { title: 'فرانت‌اند', body: 'React، Angular، Vue و Next.js؛ props و state با نوع‌های روشن.' },
          { title: 'بک‌اند', body: 'Node.js، NestJS و Express؛ مدل‌سازی ورودی‌ها و قراردادهای داخلی.' },
          { title: 'API و پایگاه‌داده', body: 'نوع‌های مشترک برای درخواست و پاسخ؛ ORMهایی مثل Prisma و Drizzle.' },
          { title: 'موبایل و دسکتاپ', body: 'React Native، Ionic، Electron و VS Code (که خودش با TypeScript نوشته شده).' },
          { title: 'ابزارها و CLI', body: 'ابزارهای خط فرمان، اسکریپت‌های ساخت و کتابخانه‌های npm.' },
          { title: 'فول‌استک', body: 'اشتراک یک مدل نوع‌دار بین فرانت‌اند و بک‌اند در یک مخزن.' },
        ])}
        <div className="note">تیم‌ها برای قراردادهای روشن، ویرایش امن‌تر و نگه‌داری بلندمدت سراغ TypeScript می‌روند.</div>
      </>
    ),
  },

  /* ───────────── ۸. سینتکس پایه (۱:۳۰) ───────────── */
  {
    title: 'سینتکس پایه در حد آشنایی',
    kicker: 'همان JavaScript، به‌اضافهٔ نوع',
    notes: '۱.۵ دقیقه. بعد از نام متغیر دو نقطه و نوع می‌آید. اگر نوع نوشته نشود، TypeScript خودش استنباط می‌کند.',
    content: (
      <>
        <div className="split">
          <div>
            {bullets(
              <>نوع بعد از نام و با <code>:</code> نوشته می‌شود.</>,
              'اگر نوع از مقدار روشن باشد، استنباط خودکار انجام می‌شود.',
              <>برای ثابت از <code>const</code> و برای متغیر از <code>let</code> استفاده کنید.</>,
              'پارامتر اختیاری با ? و مقدار پیش‌فرض با = نوشته می‌شود.',
              <><code>void</code> یعنی تابع مقدار معنادار برنمی‌گرداند.</>,
              'هر کد JavaScript معتبر، کد TypeScript معتبر هم هست.',
            )}
          </div>
          <div className="code-card">
            {code(
              'let username: string = "Mohammad";\nlet age: number = 22;\nlet isStudent: boolean = true;\nlet scores: number[] = [18, 19, 20];\nlet city = "Yazd"; // استنباط: string\n\nfunction greet(name: string, title?: string): void {\n  console.log(title ?? "", name);\n}\n\nconst square = (n: number): number => n * n;',
            )}
          </div>
        </div>
      </>
    ),
  },

  /* ───────────── ۹. interface / class (۱:۳۰) ───────────── */
  {
    title: 'Interface، Type و Class',
    kicker: 'تعریف قراردادهای قابل‌استفادهٔ مجدد',
    notes: '۱.۵ دقیقه. interface شکل شیء را توصیف می‌کند. type برای union و ترکیب هم کاربرد دارد. class مثل JS است، به‌علاوهٔ public/private/readonly.',
    content: (
      <>
        <div className="split">
          <div className="code-card">
            {code(
              'interface User {\n  id: number;\n  name: string;\n  email?: string;        // اختیاری\n  readonly createdAt: Date;\n}\n\ninterface Admin extends User {\n  role: "admin";\n}\n\ntype Status = "loading" | "ok" | "error";',
            )}
          </div>
          <div className="code-card">
            {code(
              'class Person {\n  constructor(\n    public name: string,\n    private age: number,\n  ) {}\n\n  greet(): string {\n    return `سلام ${this.name}`;\n  }\n}\n\nconst p = new Person("Sara", 21);\np.age; // ❌ private است',
            )}
          </div>
        </div>
        {bullets(
          'interface برای توصیف شکل شیء و قابل‌گسترش با extends است.',
          'type برای unionها و ترکیب نوع‌ها انعطاف بیشتری دارد.',
          'modifierهای public، private، protected و readonly فقط در تایپ‌چک اعمال می‌شوند.',
        )}
      </>
    ),
  },

  /* ───────────── ۱۰. انواع داده (۱:۳۰) ───────────── */
  {
    title: 'انواع داده در TypeScript',
    kicker: '',
    notes: '۱.۵ دقیقه. بخش اول: نوع‌های پایه که در همهٔ زبان‌ها هست. بخش دوم: نوع‌های مخصوص TypeScript. به تفاوت any و unknown تأکید کنید.',
    content: (
      <>
        {table(
          ['نوع', 'توضیح', 'مثال'],
          [
            [<code>number</code>, 'عدد صحیح و اعشاری', <code>let n: number = 3.14</code>],
            [<code>string</code>, 'رشته', <code>let s: string = "سلام"</code>],
            [<code>boolean</code>, 'درست / نادرست', <code>let ok: boolean = true</code>],
            [<code>null / undefined</code>, 'نبود مقدار', <code>let x: null = null</code>],
            [<code>bigint / symbol</code>, 'عدد بزرگ و شناسهٔ یکتا', <code>let b = 10n</code>],
            [<code>T[]</code>, 'آرایه', <code>let a: number[] = [1, 2]</code>],
            [<code>tuple</code>, 'آرایهٔ ثابت با نوع هر خانه', <code>let t: [string, number]</code>],
            [<code>enum</code>, 'مجموعهٔ ثابت‌های نام‌دار', <code>enum Role {'{'} Admin, User {'}'}</code>],
            [<code>any</code>, 'خاموش‌کردن تایپ‌چک (پرهیز!)', <code>let v: any</code>],
            [<code>unknown</code>, 'ناشناخته؛ قبل از استفاده باید بررسی شود', <code>let u: unknown</code>],
            [<code>void / never</code>, 'بدون خروجی / هرگز برنمی‌گردد', <code>function f(): never</code>],
          ],
        )}
      </>
    ),
  },

  /* ───────────── ۱۱. نوع‌های HTML (۲:۰۰) ───────────── */
  {
    title: 'نوع‌های مرتبط با HTML و DOM',
    kicker: '',
    notes: '۲ دقیقه. وقتی با HTML کار می‌کنیم، هر تگ نوع مخصوص خودش را دارد (کتابخانهٔ lib.dom). querySelector ممکن است null برگرداند، پس باید بررسی کنیم. در React هم نوع رویدادها از React.ChangeEvent و مانند آن می‌آید.',
    content: (
      <>
        {table(
          ['نوع', 'متناظر با'],
          [
            [<code>HTMLElement</code>, 'نوع پایهٔ همهٔ عنصرهای HTML'],
            [<code>HTMLInputElement</code>, 'تگ input (مثل value و checked)'],
            [<code>HTMLButtonElement / HTMLDivElement</code>, 'تگ‌های button و div'],
            [<code>Event / MouseEvent / KeyboardEvent</code>, 'رویدادهای مرورگر'],
            [<code>NodeList / HTMLCollection</code>, 'مجموعهٔ عنصرها'],
            [<code>ReactNode / JSX.Element</code>, 'خروجی کامپوننت‌ها در React'],
          ],
        )}
        <div className="split">
          <div className="code-card">
            {/* <label>DOM خالص</label> */}
            {code(
              'const input =\n  document.querySelector<HTMLInputElement>("#name");\n\nif (input) {         // ممکن است null باشد\n  input.value = "Ali";\n}',
            )}
          </div>
          <div className="code-card">
            {/* <label>React</label> */}
            {code(
              'function NameInput() {\n  const [name, setName] = useState<string>("");\n\n  const onChange = (\n    e: React.ChangeEvent<HTMLInputElement>\n  ) => setName(e.target.value);\n\n  return <input value={name} onChange={onChange} />;\n}',
            )}
          </div>
        </div>
      </>
    ),
  },

  /* ───────────── ۱۲. ویژگی‌های زبان (۱:۳۰) ───────────── */
  // {
  //   title: 'ویژگی‌های اصلی زبان',
  //   kicker: 'چرا TypeScript فقط «JavaScript با نوع» نیست',
  //   notes: '۱.۵ دقیقه. روی ۳ مورد تمرکز: ابرمجموعهٔ JS بودن، استنباط نوع، generics. بقیه را سریع بگذرید.',
  //   content: (
  //     <>
  //       <div className="">
  //         <div>
  //           {cards([
  //             { title: 'ابرمجموعهٔ JavaScript', body: 'همهٔ کدهای JS معتبرند؛ مهاجرت تدریجی ممکن است.' },
  //             { title: 'نوع‌دهی ایستا', body: 'بررسی نوع پیش از اجرا، در ویرایشگر و هنگام ساخت.' },
  //             { title: 'استنباط و نوع ساختاری', body: 'سازگاری بر اساس شکل مقدار سنجیده می‌شود، نه صرفاً نام نوع.' },
  //             { title: 'Union و Literal', body: 'محدودکردن مقدار به چند حالت مشخص، با Type Narrowing.' },
  //             { title: 'Generics', body: 'کد عمومی بدون از دست‌دادن اطلاعات نوع.' },
  //             { title: 'ماژول و ابزار', body: 'ES Modules، فایل‌های d.ts، تکمیل خودکار و بازآرایی امن.' },
  //           ])}
  //         </div>
  //       </div>
  //       {/* <div className="code-card compact">
  //         {code(
  //           'function identity<T>(value: T): T { return value; }\nconst text = identity("سلام");   // T = string\n\ntype Draft = Partial<User>;       // همهٔ فیلدها اختیاری\ntype Label = Pick<User, "id" | "name">;',
  //         )}
  //       </div> */}
  //     </>
  //   ),
  // },

  /* ───────────── ۱۳. انواع انقیاد (۱:۳۰) ───────────── */
  {
    title: 'انواع انقیاد (Binding) در TypeScript',
    kicker: 'چه چیزی، چه زمانی به چه چیزی وصل می‌شود؟',
    notes: '۱.۵ دقیقه. انقیاد = وصل‌شدن یک ویژگی به یک نام. در TypeScript انقیاد نوع در زمان کامپایل است (ایستا)، ولی مقدار در زمان اجرا مشخص می‌شود. با any می‌توان تا حدی پویا رفتار کرد (gradual typing).',
    content: (
      <>
        {table(
          ['نوع انقیاد', 'چه چیزی وصل می‌شود', 'زمان در TypeScript'],
          [
            ['انقیاد نام', 'نام متغیر ↔ محدوده (scope)', 'زمان کامپایل (let / const)'],
            ['انقیاد نوع', 'نوع ↔ متغیر', 'زمان کامپایل (ایستا)'],
            ['انقیاد مقدار', 'مقدار ↔ متغیر', 'زمان اجرا'],
            ['انقیاد حافظه', 'متغیر ↔ محل ذخیره', 'زمان اجرا (موتور JS)'],
          ],
        )}
        <div className="split">
          <div className="code-card">
            {code(
              'let x: number = 5;   // نوع x در زمان کامپایل بسته شد\nx = "hello";         // ❌ خطای کامپایل\n\nlet y: any = 5;\ny = "hello";         // مجاز: نوع‌دهی تدریجی',
            )}
          </div>
          <div>
            {bullets(
              <>زبان‌های ایستا مثل Java و C#: نوع در زمان کامپایل بسته می‌شود؛ زبان‌های پویا مثل JavaScript: در زمان اجرا.</>,
              <>TypeScript: <b>انقیاد نوع ایستا</b>، اما نوع‌ها در خروجی حذف می‌شوند.</>,
              <>با <code>any</code> و <code>as</code> می‌شود این قید را شل کرد.</>,
            )}
          </div>
        </div>
      </>
    ),
  },

  /* ───────────── ۱۴. مفسری یا کامپایلری (۱:۳۰) ───────────── */
  {
    title: 'مفسری است یا کامپایلری؟',
    kicker: 'پاسخ دقیق: Transpiler',
    notes: '۱.۵ دقیقه. TypeScript را «مفسری» توصیف نکنید. tsc کد را به JavaScript تبدیل می‌کند (source-to-source). سپس موتور JS مثل V8 آن را اجرا می‌کند. ابزارهایی مثل esbuild و SWC فقط نوع‌ها را حذف می‌کنند، تایپ‌چک نمی‌کنند.',
    content: (
      <>
        <div className="pipeline">
          <div>کد TypeScript</div><span>←</span>
          <div>tsc: تایپ‌چک + تبدیل</div><span>←</span>
          <div>کد JavaScript</div><span>←</span>
          <div>موتور JS (مثل V8)</div>
        </div>
        {cards([
          { title: 'کامپایلر (Transpiler)', body: 'tsc کد TypeScript را به JavaScript ترجمه می‌کند؛ خروجی هدف قابل‌تنظیم است (target).' },
          { title: 'تایپ‌چک', body: 'بررسی نوع‌ها مرحلهٔ جداگانه است و می‌تواند مستقل از تولید خروجی انجام شود.' },
          { title: 'اجرا', body: 'اجرا را موتور JavaScript انجام می‌دهد (JIT)؛ خود TypeScript اجرا نمی‌شود.' },
        ])}
        <div className="note">
          ابزارهایی مثل esbuild، SWC و Vite نوع‌ها را فقط حذف می‌کنند و تایپ‌چک کامل انجام نمی‌دهند؛ نسخه‌های جدید Node.js هم می‌توانند نوع‌ها را مستقیم حذف کنند (type stripping).
        </div>
      </>
    ),
  },

  /* ───────────── ۱۵. عملگرها (۱:۳۰) ───────────── */
  {
    title: 'عملگرها در TypeScript',
    kicker: 'عملگرهای JavaScript + عملگرهای ویژهٔ نوع',
    notes: '۱.۵ دقیقه. عملگرهای معمول از JS می‌آیند. سه مورد مهم برای TS: ?. و ?? و as. عملگرهای | و & در نوع‌ها با | و & زمان اجرا متفاوت‌اند.',
    content: (
      <>
        <div className="operator-grid">
          <article><h3>محاسباتی</h3><p><code>+ − * / % **</code></p></article>
          <article><h3>انتساب</h3><p><code>= += -= *= ??=</code></p></article>
          <article><h3>مقایسه</h3><p><code>=== !== &lt; &gt; &lt;= &gt;=</code></p></article>
          <article><h3>منطقی</h3><p><code>&amp;&amp; || !</code></p></article>
          <article><h3>دسترسی امن</h3><p><code>?.</code> دسترسی اختیاری<br /><code>??</code> مقدار جایگزین تهی</p></article>
          <article><h3>شرطی</h3><p><code>شرط ? الف : ب</code></p></article>
          <article><h3>بررسی نوع</h3><p><code>typeof</code>، <code>instanceof</code>، <code>in</code></p></article>
          <article><h3>ویژهٔ TypeScript</h3><p><code>as</code>، <code>!</code>، <code>keyof</code>، <code>satisfies</code></p></article>
          <article><h3>عملگرهای نوع</h3><p><code>|</code> اتحاد · <code>&amp;</code> اشتراک</p></article>
        </div>
        <div className="code-card compact">
          {code(
            'const city = user?.address?.city ?? "نامشخص";\nconst el = document.getElementById("app")!;      // مطمئنم null نیست\nconst key: keyof User = "name";\ntype Id = string | number;',
          )}
        </div>
        <div className="note">عملگرهای as و ! فقط به تایپ‌چکر اطلاع می‌دهند و در خروجی JavaScript حذف می‌شوند.</div>
      </>
    ),
  },

  /* ───────────── ۱۶. مزایا و محدودیت‌ها (۱:۰۰) ───────────── */
  {
    title: 'مزایا، محدودیت‌ها و راهکارها',
    kicker: 'اعتماد بیشتر، با انتظارات واقع‌بینانه',
    notes: '۱ دقیقه. صادقانه بگویید TypeScript بی‌خطایی تضمین نمی‌کند؛ داده‌های بیرونی (API، فرم) باید در زمان اجرا اعتبارسنجی شوند.',
    content: (
      <>
        <div className="three-col">
          <section>
            <h3>مزایا</h3>
            {bullets('کشف زودهنگام خطا', 'تکمیل خودکار و راهنمای بهتر', 'بازآرایی و نگه‌داری امن‌تر', 'مستندسازی قصد برنامه‌نویس')}
          </section>
          <section>
            <h3>محدودیت‌ها</h3>
            {bullets('منحنی یادگیری', 'مرحلهٔ ساخت و پیکربندی اضافه', 'نوع‌ها در زمان اجرا وجود ندارند', 'اعتماد کاذب بدون اعتبارسنجی')}
          </section>
          <section>
            <h3>عادت‌های خوب</h3>
            {bullets('فعال‌کردن strict', 'پرهیز از any و as ناامن', 'اعتبارسنجی ورودی API با Zod', 'استنباط نوع وقتی کد خواناست')}
          </section>
        </div>
        <div className="note">پیشنهاد: برای پروژهٔ تیمی یا در حال رشد TypeScript انتخاب قوی‌ای است؛ برای اسکریپت کوچک شاید لازم نباشد.</div>
      </>
    ),
  },

  /* ───────────── ۱۷. این ارائه با TS و React ساخته شده (۱:۰۰) ───────────── */
  {
    title: 'این اسلایدها هم با TypeScript و React ساخته شده‌اند',
    kicker: 'نمونهٔ زنده از همان چیزی که توضیح دادیم',
    notes: '۱ دقیقه. اسلایدهایی که دیدید، یک آرایهٔ نوع‌دار از SlideData است و هر اسلاید یک کامپوننت React. اگر شیء اسلاید فیلدی را کم داشته باشد، TypeScript همان لحظه خطا می‌دهد. نمونهٔ واقعی از قراردادهای نوع.',
    content: (
      <>
        <div className="split">
          <div className="code-card">
            <label>نوع هر اسلاید در همین پروژه</label>
            {code(
              'type SlideData = {\n  title: string;\n  kicker: string;\n  content: ReactNode;\n  accent?: string;\n};\n\nconst slides: SlideData[] = [\n  { title: "...", kicker: "...", content: <p>...</p> },\n];',
            )}
          </div>
          <div>
            <h3>با TypeScript و React می‌توان ساخت:</h3>
            {bullets(
              'ارائه و اسلاید تعاملی (مثل همین)',
              'داشبورد و پنل مدیریت با نمودار',
              'فروشگاه و وب‌سایت کامل با Next.js',
              'API و سرویس بک‌اند با NestJS',
              'اپ موبایل با React Native',
              'ابزارهای خودکارسازی و اتوماسیون',
            )}
          </div>
        </div>
        <div className="note">اگر فیلدی از اسلاید فراموش شود، ویرایشگر همان لحظه خطا نشان می‌دهد؛ یعنی دقیقاً همان مزیتی که امروز بررسی کردیم.</div>
      </>
    ),
  },

  /* ───────────── ۱۸. جمع‌بندی (۱:۰۰) ───────────── */
  {
    title: 'جمع‌بندی و پرسش‌ها',
    kicker: 'نکته‌های اصلی را به خاطر بسپاریم',
    notes: '۱ دقیقه. پنج نکته را مرور کنید و برای پرسش و پاسخ آماده باشید.',
    content: (
      <>
        <div className="summary-list">
          <div><b>۱</b><span>TypeScript محبوب است و به JavaScript سیستم نوع ایستا اضافه می‌کند (ساختهٔ مایکروسافت، ۲۰۱۲).</span></div>
          <div><b>۲</b><span>مشکل اصلی: خطاهای نوع در JavaScript فقط هنگام اجرا دیده می‌شوند؛ TypeScript آن‌ها را پیش از اجرا پیدا می‌کند.</span></div>
          <div><b>۳</b><span>کد TypeScript به JavaScript تبدیل می‌شود (Transpile) و موتور JavaScript آن را اجرا می‌کند.</span></div>
          <div><b>۴</b><span>انقیاد نوع ایستا، نوع‌های غنی (حتی برای HTML و DOM)، generics و عملگرهای ویژه.</span></div>
          <div><b>۵</b><span>در فرانت‌اند، بک‌اند و پروژه‌های بزرگ کاربرد دارد؛ اما بدون اعتبارسنجی داده تضمین بی‌خطایی نیست.</span></div>
        </div>
        <h2 className="questions">پرسشی دارید؟</h2>
        <div className="references">
          <b>منابع رسمی:</b>
          <a href="https://www.typescriptlang.org/docs/handbook/" target="_blank" rel="noreferrer">TypeScript Handbook</a>
          <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer">مستندات TypeScript</a>
          <a href="https://github.com/microsoft/TypeScript" target="_blank" rel="noreferrer">مخزن GitHub</a>
          <a href="https://react.dev/learn/typescript" target="_blank" rel="noreferrer">React و TypeScript</a>
          <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/" target="_blank" rel="noreferrer">انتشار نسخهٔ 1.0</a>
        </div>
      </>
    ),
  },
];

export const slides: SlideData[] = slideData.map((slide) => ({
  ...slide,
  content: (
    <>
      <style>{presentationTypography}</style>
      {slide.content}
    </>
  ),
}));
