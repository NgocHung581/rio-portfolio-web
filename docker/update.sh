docker exec -u 0 rio-collective-web bash -c "chmod -R 777 vendor"
docker exec -u 0 rio-collective-backoffice bash -c "chmod -R 777 vendor"

docker exec -u 0 rio-collective-web bash -c "chmod -R 777 storage"
docker exec -u 0 rio-collective-backoffice bash -c "chmod -R 777 storage"

docker exec -u 0 rio-collective-web bash -c "chmod -R 777 bootstrap"
docker exec -u 0 rio-collective-backoffice bash -c "chmod -R 777 bootstrap"

docker exec -u 0 rio-collective-web bash -c "chmod -R 777 public"
docker exec -u 0 rio-collective-backoffice bash -c "chmod -R 777 public"

docker exec rio-collective-web bash -c "composer install"
docker exec rio-collective-backoffice bash -c "composer install"
