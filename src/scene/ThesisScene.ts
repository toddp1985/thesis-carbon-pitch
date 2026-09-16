import * as THREE from 'three'
import type { ChapterId } from '../data/chapters'

type SceneHandle = {
  setChapter: (id: ChapterId) => void
  setFill: (ratio: number) => void
  resize: () => void
  dispose: () => void
}

const CHAPTER_CAM: Record<ChapterId, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  open: { pos: new THREE.Vector3(0, 0.35, 5.4), look: new THREE.Vector3(0, 0, 0) },
  market: { pos: new THREE.Vector3(1.6, 1.1, 4.6), look: new THREE.Vector3(0, 0.1, 0) },
  buffers: { pos: new THREE.Vector3(0.15, 1.35, 4.2), look: new THREE.Vector3(0, 0.4, 0) },
  insurance: { pos: new THREE.Vector3(-1.8, 0.9, 4.4), look: new THREE.Vector3(0, 0.15, 0) },
  analogy: { pos: new THREE.Vector3(0, 0.2, 5.8), look: new THREE.Vector3(0, 0, 0) },
  books: { pos: new THREE.Vector3(0, 2.4, 5.2), look: new THREE.Vector3(0, 0, 0) },
  pitch: { pos: new THREE.Vector3(2.2, 1.4, 4.8), look: new THREE.Vector3(0, 0.2, 0) },
  verde: { pos: new THREE.Vector3(0.2, 3.6, 4.4), look: new THREE.Vector3(0, 0.15, 0) },
  win: { pos: new THREE.Vector3(0, 0.55, 5.6), look: new THREE.Vector3(0, 0.1, 0) },
  caveats: { pos: new THREE.Vector3(0, 0.2, 6.4), look: new THREE.Vector3(0, 0, 0) },
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function makeGlobe(): THREE.Group {
  const group = new THREE.Group()
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1.28, 48, 48),
    new THREE.MeshStandardMaterial({
      color: 0x10161c,
      roughness: 0.72,
      metalness: 0.28,
      emissive: 0x0a1210,
      emissiveIntensity: 0.4,
    }),
  )
  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.305, 2),
    new THREE.MeshBasicMaterial({
      color: 0xc4a572,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    }),
  )
  const meridians = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(1.32, 18, 12)),
    new THREE.LineBasicMaterial({ color: 0x6b9e8a, transparent: true, opacity: 0.16 }),
  )
  group.add(core, wire, meridians)
  return group
}

function makeStars(): THREE.Points {
  const count = 900
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const r = 14 + Math.random() * 22
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0xc9c2b3, size: 0.025, transparent: true, opacity: 0.55 }),
  )
}

function makeRiskPings(): THREE.Group {
  const group = new THREE.Group()
  const spots: Array<[number, number, number]> = [
    [0.82, 0.62, 0.72],
    [-0.7, 0.35, 0.95],
    [0.15, -0.85, 0.78],
    [-0.9, -0.2, -0.7],
  ]
  const colors = [0xc45c4a, 0xc4a572, 0x6b9e8a, 0x8a7349]
  spots.forEach((p, i) => {
    const v = new THREE.Vector3(...p).normalize().multiplyScalar(1.34)
    const ping = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({ color: colors[i] }),
    )
    ping.position.copy(v)
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.11, 32),
      new THREE.MeshBasicMaterial({
        color: colors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      }),
    )
    ring.position.copy(v)
    ring.lookAt(0, 0, 0)
    ring.userData.base = 0.08
    group.add(ping, ring)
  })
  return group
}

function makeVault(): THREE.Group {
  const group = new THREE.Group()
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.72, 1.7, 48, 1, true),
    new THREE.MeshPhysicalMaterial({
      color: 0xc4a572,
      transparent: true,
      opacity: 0.12,
      roughness: 0.08,
      metalness: 0.15,
      transmission: 0.55,
      thickness: 0.4,
      side: THREE.DoubleSide,
    }),
  )
  const fill = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.68, 1.5, 32),
    new THREE.MeshStandardMaterial({
      color: 0x8a7349,
      emissive: 0xc4a572,
      emissiveIntensity: 0.18,
      roughness: 0.45,
      metalness: 0.35,
    }),
  )
  fill.name = 'vaultFill'
  fill.scale.y = 0.18
  fill.position.y = -0.66
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.025, 12, 48),
    new THREE.MeshStandardMaterial({ color: 0xc4a572, metalness: 0.7, roughness: 0.25 }),
  )
  rim.position.y = 0.85
  const base = rim.clone()
  base.position.y = -0.85
  group.add(glass, fill, rim, base)
  group.position.set(0, 0.15, 0)
  return group
}

