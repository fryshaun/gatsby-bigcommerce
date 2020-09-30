import React, { useContext } from 'react';
import CartContext from '../../context/CartProvider';

const VariationDropdown = ({ children, productId, variantId }) => {
  const value = useContext(CartContext);
  const addToCart = value && value.selectVariation;
  const addingToCart = value && value.state.selectingVariation;

  return (
    <div className="bc-product-card">
      <div className="bc-product__actions" data-js="bc-product-group-actions">
        <div className="bc-form bc-product-form">
          <select className="variation_dropdown">
            <option>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariationDropdown;
