const multiDefault = () => {
	const elements = document.querySelectorAll('.multi-default');
	if (elements.length > 0) {
		elements.forEach(el => {
			const choices = new Choices(el, {
				searchEnabled: false,
			});
		});
	}
}

multiDefault()

const multiDefaults = () => {
	const elements = document.querySelectorAll('.multi-defaults');

	if (elements.length > 0) {
		elements.forEach(el => {
			// Проверяем, есть ли уже Choices на этом элементе
			if (!el.choices) {
				const choices = new Choices(el, {
					searchEnabled: false,
					allowHTML: true,
				});

				// Находим customInput по ID
				const customInput = document.getElementById('customInput');

				el.addEventListener('change', function () {
					if (customInput) { // Проверяем наличие customInput
						if (el.value === 'other') {
							customInput.style.display = 'block';
							customInput.focus();
						} else {
							customInput.style.display = 'none';
						}
					}
				});

				if (customInput) { // Проверяем существование customInput перед добавлением обработчика
					customInput.addEventListener('blur', function () {
						const customValue = customInput.value.trim();

						if (customValue) {
							const existingOption = Array.from(el.options).some(option => option.value === customValue);

							if (!existingOption) {
								const newOption = document.createElement('option');
								newOption.value = customValue;
								newOption.textContent = customValue;
								newOption.selected = true;

								el.appendChild(newOption);

								// Обновляем Choices после добавления новой опции
								choices.setChoices(
									Array.from(el.options).map(option => ({
										value: option.value,
										label: option.textContent,
										selected: option.selected,
										disabled: option.disabled
									})),
									'value',
									'label',
									false // Устанавливаем false для обновления Choices без перезагрузки
								);

								// Устанавливаем новый вариант как выбранный
								choices.setChoiceByValue(customValue);
							}

							customInput.value = '';
							customInput.style.display = 'none';
						}
					});
				}
			}
		});
	}
};

multiDefaults();

const select = document.getElementById('customSelect');
const customInput = document.getElementById('customInput');
let choicesInstance = new Choices(select); // Создаем экземпляр Choices для select

// Обработчик события blur для текстового поля
if (customInput) {
	customInput.addEventListener('blur', function () {
		const customValue = customInput.value.trim();

		if (customValue) {
			// Проверяем, есть ли уже такая опция
			const existingOption = Array.from(select.options).some(option => option.value === customValue);

			if (!existingOption) {
				const newOption = document.createElement('option');
				newOption.value = customValue;
				newOption.textContent = customValue;
				newOption.selected = true;

				select.appendChild(newOption);

				// Обновляем Choices после добавления новой опции
				choicesInstance.setChoices(
					Array.from(select.options).map(option => ({
						value: option.value,
						label: option.textContent,
						selected: option.selected,
						disabled: option.disabled
					})),
					'value',
					'label',
					false // Устанавливаем false для обновления Choices без перезагрузки
				);

				// Устанавливаем новый вариант как выбранный
				choicesInstance.setChoiceByValue(customValue);
			}

			customInput.value = ''; // Очищаем поле ввода
			customInput.style.display = 'none'; // Скрываем поле ввода после добавления
		}
	});
}