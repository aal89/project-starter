#!/bin/sh

openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -config req.conf \
            -extensions 'v3_req' \
            -out ../src/self_signed_certificate.pem \
            -keyout ../src/self_signed_key.pem
