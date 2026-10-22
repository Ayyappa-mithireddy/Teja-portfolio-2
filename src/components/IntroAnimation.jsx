import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './IntroAnimation.css';

// Multilingual Greetings without duplicate English "HELLO" — starts directly with world languages
// and culminates in the grand finale "HELLO, WORLD."
const GREETINGS = [
  { text: "HOLA", lang: "Spanish", rtl: false },
  { text: "BONJOUR", lang: "French", rtl: false },
  { text: "CIAO", lang: "Italian", rtl: false },
  { text: "OLÁ", lang: "Portuguese", rtl: false },
  { text: "こんにちは", lang: "Japanese", rtl: false },
  { text: "你好", lang: "Chinese", rtl: false },
  { text: "안녕하세요", lang: "Korean", rtl: false },
  { text: "नमस्ते", lang: "Hindi", rtl: false },
  { text: "مرحباً", lang: "Arabic", rtl: true },
  { text: "నమస్కారం", lang: "Telugu", rtl: false },
  { text: "HELLO, WORLD.", lang: "Universal", rtl: false, isFinal: true }
];

// Atmospheric ambient glyph fragments
const AMBIENT_GLYPHS = [
  'A', 'Ω', 'あ', '文', 'ж', 'λ', '?', '!', '0', '1', 
  'క', 'న', 'م', '•', '+', '✦', '§', '◊', 'H', 'W', 'O', 'R', 'L', 'D'
];

// Color palette
const COLORS = {
  charcoalBg: '#100D10',
  deepCrimson: '#6F1024',
  primaryCrimson: '#DC2626',
  highlightRed: '#FF5263',
  warmWhite: '#F8F9FA',
  mutedText: '#B8AEB3',
};

// Comprehensive font stack prioritizing Telugu ('Nirmala UI', 'Gautami', 'Noto Sans Telugu')
const FONT_STACK = "'Montserrat', 'Nirmala UI', 'Gautami', 'Telugu Sangam MN', 'Noto Sans Telugu', 'Segoe UI', 'PingFang SC', 'Hiragino Sans', 'Malgun Gothic', 'Noto Sans Devanagari', Tahoma, sans-serif";

