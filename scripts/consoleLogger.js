document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('formValid', function (event) {
    const data = event.detail;

    console.clear();
    console.log('Форма успешно отправлена!');
    console.log('ФИО:', data.fullname);
    console.log('Email:', data.email);
    console.log('Тема:', data.topic);
    console.log('Сообщение:', data.message);
    console.log('Время отправки:', new Date().toLocaleString('ru-RU'));
  });
});