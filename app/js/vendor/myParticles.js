window.onload = function () {
  var divContainer = '#super-particles'
  new SuperParticles({
    container: divContainer,
    maxFps: 30,
    autoStartAnimation: true,
    particles: {
    amount: 120, 
    radius: 3,
    velocity : 20,
    color: "0x1f8efa", 
    fadeInDuration: 3000, 
    fadeOutDuration: 600, 
    keepRelativePositionOnResize: true,
},
lines: {
    minDistance: 0.15,
    color: "0xFFFFFF",
    maxOpacity: 0.4,
    thickness: 1,
    distanceBasedTransparency: true,
},
  })
}