#!/bin/sh

set -e


#-------------------------------------------------------------------------------
# Install JHipster Generator
#-------------------------------------------------------------------------------

echo "*** generator-jhipster: use last supported version"
npm install -g generator-jhipster@7.8.1

#-------------------------------------------------------------------------------
# Install yeoman
#-------------------------------------------------------------------------------
echo "*** yeoman: use last version"
npm install -g yo


#-------------------------------------------------------------------------------
# Install ngxadmin blueprint
#-------------------------------------------------------------------------------

echo "*** generator-jhipster-ngxadmin: use current branch version"
npm install -g
# sudo npm link
