import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, Wallet, CreditCard, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import UserNavBar from "./UserNavBar";
import Logo from "/src/assets/logo.png"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const features = [
  {
    title: "Digital Wallet",
    href: "#",
    description: "Secure digital wallet for all your transactions",
    icon: Wallet,
  },
  {
    title: "Instant Transfers",
    href: "#",
    description: "Send and receive money instantly",
    icon: CreditCard,
  },
  {
    title: "Security First",
    href: "#",
    description: "Bank-level security for your peace of mind",
    icon: Shield,
  },
  {
    title: "Multi-User Support",
    href: "#",
    description: "Manage multiple accounts with role-based access",
    icon: Users,
  },
];

export function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8">
               <img src={Logo} alt="logo" />
            </div>
            <span className="text-h3 font-bold">SecurePay</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex md:items-center md:space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {navigation.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    className={cn(
                      "rounded-md mr-2 px-4 py-2 text-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none",
                      isActive(item.href) && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md bg-transparent">Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline
                                     border-2 border-background hover:border-accent transition-colors hover:bg-background h-full"
                          >
                            <div className="flex items-center space-x-2">
                              <feature.icon className="h-4 w-4" />
                              <div className="text-md font-medium leading-none text-primary dark:text-foreground">
                                {feature.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Button variant="ghost" asChild className="border border-accent">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
          <UserNavBar/>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Link to="#">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Link>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col justify-evenly h-2/3 w-2/3 mx-auto mt-10">
                {navigation.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md",
                      isActive(item.href) && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t pt-6 space-y-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start border border-accent"
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
