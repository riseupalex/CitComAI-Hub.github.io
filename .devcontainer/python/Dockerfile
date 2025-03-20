ARG IMAGE_FROM
FROM ${IMAGE_FROM}

# Set the default user
ARG USER_NAME
RUN useradd --create-home ${USER_NAME}

# Add user home path to PATH
ENV PATH="/home/${USER_NAME}/.local/bin:${PATH}"

# RUN apt update && \
#     apt install -y \
#     gcc \
#     graphviz \
#     graphviz-dev \
#     # used for the numeric planner ENHSP
#     openjdk-17-jdk && \ 
#     apt clean && \
#     rm -rf /var/lib/apt/lists/*
# python3-dev \
# libgeos-dev && \