# Change the values below
API_KEY=0c82959475ff41a5870bbabdd1ea8bbfd57f3b243b27d56c1a5e465d6bd323af
URL=https://feed.piral.cloud/api/v1/pilet/single-spa-example

MFS=('api' 'navbar' 'people' 'planets' 'root-config' 'styleguide')

for MF in "${MFS[@]}"; do
  cd $MF
  echo "Installing dependencies of $MF ..."
  npm install
  echo "Building $MF ..."
  npm run build
  echo "Publishing $MF ..."
  npm pack
  npx pilet publish --url $URL --api-key $API_KEY
  rm *.tgz
  cd ..
done

cd root-config && npx http-server dist
