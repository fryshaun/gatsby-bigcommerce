import React, { useState } from 'react';
import { graphql } from 'gatsby';

import AddToCartButton from '../components/bigcommerce/AddToCartButton';
import ProductPrices from '../components/bigcommerce/ProductPrices';
import Layout from '../components/Layout';

export default ({
  data: {
    allCheckfrontItems: {
      nodes:[
        {
          name,
          id,
          item_id,
          sku,
          summary,
          product_group_children,
          image
        }
      ]
    }
  }
}) => {
  const [selectedImage, updateSelectedImage] = useState(
    image.length && image[0].url
  );

  const product = {
    //price,
    //calculated_price,
    //retail_price,
    //sale_price,
    //map_price,
    item_id
  };


  return (
    <Layout>
      <div className="content">
        <div className="has-text-centered margin-top-0">
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow:
                '0.5rem 0 0 rgba(0, 0, 0, 1), -0.5rem 0 0 rgba(0, 0, 0, 1)',
              backgroundColor: 'rgba(0, 0, 0, 1)',
              color: 'white',
              padding: '1rem'
            }}>
            {name}
          </h1>
        </div>
        <section className="section">
          <div className="bc-product-single">
            <section className="bc-product-single__top">
              <div className="bc-product__gallery">
                <img
                  src={
                    (selectedImage && selectedImage) ||
                    '/img/default-bc-product.png'
                  }
                  alt="Main"
                  style={{ objectFit: 'contain' }}
                />
                <div
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    justifyContent: 'center'
                  }}>
                  {image.length &&
                    image.map(img => (
                      <img
                        height="100px"
                        width="100px"
                        src={img.url_thumbnail}
                        alt="Thumb"
                        key={JSON.stringify(img)}
                        onClick={() => updateSelectedImage(img.url_standard)}
                      />
                    ))}
                </div>
              </div>

              <div className="bc-product-single__meta">
                <h1 className="bc-product__title">{name}</h1>

                <ProductPrices product={product} />

                <span className="bc-product__sku">
                  <span className="bc-product-single__meta-label">SKU:</span>{' '}
                  {sku}
                </span>

                <AddToCartButton
                  productId={item_id}
                //  variantId={variants[0].id}
                >
                Add to Cart
                </AddToCartButton>
              </div>
            </section>
            <section className="bc-single-product__description">
              <h4 className="bc-single-product__section-title">
                Product Description
              </h4>
              <div
                className="bc-product__description"
            //    dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            </section>
            <section className="bc-single-product__specifications">
              <h4 className="bc-single-product__section-title">
                Specifications
              </h4>
              <ul className="bc-product__spec-list">
                <li className="bc-product__spec">
                  <span className="bc-product__spec-title">Weight:</span>{' '}
                  <span className="bc-product__spec-value">weightless! oz</span>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($productId: String!) {
    allCheckfrontItems(filter: { id: { eq: $productId } }) {
      nodes {
        id
        item_id
        name
        sku
        summary
        image
        product_group_children {
          name
          item_id
        }
      }
    }
  }
`;
