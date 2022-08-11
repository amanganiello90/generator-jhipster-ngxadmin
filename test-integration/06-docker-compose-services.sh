#!/bin/sh

set -e

GREEN='\033[0;32m'


#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------

cd test-integration/samples/$1
echo "***${GREEN}changed directory in : test-integration/samples/"$1

#-------------------------------------------------------------------------------
# Run docker keycloak for oauth2 
#-------------------------------------------------------------------------------

echo "***${GREEN}run docker compose keycloak"
docker-compose -f src/main/docker/keycloak.yml up -d


#-------------------------------------------------------------------------------
# Run docker jhipster registry for gateway 
#-------------------------------------------------------------------------------

if [ -z $(find src -type f -name "*jhipster-registry.yml" ) ]; then
      echo "***${GREEN}docker jhipster registry does not exist"
else
      echo "***${GREEN}run docker compose jhipster registry"
      docker-compose -f src/main/docker/jhipster-registry.yml up -d
fi

docker ps -a

