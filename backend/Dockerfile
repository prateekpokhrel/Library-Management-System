FROM maven:3.10.1-eclipse-temurin-21 AS build

WORKDIR /workspace

# Cache dependencies
COPY pom.xml ./
RUN mvn -B -e -ntp -DskipTests dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre

WORKDIR /app

ARG JAR_FILE=target/backend-0.0.1-SNAPSHOT.jar
COPY --from=build /workspace/${JAR_FILE} ./app.jar

EXPOSE 8086
ENTRYPOINT ["java","-jar","/app/app.jar"]
