## After modified the nginx.config file:

Test config file:

```
nginx -t
```

Then restart nginx server: 

```
sudo service nginx restart
```

## Certbot generate cetificate:

Run command to generate (It may auto modify nginx.config file):
```
sudo certbot --nginx -d onspread.com -d www.onspread.com
```

Renew
```
certbot renew
```
