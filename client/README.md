# Build client
docker build -f Dockerfile.txt -t frontend-eng:2.0.0-prod .

# For tranfering docker container
docker commit <container_id> <your_image_name>
docker save -o <your_tarball_name>.tar <your_image_name>

