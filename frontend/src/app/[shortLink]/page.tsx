
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function RedirectPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const shortId = params.shortLink;
        
        if (!shortId) {
          setError("Invalid short link");
          setLoading(false);
          return;
        }

        // Call your backend API to get the original URL
        const response = await axios.get(`/api/backend/${shortId}`);
        
        if (response.data && response.data.originalUrl) {
          // Redirect to the original URL
          window.location.href = response.data.originalUrl;
        } else {
          setError("URL not found");
          setLoading(false);
        }
      } catch (err: unknown) {
        console.error("Redirect error:", err);
        const errorMessage = axios.isAxiosError(err) && err.response?.data?.message 
          ? err.response.data.message 
          : "URL not found";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-black text-xl">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center max-w-md p-8 bg-gray-900 rounded-lg border border-red-500/30">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-black text-xl mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-black rounded-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}

