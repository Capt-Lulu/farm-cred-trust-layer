import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FarmCredLogo } from '../components/FarmCredLogo';
import { FeatureCard } from '../components/FeatureCard';
import { StatsCard } from '../components/StatsCard';
import { TrustBadge } from '../components/TrustBadge';
import LoginForm  from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Shield, Users, TrendingUp, CheckCircle, Star } from 'lucide-react';
// import heroImage from ''/;

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome back!</h1>
            <p className="text-lg text-gray-600 mb-8">Continue to your portal</p>
            <Link to="/portals">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Access Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <FarmCredLogo />
            <div className="flex items-center space-x-4">
              <Link to="/about">
                <Button variant="ghost">About Us</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost">Contact Us</Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline">Get Started</Button>
              </Link>
            </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Trust Based Credit for Nigerian Farmers
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Empowering agricultural communities through transparent credit scoring, 
                cooperative partnerships, and financial inclusion across Nigeria.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Get Started
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <TrustBadge type="security" label="Bank Grade Security" />
              <TrustBadge type="verified" label="Verified Farmers" />
            </div>
          </div>

          <div className="relative">
            <img 
              src={""} 
              alt="Nigerian farmers working in green fields"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
                <div>
                  <div className="font-bold text-lg">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Transforming Agricultural Finance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform connects farmers, cooperatives, and lenders through 
            innovative trust-based credit scoring and transparent processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Leaf}
            title="For Farmers"
            description="Access credit based on your farming history, community standing, and agricultural potential."
            benefits={["Trust-based scoring", "Flexible repayment", "Agricultural insurance"]}
          />
          <FeatureCard
            icon={Users}
            title="For Cooperatives"
            description="Manage member portfolios, track performance, and facilitate group lending programs."
            benefits={["Member management", "Group guarantees", "Performance analytics"]}
          />
          <FeatureCard
            icon={TrendingUp}
            title="For Lenders"
            description="Invest in agricultural projects with comprehensive risk assessment and monitoring tools."
            benefits={["Risk analytics", "Portfolio tracking", "Automated disbursement"]}
          />
        </div>
      </section>

      {/* Login Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Access Your Account
            </h2>
            <p className="text-lg text-gray-600">
              Sign in to your FarmCred account to continue
            </p>
          </div>
          <LoginForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <FarmCredLogo />
              <p className="text-gray-400">
                Bridging the trust gap in agricultural finance across Africa.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/portals" className="hover:text-white">For Farmers</Link></li>
                <li><Link to="/portals" className="hover:text-white">For Cooperatives</Link></li>
                <li><Link to="/portals" className="hover:text-white">For Lenders</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@farmcred.com.ng</li>
                <li>📞 +2347069301804</li>
                <li>📍 Funtua, Katsina, Nigeria</li>
                <li>📮 Postal Code: 830101</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FarmCred. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;