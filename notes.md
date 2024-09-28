# Notes

## AWS resources

- t2.micro instance: joshhend-cs260server-base
- security group: launch-wizard-1
- elastic ip: 3.214.245.1 (eipalloc-013016ba4021b0d10)
- domain name: quikvote.click
- hosted zone: quikvote.click

## push to server

```bash
./deployFiles.sh -k [key pair file] -h quikvote.click -s startup
```


## ssh into server

```bash
ssh -i [key pair file] ubuntu@3.214.245.1
```

## TIL

### DNS records

There are many different DNS records you can store on the DNS server. One is an `A` record.
`A` records tell the DNS what ip address to map the domain name to. Others, like `NS` or `SOA` are
for security purposes.

### Let's Encrypt

Before Let's Encrypt, it used to cost a ton of money to get a certification. Now it's really cheap/free.

### HTML

The `<menu>` tag is deprecated in favor of the `<nav>` tag.
