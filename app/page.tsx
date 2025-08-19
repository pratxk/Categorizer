"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Tag, 
  Plus
} from "lucide-react";
import Link from "next/link";
import Layout from "@/components/layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Admin Dashboard</h2>
            <p className="text-gray-600">Manage your categories and products efficiently</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +180 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
                <Badge variant="secondary" className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
                <p className="text-xs text-muted-foreground">
                  83% of total categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                <span className="h-4 w-4 text-muted-foreground">$</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45.67</div>
                <p className="text-xs text-muted-foreground">
                  +$2.34 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to get you started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Link href="/categories">
                    <Button className="flex-1">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button className="flex-1" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest changes in your system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New product "Wireless Headphones" added</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Category "Electronics" updated</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Product "Smart Watch" price changed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