function makeTerrain(): THREE.Group {
  const group = new THREE.Group()
  const size = 7
  const seg = 90
  const geo = new THREE.PlaneGeometry(size, size, seg, seg)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const ridge = Math.sin(x * 1.1) * 0.22 + Math.cos(y * 0.9) * 0.16
    const valley = -Math.exp(-((x + 0.3) ** 2) * 2.4) * 0.35
    const island = Math.max(0, 1.15 - (x * x + y * y) * 0.085)
    const n =
      Math.sin(x * 3.2 + y * 1.4) * 0.06 + Math.cos(x * 5.1 - y * 2.2) * 0.035
    pos.setZ(i, (ridge + valley + n) * island)
  }
  geo.computeVertexNormals()
  const land = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: 0x2a3a2e,
      roughness: 0.86,
      metalness: 0.05,
      flatShading: true,
    }),
  )
  land.rotation.x = -Math.PI / 2
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: 0x0c1c22,
      roughness: 0.2,
      metalness: 0.55,
      emissive: 0x062018,
      emissiveIntensity: 0.25,
    }),
  )
  water.rotation.x = -Math.PI / 2
  water.position.y = -0.12

  const treeGeo = new THREE.ConeGeometry(0.045, 0.18, 5)
  const treeMat = new THREE.MeshStandardMaterial({
    color: 0x3f5c44,
    roughness: 0.8,
    emissive: 0x142018,
  })
  const trees = new THREE.InstancedMesh(treeGeo, treeMat, 280)
  const dummy = new THREE.Object3D()
  let placed = 0
  for (let i = 0; i < 280; i += 1) {
    const x = (Math.random() - 0.5) * 5.4
    const z = (Math.random() - 0.5) * 5.4
    const r2 = x * x + z * z
    if (r2 > 8.2 || Math.abs(x + 0.3) < 0.22) continue
    const y =
      (Math.sin(x * 1.1) * 0.22 + Math.cos(z * 0.9) * 0.16) *
      Math.max(0, 1.15 - r2 * 0.085)
    dummy.position.set(x, y + 0.09, z)
    dummy.scale.setScalar(0.7 + Math.random() * 1.1)
    dummy.rotation.y = Math.random() * Math.PI
    dummy.updateMatrix()
    trees.setMatrixAt(placed, dummy.matrix)
    placed += 1
  }
  trees.count = placed
  group.add(water, land, trees)
  group.position.y = -0.35
  return group
}

function makeBooks(): THREE.Group {
  const group = new THREE.Group()
  const ring = (color: number, radius: number) =>
    new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.035, 16, 80),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.22,
        metalness: 0.55,
        roughness: 0.3,
      }),
    )
  const a = ring(0xc4a572, 1.15)
  const b = ring(0x6b9e8a, 1.15)
  b.rotation.x = Math.PI / 2.3
  a.rotation.y = 0.4
  group.add(a, b)
  return group
}

function makeTicker(): THREE.Group {
  const group = new THREE.Group()
  for (let i = 0; i < 12; i += 1) {
    const h = 0.25 + ((i * 37) % 10) / 18
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, h, 0.12),
      new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0x6b9e8a : 0xc4a572,
        emissive: i % 3 === 0 ? 0x6b9e8a : 0xc4a572,
        emissiveIntensity: 0.15,
        roughness: 0.4,
      }),
    )
    const angle = (i / 12) * Math.PI * 2
    bar.position.set(Math.cos(angle) * 1.7, h / 2 - 0.2, Math.sin(angle) * 1.7)
    bar.userData.base = h
    group.add(bar)
  }
  return group
}

