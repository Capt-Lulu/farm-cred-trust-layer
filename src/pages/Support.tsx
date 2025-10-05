import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import  Input from "../components/ui/input";
import { FarmCredLogo } from "../components/FarmCredLogo";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, BookOpen, MessageCircle, FileText, Users, CreditCard, Shield } from "lucide-react";
import { useState } from "react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      icon: Users,
      title: "Getting Started",
      count: 8,
      questions: [
        "How do I create an account?",
        "What documents do I need?",
        "How is my credit score calculated?",
        "What crops are eligible for funding?"
      ]
    },
    {
      icon: CreditCard,
      title: "Loans & Payments",
      count: 12,
      questions: [
        "How do I apply for a loan?",
        "What are the interest rates?",
        "How do I make payments?",
        "What happens if I miss a payment?"
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      count: 6,
      questions: [
        "How is my data protected?",
        "Is the platform secure?",
        "Who can see my information?",
        "How do I update my privacy settings?"
      ]
    }
  ];

  const quickLinks = [
    {
      icon: BookOpen,
      title: "User Guide",
      description: "Step-by-step instructions for using FarmCred",
      link: "#"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Technical documentation and API guides",
      link: "#"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other farmers and get advice",
      link: "#"
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
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions and get the help you need
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 py-3 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <link.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <category.icon size={20} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{category.count} articles</p>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <li key={qIndex}>
                        <button className="text-left text-sm hover:text-primary transition-colors">
                          {question}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-4 text-primary">
                    View All Articles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center space-y-6 p-8 bg-primary/5 rounded-xl">
          <h2 className="text-2xl font-bold">Still Need Help?</h2>
          <p className="text-muted-foreground">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Contact Support</Button>
            </Link>
            <Button variant="outline" size="lg">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
