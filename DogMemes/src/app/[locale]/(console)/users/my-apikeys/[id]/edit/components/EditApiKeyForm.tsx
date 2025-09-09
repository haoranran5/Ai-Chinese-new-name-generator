"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { apikeys } from "@/db/schema";

interface EditApiKeyFormProps {
  apiKey: typeof apikeys.$inferSelect;
}

export function EditApiKeyForm({ apiKey }: EditApiKeyFormProps) {
  const router = useRouter();
  const [name, setName] = useState(apiKey.name || "");
  const [isActive, setIsActive] = useState(apiKey.status === "active");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter API Key name");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/user/apikeys", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id: apiKey.id,
          name: name.trim(),
          status: isActive ? "active" : "inactive"
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Update API Key failed");
        return;
      }

      toast.success("API Key updated successfully");
      router.push("/users/my-apikeys");
    } catch (error) {
      console.error("Update API Key failed:", error);
      toast.error("Update API Key failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">API Key Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter API Key name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apikey">API Key</Label>
        <Input
          id="apikey"
          type="text"
          value={`${apiKey.apikey.substring(0, 8)}...${apiKey.apikey.substring(apiKey.apikey.length - 4)}`}
          disabled
          className="bg-muted"
        />
        <p className="text-sm text-muted-foreground">
          API Key cannot be modified
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="status"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
        <Label htmlFor="status">
          {isActive ? "Enable" : "Disable"}
        </Label>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update API Key"
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/users/my-apikeys")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
