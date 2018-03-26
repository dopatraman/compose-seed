FROM postgres:9.4

COPY ./run.sh /opt/run.sh
RUN chmod +x /opt/run.sh

COPY ./init.sql /docker-entrypoint-initdb.d/10-init.sql

ENTRYPOINT ["/opt/run.sh"]
