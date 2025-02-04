# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install Capacitor CLI globally
RUN npm install -g cordova \
    && npm install -g vite \
    && npm install -g cordova-icon \
    && npm install -g cordova-splash \
    && npm install -g javascript-obfuscator \
    && npm install -g html-minify \
    && npm install -g eslint \
    && npm install -g eslint-plugin-jquery

# Install dependencies for Android development
RUN apt-get update && \
    apt-get install -y openjdk-17-jre openjdk-17-jdk && \
    apt-get install -y wget zipalign apksigner  gradle git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV SDK_URL=https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip

# Download Android SDK
RUN wget -O cmdtools.zip "${SDK_URL}" && \
    mkdir -p /usr/local/android-sdk/cmdline-tools

# Unzip Android SDK and move to correct location
RUN unzip cmdtools.zip && \
    mv cmdline-tools/* /usr/local/android-sdk/cmdline-tools/ && \
    rm cmdtools.zip && \
    rm -rf cmdline-tools

# Set environment variables for Android SDK
ENV ANDROID_HOME=/usr/local/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/bin:$ANDROID_HOME/platform-tools

# Accept Android SDK licenses
RUN yes | sdkmanager --licenses --sdk_root=$ANDROID_HOME

# Install required Android SDK components
RUN sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" --sdk_root=$ANDROID_HOME

# Copy app folder to container
COPY . /app

# Create user with UID 1000:1000 to avoid permission issues
#RUN useradd -u 1000 -U -d /app pepa
RUN useradd -U -d /app pepa


# Change ownership of app folder to new user
RUN chown -R pepa:pepa /app

# Change to new user
USER pepa

# Expose the default Capacitor port
EXPOSE 3000

# Start a shell to allow interactive usage
CMD ["/bin/bash"]