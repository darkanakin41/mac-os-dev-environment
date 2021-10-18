#!/bin/zsh

if [ "$#" -ne 1 ]
then
  echo "Usage: Must supply a domain"
  exit 1
fi

source "${0:A:h}"/../.env

DOMAIN=$1

sudo openssl genrsa -out $DOCKER_SSL_FOLDER/$DOMAIN.key 2048
sudo openssl req -new -key $DOCKER_SSL_FOLDER/$DOMAIN.key -out $DOCKER_SSL_FOLDER/$DOMAIN.csr

cat > $DOCKER_SSL_FOLDER/$DOMAIN.ext << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $DOMAIN
EOF

sudo openssl x509 -req -in $DOCKER_SSL_FOLDER/$DOMAIN.csr -CA $SSL_ROOT_CA_PEM -CAkey $SSL_ROOT_CA_KEY -CAcreateserial \
-out $DOCKER_SSL_FOLDER/$DOMAIN.crt -days 825 -sha256 -extfile $DOCKER_SSL_FOLDER/$DOMAIN.ext
