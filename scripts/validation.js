document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Сброс предыдущих ошибок
    document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
      el.classList.remove('is-danger');
    });
    document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

    let isValid = true;

    // === Валидация ФИО (имя) ===
    const fullname = document.getElementById('fullname');
    const fullnameValue = fullname.value.trim();
    if (fullnameValue === '') {
      showError(fullname, 'Введите ваше имя');
      isValid = false;
    } else if (fullnameValue.split(' ').length < 2) {
      showError(fullname, 'Укажите как минимум имя и фамилию');
      isValid = false;
    }

    // === Валидация email ===
    const email = document.getElementById('email');
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
      showError(email, 'Введите email');
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(email, 'Введите корректный email');
      isValid = false;
    }

    // === Валидация темы ===
    const topic = document.getElementById('topic');
    if (topic.value === '') {
      showError(topic, 'Выберите тему обращения');
      isValid = false;
    }

    // === Валидация сообщения ===
    const message = document.getElementById('message');
    const messageValue = message.value.trim();
    if (messageValue === '') {
      showError(message, 'Напишите сообщение');
      isValid = false;
    } else if (messageValue.length > 500) {
      showError(message, 'Сообщение не должно превышать 500 символов');
      isValid = false;
    }

    // === Валидация чекбокса ===
    const agreement = document.getElementById('agreement');
    if (!agreement.checked) {
      // Bulma не стилизует чекбоксы через is-danger, поэтому просто покажем ошибку рядом
      const error = document.createElement('p');
      error.className = 'help is-danger';
      error.textContent = 'Требуется согласие на обработку данных';
      agreement.parentNode.parentNode.appendChild(error);
      isValid = false;
    }

    // Если всё в порядке — отправляем данные
    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        email: emailValue,
        topic: topic.value,
        message: messageValue
      };

      // Генерируем кастомное событие
      const customEvent = new CustomEvent('formValid', { detail: formData });
      document.dispatchEvent(customEvent);

      alert('Форма отправлена! Данные в консоли.');
    }
  });

  // Функция отображения ошибки
  function showError(input, message) {
    input.classList.add('is-danger');
    const help = document.createElement('p');
    help.className = 'help is-danger';
    help.textContent = message;
    input.closest('.field').appendChild(help);
  }

  // Сброс ошибок при вводе
  document.querySelectorAll('.input, .textarea, select').forEach(el => {
    el.addEventListener('input', function () {
      this.classList.remove('is-danger');
      const field = this.closest('.field');
      field.querySelectorAll('.help.is-danger').forEach(err => err.remove());
    });
  });

  // Для чекбокса
  const agreement = document.getElementById('agreement');
  if (agreement) {
    agreement.addEventListener('change', function () {
      const errors = this.parentNode.parentNode.querySelectorAll('.help.is-danger');
      errors.forEach(el => el.remove());
    });
  }
});