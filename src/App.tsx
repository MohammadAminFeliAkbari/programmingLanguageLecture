
import { useCallback, useEffect, useState } from 'react';
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
  const [presenting, setPresenting] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hiddenHeader, setHiddenHeader] = useState(false)

  const go = useCallback(
    (n: number) =>
      setIndex(Math.max(0, Math.min(slides.length - 1, n))),
    [],
  );

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
      setHiddenHeader(isFullscreen);
    };

    document.addEventListener('fullscreenchange', listener);

    return () => document.removeEventListener('fullscreenchange', listener);
  }, []);

  const slide = slides[index];

  return (
    <main className={`app ${presenting ? 'presenting' : ''}`}>
      {!hiddenHeader ? <header className="topbar">
        <div className="brand">
          <span className="mini-logo">TS</span>
          <span>
            آکادمی کد <small>ارائهٔ آموزشی</small>
          </span>
        </div>

        <div className="top-title">
          مبانی TypeScript <span>·</span> آموزش دانشگاهی
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
      >
        <div className="stage" key={index}>
          <div className="slide-topline">
            <span>{slide.kicker}</span>

            <span className="slide-mark">
              {String(index + 1)
                .padStart(2, '0')
                .replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              {' '}
              <i>/</i>
              {' '}
              {'۱۸'}
            </span>
          </div>

          <h1>{slide.title}</h1>

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

      {/* <footer className="controls">
        <div className="keyboard-hint">
          <kbd>←</kbd>
          <kbd>→</kbd>
          <span>جابه‌جایی بین اسلایدها</span>
          <span className="divider">|</span>
          <kbd>Home</kbd>
          <kbd>End</kbd>
        </div>

        <div className="counter">
          <b>{String(index + 1).padStart(2, '0')}</b>
          <span>/</span>
          {slides.length}
        </div>

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
      </footer> */}

      {overview && (
        <div
          className="overview-backdrop"
          onClick={() => setOverview(false)}
        >
          <section
            className="overview"
            role="dialog"
            aria-modal="true"
            aria-label="نمای کلی اسلایدها"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overview-head">
              <div>
                <h2>نمای کلی اسلایدها</h2>
                <p>برای رفتن به هر اسلاید انتخاب کنید</p>
              </div>

              <button
                onClick={() => setOverview(false)}
                aria-label="بستن"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="thumb-grid">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  className={`thumb ${i === index ? 'active' : ''}`}
                  onClick={() => {
                    go(i);
                    setOverview(false);
                  }}
                >
                  <span className="thumb-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <strong>{s.title}</strong>

                  <span className="thumb-line" />
                </button>
              ))}
            </div>

            <div className="overview-foot">
              مجموعاً {slides.length} اسلاید <span>·</span> کلید Escape
              برای بستن
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
