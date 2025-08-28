import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import heroImage from "@/assets/hero-wallet-3ejUXhxs.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4">
              🎉 Now supporting 180+ countries
            </Badge>
            <h1 className="text-h1 sm:text-5xl lg:text-6xl mb-6">
              The Future of
              <span className="gradient-primary bg-clip-text text-transparent">
                {" "}
                Digital Payments
              </span>
            </h1>
            <p className="text-body text-muted-foreground mb-8 max-w-xl">
              Experience seamless, secure, and instant money transfers with
              SecurePay. Join millions who trust us for their financial
              transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-float">
            <img
              src={heroImage}
              alt="SecurePay Digital Wallet"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Secure & Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
