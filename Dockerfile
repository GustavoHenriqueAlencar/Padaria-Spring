# Use a imagem oficial do Java
FROM openjdk:17-jdk-slim

# Crie um diretório para o app
WORKDIR /app

# Copie o arquivo jar
COPY target/*.jar app.jar

# Exponha a porta que o Spring usa
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
