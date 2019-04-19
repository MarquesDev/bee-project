find ./public -type f -exec gzip -9 "{}" \; -exec mv "{}.gz" "{}" \; 
cd ./public && mv manifest.webmanifest manifest.webmanifest.gz && gunzip manifest.webmanifest.gz