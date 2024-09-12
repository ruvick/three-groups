import JustValidate from 'just-validate';
import Inputmask from "inputmask";

// document.addEventListener('DOMContentLoaded', () => {
    const telInput = document.querySelector('input[type="tel"]');

    if (telInput) {
        const inputMask = new Inputmask('+7 (999) 999-99-99');
        inputMask.mask(telInput);
    }

    const validateForms = (rules, afterSend) => {
        const forms = document.querySelectorAll('form');

        forms.forEach((form) => {
            const validation = new JustValidate(form);

            for (let item of rules) {
                const fieldElement = form.querySelector(item.ruleSelector);
                if (fieldElement) {
                    validation.addField(item.ruleSelector, item.rules);
                } else {
                    // console.error(`Поле с селектором ${item.ruleSelector} не существует в DOM!`);
                }
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
        });
    };

    validateForms([
        {
            ruleSelector: 'input[type="name"]',
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
            ruleSelector: 'input[type="email"]',
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
            ruleSelector: 'input[type="tel"]',
            rules: [
                {
                    rule: 'required',
                    errorMessage: 'Заполните поле'
                },
                {
                    rule: 'function',
                    validator: function () {
                        const phoneInput = document.querySelector('input[type="tel"]');
                        if (phoneInput && phoneInput.inputmask) {
                            const phone = phoneInput.inputmask.unmaskedvalue();
                            return phone.length === 10;
                        }
                        return false;
                    },
                    errorMessage: 'Введите корректный телефон'
                }
            ],
        },
        {
            ruleSelector: 'textarea[type="text"]',
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
// });