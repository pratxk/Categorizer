"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Package, 
  Tag
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/custom-components/theme-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(() => {
    if (pathname === "/") return "dashboard";
    if (pathname === "/categories") return "categories";
    if (pathname === "/products") return "products";
    return "dashboard";
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Badge variant="secondary">v1.0.0</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <Link href="/">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant={activeTab === "categories" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("categories")}
                >
                  <Tag className="mr-2 h-4 w-4" />
                  Categories
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("products")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
