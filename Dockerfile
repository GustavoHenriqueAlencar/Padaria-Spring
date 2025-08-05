# Etapa 1: Build da aplicação
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Builda o projeto e gera o .jar
RUN mvn clean package -DskipTests

# Etapa 2: Imagem de produção
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copia o jar da etapa de build
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
