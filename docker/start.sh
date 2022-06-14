if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo Linux Open Source Software Technologies
        sudo docker run -dp 27017:27017 -v local-mongo:/data/db --name local-mongo --restart=always mongo
else
        echo "Windows or other"
        docker run -dp 27017:27017 -v local-mongo:/data/db --name local-mongo --restart=always mongo
fi
