#!/bin/bash

java -jar /opt/liquibase/liquibase.jar \
      --driver=org.postgresql.Driver \
      --classpath=/usr/local/bin/postgresql-42.2.1.jar \
      --changeLogFile=/opt/changelogs/changelog.xml \
      --url="jdbc:postgresql://db:5432/web?createDatabaseIfNotExist=true" \
      --username=docker \
      --password=password \
      migrate