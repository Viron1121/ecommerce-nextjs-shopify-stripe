export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            handle
            title
            productType
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2026-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    }
  );

  const json = await res.json();

  return json.data.products.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    name: node.title,
    category: node.productType || "Product",
    price: node.variants.edges[0].node.price.amount,
    currency: node.variants.edges[0].node.price.currencyCode,
    image: node.images.edges[0]?.node.url || null,
  }));
}
