'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  behindGlowEnabled?: boolean;
  onContactClick?: () => void;
}

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  miniAvatarUrl,
  name = 'Somya Garg',
  handle = 'somyagarg611',
  status = 'Available',
  contactText = "Let's Connect",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  behindGlowEnabled = true,
  onContactClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      } as Record<string, string>;

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add('pc-active');
      shell.classList.add('pc-entering');

      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('pc-entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('pc-active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };

    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('pc-entering');
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  return (
    <div
      ref={wrapRef}
      className="relative touch-none"
      style={{ perspective: '500px', transform: 'translate3d(0, 0, 0.1px)' }}
    >
      {/* Behind Glow */}
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200 pc-behind-glow"
          style={{
            background: 'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255, 255, 255, 0.3) 0%, rgba(200, 200, 200, 0.2) 30%, transparent 60%)',
            filter: 'blur(60px) saturate(1)'
          }}
        />
      )}

      {/* Card Shell */}
      <div ref={shellRef} className="relative z-10 pc-card-shell">
        <div
          className="relative aspect-[0.718] h-[80svh] max-h-[540px] rounded-[30px] overflow-hidden bg-black/90 shadow-2xl transition-transform duration-1000 ease-out"
          style={{
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Inner Background */}
          <div
            className="absolute inset-0 rounded-[30px]"
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.85) 50%, rgba(40, 40, 40, 0.75) 100%)'
            }}
          />

          {/* Avatar Image */}
          <div className="absolute inset-0 overflow-visible" style={{ transform: 'translateZ(2px)', backfaceVisibility: 'hidden' }}>
            <Image
              src={avatarUrl}
              alt={`${name} avatar`}
              fill
              className="object-cover absolute bottom-[-1px]"
              style={{
                left: '50%',
                transform: 'translateX(-50%) translateZ(0)',
                transformOrigin: '50% 100%',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                filter: 'brightness(1) contrast(1.05)'
              }}
              priority
            />
          </div>

          {/* Dark Overlay for Text Visibility */}
          <div 
            className="absolute inset-0 rounded-[30px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 30%, transparent 60%)',
              zIndex: 2
            }}
          />

          {/* Holographic Shine Effect */}
          <div
            className="absolute inset-0 rounded-[30px] mix-blend-soft-light opacity-15 pc-shine"
            style={{
              background: `
                radial-gradient(farthest-corner circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
                  hsla(0, 0%, 100%, 0.2) 12%,
                  hsla(0, 0%, 80%, 0.15) 20%,
                  hsla(0, 0%, 50%, 0.1) 120%
                )
              `,
              backgroundSize: '200% 200%',
              backgroundPosition: 'center',
              filter: 'brightness(1) contrast(1)',
              zIndex: 3
            }}
          />

          {/* Glare Effect */}
          <div
            className="absolute inset-0 rounded-[30px] mix-blend-overlay"
            style={{
              background: 'radial-gradient(farthest-corner circle at var(--pointer-x, 50%) var(--pointer-y, 50%), hsla(0, 0%, 100%, 0.3) 12%, hsla(0, 0%, 50%, 0.1) 90%)',
              filter: 'brightness(1) contrast(1)',
              zIndex: 4
            }}
          />

          {/* Name Overlay - Transparent Blend */}
          <div
            className="absolute top-8 left-0 right-0 text-center z-[5]"
            style={{
              transform: 'translate3d(0, 0, 0.1px)'
            }}
          >
            <h3
              className="text-3xl md:text-4xl m-0"
              style={{ 
                color: 'rgba(255, 255, 255, 0.25)',
                letterSpacing: '0.08em',
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontWeight: 300,
                textTransform: 'uppercase',
                fontSize: '1.75rem'
              }}
            >
              {name}
            </h3>
          </div>

          {/* User Info Card at Bottom */}
          {showUserInfo && (
            <div className="absolute bottom-5 left-5 right-5 z-[6] flex items-center justify-between bg-slate-800/30 backdrop-blur-[30px] border border-slate-600/30 rounded-[24px] p-3 pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-500/40 flex-shrink-0">
                  <Image
                    src={miniAvatarUrl || avatarUrl}
                    alt={`${name} mini avatar`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="text-sm font-medium text-slate-300 leading-none">@{handle}</div>
                  <div className="text-sm text-slate-400 leading-none">{status}</div>
                </div>
              </div>
              <button
                onClick={onContactClick}
                className="bg-slate-700/40 border border-slate-600/40 rounded-lg px-4 py-3 text-xs font-semibold text-slate-200 cursor-pointer transition-all duration-200 backdrop-blur-[10px] hover:bg-slate-600/50 hover:border-slate-500/50 hover:-translate-y-0.5"
                type="button"
                aria-label={`Contact ${name}`}
              >
                {contactText}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .pc-card-shell.pc-active .pc-behind-glow {
          opacity: 0.8;
        }
        .pc-card-shell.pc-active > div {
          transform: translateZ(0) rotateX(var(--rotate-y, 0deg)) rotateY(var(--rotate-x, 0deg)) !important;
          transition: none !important;
        }
        .pc-card-shell.pc-entering > div {
          transition: transform 180ms ease-out !important;
        }
        @media (max-width: 768px) {
          .pc-card-shell > div {
            height: 70svh;
            max-height: 450px;
          }
        }
        @media (max-width: 480px) {
          .pc-card-shell > div {
            height: 60svh;
            max-height: 380px;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(ProfileCard);
