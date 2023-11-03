// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>BJJ Ace | AI-Driven Jiujitsu Mastery</title>
        <meta
          name="description"
          content="Refine your Jiujitsu techniques with cutting-edge AI analysis."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100">
        {/* Hero Section */}
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Welcome to BJJ Ace</h1>
              <p className="py-6">
                The future of Jiujitsu training is here. Enhance your coaching
                with AI-driven insights derived from thousands of hours of match
                analysis.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card bordered">
              <figure>
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Feature image"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Comprehensive Analysis</h2>
                <p>
                  Analyze hundreds of thousands of competition videos to learn
                  what techniques are most effective and how your style matches
                  up.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bordered">
              <figure>
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Feature image"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Competitor Insights</h2>
                <p>
                  Understand the common strategies and potential vulnerabilities
                  of specific competitors to prepare your athletes
                  strategically.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bordered">
              <figure>
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Feature image"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Live Feedback</h2>
                <p>
                  Receive instant feedback on your techniques with our live AI
                  coaching system, allowing for on-the-spot corrections and
                  improvements.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card bordered">
              <figure>
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Feature image"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Movement Annotations</h2>
                <p>
                  Our AI provides detailed summaries and timestamped annotations
                  of all movements, making review sessions more efficient.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="cta bg-primary text-primary-content">
          <div className="hero-content">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Elevate Your Training?
              </h2>
              <button className="btn btn-secondary">
                Contact Us for a Demo
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