const IntroAnimation = ({ onComplete, onRevealStart }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const liveTextRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const isCancelledRef = useRef(false);
  const isSkippingRef = useRef(false);
  const startTimeRef = useRef(null);
  const hasFiredRevealStartRef = useRef(false);

  // Lock body scroll and prevent touch scrolling on mobile while intro is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  const triggerSkip = useCallback(() => {
    if (isSkippingRef.current) return;
    isSkippingRef.current = true;

    if (!hasFiredRevealStartRef.current) {
      hasFiredRevealStartRef.current = true;
      if (onRevealStart) onRevealStart();
    }

    // Fast iris reveal on skip (~220ms)
    const skipStart = performance.now();
    const skipDuration = 220;

    const animateSkip = (now) => {
      const elapsed = now - skipStart;
      const t = Math.min(1, elapsed / skipDuration);
      const eased = t * (2 - t);
      const rad = eased * 160;

      if (containerRef.current) {
        containerRef.current.style.maskImage = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${rad}%, black ${rad + 4}%)`;
        containerRef.current.style.webkitMaskImage = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${rad}%, black ${rad + 4}%)`;
        containerRef.current.style.opacity = rad > 60 ? String(Math.max(0, 1 - (rad - 60) / 40)) : '1';
      }

      if (ringRef.current) {
        ringRef.current.style.display = 'block';
        ringRef.current.style.width = `${rad * 2.2}vmax`;
        ringRef.current.style.height = `${rad * 2.2}vmax`;
      }

      if (t < 1) {
        requestAnimationFrame(animateSkip);
      } else {
        if (onComplete) onComplete();
      }
    };
    requestAnimationFrame(animateSkip);
  }, [onComplete, onRevealStart]);

  // Keyboard shortcut: Escape skips the intro
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        triggerSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSkip]);

  useEffect(() => {
    isCancelledRef.current = false;
    isSkippingRef.current = false;
    startTimeRef.current = null;
    hasFiredRevealStartRef.current = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        return {
          w: Math.round(rect.width) || window.innerWidth,
          h: Math.round(rect.height) || window.innerHeight,
        };
      }
      return {
        w: window.innerWidth,
        h: window.innerHeight,
      };
    };

    const initialDims = getDimensions();
    let width = initialDims.w;
    let height = initialDims.h;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas || isCancelledRef.current) return;
      const dims = getDimensions();
      width = dims.w;
      height = dims.h;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Fast & Punchy Timeline (~3.0s total):
    // Phase A: 0ms -> 220ms (Awakening)
    // Phase B: 220ms -> 2120ms (10 world languages * 190ms each, including Telugu)
    // Phase C: 2120ms -> 2670ms (550ms confident hold on "HELLO, WORLD.")
    // Phase D: 2670ms -> 3050ms (380ms aperture portal reveal)
    const PHASE_A_DURATION = 220;
    const STEP_DURATION = 190;
    const TOTAL_CYCLE_STEPS = GREETINGS.length - 1; // Exactly 10 languages (0 to 9)
    const FINAL_HOLD_DURATION = 550;
    const REVEAL_DURATION = 380;

    const phaseBTotal = TOTAL_CYCLE_STEPS * STEP_DURATION; // 10 * 190 = 1900ms
    const finalStart = PHASE_A_DURATION + phaseBTotal; // 2120ms
    const revealStart = finalStart + FINAL_HOLD_DURATION; // 2670ms

    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 160 : 260;
    const AMBIENT_COUNT = isMobile ? 25 : 50;

    // Offscreen Canvas for text pixel sampling
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

    const sampleTextCoordinates = (greetingObj) => {
      const text = greetingObj.text;
      offscreen.width = width;
      offscreen.height = height;
      offCtx.clearRect(0, 0, width, height);

      let fontSize = isMobile
        ? Math.min(width * 0.13, 48)
        : Math.min(width * 0.082, 80);

      if (greetingObj.isFinal) {
        fontSize = isMobile
          ? Math.min(width * 0.105, 42)
          : Math.min(width * 0.072, 72);
      }

      offCtx.font = `900 italic ${fontSize}px ${FONT_STACK}`;
      offCtx.direction = greetingObj.rtl ? 'rtl' : 'ltr';

      const maxAllowedWidth = width * 0.86;
      let metrics = offCtx.measureText(text);
      if (metrics.width > maxAllowedWidth) {
        fontSize = Math.floor(fontSize * (maxAllowedWidth / metrics.width));
        offCtx.font = `900 italic ${fontSize}px ${FONT_STACK}`;
        metrics = offCtx.measureText(text);
      }

      offCtx.fillStyle = '#FFFFFF';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const sampled = [];

      const step = isMobile ? 5 : 4;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (data[idx + 3] > 120) {
            sampled.push({ x, y });
          }
        }
      }

      return { points: sampled, fontSize };
    };

    let currentStepIndex = -1;

    // Initialize particles
    const particles = [];
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(width, height) * 0.65 + 60;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      particles.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: cx,
        targetY: cy,
        size: Math.random() * 2.4 + 1.2,
        alpha: Math.random() * 0.6 + 0.3,
        glyph: AMBIENT_GLYPHS[i % AMBIENT_GLYPHS.length],
        isGlyph: Math.random() > 0.45,
        color: i % 4 === 0 ? COLORS.highlightRed : i % 3 === 0 ? COLORS.primaryCrimson : COLORS.warmWhite,
        phaseOffset: Math.random() * Math.PI * 2,
        speedFactor: Math.random() * 0.5 + 0.9,
      });
    }

    // Ambient floating typographic dust
    const ambientParticles = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        glyph: AMBIENT_GLYPHS[Math.floor(Math.random() * AMBIENT_GLYPHS.length)],
        size: Math.random() * 10 + 9,
        alpha: Math.random() * 0.22 + 0.08,
        color: Math.random() > 0.5 ? COLORS.deepCrimson : COLORS.mutedText,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    const assignTargets = (greetingIndex) => {
      const greeting = GREETINGS[greetingIndex];

      if (liveTextRef.current) {
        liveTextRef.current.textContent = greeting.isFinal
          ? "Hello, World. Welcome to Teja Ayyappa's portfolio."
          : greeting.text;
      }

      const sampledData = sampleTextCoordinates(greeting);
      const points = sampledData.points;

      particles.forEach((p, idx) => {
        if (points.length > 0) {
          const targetPoint = points[idx % points.length];
          p.targetX = targetPoint.x;
          p.targetY = targetPoint.y;

          const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 1.5;
          const burstSpeed = Math.random() * 8 + 5;
          p.vx += Math.cos(angle) * burstSpeed;
          p.vy += Math.sin(angle) * burstSpeed;
        } else {
          p.targetX = cx + (Math.random() - 0.5) * 300;
          p.targetY = cy + (Math.random() - 0.5) * 100;
        }
      });
    };

    assignTargets(0);

    // Continuous Animation Loop
    const render = (now) => {
      if (isCancelledRef.current || isSkippingRef.current) return;

      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      let activeGreetingIdx = 0;
      let stepProgress = 0;

      if (elapsed < PHASE_A_DURATION) {
        activeGreetingIdx = 0;
        stepProgress = elapsed / PHASE_A_DURATION;
      } else if (elapsed < finalStart) {
        const phaseBElapsed = elapsed - PHASE_A_DURATION;
        const rawStep = Math.floor(phaseBElapsed / STEP_DURATION);
        // Correctly covers 0 through 9 (Telugu at index 9)
        activeGreetingIdx = Math.min(rawStep, TOTAL_CYCLE_STEPS - 1);
        stepProgress = (phaseBElapsed % STEP_DURATION) / STEP_DURATION;
      } else if (elapsed < revealStart) {
        activeGreetingIdx = TOTAL_CYCLE_STEPS; // "HELLO, WORLD."
        stepProgress = (elapsed - finalStart) / FINAL_HOLD_DURATION;
      } else {
        // Phase D: Aperture reveal
        if (!hasFiredRevealStartRef.current) {
          hasFiredRevealStartRef.current = true;
          if (onRevealStart) onRevealStart();
        }
        activeGreetingIdx = TOTAL_CYCLE_STEPS;
        const revealElapsed = elapsed - revealStart;
        const revealP = Math.min(1, revealElapsed / REVEAL_DURATION);
        const easeOutRadius = Math.sin((revealP * Math.PI) / 2) * 160;

        if (containerRef.current) {
          containerRef.current.style.maskImage = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${easeOutRadius}%, black ${easeOutRadius + 4}%)`;
          containerRef.current.style.webkitMaskImage = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${easeOutRadius}%, black ${easeOutRadius + 4}%)`;
          containerRef.current.style.opacity = easeOutRadius > 60 ? String(Math.max(0, 1 - (easeOutRadius - 60) / 40)) : '1';
        }

        if (ringRef.current) {
          ringRef.current.style.display = 'block';
          ringRef.current.style.width = `${easeOutRadius * 2.2}vmax`;
          ringRef.current.style.height = `${easeOutRadius * 2.2}vmax`;
        }

        if (revealP >= 1) {
          if (onComplete) onComplete();
          return;
        }
      }

      if (activeGreetingIdx !== currentStepIndex) {
        currentStepIndex = activeGreetingIdx;
        assignTargets(activeGreetingIdx);
      }

      ctx.fillStyle = COLORS.charcoalBg;
      ctx.fillRect(0, 0, width, height);

      // Radial Crimson Atmosphere
      const currentGreeting = GREETINGS[activeGreetingIdx];
      const isFinal = currentGreeting.isFinal;
      const glowIntensity = isFinal
        ? 0.55 + Math.sin(now * 0.005) * 0.08
        : 0.3 + Math.sin(now * 0.008) * 0.06;

      const glowRadius = Math.max(10, isFinal ? Math.min(width, height) * 0.65 : Math.min(width, height) * 0.45);
      const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, glowRadius);
      radialGlow.addColorStop(0, `rgba(220, 38, 38, ${glowIntensity})`);
      radialGlow.addColorStop(0.35, `rgba(111, 16, 36, ${glowIntensity * 0.45})`);
      radialGlow.addColorStop(0.75, 'rgba(16, 13, 16, 0.6)');
      radialGlow.addColorStop(1, 'rgba(16, 13, 16, 0)');

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 1. Ambient Background Floating Glyphs
      ctx.save();
      ambientParticles.forEach((ap) => {
        ap.x += ap.vx;
        ap.y += ap.vy;
        ap.wobble += 0.02;

        if (ap.x < -40) ap.x = width + 40;
        if (ap.x > width + 40) ap.x = -40;
        if (ap.y < -40) ap.y = height + 40;
        if (ap.y > height + 40) ap.y = -40;

        ctx.font = `600 ${ap.size}px ${FONT_STACK}`;
        ctx.fillStyle = ap.color;
        ctx.globalAlpha = ap.alpha * (0.8 + Math.sin(ap.wobble) * 0.2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ap.glyph, ap.x, ap.y);
      });
      ctx.restore();

      // 2. Physics & Particle Simulation (tuned for fast 190ms morph)
      const convergeStrength = stepProgress < 0.25
        ? 0.06
        : 0.14 + (stepProgress - 0.25) * 0.18;

      const friction = 0.81;
      const inRevealPhase = elapsed >= revealStart;
      const revealProgress = inRevealPhase ? Math.min(1, (elapsed - revealStart) / REVEAL_DURATION) : 0;

      particles.forEach((p) => {
        if (inRevealPhase) {
          const angle = Math.atan2(p.y - cy, p.x - cx);
          const push = 16 + revealProgress * 28;
          p.x += Math.cos(angle) * push;
          p.y += Math.sin(angle) * push;
          p.alpha = Math.max(0, 1 - revealProgress * 1.4);
        } else {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          p.vx += dx * convergeStrength * p.speedFactor;
          p.vy += dy * convergeStrength * p.speedFactor;

          p.vx += Math.sin(now * 0.003 + p.phaseOffset) * 0.35;
          p.vy += Math.cos(now * 0.003 + p.phaseOffset) * 0.35;

          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;

          const targetProximity = Math.max(0, 1 - dist / 140);
          p.alpha = 0.35 + targetProximity * 0.65;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.isGlyph && !inRevealPhase && stepProgress < 0.72) {
          ctx.font = `800 ${Math.max(9, p.size * 3.5)}px ${FONT_STACK}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.color === COLORS.highlightRed || p.color === COLORS.primaryCrimson) {
            ctx.shadowColor = COLORS.highlightRed;
            ctx.shadowBlur = 8;
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // 3. Crisp Foreground Typography Overlay
      if (!inRevealPhase) {
        const textOpacity = stepProgress < 0.18
          ? Math.max(0, stepProgress / 0.18)
          : stepProgress > 0.88
            ? Math.max(0, 1 - (stepProgress - 0.88) / 0.12)
            : 1;

        if (textOpacity > 0.01) {
          ctx.save();
          let fontSize = isMobile
            ? Math.min(width * 0.13, 48)
            : Math.min(width * 0.082, 80);

          if (isFinal) {
            fontSize = isMobile
              ? Math.min(width * 0.105, 42)
              : Math.min(width * 0.072, 72);
          }

          offCtx.font = `900 italic ${fontSize}px ${FONT_STACK}`;
          let textMetrics = offCtx.measureText(currentGreeting.text);
          if (textMetrics.width > width * 0.86) {
            fontSize = Math.floor(fontSize * ((width * 0.86) / textMetrics.width));
          }

          ctx.font = `900 italic ${fontSize}px ${FONT_STACK}`;
          ctx.direction = currentGreeting.rtl ? 'rtl' : 'ltr';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.shadowColor = COLORS.primaryCrimson;
          ctx.shadowBlur = isFinal ? 24 : 14;
          ctx.fillStyle = isFinal ? COLORS.warmWhite : `rgba(248, 249, 250, ${textOpacity * 0.95})`;
          ctx.fillText(currentGreeting.text, cx, cy);

          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
          ctx.fillText(currentGreeting.text, cx, cy);
          ctx.restore();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isCancelledRef.current = true;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [onComplete, onRevealStart]);

  const overlayContent = (
    <aside
      ref={containerRef}
      className="intro-animation-overlay"
      aria-label="Welcome greeting intro"
      role="region"
      onTouchMove={(e) => e.preventDefault()}
    >
      <canvas
        ref={canvasRef}
        className="intro-canvas"
        aria-hidden="true"
      />

      <div ref={liveTextRef} className="sr-only" aria-live="polite">
        HOLA
      </div>

      <header className="intro-topbar">
        <div className="intro-branding-badge">
          <span className="intro-spidy-icon" aria-hidden="true">🕷️</span>
          <span className="intro-brand-text">TEJA AYYAPPA</span>
        </div>

        <button
          type="button"
          className="intro-skip-btn"
          onClick={triggerSkip}
          aria-label="Skip introduction animation and open portfolio immediately"
        >
          <span>SKIP INTRO</span>
          <span className="skip-arrow" aria-hidden="true">→</span>
        </button>
      </header>

      <div
        ref={ringRef}
        className="intro-aperture-ring"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </aside>
  );

  return typeof document !== 'undefined'
    ? createPortal(overlayContent, document.body)
    : overlayContent;
};

export default IntroAnimation;
