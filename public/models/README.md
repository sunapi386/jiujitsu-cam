# models

The MediaPipe Pose Landmarker task requires a trained model that is compatible with our task, pose landmark detection.

See https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js for more information.

## HuggingFace

https://huggingface.co/spaces/hysts/mediapipe-pose-estimation

## Playground

- [MediaPipe Pose Landmarker Task for web](https://codepen.io/mediapipe-preview/pen/abRLMxN?editors=1010) for pose landmark detection.
- [MediaPipe Image Embedder task](https://codepen.io/mediapipe-preview/pen/yLqxbaZ?editors=1010) for computing image embeddings.
- [MediaPipe Interactive Segmentation for web](https://codepen.io/mediapipe-preview/pen/ZEqzpRg?editors=1010) for interactive segmentation, likely needed for associating who is who in a video.

## NPM

https://www.npmjs.com/package/@mediapipe/tasks-vision

# Other models

## BlazePose

BlazePose-MediaPipe wraps the powerful MediaPipe JS Solution within the familiar TFJS API mediapipe.dev. Three models are offered.
https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepose_mediapipe
[demo](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=blazepose)

## Human Pose Mesh Recovery

Could be useful if we need to do 3D pose estimation in a 3D simulator environment.

- https://huggingface.co/walterzhu/MotionBERT

Alternatively finetune a model on our own data:
https://colab.research.google.com/github/tensorflow/tensorflow/blob/master/tensorflow/lite/g3doc/tutorials/pose_classification.ipynb#scrollTo=QXdiroR-Ue-Z

Human Pose Classification with MoveNet and TensorFlow Lite
This notebook teaches you how to train a pose classification model using MoveNet and TensorFlow Lite. The result is a new TensorFlow Lite model that accepts the output from the MoveNet model as its input, and outputs a pose classification, such as the name of a yoga pose.

The procedure in this notebook consists of 3 parts:

Part 1: Preprocess the pose classification training data into a CSV file that specifies the landmarks (body keypoints) detected by the MoveNet model, along with the ground truth pose labels.
Part 2: Build and train a pose classification model that takes the landmark coordinates from the CSV file as input, and outputs the predicted labels.
Part 3: Convert the pose classification model to TFLite.
By default, this notebook uses an image dataset with labeled yoga poses, but we've also included a section in Part 1 where you can upload your own image dataset of poses.
