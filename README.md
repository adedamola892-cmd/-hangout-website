# Hangout — Netlify-ready

This version uses a Netlify Function + Netlify Blobs so friends on different devices can share the same room code, chat, movement space, and Tic-Tac-Toe state.

## Publish on Netlify

1. Create a new GitHub repository and upload this folder's contents (not the outer ZIP itself).
2. In Netlify, choose **Add new project → Import an existing project** and select the repository.
3. Netlify will read `netlify.toml`. The publish directory is `public` and Functions are in `netlify/functions`.
4. Deploy. Netlify will give you a public URL such as `https://your-site-name.netlify.app`.
5. Open the site on two different phones, create a room on one, and join with the 4-letter code on the other.

Important: Because this site uses a serverless function, a repository-based Netlify deploy is the safest path. A simple static-file-only upload will not provide the shared room backend.
