import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function World({ night, rotate }: { night: boolean; rotate: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const state = useRef<{ scene: THREE.Scene; sun: THREE.DirectionalLight; ambient: THREE.HemisphereLight; windows: THREE.MeshStandardMaterial; renderer: THREE.WebGLRenderer; world: THREE.Group } | null>(null);
  const rotating = useRef(rotate);
  rotating.current = rotate;

  useEffect(() => {
    const host = container.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { host.classList.add('world-unavailable'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-10, 10, 9, -9, .1, 100);
    camera.position.set(19, 16, 23);
    camera.lookAt(0, 1.1, 0);
    const ambient = new THREE.HemisphereLight(0xffffff, 0x8b8870, 2.8);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xfff7dc, 4.2);
    sun.position.set(-8, 18, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14 });
    sun.shadow.normalBias = .025;
    sun.shadow.bias = -.0003;
    sun.shadow.radius = 4;
    scene.add(sun);
    const world = new THREE.Group();
    scene.add(world);
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const materialCache = new Map<string, THREE.MeshStandardMaterial>();
    function mat(color: string) {
      if (!materialCache.has(color)) { const m = new THREE.MeshStandardMaterial({ color, roughness: 1 }); materialCache.set(color, m); materials.push(m); }
      return materialCache.get(color)!;
    }
    function box(x: number, y: number, z: number, w: number, h: number, d: number, color: string | THREE.MeshStandardMaterial, parent = world) {
      const geometry = new THREE.BoxGeometry(w, h, d); geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, typeof color === 'string' ? mat(color) : color);
      mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    }
    let seed = 19;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const grasses = ['#789954', '#87a55d', '#91ac68', '#7f9e59', '#98af70'];
    const soils = ['#a98b6c', '#b39a7b', '#92795f', '#a18769'];
    const water = new THREE.MeshStandardMaterial({ color: '#72b7bc', roughness: .25, metalness: .12 }); materials.push(water);
    for (let x = -6; x <= 6; x++) for (let z = -5; z <= 5; z++) {
      if ((Math.abs(x) === 6 && Math.abs(z) > 2) || (Math.abs(x) > 4 && Math.abs(z) === 5) || (x === -5 && z === 4)) continue;
      const height = 1.8 + Math.floor(random() * 3) * .35;
      box(x, -.35 - height / 2, z, 1, height, 1, soils[Math.floor(random() * soils.length)]);
      box(x, -height + .05, z, 1.001, .26, 1.001, '#7c8073');
      const isWater = (z === 2 && x < 1) || (z === 3 && x > -6 && x < 0) || (z === 1 && x > -5 && x < -1);
      box(x, isWater ? -.16 : -.1, z, 1.005, isWater ? .16 : .5, 1.005, isWater ? water : grasses[Math.floor(random() * grasses.length)]);
      if (!isWater && random() > .69 && (x < 0 || z > 1)) {
        const px = x + random() * .6 - .3, pz = z + random() * .6 - .3;
        box(px, .28, pz, .09, .33, .09, '#648346');
        box(px + .13, .23, pz, .08, .21, .08, '#6f8c48');
      }
    }
    // A sunlit cabin, built block by block.
    box(2, .3, -1.7, 4.4, .45, 3.6, '#8b7455');
    box(2, 1.65, -1.7, 3.8, 2.3, 3.1, '#e3d9b4');
    for (const x of [.13, 3.87]) for (const z of [-3.22, -.18]) box(x, 1.7, z, .2, 2.4, .2, '#92704e');
    for (let row = 0; row < 5; row++) {
      const w = 4.7 - row * .79;
      box(2, 2.95 + row * .31, -1.7, w, .36, 3.8, row % 2 ? '#aa6850' : '#b57455');
    }
    box(3.1, 4.4, -2.7, .57, 1.5, .57, '#b6b1a0');
    box(3.1, 5.2, -2.7, .75, .18, .75, '#858878');
    const windows = new THREE.MeshStandardMaterial({ color: '#e4b86d', emissive: '#ffb74c', emissiveIntensity: .18, roughness: .3 }); materials.push(windows);
    for (const x of [.86, 3.16]) {
      box(x, 1.92, -.125, .91, 1.05, .12, '#795b3f');
      box(x, 1.92, -.045, .7, .81, .035, windows);
      box(x, 1.92, -.02, .045, .85, .045, '#e5d7ad');
      box(x, 1.92, -.02, .74, .045, .045, '#e5d7ad');
      box(x, 1.33, .03, 1.1, .15, .32, '#8a6947');
    }
    box(2, 1.35, -.085, .74, 1.7, .13, '#8a6747');
    box(2.24, 1.28, .01, .08, .08, .08, '#e9c274');
    box(2, .48, .36, 1.15, .28, .76, '#c1af88');
    box(2, .26, .86, 1.35, .22, .43, '#b9aa86');
    for (let z = 1; z < 4.5; z += .75) box(2 + (z > 3 ? .6 : 0), .19, z, .8, .1, .58, '#c2ba9d');
    // Chunky foliage gives the trees their distinctive voxel silhouette.
    function tree(x: number, z: number, scale = 1) {
      const t = new THREE.Group(); t.position.set(x, .15, z); t.scale.setScalar(scale); world.add(t);
      box(0, 1.35, 0, .48, 2.7, .48, '#80674b', t);
      box(.3, 2.03, 0, .9, .3, .28, '#80674b', t);
      box(0, 3.08, 0, 2.1, 1.36, 2.02, '#567a43', t);
      box(-.55, 3.58, .3, 1.5, 1.1, 1.55, '#6f8f4d', t);
      box(.55, 3.48, -.34, 1.7, 1.24, 1.65, '#77964e', t);
      box(.05, 4.05, -.12, 1.7, .7, 1.6, '#85a65b', t);
      box(-.79, 2.85, .3, .6, .75, .85, '#648849', t);
    }
    tree(-3.2, -2.8, 1.18); tree(-5, -.7, .84); tree(.15, -4, .76); tree(4.6, -3.3, .84); tree(5, .8, .7);
    // A footbridge over the stream.
    for (let x = -4.5; x <= -.7; x += .45) box(x, .27, 2, .39, .18, 1.25, '#b5956a');
    for (const z of [1.4, 2.6]) {
      for (const x of [-4.5, -2.6, -.7]) box(x, .65, z, .13, 1, .13, '#947950');
      box(-2.6, 1.02, z, 4, .11, .12, '#b49a70');
    }
    for (const [x,z] of [[-5, 2],[-1,3],[-3,1]]) box(x, -.035, z, .55, .16, .38, '#b6c8bb');
    // Garden beds, flowers, and a little inhabitant.
    for (let i = 0; i < 7; i++) {
      const x = 3.8 + (i % 3) * .48, z = 2.4 + Math.floor(i / 3) * .5;
      box(x, .35, z, .055, .43, .055, '#547842');
      box(x, .6, z, .22, .16, .22, i % 2 ? '#e6c16a' : '#f0e8cb');
    }
    box(-4.3, .32, 3.7, .65, .48, .65, '#9c805a');
    box(-4.3, .6, 3.7, .67, .08, .67, '#c3a079');
    const person = new THREE.Group(); person.position.set(1.15, .18, 2.7); world.add(person);
    box(-.1, .24, 0, .17, .46, .21, '#3c4b4a', person); box(.14, .24, 0, .17, .46, .21, '#3c4b4a', person);
    box(.02, .69, 0, .47, .49, .28, '#e8b862', person);
    box(.02, 1.08, 0, .38, .37, .36, '#d5ab86', person);
    box(.02, 1.28, -.04, .4, .12, .39, '#54493d', person);
    box(-.23, .66, 0, .13, .44, .22, '#e8b862', person); box(.28, .66, 0, .13, .44, .22, '#e8b862', person);
    box(-.07, 1.08, .188, .04, .04, .02, '#3c3b35', person); box(.12, 1.08, .188, .04, .04, .02, '#3c3b35', person);
    // Fence and a bench on the right edge.
    for (let z = -.2; z < 4; z += 1) box(5.65, .62, z, .17, .95, .17, '#b9ab84');
    for (const y of [.51, .87]) box(5.65, y, 1.6, .11, .13, 4.3, '#ccbc91');
    box(4.1, .54, .75, .55, .15, 1.5, '#a58961'); box(4.37, .88, .75, .14, .65, 1.5, '#a58961');
    for (const z of [.25,1.25]) box(4.1, .3, z, .12, .4, .13, '#736348');
    // Clouds float beyond the island without obscuring the workspace.
    for (const [x,y,z,s] of [[-5.8,6,-5,1], [5.5,6.5,-5.4,.75]]) {
      box(x,y,z,2.9*s,.48*s,1.1*s,'#ffffff');
      box(x+.3*s,y+.4*s,z,1.5*s,.5*s,1.05*s,'#ffffff');
    }
    const shadowMat = new THREE.ShadowMaterial({ opacity: .12 }); materials.push(shadowMat);
    const floorGeo = new THREE.PlaneGeometry(70,70); geometries.push(floorGeo);
    const floor = new THREE.Mesh(floorGeo, shadowMat); floor.rotation.x = -Math.PI/2; floor.position.y = -3.65; floor.receiveShadow = true; scene.add(floor);
    state.current = { scene, sun, ambient, windows, renderer, world };
    function resize() {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      const aspect = width / height;
      camera.left = -8.1 * aspect; camera.right = 8.1 * aspect; camera.top = 8.1; camera.bottom = -8.1;
      camera.updateProjectionMatrix();
    }
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    let pointerX = 0, pointerY = 0;
    const move = (event: PointerEvent) => { const r = host.getBoundingClientRect(); pointerX = ((event.clientX-r.left)/r.width-.5)*.1; pointerY = ((event.clientY-r.top)/r.height-.5)*.03; };
    const leave = () => { pointerX = 0; pointerY = 0; };
    host.addEventListener('pointermove',move); host.addEventListener('pointerleave',leave);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0, angle = 0, visible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(host);
    function draw() {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (rotating.current && !reduced) angle += .003;
      if (!reduced) { world.rotation.y += (angle + pointerX-world.rotation.y)*.045; world.rotation.x += (pointerY-world.rotation.x)*.04; }
      renderer.render(scene,camera);
    }
    draw();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); visibilityObserver.disconnect(); host.removeEventListener('pointermove',move); host.removeEventListener('pointerleave',leave); geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose()); renderer.dispose(); renderer.domElement.remove(); state.current = null; };
  }, []);

  useEffect(() => {
    const s = state.current; if (!s) return;
    s.sun.intensity = night ? 1.5 : 4.2;
    s.sun.color.set(night ? '#9fbaff' : '#fff7dc');
    s.ambient.intensity = night ? 1.25 : 2.8;
    s.ambient.color.set(night ? '#8194c5' : '#ffffff');
    s.windows.emissiveIntensity = night ? 3 : .18;
  }, [night]);

  return <div className="voxel-world" ref={container} role="img" aria-label="An interactive 3D voxel island with a woodland cabin, blocky trees, a stream, and a small developer. Move your pointer to look around."><span className="world-fallback">A little world is taking shape.</span></div>;
}
