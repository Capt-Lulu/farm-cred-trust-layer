import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Users, Leaf, Award, Target } from "lucide-react";
import heroImage from "../assets/hero-farming.jpg"; // Correct path

const LearnMore = () => {
  const benefits = [
    "Access to financial literacy programs",
    "Support for sustainable farming",
    "Community-driven agricultural growth",
    "Recognition for excellence",
  ];

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="flex items-center text-blue-500 mb-6">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>

      <section className="hero flex flex-col md:flex-row items-center justify-between my-8">
        <div className="hero-image md:w-1/2">
          <img
            src={heroImage}
            alt="Hero Farming"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="hero-text md:w-1/2 mt-6 md:mt-0 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">Why FarmCred?</h1>
          <p className="mb-6">
            FarmCred is designed to empower farmers and communities by providing
            sustainable agricultural solutions, financial literacy, and support
            for growth.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="additional-features grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <div className="feature p-4 bg-white rounded-lg shadow text-center">
          <Leaf className="mx-auto mb-2" />
          <h3 className="font-bold">Eco-Friendly</h3>
        </div>
        <div className="feature p-4 bg-white rounded-lg shadow text-center">
          <Users className="mx-auto mb-2" />
          <h3 className="font-bold">Community Support</h3>
        </div>
        <div className="feature p-4 bg-white rounded-lg shadow text-center">
          <Award className="mx-auto mb-2" />
          <h3 className="font-bold">Recognized Excellence</h3>
        </div>
        <div className="feature p-4 bg-white rounded-lg shadow text-center">
          <Target className="mx-auto mb-2" />
          <h3 className="font-bold">Goal Oriented</h3>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
