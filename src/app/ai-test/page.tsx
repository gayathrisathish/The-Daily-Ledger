import { Metadata } from "next";
import { AITestClient } from "./ai-test-client";

export const metadata: Metadata = {
  title: "AI Test"
};

export default function AiTestPage() {
  return <AITestClient />;
}
