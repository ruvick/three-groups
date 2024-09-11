import JustValidate from 'just-validate';
import Inputmask from "inputmask";

document.addEventListener('DOMContentLoaded', () => {
  const telInput = document.querySelector('input[type="tel"]');

  if (telInput) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telInput);
  }

  const validateForms = (selector, rules, afterSend) => {
    const form = document?.querySelector(selector);

    if (!form) {
      console.error('Нет такого селектора!');
      return false;
    }

    if (!rules) {
      console.error('Вы не передали правила валидации!');
      return false;
    }

    const validation = new JustValidate(selector);

    for (let item of rules) {
      validation.addField(item.ruleSelector, item.rules);
    }

    // Обработка ошибок для селекта
    validation.onFail((errors) => {
      const choicesInner = form.querySelector('.choices__inner'); // Ищем внутри текущей формы
      if (choicesInner) {
        choicesInner.classList.add('just-validate-error-field');
      }
    });

    validation.onSuccess((ev) => {
      let formData = new FormData(ev.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (afterSend) {
              afterSend();
            }
            console.log('Отправлено');
          }
        }
      };

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      ev.target.reset();
      
      // Удаляем класс ошибки после успешной отправки формы
      const choicesInner = form.querySelector('.choices__inner');
      if (choicesInner) {
        choicesInner.classList.remove('just-validate-error-field');
      }
    });

    // Добавляем обработчик события change для селекта
    const selectElement = form.querySelector('#customSelect');
    if (selectElement) {
      selectElement.addEventListener('change', () => {
        const choicesInner = form.querySelector('.choices__inner');
        if (choicesInner) {
          choicesInner.classList.remove('just-validate-error-field');
        }
      });
    }
  };

  validateForms('.main-form', [
    {
      ruleSelector: 'input[name="name"]',
      rules: [
        {
          rule: 'required',
          errorMessage: 'Заполните поле'
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Минимальная длина 3 символа'
        }
      ]
    },
    {
      ruleSelector: 'input[name="email"]',
      rules: [
        {
          rule: 'required',
          errorMessage: 'Заполните поле'
        },
        {
          rule: 'email',
          errorMessage: 'Введите корректный email'
        }
      ]
    },
    {
      ruleSelector: 'input[name="phone"]',
      rules: [
        {
          rule: 'required',
          errorMessage: 'Заполните поле'
        },
        {
          rule: 'function',
          validator: function () {
            const phone = document.querySelector('input[name="phone"]').inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: 'Введите корректный телефон'
        }
      ],
    },
    {
      ruleSelector: 'textarea[name="comment"]',
      rules: [
        {
          rule: 'required',
          errorMessage: 'Заполните поле'
        }
      ]
    },
    // Валидация для селекта
    {
      ruleSelector: '#customSelect',
      rules: [
        {
          rule: 'required',
          errorMessage: 'Пожалуйста, выберите мероприятие'
        }
      ]
    }
  ], () => {
    alert('Форма успешно отправлена!');
  });
});