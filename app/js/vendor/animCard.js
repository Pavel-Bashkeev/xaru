const cardContentDecor = document.querySelector('.card-content__decor');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1300 && document.body.clientWidth > 500) {
    document.addEventListener('mousemove', moveElemCardMouse);
    console.log('work')
  }
})


function moveElemCardMouse(event) {
  document.querySelectorAll('.card-content__decor-i').forEach(function (move) {

    let moving_value = move.getAttribute("data-value");
    let x = (event.clientX * moving_value) / 250;
    let y = (event.clientY * moving_value) / 250;

    move.style.transform = `translate(${x}px, ${y}px)`
  })
}