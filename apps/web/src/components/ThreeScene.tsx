'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Seeded pseudo-random based on sin — fully deterministic, no Math.random()
function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
}

// Pre-compute all shape configs deterministically so there is no Math.random() call
const SHAPE_COUNT = 20;
const CONFIGS = Array.from({ length: SHAPE_COUNT }, (_, i) => ({
  geoType: i % 4,
  size: 0.2 + sr(i * 3.1) * 0.22,
  isWire: i % 3 === 0,
  color: i % 2 === 0 ? 0xff5a1f : 0xff3b30,
  opacity: i % 3 === 0 ? 0.5 : 0.2,
  emissive: i % 2 === 0 ? 0x441500 : 0x330800,
  px: (sr(i * 1.7) - 0.5) * 14,
  py: (sr(i * 2.3) - 0.5) * 9,
  pz: (sr(i * 4.1) - 0.5) * 4 - 1,
  rx: sr(i * 5.7) * Math.PI * 2,
  ry: sr(i * 6.3) * Math.PI * 2,
  rz: sr(i * 7.1) * Math.PI * 2,
  rotSpeedX: (sr(i * 8.9) - 0.5) * 0.012,
  rotSpeedY: (sr(i * 9.3) - 0.5) * 0.009,
  floatOffset: sr(i * 11.1) * Math.PI * 2,
  floatSpeed: 0.25 + sr(i * 12.7) * 0.55,
  floatAmp: 0.2 + sr(i * 13.3) * 0.25,
}));

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const w = parent?.clientWidth ?? window.innerWidth;
    const h = parent?.clientHeight ?? window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const orangeLight = new THREE.PointLight(0xff5a1f, 5, 28);
    orangeLight.position.set(4, 5, 5);
    scene.add(orangeLight);

    const redLight = new THREE.PointLight(0xff3b30, 3, 20);
    redLight.position.set(-5, -3, 3);
    scene.add(redLight);

    const fillLight = new THREE.PointLight(0xffffff, 1, 20);
    fillLight.position.set(0, 0, 8);
    scene.add(fillLight);

    // Build meshes from deterministic config
    const geoFactories = [
      (s: number) => new THREE.IcosahedronGeometry(s, 0),
      (s: number) => new THREE.OctahedronGeometry(s, 0),
      (s: number) => new THREE.TetrahedronGeometry(s, 0),
      (s: number) => new THREE.DodecahedronGeometry(s, 0),
    ];

    const meshes: THREE.Mesh[] = [];
    const initYs: number[] = [];
    const floatOffsets: number[] = [];
    const floatSpeeds: number[] = [];
    const floatAmps: number[] = [];
    const rotSpeeds: { x: number; y: number }[] = [];

    CONFIGS.forEach((cfg) => {
      const geo = geoFactories[cfg.geoType](cfg.size);
      const mat = new THREE.MeshPhongMaterial({
        color: cfg.color,
        wireframe: cfg.isWire,
        transparent: true,
        opacity: cfg.opacity,
        shininess: 100,
        emissive: cfg.emissive,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.px, cfg.py, cfg.pz);
      mesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);

      meshes.push(mesh);
      initYs.push(cfg.py);
      floatOffsets.push(cfg.floatOffset);
      floatSpeeds.push(cfg.floatSpeed);
      floatAmps.push(cfg.floatAmp);
      rotSpeeds.push({ x: cfg.rotSpeedX, y: cfg.rotSpeedY });
      scene.add(mesh);
    });

    // Mouse parallax state
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animate
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      meshes.forEach((mesh, i) => {
        mesh.rotation.x += rotSpeeds[i].x;
        mesh.rotation.y += rotSpeeds[i].y;
        mesh.position.y = initYs[i] + Math.sin(t * floatSpeeds[i] + floatOffsets[i]) * floatAmps[i];
      });

      // Smooth camera drift
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const nw = canvas.parentElement?.clientWidth ?? window.innerWidth;
      const nh = canvas.parentElement?.clientHeight ?? window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      meshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 6,
      }}
    />
  );
}
