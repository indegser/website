# Browser is your wallet, Keycat.

Relationship between DApp and wallet is like shopping malls and payment services. However, DApps are embedded inside a wallet. It's like connecting to Amazon.com inside ApplePay app. Lots of effort and time was consumed because of this architecture. Test has to be done on every integrated wallets and UX of Dapp was dependent on wallet.

To solve above problems wallet has to be in shape of webpage or web popup and since webpages do not have safe storage, it needs other places to store private keys. Usual web services communicates with servers to handle credentials, but sending private keys over the wire has to be prevented.

The key was inside browser itself. Modern browsers like Google Chrome or Safari often asks users whether to save 'email and password', this safe storage is called [Keychain](https://support.google.com/chrome/answer/95606?co=GENIE.Platform%3DDesktop&hl=en&oco=1). Keychain is safely managed by browser itself and browsers are managed by world's best tech companies like Apple and Google. Keycat utilizes HTML form's features to guide browsers to treat user's public and private keys like email and password. Like autofilled credentials when signing in Gmail or Twitter, in Keycat wallet credentials are autofilled when users are about to fire a transaction.

[[ youtube url="https://www.youtube.com/watch?v=VInyicUG7Nw" alt="Keycat. (2019)" ]]

# JAM Stack

[JAM Stack](https://jamstack.org/)is a new way of building websites without web servers. Static sites like blogs can benefit from JAM Stack in performance, security and developer experience.

I used [Gatsby](https://www.gatsbyjs.org/) - a JAM Stack tool to develop Keycat. To power automated builds I used [Netlify](https://www.netlify.com/) and it was perfect fit to rapidly develop an open source website.
