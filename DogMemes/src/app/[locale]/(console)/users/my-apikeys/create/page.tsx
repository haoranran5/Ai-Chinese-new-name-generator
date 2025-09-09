"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Copy, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function CreateApiKeyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter API Key name");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/user/apikeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Create API Key failed");
        return;
      }

      const data = await response.json();
      setNewApiKey(data.data.apikey);
      toast.success("API Key created successfully");
    } catch (error) {
      console.error("Create API Key failed:", error);
      toast.error("Create API Key failed");
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = () => {
    if (newApiKey) {
      navigator.clipboard.writeText(newApiKey);
      toast.success("API Key copied to clipboard");
    }
  };

  const goBack = () => {
    router.push("/users/my-apikeys");
  };

  if (newApiKey) {
    return (
      <div className="container mx-auto py-6 max-w-2xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={goBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to API Keys
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">API Key created successfully</CardTitle>
            <CardDescription>
              Please save your API Key
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apikey">Your API Key</Label>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex-1 relative">
                  <Input
                    id="apikey"
                    type={showApiKey ? "text" : "password"}
                    value={newApiKey}
                    readOnly
                    className="font-mono pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button onClick={copyApiKey} size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                Important
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                <li>• Please save this API Key in a secure place</li>
                <li>• Do not expose your API Key in public code repositories</li>
                <li>• If the API Key is exposed, please delete it immediately and recreate it</li>
                <li>• You can manage your API Keys at any time in the console</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button onClick={goBack} className="flex-1">
                Back to API Keys
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setNewApiKey(null);
                  setName("");
                }}
                className="flex-1"
              >
                Create another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/users/my-apikeys">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to API Keys
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create new API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">API Key Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="API Key Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div className="flex space-x-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Creating..." : "Create API Key"}
              </Button>
              <Button type="button" variant="outline" onClick={goBack} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
