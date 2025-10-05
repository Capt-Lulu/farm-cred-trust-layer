import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmCredLogo } from "@/components/FarmCredLogo";
import { ContactInfo } from "@/components/ContactInfo";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Target, Heart, Globe } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Amina Hassan",
      role: "CEO & Co-founder",
      bio: "Agricultural economist with 15+ years in rural finance",
      image: "/placeholder.svg"
    },
    {
      name: "Ibrahim Musa",
      role: "CTO & Co-founder", 
      bio: "Fintech expert passionate about financial inclusion",
      image: "/placeholder.svg"
    },
    {
      name: "Fatima Sani",
      role: "Head of Operations",
      bio: "Operations specialist with deep cooperative experience",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Trust",
      description: "Building relationships based on transparency and reliability"
    },
    {
      icon: Users,
      title: "Community",
      description: "Empowering agricultural communities through collaboration"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging technology to solve real-world problems"
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Creating lasting change in agricultural finance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <FarmCredLogo size="md" />
          </div>
          <Link to="/portals">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">About FarmCred</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to bridge the trust gap in agricultural finance across Africa, 
            empowering farmers and strengthening rural economies through innovative credit solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                To democratize access to agricultural credit by creating a transparent, 
                trust-based platform that connects farmers, cooperatives, and financial 
                institutions across Nigeria and beyond.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                A thriving agricultural ecosystem where every farmer has access to fair 
                credit, enabling sustainable farming practices and food security across Africa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="p-8 bg-secondary/20">
          <h2 className="text-2xl font-bold text-center mb-6">Get in Touch</h2>
          <ContactInfo variant="card" className="max-w-2xl mx-auto" />
        </Card>

        {/* CTA */}
        <div className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold">Join Us in Transforming Agriculture</h2>
          <p className="text-lg text-muted-foreground">
            Ready to be part of the agricultural finance revolution?
          </p>
          <Link to="/portals">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
