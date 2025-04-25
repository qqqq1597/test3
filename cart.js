function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>�ثe�ʪ����O�Ū��C</p>';
    totalDisplay.textContent = 'NT$0';
    return;
  }

  cart.forEach(item => {
    const itemTotal = parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>����G${item.price}</p>
        <p>�ƶq�G${item.quantity}</p>
      </div>
      <button class="remove-button" data-id="${item.id}">����</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  totalDisplay.textContent = `NT$${total}`;

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // ���s��V
    });
  });
}

document.getElementById('clear-cart').addEventListener('click', () => {
  localStorage.removeItem('cart');
  renderCart();
});

document.addEventListener('DOMContentLoaded', renderCart);
