function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
  console.log("�ثe�ʪ����ӫ~�ƶq�G", totalItems);
}

// �[�J�ʪ���
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.photo-card');
      const id = button.dataset.productId;
      const name = card.querySelector('.product-name').textContent;
      const price = card.querySelector('.product-price').textContent;
      const image = card.querySelector('img').src;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} �w�[�J�ʪ����I`);
      updateCartCount();
    });
  });

  updateCartCount();
});
