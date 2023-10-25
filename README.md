<a href="https://demo.jiujitsu.cam">
  <h1 align="center">jiujitsu.cam</h1>
</a>

<p align="center">
  AI-Powered Jiujitsu Movement Feedback Tool
</p>

<p align="center">
  <a href="https://twitter.com/sunapi386">
    <img src="https://img.shields.io/twitter/follow/sunapi386?style=flat&label=Follow&logo=twitter&color=0bf&logoColor=fff" alt="sunapi386's follower count" />
  </a>
  <a href="https://github.com/sunapi386/jiujitsu-cam">
    <img src="https://img.shields.io/github/stars/sunapi386/jiujitsu-cam?label=sunapi386%2Fjiujitsu-cam" alt="jiujitsu-cam repo star count" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#one-click-deploy"><strong>One-click Deploy</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#how-it-works"><strong>How it Works</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## Introduction

jiujitsu.cam is a web application that uses webcam to capture video of your jiujitsu movements and provides AI feedback to help you improve.

## Tech Stack + Features

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant applications

### Platforms

- [Vercel](https://vercel.com/) – Deployment platform integrated with git
- [Upstash](https://upstash.com/) - Serverless Data Platform (utilizing serverless Redis for rate limiting)

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Rapid UI development using utility-first CSS framework
- [Framer Motion](https://framer.com/motion) – React motion library for animations
- [`ImageResponse`](https://beta.nextjs.org/docs/api-reference/image-response) – Generating dynamic Open Graph images at the edge
- [HeadlessUI](https://headlessui.com/) - Accessible UI components for integration with Tailwind CSS

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checking for robust code
- [Prettier](https://prettier.io/) – Consistent code formatting
- [ESLint](https://eslint.org/) – Linting tool for Next.js and TypeScript

### Miscellaneous

- [FFMPEG.WASM](https://ffmpegwasm.netlify.app/) – Video/audio file transcoding
- [React Webcam](https://github.com/mozmorris/react-webcam) - Webcam component for React
- [Stripe Gradient Animation](https://whatamesh.vercel.app/) - Beautiful gradient animation using WebGL by [@jordienr](https://twitter.com/jordienr)

## How it Works

1. jiujitsu.cam processes the video and extracts human pose estimation, it identifies key points on a human body in video, such as the joints (e.g., elbows, knees) and then connects these points to form a stick figure representation of the person.

1. the stick figure is then compared to a library of reference stick figures to identify the differences between the user's movements and the reference movements, classified by the type of movement (e.g., armbar, triangle, etc.).

1. The library of transitions is generated using a combination of computer vision and motion capture technology, with expert jiujitsu practitioners performing the movements and annotated by a team of jiujitsu experts.

1. The differences are then synthesized to text, using large-language-model to provide feedback on the user's movements, such as the angle of the arm, the position of the legs, etc.

1. The text is then synthesized to speech using text-to-speech technology, and a coaching video is played back to the user.

## Author

- Jason Sun ([@sunapi386](https://twitter.com/sunapi386))
- Special thanks to Tyler Meyer ([@tmeyer_me](https://twitter.com/tmeyer_me)) for the foundational work on his project to build an AI interviewer, which inspired me to build this project.
