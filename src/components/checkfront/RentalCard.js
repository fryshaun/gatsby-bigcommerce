import React from 'react';
import { Link } from 'gatsby';

class RentalCard extends React.Component {
  render() {
    const product = this.props.product;

    return (
      <div className="bc-product-card">

        <Link to={`/rentals/${product.sku}`} className="bc-product-card-image-anchor" title={product.name}>
          <div className="bc-product-card__featured-image">
            <img
              className="attachment-bc-medium size-bc-medium"
              src={
                ((product.image[1] !== undefined) && product.image[1].url_medium) ||
                '/img/default-bc-product.png'
              }
              alt={product.name}
            />
          </div>
        </Link>

        <div className="bc-product__meta">
          <h3 className="bc-product__title">
            <Link to={`/rentals/${product.sku}`} className="bc-product__title-link" title={product.name}>{product.name}</Link>
          </h3>
        </div>

      </div>
    )
  }
}

export default RentalCard;
