const btnLink = document.querySelectorAll('.btn-link');
const modalForm = document.querySelector('.modal-form');
btnLink.forEach(item => {
  item.addEventListener('click' , showModalForm);

});

function showModalForm() {
  modalForm.classList.toggle('hide');
}

modalForm.addEventListener('click', function(e){
  let target = e.target;
  let form = document.querySelector('.form');
  let itsForm = target.classList.contains('form');
  let itsFormElem = form.contains(target);
  if(!itsForm && !itsFormElem){
    modalForm.classList.add('hide');
  }
})