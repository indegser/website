# Indegser Website

## Architecture

- GitHub Issues api is used as headless CMS
- Using Next.js `getStaticPaths` and `getStaticProps`, every issue page is built at build time
- Deployed at Vercel with production as **https://indegser.com** and development version as **https://edge.indegser.com**

## Stack

- react, next.js as base framework
- emotion for css-in-js
- jest for testing, typescript for type-strong development

Testing
