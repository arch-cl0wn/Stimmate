
# Stimming Recommender Model

  

This repository contains the implementation of a RankingModel for stimming, which is built using TensorFlow Recomender Systems and Keras. The model aims to predict user compatibility scores for various stimming mechanisms based on their personal information and the characteristics of the stims.

  

## Table of Contents

  

- [Installation](#installation)

- [Usage](#usage)

- [Model Architecture](#model-architecture)

- [Data Preprocessing](#data-preprocessing)

- [Training](#training)

  

## Installation

  

To use this code, you need to have the following libraries installed:

  

- TensorFlow 2.x

- NumPy

- pandas

  

You can install the required libraries using pip:

```pip install tensorflow numpy pandas ```

  
  

## Usage

  Check Model_Access.ipynb to see how exactly you can implement the model

1. Import the `RankingModel` class from the provided code.

2. Instantiate the model by passing the pre-built user model and stim model.

3. Compile the model with an optimizer and a loss function.

4. Train the model using the `fit()` method.

  

## Model Architecture

  

The `ScoreEstimator` is a neural network that takes in user and stim features as input and predicts user preferences for stimming items. The model architecture is composed of two submodels, a User Model and a Stim Model, followed by several dense layers and batch normalization layers. The detailed architecture is as follows:

  

1.  **User Model**: Processes the user inputs, which include the following features:

- age

- gender

- sexuality

- neurodivergent_conditions (as a RaggedTensor)

- hobbies_embedding

- stimming_essentiality_score

- current_stims (as a RaggedTensor)

  

2.  **Stim Model**: Processes the stim inputs, which include the following features:

- name_embedding

- description_embedding

- harmfulness_score

- associated_conditions_hobbies

  

3.  **Concatenation Layer**: Concatenates the outputs of the User Model and Stim Model.

  

4.  **Dense Layers**: A series of dense layers with varying numbers of neurons, activation functions, weight constraints, and kernel initializers:

  

- Dense 1: 1024 neurons, SELU activation, Glorot uniform initializer, L1 regularization, and weight clipping constraint.

- Dense 2: 256 neurons, ReLU activation, Glorot uniform initializer, L1 regularization, and weight clipping constraint.

- Dense 3: 64 neurons, SELU activation, Glorot uniform initializer, L1 regularization, and weight clipping constraint.

- Dense 4: 16 neurons, Tanh activation, Glorot uniform initializer, L1 regularization, and weight clipping constraint.

- Dense 5: 4 neurons, SELU activation, Glorot uniform initializer, L1 regularization, and weight clipping constraint.

  

5.  **Batch Normalization Layers**: Applied after each dense layer to normalize the activations:

  

- Batch Norm 1: Applied after Dense 1.

- Batch Norm 2: Applied after Dense 2.

- Batch Norm 3: Applied after Dense 3.

- Batch Norm 4: Applied after Dense 4.

- Batch Norm 5: Applied after Dense 5.

  

6.  **Output Layer**: Produces the final prediction. It has 1 neuron with a weight clipping constraint. The output produced by this layer is the compatability of the stimming mechanism to that user.

  

The model architecture is designed to capture both the user and stim features effectively and generate accurate predictions for user preferences for stimming items.

  

## Data Preprocessing

  

The `preprocess_data()` function takes in the following inputs:

  

- interactions_df: A DataFrame containing user-stim interactions.

- users_df: A DataFrame containing user information.

- stims_df: A DataFrame containing stim information.

- score_calculator: A function to calculate the score for each interaction.

  

The function processes the data, converts it into appropriate tensors, and returns the preprocessed user inputs, stim inputs, and scores. It also handles the padding and truncation of variable-length inputs, such as 'current_stims' and 'associated_conditions_hobbies'.

  

## Training

  

Train the model using the custom `fit()` method, which takes the following inputs:

  

- inputs: A tuple containing the user inputs and stim inputs.

- scores: The ground truth scores for the interactions.

- epochs: The number of epochs to train the model.

- batch_size: The batch size for training.

- validation_split: The fraction of the data to be used as validation data.

  

The `fit()` method internally handles the creation of training and validation datasets, as well as the training loop and validation loss computation.

You can access the pretrained models here: [link](https://drive.google.com/drive/folders/1-E608oPRY9c-8tGofJ7tKYR0nQ3ipIWL?usp=drive_link)

After training, the model can be used for predicting user compatibility scores for various stimming mechanisms which can later be used for ranking and retrieval tasks in the app.