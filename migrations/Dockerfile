FROM java

MAINTAINER Prakash Venkatraman

# download liquibase
COPY ./lib/liquibase-3.5.5-bin.tar.gz /tmp/liquibase/liquibase.tar.gz

# Create a directory for liquibase
RUN mkdir /opt/liquibase

# Unpack the distribution
RUN tar -xzf /tmp/liquibase/liquibase.tar.gz -C /opt/liquibase
RUN chmod +x /opt/liquibase/liquibase

# Symlink to liquibase to be on the path
RUN ln -s /opt/liquibase/liquibase /usr/local/bin/

# Get the postgres JDBC driver from http://jdbc.postgresql.org/download.html
ADD lib/postgresql-42.2.1.jar /opt/jdbc_drivers/

RUN ln -s /opt/jdbc_drivers/postgresql-42.2.1.jar /usr/local/bin/

# Add command scripts
ADD scripts /scripts
RUN chmod -R +x /scripts

# Copy changelog
COPY ./changelogs /opt/changelogs

WORKDIR /

ENTRYPOINT ["/bin/bash", "scripts/startup.sh"]