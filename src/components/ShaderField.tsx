import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot(0.62) * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / max(uRes.y, 1.0);
  float t = uTime * 0.045;

  // Domain-warped plasma
  vec2 q = uv * 1.35;
  q += 0.3 * vec2(fbm(q + t), fbm(q - t + 4.3));
  float f = fbm(q * 1.6 + vec2(t * 1.3, -t));

  vec3 cyan    = vec3(0.00, 0.90, 1.00);
  vec3 violet  = vec3(0.48, 0.36, 1.00);
  vec3 magenta = vec3(1.00, 0.18, 0.72);

  vec3 col = mix(violet, cyan, smoothstep(0.22, 0.78, f));
  col = mix(col, magenta, smoothstep(0.52, 0.96, fbm(q * 2.1 - t)));

  // Filament veins
  float vein = abs(sin(f * 9.0 + uTime * 0.55));
  col += 0.16 * cyan * pow(1.0 - vein, 9.0);

  // Pointer aura
  float d = length(uv - uMouse);
  col += 0.14 * mix(cyan, violet, 0.5) * exp(-d * 3.2);

  // Keep it a background, not a billboard
  float falloff = smoothstep(1.35, 0.05, length(uv * vec2(0.85, 1.0)));
  col *= 0.19 * (0.45 + 0.55 * falloff);

  // Sparse starfield
  vec2 sp = floor(gl_FragCoord.xy / max(uRes.x, 1.0) * 760.0);
  float h = hash(sp);
  float star = pow(h, 340.0);
  col += star * vec3(0.75, 0.88, 1.0) * (0.45 + 0.55 * sin(uTime * 1.8 + h * 40.0));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * Full-viewport animated WebGL nebula. Degrades to a CSS gradient when WebGL
 * is unavailable, and renders a single static frame under reduced-motion.
 */
export default function ShaderField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl', { antialias: false, alpha: false, depth: false }) as
        | WebGLRenderingContext
        | null) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) {
      canvas.style.background =
        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,92,255,.22), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(0,229,255,.14), transparent 60%)'
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Fullscreen triangle
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uMouse = gl.getUniformLocation(program, 'uMouse')

    // Render at reduced resolution — it is a soft nebula, nobody counts pixels.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.65

    const resize = () => {
      const w = Math.max(1, Math.floor(window.innerWidth * scale))
      const h = Math.max(1, Math.floor(window.innerHeight * scale))
      if (canvas.width === w && canvas.height === h) return
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }

    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointer = (event: PointerEvent) => {
      target.x = (event.clientX - window.innerWidth / 2) / window.innerHeight
      target.y = -(event.clientY - window.innerHeight / 2) / window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })

    let raf = 0
    let running = true
    const start = performance.now()

    const frame = (now: number) => {
      if (!running) return
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced && !running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }

    if (reduced) {
      running = false
      gl.uniform1f(uTime, 12)
      gl.uniform2f(uMouse, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      raf = requestAnimationFrame(frame)
    }

    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [reduced])

  return (
    <div className="bg-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-shader" />
    </div>
  )
}
