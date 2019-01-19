echo 'Build and deploy crypto-monitor to '
cd /Users/yglm/Documents/Development/React/crypto-monitor/
echo 'Build'
npm run build
echo 'Deploy to /usr/local/dist/arbmon/build-ui/'
rsync -r build/* /usr/local/dist/arbmon/build-ui/.
echo
echo 'To access the website go to http://localhost:3000/'
echo 'The express server running there will launch this React website.'


