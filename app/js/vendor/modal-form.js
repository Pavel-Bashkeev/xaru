window.addEventListener('DOMContentLoaded', () => {
  const btnLink = document.querySelectorAll('.btn-link');
  const modalForm = document.querySelector('.modal-form');
  const closeBtn = document.querySelector('.close-btn');
  if (btnLink) {
    closeBtn.addEventListener('click', () => {
      modalForm.classList.add('hide');
      document.body.classList.remove('hidden');
    })
    btnLink.forEach(item => {
      item.addEventListener('click', showModalForm);

    });

    function showModalForm() {
      modalForm.classList.toggle('hide');
      document.body.classList.add('hidden')
    }

    modalForm.addEventListener('click', function (e) {
      let target = e.target;
      let form = document.querySelector('.form');
      let itsForm = target.classList.contains('form');
      let itsFormElem = form.contains(target);
      if (!itsForm && !itsFormElem) {
        modalForm.classList.add('hide');
        document.body.classList.remove('hidden')
      }
    })
  }

});