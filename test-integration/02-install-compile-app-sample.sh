
#!/bin/sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'


#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
cd test-integration/samples/$1
echo "***${GREEN}changed directory in : test-integration/samples/"$1


#-------------------------------------------------------------------------------
# Install npm dependencies and compile app 
#-------------------------------------------------------------------------------

echo "*** install npm dependencies and maven compile for : "$1
./mvnw clean compile
if [ $? -ne 0 ]; then
  echo "${RED}FAILED INSTALL AND COMPILE"
  exit 1
fi


