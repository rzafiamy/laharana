#!/bin/bash

# Define variables
KEY_ALIAS="Laharana"
KEYSTORE_NAME="laharana-key.keystore"
KEYSTORE_PASSWORD="myKeystorePassword"
KEY_PASSWORD="myKeyPassword"
DNAME="CN=INFODEV, OU=DEV, O=DEV, L=Toulouse, S=France, C=3"

# Generate the keystore
keytool -genkeypair -v \
  -keystore $KEYSTORE_NAME \
  -alias $KEY_ALIAS \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass $KEYSTORE_PASSWORD \
  -keypass $KEY_PASSWORD \
  -dname "$DNAME"

echo "Keystore generated: $KEYSTORE_NAME"
