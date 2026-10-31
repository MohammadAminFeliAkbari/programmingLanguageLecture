
import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from './data/slides';

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    next: 'm9 18 6-6-6-6',
    prev: 'm15 18-6-6 6-6',
    grid: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
    present: 'M3 4h18v13H3z M8 21l4-4 4 4 M8 9l3 3 5-5',
    close: 'M18 6 6 18 M6 6l12 12',
    expand:
      'M8 3H5a2 2 0 0 0-2 2v3 M16 3h3a2 2 0 0 1 2 2v3 M21 16v3a2 2 0 0 1-2 2h-3 M3 16v3a2 2 0 0 0 2 2h3',
    shrink: 'M8 3v5H3 M21 8h-5V3 M3 16h5v5 M16 21v-5h5',
  };

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [presenting, setPresenting] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [hiddenHeaderFooter, setHiddenHeaderFooter] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (n: number) =>
      setIndex(Math.max(0, Math.min(slides.length - 1, n))),
    [],
  );

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;

    if (!start || !window.matchMedia('(max-width: 760px)').matches) {
      return;
    }

    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // جلوگیری از تشخیص اسکرول عمودی به‌عنوان سوایپ افقی
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.3) {
      return;
    }

    if (dx < 0) {
      // کشیدن انگشت به چپ: اسلاید بعدی
      go(index - 1);
    } else {
      // کشیدن انگشت به راست: اسلاید قبلی
      go(index + 1);
    }
  };


  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;

      if (
        target &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (['ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(slides.length - 1);
      } else if (e.key === 'Escape' && overview) {
        setOverview(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, overview]);

  useEffect(() => {
    const listener = () => {
      const isFullscreen = !!document.fullscreenElement;

      setFullscreen(!!document.fullscreenElement)
      setHiddenHeaderFooter(isFullscreen);
    };

    document.addEventListener('fullscreenchange', listener);

    return () => document.removeEventListener('fullscreenchange', listener);
  }, []);

  const slide = slides[index];

  return (
    <main className={`app ${presenting ? 'presenting' : ''}`}>
      {!hiddenHeaderFooter ? <header className="topbar">
        {/* <div className="brand">
          <span className="mini-logo">TS</span>
          <span>
            آکادمی کد <small>ارائهٔ آموزشی</small>
          </span>
        </div> */}

        <div className="top-title">
          مبانی TypeScript
        </div>

        <div className="top-actions">
          <button
            onClick={() => setOverview(true)}
            aria-label="نمای کلی اسلایدها"
            title="نمای اسلایدها"
          >
            <Icon name="grid" />
          </button>

          <button
            onClick={() => setPresenting(!presenting)}
            aria-label="حالت ارائه"
            title="حالت ارائه"
          >
            <Icon name="present" />
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label={
              fullscreen ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه'
            }
            title="تمام‌صفحه"
          >
            {fullscreen ? (
              <Icon name="shrink" />
            ) : (
              <Icon name="expand" />
            )}
          </button>
        </div>
      </header>
        : <></>}
      <section
        className="stage-wrap"
        aria-label={`اسلاید ${index + 1} از ${slides.length}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="stage" key={index}>
          <div className="slide-topline">
            {slide.kicker ? <span>{slide.kicker}</span> : <h1>{slide.title}</h1>}

            <span className="slide-mark">
              {String(index + 1)
                .padStart(2, '0')
                .replace(/\d/g, (digit: string): string =>
                  '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit,
                )}
              {' '}
              <i>/</i>
              {' '}
              {'۱۸'}
            </span>
          </div>

          {slide.kicker ? <h1 className=''>{slide.title}</h1> : <div className="slide-title-spacer" />}

          <div className="slide-content">{slide.content}</div>

          {/* <div className="slide-footer">
            <span>آشنایی با زبان برنامه‌نویسی TypeScript</span>
            <span>دانشگاه · ارائهٔ کلاسی</span>
          </div> */}

          <div className="decor decor-one" />
          <div className="decor decor-two" />
        </div>
      </section>

      <div className="progress-track">
        <div
          className="progress-value"
          style={{
            width: `${((index + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {
        !hiddenHeaderFooter ?
          <footer className="controls">
            {/* <div className="keyboard-hint">
              <kbd>←</kbd>
              <kbd>→</kbd>
              <span>جابه‌جایی بین اسلایدها</span>
              <span className="divider">|</span>
              <kbd>Home</kbd>
              <kbd>End</kbd>
            </div> */}

            {/* <div className="counter">
              <b>{String(index + 1).padStart(2, '0')}</b>
              <span>/</span>
              {slides.length}
            </div> */}

            <div className="nav-buttons">
              <button
                onClick={() => go(index + 1)}
                disabled={index === slides.length - 1}
                aria-label="اسلاید بعدی"
                title="بعدی (→)"
              >
                <Icon name="prev" />
              </button>

              <button
                onClick={() => go(index - 1)}
                disabled={index === 0}
                aria-label="اسلاید قبلی"
                title="قبلی (←)"
              >
                <Icon name="next" />
              </button>
            </div>
          </footer> : <></>
      }


      {overview && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#02070d]/85 p-3 backdrop-blur-lg sm:p-6"
          onClick={() => setOverview(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="نمای کلی اسلایدها"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#82a7d3]/20 bg-[#0a1422] text-[#eaf2ff] shadow-2xl shadow-black/60 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#97b4da]/15 bg-gradient-to-l from-[#0c1829] to-[#0a1422] px-5 py-5 sm:px-8 sm:py-7">
              <div>
                <span className="mb-2 block text-[10px] font-extrabold tracking-[0.25em] text-[#34d5f2]">
                  TYPESCRIPT PRESENTATION
                </span>

                <h2 className="text-xl font-extrabold leading-relaxed text-[#f1f6ff] sm:text-3xl">
                  نمای کلی اسلایدها
                </h2>

                <p className="mt-2 text-xs leading-7 text-[#92a3ba] sm:text-sm">
                  برای رفتن به هر اسلاید، کارت موردنظر را انتخاب کنید.
                </p>
              </div>

              <button
                onClick={() => setOverview(false)}
                aria-label="بستن"
                title="بستن"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#97b4da]/20 bg-[#0c1726] text-[#a9bbd2] transition-all duration-200 hover:rotate-90 hover:border-[#34d5f2] hover:bg-[#10243a] hover:text-white focus-visible:outline-2 focus-visible:outline-[#34d5f2]"
              >
                <Icon name="close" />
              </button>
            </div>

            {/* Slides Grid */}
            <div className="grid grid-cols-1 gap-3 overflow-y-auto overscroll-contain p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-3 xl:grid-cols-4 [scrollbar-color:#34506b_transparent] [scrollbar-width:thin]">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => {
                    go(i);
                    setOverview(false);
                  }}
                  aria-current={i === index ? 'true' : undefined}
                  className={`group relative flex min-h-32 min-w-0 flex-col justify-between gap-5 overflow-hidden rounded-xl border p-4 text-right transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34d5f2] sm:min-h-36 sm:rounded-2xl sm:p-5 ${i === index
                      ? 'border-[#34d5f2] bg-gradient-to-br from-[#194d67]/50 to-[#0c1829] shadow-[0_0_0_1px_rgba(52,213,242,0.15),0_0_25px_rgba(52,213,242,0.07)]'
                      : 'border-[#8daad0]/15 bg-gradient-to-br from-[#12243a] to-[#0c1727] hover:border-[#34d5f2]/60 hover:from-[#16314a] hover:to-[#10243a]'
                    }`}
                >
                  {/* Decorative glow */}
                  {i === index && (
                    <span className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#34d5f2]/10 blur-2xl" />
                  )}

                  {/* Card top */}
                  <div className="relative flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-sm font-extrabold ${i === index
                          ? 'text-[#34d5f2]'
                          : 'text-[#50bcd5]'
                        }`}
                    >
                      {String(i + 1)
                        .padStart(2, '0')
                        .replace(/\d/g, (digit) =>
                          '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit
                        )}
                    </span>

                    {i === index && (
                      <span className="rounded-lg border border-[#34d5f2]/20 bg-[#34d5f2]/10 px-2 py-1 text-[10px] font-bold text-[#67e3f4]">
                        در حال نمایش
                      </span>
                    )}
                  </div>

                  {/* Slide title */}
                  <strong className="relative line-clamp-2 text-sm font-bold leading-8 text-[#e2ecf8] transition-colors group-hover:text-white sm:text-base">
                    {s.title}
                  </strong>

                  {/* Bottom accent */}
                  <span
                    className={`h-[3px] rounded-full transition-all duration-300 group-hover:w-14 ${i === index
                        ? 'w-14 bg-gradient-to-l from-[#34d5f2] to-[#4588ff] shadow-[0_0_10px_rgba(52,213,242,0.35)]'
                        : 'w-[38%] bg-gradient-to-l from-[#3286ff] to-[#30d2e4] opacity-60 group-hover:opacity-100'
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-[#97b4da]/15 bg-[#08111e] px-5 py-4 text-xs text-[#92a3ba] sm:px-8">
              <span>
                مجموعاً{' '}
                <strong className="text-[#34d5f2]">
                  {slides.length}
                </strong>{' '}
                اسلاید
              </span>

              <span className="text-[#435167]">|</span>

              <span>
                اسلاید فعلی:{' '}
                <strong className="text-[#34d5f2]">
                  {index + 1}
                </strong>
              </span>

              <span className="mr-auto hidden text-[#708198] sm:inline">
                برای بستن، کلید Escape را فشار دهید.
              </span>
            </div>
          </section>
        </div>
      )}


    </main>
  );
}
