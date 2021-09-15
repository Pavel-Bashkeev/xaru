document.addEventListener('mousemove', moveElemCardMouse);

function moveElemCardMouse(event){
  document.querySelectorAll('.card-content__decor-i').forEach(function(move){

    let moving_value = move.getAttribute("data-value");
    let x = (event.clientX * moving_value) / 250;
    let y = (event.clientY * moving_value) / 250;

    move.style.transform = `translate(${x}px, ${y}px)`
  })
}