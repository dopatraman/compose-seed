echo "CREATE ROLE web with LOGIN PASSWORD $POSTGRES_PASSWORD;" >> init.sql
echo "GRANT web TO postgres;" >> init.sql

echo "CREATE DATABASE web with OWNER web ENCODING 'UTF8';" >> init.sql
echo "GRANT ALL PRIVILEGES ON DATABASE web TO postgres;" >> init.sql

cp -v init.sql /docker-entrypoint-initdb.d/10-init.sql

echo "Success copying init script"