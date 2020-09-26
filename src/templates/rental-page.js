import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import RentalCard from '../components/checkfront/RentalCard';

export const RentalPageTemplate = ({
  image,
  title,
  heading,
  description,
  products
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}>
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow:
            '0.5rem 0 0 rgba(0, 0, 0, 0.75), -0.5rem 0 0 rgba(0, 0, 0, 0.75)',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: 'white',
          padding: '1rem'
        }}>
        {title}
      </h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section bc-product-grid bc-product-grid--archive bc-product-grid--4col">
          {products.map(product => (
            <RentalCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

RentalPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  products: PropTypes.array
};

const RentalPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const products = data.allCheckfrontItems.nodes;

  return (
    <Layout>
      <RentalPageTemplate
        image={frontmatter.image}
        title={frontmatter.name}
        heading={frontmatter.name}
        description={frontmatter.details}
        products={products}
      />
    </Layout>
  );
};

RentalPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
};

export default RentalPage;

export const productPageQuery = graphql`
  query RentalPage($id: String!) {
    allCheckfrontItems(filter: {product_group_type: {eq: "P"}}) {
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
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
