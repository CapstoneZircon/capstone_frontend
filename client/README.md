# Build client
docker build -f Dockerfile.txt -t front-thai:8.0.0-prod .

# For tranfering docker container
docker commit <container_id> <your_image_name>
docker save -o <your_tarball_name>.tar <your_image_name>

docker save -o back_thai_v6.tar 5d673b1e087554f6f6c6c246f04a8933f0a97fe6ca37f98273805e63994591ee