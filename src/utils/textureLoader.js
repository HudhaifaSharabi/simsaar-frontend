import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export const loadTexture = (url) => {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = 16;
        // texture.encoding = THREE.sRGBEncoding;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
}; 