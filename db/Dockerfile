FROM postgres:9.4

COPY ./run.sh /opt/run.sh
RUN chmod +x /opt/run.sh

COPY ./generate_init_sql.sh /opt/generate_init_sql.sh
RUN chmod +x /opt/generate_init_sql.sh
RUN ["/opt/generate_init_sql.sh"]

# COPY ./init.sql /docker-entrypoint-initdb.d/10-init.sql

ENTRYPOINT ["/opt/run.sh"]
