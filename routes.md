## List of routes and sub domains for nickbolles.com

resume.nickbolles.com (deprecated, use nickbolles.com/resume instead, this way it's handled by the host, vercel in this case)
- Handled by Traefik as a redirect: 
```
[entryPoints]
  [entryPoints.http]
  ...
  [entryPoints.https]
    ...
    [entryPoints.https.redirect]
    regex = "(.*)resume.nickbolles.com(.*)"
    replacement = "https://www.nickbolles.com/Nicholas%20Bolles%20Resume.pdf"
```

portfolio.nickbolles.com
- alias in cloudflare to awesome.nickbolles.com

awesome.nickbolles.com -> nickbolles.github.io


*.nickbolles.com -> home.nickbolles.com
- IP updated by cloudflare docker on unraid