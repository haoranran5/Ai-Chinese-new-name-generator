"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";
import { apikeys } from "@/db/schema";

interface DeleteApiKeyFormProps {
  apiKey: typeof apikeys.$inferSelect;
}

export function DeleteApiKeyForm({ apiKey }: DeleteApiKeyFormProps) {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmText !== "DELETE") {
      toast.error("Please enter DELETE to confirm deletion");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/user/apikeys", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: apiKey.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Delete API Key failed");
        return;
      }

      toast.success("API Key deleted successfully");
      router.push("/users/my-apikeys");
    } catch (error) {
      console.error("Delete API Key failed:", error);
      toast.error("Delete API Key failed");
    } finally {
      setLoading(false);
    }
  };

  const maskedApiKey = `${apiKey.apikey.substring(0, 8)}...${apiKey.apikey.substring(apiKey.apikey.length - 4)}`;

  return (
    <div className="space-y-6">
      {/* API Key 信息 */}
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="space-y-2">
          <div>
            <Label className="text-sm font-medium">Name</Label>
            <p className="text-sm text-muted-foreground">{apiKey.name || "Untitled"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">API Key</Label>
            <p className="text-sm font-mono text-muted-foreground">{maskedApiKey}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Status</Label>
            <p className="text-sm text-muted-foreground">
              {apiKey.status === "active" ? "Enabled" : "Disabled"}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Created At</Label>
            <p className="text-sm text-muted-foreground">
              {apiKey.created_at ? new Date(apiKey.created_at).toLocaleString() : "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* 警告信息 */}
      <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-300">
              Warning
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
              <li>• This action cannot be undone</li>
              <li>• Applications using this API Key will no longer be able to access</li>
              <li>• It is recommended to disable the API Key before deleting it for testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 确认删除 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="confirm">
            Please enter <code className="bg-muted px-1 py-0.5 rounded text-sm">DELETE</code> to confirm deletion
          </Label>
          <Input
            id="confirm"
            type="text"
            placeholder="Enter DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            required
          />
        </div>

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            variant="destructive" 
            disabled={loading || confirmText !== "DELETE"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
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
    </div>
  );
}
