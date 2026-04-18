# Setting proxy.
export HTTP_PROXY="http://222.255.214.22:3128"
export HTTPS_PROXY=$HTTP_PROXY
export NO_PROXY="localhost,127.0.0.1,.sock,172.19.0.1, 172.17.0.1"

# Docker compose.
docker compose -f ./docker/compose.yml "$@"
