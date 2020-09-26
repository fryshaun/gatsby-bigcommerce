const fetch = require("node-fetch")
const queryString = require("query-string")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

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
      }
    type itemVideo {
      id: String
      start: String
    }

    type itemChildren {
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
  }


exports.sourceNodes = ( { actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions
  const checkfrontItem = `https://${configOptions.host}/api/3.0/item`
  const checkfrontCategory = `https://${configOptions.host}/api/3.0/category`
  const init = {
    headers: { 'Authorization': `${configOptions.authorization}` }
  }
  const getJSON = uri => fetch(uri, init).then(response => response.json())

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function to process items
  const processItem = item => {
    const nodeID = createNodeId(`checkfront-item-${item.item_id}`)
    //console.log(item)
    const nodeContent = JSON.stringify(item)
    const nodeData = Object.assign({}, item, {
      id: nodeID,
      parent: null,
      children: [],
      internal: {
        type: `CheckfrontItems`,
        content: nodeContent,
        contentDigest: createContentDigest(item),
      },
    })
    return nodeData
  }

  // Category helper function
  const processCat = category => {
  //  console.log(category)
    const nodeID = createNodeId(`checkfront-category-${category.category_id}`)
    const nodeContent = JSON.stringify(category)
    const nodeData = Object.assign({}, category, {
      id: nodeID,
      parent: null,
      children: [],
      internal: {
        type: `CheckfrontCategories`,
        content: nodeContent,
        contentDigest: createContentDigest(category),
      },
    })
    return nodeData
  }

  async function CheckfrontCall() {
    //console.log('calling')
    const [checkfrontItemData, checkfrontCategoryData] = await Promise.all([
      getJSON(checkfrontItem),
      getJSON(checkfrontCategory),
    ])
    //console.log('fetched')
    // Convert Item data to node
    Object.values(checkfrontItemData.items).forEach(item => {
      const nodeItem = processItem(item)
      createNode (nodeItem)
    })
    // Convert Category data to node
    Object.values(checkfrontCategoryData.category).forEach(category => {
      const nodeCat = processCat(category)
      createNode (nodeCat)
    })
  }

  return (
    CheckfrontCall()
  )

}
