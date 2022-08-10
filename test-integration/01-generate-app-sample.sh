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
# Run Blueprint Generator
#-------------------------------------------------------------------------------
echo "*** run generation app with ngxadmin blueprint for : "$1

runOptions="--blueprints ngxadmin --skip-checks --force --no-insight --skip-install"

if [ "$2" = "import-jdl" ]; then
  runOptions="import-jdl "$1".jdl $runOptions"
fi

jhipster $runOptions

echo "*** check if the generation is wrong because tslint is missing :"

if [ -z $(find . -type f -name "tslint.json" ) ]; then
      echo "${RED}WRONG GENERATION"
      exit 1
else
      echo "${GREEN}GENERATION OK"
fi


