# Bakery product model contract

Future product models belong in this directory as optimized `.glb` files.

Before a model is enabled in a product scene, it should:

- use metres and a centred origin;
- face the positive Z camera direction;
- contain compressed textures with sensible mobile sizes;
- use stable node names for tiers, filling, decoration, and topper parts;
- include a poster image fallback in `public/images`;
- remain optional so catalog browsing and ordering never wait for WebGL.

The current procedural cake remains a demo. It can later be replaced behind the lazy product-scene boundary without changing the page or catalog layers.
