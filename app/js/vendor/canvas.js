window.addEventListener('DOMContentLoaded', () => {
  let part = Particles.init({ // normal options
    selector: '.background',
    maxParticles: 150,
    color: '#1f8efa',
    minDistance: 120,
    sizeVariations: 3,
    connectParticles: true,
    responsive: [{
      breakpoint: 768,
      options: {
        maxParticles: 200,
        color: '#1f8efa',
        connectParticles: false
      }
    }, {
      breakpoint: 425,
      options: {
        maxParticles: 100,
        connectParticles: true
      }
    }, {
      breakpoint: 320,
      options: {
        maxParticles: 0

        // disables particles.js
      }
    }]

  });
})