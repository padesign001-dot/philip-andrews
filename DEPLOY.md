# Deploying to Cloudflare Pages

This is a static site — no build step, no dependencies. Once your DNS has propagated on Cloudflare:

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Upload assets**.
2. Upload this entire `site` folder (or connect a GitHub repo containing it, for easier future updates).
3. Deploy. Cloudflare will give you a `*.pages.dev` URL first.
4. Go to the Pages project's **Custom domains** tab and add `philip-andrews.com` (and `www.philip-andrews.com` if you want both). Since the domain already lives in this Cloudflare account, the DNS records get added automatically — no manual CNAME work needed.

That's it — no server, no CDN config, nothing else to manage. Let me know when you're ready and I can walk through it live or help set up a GitHub repo for easier updates going forward.
