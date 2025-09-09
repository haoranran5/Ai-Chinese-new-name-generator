"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Image,
  MapPin,
  Globe,
  Paperclip,
  Mic,
  Sparkles,
  X,
} from "lucide-react";

interface PerplexitySearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onImageSearch?: () => void;
  onLocationSearch?: () => void;
  onWebSearch?: () => void;
  onAttachment?: () => void;
  onVoiceSearch?: () => void;
  onAISearch?: () => void;
  showQuickActions?: boolean;
  autoFocus?: boolean;
}

export function PerplexitySearch({
  className,
  placeholder = "询问任何问题或 @ 提及一个空间",
  onSearch,
  onImageSearch,
  onLocationSearch,
  onWebSearch,
  onAttachment,
  onVoiceSearch,
  onAISearch,
  showQuickActions = true,
  autoFocus = false,
}: PerplexitySearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    if (onVoiceSearch) {
      onVoiceSearch();
    }
  };

  const handleQuickAction = (actionQuery: string) => {
    setQuery(actionQuery);
    if (onSearch) {
      onSearch(actionQuery);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Logo/Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          Raven AI
        </h1>
      </div>

      {/* Search Container */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          {/* Main Search Input */}
          <div
            className={cn(
              "relative flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg transition-all duration-200",
              isFocused && "ring-2 ring-blue-500 border-blue-500",
              "hover:shadow-xl"
            )}
          >
            {/* Search Icon */}
            <div className="flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            {/* Input Field */}
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "flex-1 border-0 bg-transparent px-4 py-4 text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0",
                "min-h-[56px]"
              )}
            />

            {/* Clear Button */}
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleClearQuery}
                title="清除"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-1 pr-2">
              {/* Image Search */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onImageSearch}
                title="图片搜索"
              >
                <Image className="h-4 w-4" />
              </Button>

              {/* Location Search */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onLocationSearch}
                title="位置搜索"
              >
                <MapPin className="h-4 w-4" />
              </Button>

              {/* Web Search */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onWebSearch}
                title="网页搜索"
              >
                <Globe className="h-4 w-4" />
              </Button>

              {/* Attachment */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onAttachment}
                title="添加附件"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              {/* Voice Search */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 transition-all duration-200",
                  isListening
                    ? "text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={handleVoiceClick}
                title={isListening ? "停止录音" : "语音搜索"}
              >
                <Mic className={cn("h-4 w-4", isListening && "animate-pulse")} />
              </Button>

              {/* AI Search */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                onClick={onAISearch}
                title="AI 搜索"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        {/* Quick Actions (Optional) */}
        {showQuickActions && (
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              onClick={() => handleQuickAction("今天的新闻")}
            >
              今天的新闻
            </button>
            <button
              type="button"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              onClick={() => handleQuickAction("天气预报")}
            >
              天气预报
            </button>
            <button
              type="button"
              className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              onClick={() => handleQuickAction("编程教程")}
            >
              编程教程
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
