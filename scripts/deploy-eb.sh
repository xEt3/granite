#! bin/bash

rm -rf dist/eb_deployment.zip
mkdir tmp_ebdeployment

echo "Copying directories for bundling..."
cp -R app tmp_ebdeployment/app
cp -R config tmp_ebdeployment/config
cp -R public tmp_ebdeployment/public
cp -R vendor tmp_ebdeployment/vendor
cp -R .ebextensions tmp_ebdeployment/.ebextensions
cp {.bowerrc,.ember-cli,.eslintrc.json,.jshintrc,bower.json,Dockerrun.aws.json,ember-cli-build.js,package-lock.json,package.json,static.json,theme.config,yarn.lock} tmp_ebdeployment

echo "Zipping contents..."
cd tmp_ebdeployment && zip -vr ../dist/eb_deployment.zip * -x "*.DS_Store"
cd ../ && rm -rf tmp_ebdeployment
