sudo docker run --name webdav \
  -it -d --rm \
  -p 4881:80 \
  -v $PWD/test-docker/webdav3.conf:/etc/nginx/conf.d/default.conf \
  -v $PWD/webdav:/media \
  -e UDI=1000 \
  -e GID=1000 \
  ugeek/webdav:amd64

  #-e USERNAME=webdav \
  #-e PASSWORD=webdav \
  #-e TZ=Asia/Shanghai \
