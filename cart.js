function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>目前購物車是空的。</p>';
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
        <p>價格：${item.price}</p>
        <p>數量：${item.quantity}</p>
      </div>
      <button class="remove-button" data-id="${item.id}">移除</button>
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
      renderCart(); // 重新渲染
    });
  });
}

document.getElementById('clear-cart').addEventListener('click', () => {
  localStorage.removeItem('cart');
  renderCart();
});

document.addEventListener('DOMContentLoaded', renderCart);
