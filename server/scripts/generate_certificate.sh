#!/bin/bash

if [[ -f ../src/certificate.pem && -f ../src/key.pem ]]
then
  echo 'Cert/key already exist. Not generating new ones...'
  exit
fi

echo 'Generating certificate and key...'

openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -config req.conf \
            -extensions 'v3_req' \
            -out ../src/certificate.pem \
            -keyout ../src/key.pem
