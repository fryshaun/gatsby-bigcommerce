// Search for Parents only
query MyQuery {
  allCheckfrontItems(filter: {product_group_type: {eq: "P"}}) {
    edges {
      node {
        name
        product_group_type
        product_group_children {
          name
        }
      }
    }
  }
}
