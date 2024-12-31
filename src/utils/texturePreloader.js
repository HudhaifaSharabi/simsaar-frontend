import * as THREE from "three";

class TexturePreloader {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.cache = new Map();
  }

  async preload(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const texture = await new Promise((resolve, reject) => {
        this.textureLoader.load(
          url,
          (texture) => {
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.anisotropy = 16;
            texture.generateMipmaps = true;
            texture.needsUpdate = true;
            resolve(texture);
          },
          undefined,
          (error) => reject(error)
        );
      });

      this.cache.set(url, texture);
      return texture;
    } catch (error) {
      console.error(`Failed to preload texture: ${url}`, error);
      throw error;
    }
  }

  async preloadMultiple(urls) {
    return Promise.all(urls.map((url) => this.preload(url)));
  }

  get(url) {
    return this.cache.get(url);
  }
}

export const texturePreloader = new TexturePreloader();
