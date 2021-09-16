if(document.body.clientWidth > 420){
  window.onload = function () {
    var divContainer = '#super-particles'
    new SuperParticles({
      container: {
        element : divContainer,
        backgroundCssRule: "transparent"
      },
      maxFps: 30,
      autoStartAnimation: true,
      particles: {
      amount: 220, 
      radius: 3,
      velocity : 20,
      color: "0x1f8efa",
      maxOpacity: 0.4, 
      fadeInDuration: 1000, 
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
}