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
			}

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			ev.target.reset();
		});
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
			tel: true,
			telError: 'Введите корректный телефон'
		},
		{
			ruleSelector: 'textarea[name="comment"]',
			rules: [
				{
					rule: 'required',
					errorMessage: 'Заполните поле'
				}
			]
		}
	], () => {
		alert('Форма успешно отправлена!');
	});
});