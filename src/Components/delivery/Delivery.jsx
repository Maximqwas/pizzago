import React, { useState, useEffect } from "react";
import "./Delivery.css";
import { FiX } from "react-icons/fi";

const Delivery = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || /\d/.test(formData.name)) {
      newErrors.name = "Ім'я не повинно містити цифри і бути порожнім";
    }
    if (!/^\+380\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат номера телефону";
    }
    if (formData.address.length < 5) {
      newErrors.address = "Адреса повинна містити щонайменше 5 символів";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  const updatedFormData = { ...formData, [name]: value };
  setFormData(updatedFormData);

  // Мгновенная валидация при вводе
  const newErrors = { ...errors };

  if (name === "name") {
    if (!value || /\d/.test(value)) {
      newErrors.name = "Ім'я не повинно містити цифри і бути порожнім";
    } else {
      delete newErrors.name;
    }
  }

  if (name === "phone") {
    if (!/^\+380\d{9}$/.test(value)) {
      newErrors.phone = "Невірний формат номера телефону";
    } else {
      delete newErrors.phone;
    }
  }

  if (name === "address") {
    if (value.length < 5) {
      newErrors.address = "Адреса повинна містити щонайменше 5 символів";
    } else {
      delete newErrors.address;
    }
  }

  setErrors(newErrors);
 };
 
  const handleRemoveItem = (index) => {
  const updatedCart = [...cart];
  updatedCart.splice(index, 1);
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
 };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  console.log(JSON.parse(localStorage.getItem("cart")));
  try {
    const response = await fetch("http://143.110.154.85:80/api/v1/orders", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Помилка при збереженні замовлення: ${response.status}`);
    }

    const orderData = await response.json();
    console.log("✅ Замовлення збережено:", orderData);

    // Сохраняем данные формы + заказ локально, если нужно
    localStorage.setItem("order", JSON.stringify({ ...formData, cart }));

    // Очистка
    localStorage.removeItem("cart");
    setCart([]);
    setFormData({
      name: "",
      phone: "",
      address: "",
      comment: "",
    });
    setOrderConfirmed(true);
   } catch (error) {
  //   console.error("❌ Помилка при надсиланні замовлення:", error);
  //   alert("Не вдалося надіслати замовлення. Спробуйте ще раз.");
  }
 };

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="delivery-form">
       {orderConfirmed && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Дякуємо за замовлення! ❤️</h3>
          <p>Очікуйте дзвінка найближчим часом</p>
          <button onClick={() => setOrderConfirmed(false)}>Закрити</button>
        </div>
      </div>
    )}
      <h2>Оформлення доставки</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Ім’я"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        <input
          name="phone"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        <textarea
          name="address"
          placeholder="Адреса доставки"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
        />
        <textarea
          name="comment"
          placeholder="Коментар до замовлення (необов’язково)"
          value={formData.comment}
          onChange={handleChange}
        />

        <div className="summary">
          <h4>Ваше замовлення:</h4>
          <ul>
            {cart.map((item, index) => (
             <li key={index}>
               {item.name} × {item.quantity}
              <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
               <FiX size={14} />
             </button>
             </li>
            ))}
          </ul>
          <p>Загальна сума: <strong>{total} грн</strong></p>
        </div>

        <button
          type="submit"
          disabled={!formData.name || !formData.phone || !formData.address || Object.keys(errors).length > 0}
        >
          Підтвердити замовлення
        </button>
      </form>
    </div>
  );
};

export default Delivery;