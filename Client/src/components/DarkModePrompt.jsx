import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Minimal Dark Mode prompt.
 * Props:
 * - open (boolean) - controlled open state
 * - onOpenChange (fn) - called with false to close
 */
export default function DarkModePrompt({ open, onOpenChange }) {
    const navigate = useNavigate();

    const handleYes = () => {
        // close then navigate
        onOpenChange?.(false);
        // small timeout so dialog close animation can run smoothly (optional)
        setTimeout(() => navigate("/dark"), 120);
    };

    const handleNo = () => {
        onOpenChange?.(false);
    };

    return (
        <Dialog open={!!open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md w-full rounded-2xl p-4">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Wanna see Dark Mode Home Page?</DialogTitle>
                </DialogHeader>

                <div className="mt-2 text-sm text-slate-600">
                    Would you like to view the proposed dark version of home page of Kenshi Webspace?
                </div>

                <DialogFooter className="mt-4 flex justify-end gap-3">
                    <Button variant="ghost" onClick={handleNo}>
                        No
                    </Button>
                    <Button onClick={handleYes} className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
                        Yes — show me
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
