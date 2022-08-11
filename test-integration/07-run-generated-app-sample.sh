#!/bin/sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

#-------------------------------------------------------------------------------
# functions
#-------------------------------------------------------------------------------

launchCurl() {
    sleep 60
    retryCount=1
    maxRetry=10
    httpUrl="http://localhost:8081/management/info"
    rep=$(curl -v "$httpUrl")
    status=$?
    while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
        echo "*** [$(date)] Application not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
        retryCount=$((retryCount+1))
        sleep 15
        rep=$(curl -v "$httpUrl")
        status=$?
    done

    if [ "$status" -ne 0 ]; then
        echo "***${RED}[$(date)] Not connected after" $retryCount " retries."
        return 1
    fi

}


runApp() {
    ./mvnw &
    echo $! > .pidRunApp
}

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------

cd test-integration/samples/$1
echo "***${GREEN}changed directory in : test-integration/samples/"$1


#-------------------------------------------------------------------------------
# Run app
#-------------------------------------------------------------------------------


  echo "***${GREEN}run full app in : "$1
  runApp

launchCurl 
resultRunApp=$?

#-------------------------------------------------------------------------------
# Kill app
#-------------------------------------------------------------------------------
echo "***${GREEN}kill app : "$1
kill $(cat .pidRunApp)

exit $((resultRunApp))
