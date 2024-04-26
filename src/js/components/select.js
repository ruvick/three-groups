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
