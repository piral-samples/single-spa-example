# Change the values below
API_KEY="<your key>" # like 32fc7e7...
URL="<your feed>" # like https://feed.piral.cloud/api/v1/pilet/single-spa-example

MFS=('api' 'navbar' 'people' 'planets' 'root-config' 'styleguide')

for MF in "${MFS[@]}"; do
  cd $MF
  echo "Installing dependencies of $MF ..."
  #npm install
  echo "Building $MF ..."
  #npm run build
  echo "Publishing $MF ..."
  npm pack
  npx pilet publish --url $URL --api-key $API_KEY
  rm *.tgz
  cd ..
done

cd root-config && npx http-server dist
