const phoneInput = document.querySelector('input[name=contact]');

phoneInput.addEventListener('input', function(){
  this.value = this.value.replace (/[^0-9+]/, '')
})