exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const contextDefs = `
  type SitePage implements Node @dontInfer {
    context: Context
    type context {
      category_id: Int!
    }
  }`

  const catDefs = `
  type CheckfrontCategories implements Node @dontInfer {
    category_id: Int!
    name: String
    pos: Int!
    image: String
    image_url: String
    qty: Int!
 }`

  const typeDefs = `
    type CheckfrontItems implements Node @dontInfer {
      unit: String
      item_id: Int!
      category_id: Int!
      sku: String
      url: String
      lock: String
      visibility: String
      name: String
      pos: Int!
      summary: String
      details: String
      meta: JSON
      stock: Int!
      unlimited: String
      video: itemVideo
      image: JSON
      rated: String
      product_group_type: String
      product_group_children: [itemChildren!]!
      type: String
      status: String
      alias_id: String
      len: String
      rules: JSON
      category: String
      category_pos: String
      itemVideo: ItemVideo
    }
    type ItemVideo {
      id: String
      start: String
    }
      itemChildren: itemChildren
    type ItemChildren {
      item_id: String
      sku: String
      stock: Int!
      name: String
      category_id: Int!
      price: String
      price_type: String
      summary: String
      url: String
      img: String
      meta: JSON
      enabled: String
      status: String
      unlimited: String
      alias_id: String
      lock: String
      package: JSON
      rated: String
      visible: String
      visibility: String
      taxes: JSON
      video: JSON
      rules: JSON
      unit: String
      len: String
      param: JSON
      ecom: String
      gprice: JSON
      type: String
      price_fixed: String
      pos: String
      location: String
      details: String
      extra_details: String
      commission_type: String
      commission_amount: String
      product_group_type: String
      product_group_children: String
      category: String
    }
  `
  createTypes(typeDefs)
  createTypes(catDefs)
  createTypes(contextDefs)
}
