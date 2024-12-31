import * as THREE from "three";

export function animateCamera(camera, controls, targetPosition, duration, onComplete) {
    if (!camera || !controls) {
        console.error("Camera or controls are missing");
        return;
    }

    if (!targetPosition || targetPosition.length !== 3) {
        console.error("Invalid targetPosition:", targetPosition);
        return;
    }

    const startPosition = new THREE.Vector3().copy(camera.position);
    const startRotation = camera.quaternion.clone();

    const endPosition = new THREE.Vector3(...targetPosition);
    camera.lookAt(endPosition);
    const endRotation = camera.quaternion.clone();
    camera.position.copy(startPosition);
    camera.quaternion.copy(startRotation);

    let elapsedTime = 0;

    const animateStep = (deltaTime) => {
        elapsedTime += deltaTime;
        const t = Math.min(elapsedTime / duration, 1);

        camera.position.lerpVectors(startPosition, endPosition, t);
        THREE.Quaternion.slerp(startRotation, endRotation, camera.quaternion, t);

        if (t === 1) {
            controls.enabled = true;
            if (onComplete) onComplete();
            return false; // Stop animation
        }
        return true; // Continue animation
    };

    controls.enabled = false;
    controls.addEventListener("frame", animateStep);
}
