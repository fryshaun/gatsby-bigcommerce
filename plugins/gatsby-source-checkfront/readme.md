# Gatsby-Source-Checkfront Plugin (very alpha stage..)

## installation

*1. Add Plugin to `gatsby-config.js`

```
plugins: [
  {
    resolve: `gatsby-source-checkfront`,
    options: {
      host: process.env.GATSBY_CF_HOST,
      authorization: process.env.GATSBY_CF_BASIC_AUTH,
  }
]
```

*2. Add environmental variables to `.env`

GATSBY_CF_HOST="samplename.checkfront.com"
GATSBY_CF_BASIC_AUTH="Basic base64encodedstring"
