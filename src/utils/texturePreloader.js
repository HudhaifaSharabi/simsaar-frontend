import * as THREE from "three";

class TexturePreloader {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.cache = new Map();
  }

  preload(url) {
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    }

    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          texture.needsUpdate = true;
          this.cache.set(url, texture);
          resolve(texture);
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
          reject(error);
        }
      );
    });
  }

  clear() {
    this.cache.clear();
  }
}

export const texturePreloader = new TexturePreloader();
