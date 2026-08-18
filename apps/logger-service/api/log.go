package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type LogRequest struct {
	Level   string `json:"level"`
	Message string `json:"message"`
	Source  string `json:"source"`
	UserID  string `json:"userId,omitempty"`
}

// Handler is the Vercel Serverless Function entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	// CORS Headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	var req LogRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}

	// TODO: Forward to external persistence (Datadog, Aiven, Upstash Redis, etc.)
	// For now, logging to stdout which Vercel captures in functions logs
	fmt.Printf("[%s] %s: %s (Source: %s, User: %s)\n", time.Now().Format(time.RFC3339), req.Level, req.Message, req.Source, req.UserID)

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Log received successfully")
}