export function createThesisScene(canvas: HTMLCanvasElement): SceneHandle {
  const reduced = prefersReducedMotion()
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !reduced,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, reduced ? 1 : 1.75))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x090b0e, 0.055)

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80)
  camera.position.copy(CHAPTER_CAM.open.pos)

  scene.add(new THREE.AmbientLight(0xb8c4c0, 0.55))
  const key = new THREE.DirectionalLight(0xf3efe6, 1.15)
  key.position.set(3.2, 4.4, 2.6)
  const rim = new THREE.DirectionalLight(0xc4a572, 0.55)
  rim.position.set(-4, 1.4, -2)
  const fill = new THREE.PointLight(0x6b9e8a, 1.4, 12)
  fill.position.set(-1.5, 0.8, 2.4)
  scene.add(key, rim, fill)

  const globe = makeGlobe()
  const pings = makeRiskPings()
  globe.add(pings)
  const vault = makeVault()
  const terrain = makeTerrain()
  const books = makeBooks()
  const ticker = makeTicker()
  const stars = makeStars()
  vault.visible = false
  terrain.visible = false
  books.visible = false
  ticker.visible = false
  scene.add(stars, globe, vault, terrain, books, ticker)

  const particles = (() => {
    const count = 160
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 1.1
      pos[i * 3 + 1] = 1.6 + Math.random() * 1.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.1
      vel[i] = 0.004 + Math.random() * 0.01
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: 0xc4a572, size: 0.035, transparent: true, opacity: 0.85 }),
    )
    pts.visible = false
    scene.add(pts)
    return { pts, pos, vel, geo }
  })()

  let chapter: ChapterId = 'open'
  const camPos = CHAPTER_CAM.open.pos.clone()
  const camLook = CHAPTER_CAM.open.look.clone()
  const targetPos = CHAPTER_CAM.open.pos.clone()
  const targetLook = CHAPTER_CAM.open.look.clone()
  let fillTarget = 0.18
  let raf = 0
  let last = performance.now()

  const applyChapter = (id: ChapterId) => {
    chapter = id
    targetPos.copy(CHAPTER_CAM[id].pos)
    targetLook.copy(CHAPTER_CAM[id].look)
    globe.visible = id !== 'verde'
    pings.visible = id === 'open' || id === 'caveats'
    vault.visible = id === 'buffers' || id === 'pitch'
    terrain.visible = id === 'verde'
    books.visible = id === 'books' || id === 'win'
    ticker.visible = id === 'analogy' || id === 'insurance' || id === 'market'
    particles.pts.visible = id === 'buffers' || id === 'pitch'
    fillTarget = id === 'buffers' ? 0.72 : id === 'pitch' ? 0.28 : 0.18
    if (reduced) {
      camPos.copy(targetPos)
      camLook.copy(targetLook)
    }
  }

  const setFill = (ratio: number) => {
    fillTarget = THREE.MathUtils.clamp(ratio, 0.08, 0.92)
  }

  const resize = () => {
    const parent = canvas.parentElement
    const w = parent?.clientWidth || canvas.clientWidth || 640
    const h = parent?.clientHeight || canvas.clientHeight || 480
    renderer.setSize(w, h, false)
    camera.aspect = w / Math.max(h, 1)
    camera.updateProjectionMatrix()
  }

  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    const ease = reduced ? 1 : 1 - Math.exp(-dt * 3.2)
    camPos.lerp(targetPos, ease)
    camLook.lerp(targetLook, ease)
    camera.position.copy(camPos)
    camera.lookAt(camLook)

    if (!reduced) {
      globe.rotation.y += dt * (chapter === 'open' ? 0.12 : 0.06)
      books.rotation.y += dt * 0.18
      books.rotation.z += dt * 0.05
      ticker.children.forEach((child, i) => {
        const bar = child as THREE.Mesh
        const base = bar.userData.base as number
        const h = base * (0.75 + 0.25 * Math.sin(now * 0.0018 + i))
        bar.scale.y = h / base
        bar.position.y = h / 2 - 0.2
      })
      pings.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.geometry.type === 'RingGeometry') {
          const s = 1 + 0.35 * Math.sin(now * 0.002 + i)
          child.scale.setScalar(s)
          const mat = child.material as THREE.MeshBasicMaterial
          mat.opacity = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(now * 0.002 + i))
        }
      })
      if (particles.pts.visible) {
        for (let i = 0; i < particles.vel.length; i += 1) {
          particles.pos[i * 3 + 1] -= particles.vel[i] * 60 * dt
          if (particles.pos[i * 3 + 1] < -0.6) {
            particles.pos[i * 3 + 1] = 2.1
            particles.pos[i * 3] = (Math.random() - 0.5) * 1.05
            particles.pos[i * 3 + 2] = (Math.random() - 0.5) * 1.05
          }
        }
        particles.geo.attributes.position.needsUpdate = true
      }
    }

    const fillMesh = vault.getObjectByName('vaultFill') as THREE.Mesh | undefined
    if (fillMesh) {
      fillMesh.scale.y = THREE.MathUtils.lerp(fillMesh.scale.y, fillTarget, reduced ? 1 : 0.04)
      fillMesh.position.y = -0.75 + fillMesh.scale.y * 0.75
    }

    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }

  resize()
  raf = requestAnimationFrame(tick)

  const onResize = () => resize()
  window.addEventListener('resize', onResize)

  return {
    setChapter: applyChapter,
    setFill,
    resize,
    dispose: () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose()
          const mat = obj.material
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat.dispose()
        }
      })
    },
  }
}
